
export enum Tense {
  PRESENT = 'Presente',
  PROGRESSIVE = 'Presente Progresivo',
  PRETERITE = 'Pretérito Indefinido',
  IMPERFECT = 'Pretérito Imperfecto',
  FUTURE = 'Futuro Simple',
  PRESENT_PERFECT = 'Pretérito Perfecto',
  PAST_PERFECT = 'Pretérito Pluscuamperfecto'
}

export interface Conjugation {
  pronoun: string;
  form: string;
}

export interface Verb {
  name: string;
  translation: string;
  isIrregular?: boolean;
  conjugations: Conjugation[];
}

export interface TenseData {
  id: Tense;
  title: string;
  usage: string;
  verbs: Verb[];
}
