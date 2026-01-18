
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Tense, TenseData, Verb } from './types';
import { SPANISH_VERB_DATA } from './constants';
import { GoogleGenAI, LiveServerMessage, Modality, Blob } from '@google/genai';

// --- Utility Functions for Audio ---
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const App: React.FC = () => {
  const [selectedTense, setSelectedTense] = useState<TenseData>(SPANISH_VERB_DATA[0]);
  const [selectedVerb, setSelectedVerb] = useState<Verb>(SPANISH_VERB_DATA[0].verbs[0]);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [statusMessage, setStatusMessage] = useState('시작하려면 마이크 버튼을 누르세요.');
  const [showIrregularModal, setShowIrregularModal] = useState(false);
  
  const audioContexts = useRef<{ input: AudioContext; output: AudioContext } | null>(null);
  const sessionRef = useRef<any>(null);
  const nextStartTime = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // Extract all irregular verbs for the dictionary modal with their tense metadata
  const allIrregularVerbs = SPANISH_VERB_DATA.flatMap(tense => 
    tense.verbs.filter(v => v.isIrregular).map(v => ({ 
      ...v, 
      tenseTitle: tense.title,
      tenseId: tense.id
    }))
  );

  // Group verbs of the current tense
  const regularVerbs = selectedTense.verbs.filter(v => !v.isIrregular);
  const irregularVerbs = selectedTense.verbs.filter(v => v.isIrregular);

  const initAudio = () => {
    if (!audioContexts.current) {
      audioContexts.current = {
        input: new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 }),
        output: new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 }),
      };
    }
  };

  const createAudioBlob = (data: Float32Array): Blob => {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
      int16[i] = data[i] * 32768;
    }
    return {
      data: encode(new Uint8Array(int16.buffer)),
      mimeType: 'audio/pcm;rate=16000',
    };
  };

  const startShadowing = async (tenseToUse = selectedTense, verbToUse = selectedVerb) => {
    try {
      initAudio();
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } }, 
          },
          systemInstruction: `당신은 스페인 현지인 수준의 완벽한 발음을 가진 스페인어 회화 전문 튜터입니다.
          사용자는 현재 ${tenseToUse.title}의 ${verbToUse.name} 동사 변화를 연습하려고 합니다.
          
          발음 가이드:
          - 스페인(Castilian) 또는 중남미 원어민의 자연스럽고 명확한 억양을 사용하세요.
          - 강세(Accent)가 있는 음절을 확실히 강조하여 스페인어 특유의 리듬감을 살려주세요.
          - 설명은 한국어로 부드럽게 하되, 스페인어 단어나 문장을 말할 때는 즉시 원어민의 목소리로 전환하세요.
          
          인칭 대명사 읽기 규칙 (중요):
          - 표에 'Él/Ella/Ud.'라고 되어 있어도 쉐도잉 시에는 대표로 "Él"만 읽으세요. (예: "Él habla")
          - 표에 'Ellos/Ellas/Uds.'라고 되어 있어도 쉐도잉 시에는 대표로 "Ellos"만 읽으세요. (예: "Ellos hablan")
          
          학습 방식:
          1. 먼저 어떤 동사 변화를 연습할지 한국어로 짧게 안내하세요.
          2. 위의 인칭 대명사 읽기 규칙을 준수하여 동사 변화형을 하나씩, 명확한 원어민 발음으로 읽어주세요.
          3. 사용자가 따라 읽는 것을 충분히 기다린 후, 잘 따라했는지 격려하고 다음 인칭으로 넘어가세요.
          4. 모든 인칭 변화가 끝나면 칭찬과 함께 짧은 응원 멘트를 전하며 종료하세요.`,
        },
        callbacks: {
          onopen: () => {
            setIsSessionActive(true);
            setStatusMessage('원어민 선생님이 연결되었습니다. 발음을 잘 듣고 따라해보세요!');
            
            const source = audioContexts.current!.input.createMediaStreamSource(stream);
            const scriptProcessor = audioContexts.current!.input.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createAudioBlob(inputData);
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContexts.current!.input.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              const outCtx = audioContexts.current!.output;
              nextStartTime.current = Math.max(nextStartTime.current, outCtx.currentTime);
              const buffer = await decodeAudioData(decode(base64Audio), outCtx, 24000, 1);
              const source = outCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outCtx.destination);
              source.addEventListener('ended', () => sourcesRef.current.delete(source));
              source.start(nextStartTime.current);
              nextStartTime.current += buffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTime.current = 0;
            }
          },
          onerror: (e) => {
            console.error(e);
            setStatusMessage('오류가 발생했습니다. 다시 시도해 주세요.');
            stopShadowing();
          },
          onclose: () => {
            setIsSessionActive(false);
            setStatusMessage('세션이 종료되었습니다.');
          }
        }
      });

      sessionRef.current = await sessionPromise;
      sessionRef.current.sendRealtimeInput({ text: '안녕하세요! 원어민 발음으로 동사 변화를 완벽하게 익혀볼까요?' });

    } catch (err) {
      console.error(err);
      setStatusMessage('마이크 접근 권한이 필요합니다.');
    }
  };

  const stopShadowing = () => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    setIsSessionActive(false);
    setStatusMessage('학습이 종료되었습니다.');
  };

  const handleStartShadowingFromModal = (v: any) => {
    const targetTense = SPANISH_VERB_DATA.find(t => t.id === v.tenseId);
    if (targetTense) {
      setSelectedTense(targetTense);
      setSelectedVerb(v);
      setShowIrregularModal(false);
      // 스크롤을 맨 위로 올려 메인 훈련창을 보여줍니다.
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // 즉시 쉐도잉 세션을 시작합니다.
      startShadowing(targetTense, v);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center max-w-5xl mx-auto pb-20">
      {/* Header */}
      <header className="w-full mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-500 mb-2">
            Spanish Verb Shadowing
          </h1>
          <p className="text-slate-400">원어민 발음으로 익히는 스페인어 동사 훈련</p>
        </div>
        <button 
          onClick={() => setShowIrregularModal(true)}
          className="bg-slate-700 hover:bg-slate-600 text-amber-200 px-6 py-2.5 rounded-full text-sm font-semibold border border-amber-500/30 flex items-center gap-2 transition-all"
        >
          <i className="fas fa-book"></i> 불규칙 동사 모아보기
        </button>
      </header>

      {/* Tense Selection */}
      <section className="w-full bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-xl border border-slate-700">
        <h2 className="text-lg font-semibold mb-4 text-amber-200 flex items-center gap-2">
          <span className="w-6 h-6 bg-amber-500/20 text-amber-500 rounded-full flex items-center justify-center text-xs">1</span>
          시제 선택
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {SPANISH_VERB_DATA.map((t) => (
            <button
              key={t.id}
              onClick={() => { setSelectedTense(t); setSelectedVerb(t.verbs[0]); }}
              className={`p-2.5 rounded-xl text-xs font-bold transition-all ${
                selectedTense.id === t.id 
                  ? 'bg-amber-600 text-white shadow-lg ring-2 ring-amber-500/50' 
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {t.id}
            </button>
          ))}
        </div>
        <div className="mt-4 p-3 bg-slate-900/30 rounded-lg border border-slate-700/50">
          <p className="text-sm font-semibold text-amber-100 mb-1">{selectedTense.title}</p>
          <p className="text-xs text-slate-400 italic">"{selectedTense.usage}"</p>
        </div>
      </section>

      {/* Verb Selection (Categorized) */}
      <section className="w-full bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-xl border border-slate-700 overflow-hidden">
        <h2 className="text-lg font-semibold mb-6 text-amber-200 flex items-center gap-2 border-b border-slate-700 pb-4">
          <span className="w-6 h-6 bg-amber-500/20 text-amber-500 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          동사 선택
        </h2>
        
        <div className="space-y-8">
          {/* Regular Verbs Group */}
          {regularVerbs.length > 0 && (
            <div>
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                규칙 동사 (REGULAR)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {regularVerbs.map((v) => (
                  <button
                    key={v.name}
                    onClick={() => setSelectedVerb(v)}
                    className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-2 border w-full text-center ${
                      selectedVerb.name === v.name 
                        ? 'bg-emerald-600 text-white shadow-lg border-emerald-500 ring-2 ring-emerald-500/30' 
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 border-slate-700'
                    }`}
                  >
                    <span className="truncate">{v.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Irregular Verbs Group */}
          {irregularVerbs.length > 0 && (
            <div>
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                불규칙 동사 (IRREGULAR)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {irregularVerbs.map((v) => (
                  <button
                    key={v.name}
                    onClick={() => setSelectedVerb(v)}
                    className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-2 border w-full text-center ${
                      selectedVerb.name === v.name 
                        ? 'bg-amber-600 text-white shadow-lg border-amber-500 ring-2 ring-amber-500/30' 
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 border-slate-700'
                    }`}
                  >
                    <span className="truncate">{v.name}</span>
                    <i className="fas fa-star text-amber-400 text-[10px] flex-shrink-0"></i>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Interaction Area */}
      <div className="w-full grid md:grid-cols-5 gap-6 items-start">
        {/* Table Display */}
        <section className="md:col-span-2 bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
          <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
            <div className="flex flex-col">
              <span className="font-bold text-amber-400 text-xl">{selectedVerb.name}</span>
              <span className="text-xs text-slate-500">{selectedVerb.translation}</span>
            </div>
            {selectedVerb.isIrregular && (
              <span className="bg-red-500/20 text-red-400 text-[10px] px-2 py-1 rounded-full font-bold border border-red-500/30">
                IRREGULAR
              </span>
            )}
          </div>
          <div className="p-1">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-800/50 text-[10px] text-slate-500 uppercase tracking-widest">
                  <th className="px-6 py-3">Pronoun</th>
                  <th className="px-6 py-3">Form</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {selectedVerb.conjugations.map((c, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-4 text-slate-400 text-sm">{c.pronoun}</td>
                    <td className="px-6 py-4 text-emerald-400 font-bold text-lg tracking-tight group-hover:text-emerald-300">
                      {c.form}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Voice Control */}
        <section className="md:col-span-3 bg-slate-800/80 backdrop-blur-md rounded-2xl p-8 border border-slate-700 shadow-xl flex flex-col items-center justify-center min-h-[460px]">
          <div className="text-center mb-10 w-full">
            <div className={`relative w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 transition-all duration-500 ${
              isSessionActive ? 'bg-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.4)]' : 'bg-slate-700 shadow-xl'
            }`}>
              {isSessionActive && (
                <>
                  <div className="absolute inset-0 rounded-full animate-ping bg-emerald-500 opacity-20"></div>
                  <div className="absolute inset-[-8px] rounded-full border-2 border-emerald-500/30 animate-pulse"></div>
                </>
              )}
              <i className={`fas ${isSessionActive ? 'fa-microphone' : 'fa-microphone-slash'} text-4xl text-white`}></i>
            </div>
            
            <h3 className={`text-2xl font-bold mb-3 ${isSessionActive ? 'text-emerald-400' : 'text-slate-300'}`}>
              {isSessionActive ? '원어민 튜터링 중' : '훈련 대기'}
            </h3>
            <div className="max-w-xs mx-auto bg-slate-900/40 py-3 px-4 rounded-xl border border-slate-700/50">
              <p className="text-sm text-slate-400 font-medium leading-relaxed">{statusMessage}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {!isSessionActive ? (
              <button
                onClick={() => startShadowing()}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-5 rounded-2xl font-black text-lg shadow-[0_10px_30px_rgba(16,185,129,0.3)] transform hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                <i className="fas fa-play text-xs"></i> 원어민 쉐도잉 시작
              </button>
            ) : (
              <button
                onClick={stopShadowing}
                className="bg-red-600/90 hover:bg-red-500 text-white px-12 py-5 rounded-2xl font-black text-lg shadow-[0_10px_30px_rgba(239,68,68,0.3)] transform hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                <i className="fas fa-stop text-xs"></i> 훈련 중단하기
              </button>
            )}
          </div>
          
          <div className="mt-10 p-5 bg-amber-500/5 rounded-2xl w-full border border-amber-500/10">
            <p className="text-xs text-amber-500 mb-2 flex items-center gap-2 uppercase tracking-[0.2em] font-black">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
              훈련 가이드
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              튜터가 <span className="text-amber-300">"{selectedVerb.conjugations[0].pronoun} {selectedVerb.conjugations[0].form}"</span> 처럼 현지인 발음으로 한 단계씩 읽어줍니다. 
              소리가 멈추면 원어민의 억양과 리듬을 최대한 흉내 내어 따라 읽으세요. 
              강세 위치에 주의하며 반복 연습하세요!
            </p>
          </div>
        </section>
      </div>

      {/* Irregular Verbs Dictionary Modal */}
      {showIrregularModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setShowIrregularModal(false)}></div>
          <div className="relative bg-slate-800 w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-3xl shadow-2xl border border-slate-700 flex flex-col">
            <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
              <div>
                <h2 className="text-2xl font-bold text-amber-400">Irregular Verbs Dictionary</h2>
                <p className="text-sm text-slate-400">현재 앱에 수록된 모든 불규칙 동사 변화표입니다.</p>
              </div>
              <button 
                onClick={() => setShowIrregularModal(false)}
                className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 text-slate-300 flex items-center justify-center transition-colors"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 bg-slate-900/50">
              <div className="grid sm:grid-cols-2 gap-4">
                {allIrregularVerbs.map((v, i) => (
                  <div key={i} className="bg-slate-800 rounded-2xl border border-slate-700 p-5 hover:border-amber-500/30 transition-all flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-white">{v.name}</h4>
                        <p className="text-xs text-slate-500">{v.translation}</p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-1 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 uppercase">
                        {v.tenseTitle.split('(')[0]}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4 flex-1">
                      {v.conjugations.map((c, ci) => (
                        <div key={ci} className="flex flex-col">
                          <span className="text-[10px] text-slate-500">{c.pronoun}</span>
                          <span className="text-sm font-semibold text-emerald-400">{c.form}</span>
                        </div>
                      ))}
                    </div>
                    <button 
                      onClick={() => handleStartShadowingFromModal(v)}
                      className="w-full py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white text-xs font-bold border border-emerald-500/30 transition-all flex items-center justify-center gap-2"
                    >
                      <i className="fas fa-play text-[10px]"></i> 쉐도잉 시작하기
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-700 text-center bg-slate-800/50">
              <p className="text-xs text-slate-500">불규칙 동사는 원어민의 소리를 반복적으로 따라하는 것이 가장 효과적입니다.</p>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-12 py-8 text-slate-500 text-sm text-center border-t border-slate-800 w-full">
        <div className="flex justify-center gap-6 mb-4">
          <i className="fab fa-instagram hover:text-amber-500 cursor-pointer"></i>
          <i className="fab fa-youtube hover:text-amber-500 cursor-pointer"></i>
          <i className="fab fa-github hover:text-amber-500 cursor-pointer"></i>
        </div>
        <p>© 2024 Spanish Shadowing Coach - Native Audio with Gemini Live</p>
      </footer>
    </div>
  );
};

export default App;
