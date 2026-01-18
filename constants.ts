
import { Tense, TenseData } from './types';

export const SPANISH_VERB_DATA: TenseData[] = [
  {
    id: Tense.PRESENT,
    title: "Presente (현재 시제)",
    usage: "현재의 사실, 습관, 보편적 진리를 나타냅니다.",
    verbs: [
      {
        name: "Hablar", translation: "말하다",
        conjugations: [
          { pronoun: "Yo", form: "hablo" }, { pronoun: "Tú", form: "hablas" }, { pronoun: "Él/Ella/Ud.", form: "habla" },
          { pronoun: "Nosotros", form: "hablamos" }, { pronoun: "Vosotros", form: "habláis" }, { pronoun: "Ellos/Ellas/Uds.", form: "hablan" }
        ]
      },
      {
        name: "Comer", translation: "먹다",
        conjugations: [
          { pronoun: "Yo", form: "como" }, { pronoun: "Tú", form: "comes" }, { pronoun: "Él/Ella/Ud.", form: "come" },
          { pronoun: "Nosotros", form: "comemos" }, { pronoun: "Vosotros", form: "coméis" }, { pronoun: "Ellos/Ellas/Uds.", form: "comen" }
        ]
      },
      {
        name: "Vivir", translation: "살다",
        conjugations: [
          { pronoun: "Yo", form: "vivo" }, { pronoun: "Tú", form: "vives" }, { pronoun: "Él/Ella/Ud.", form: "vive" },
          { pronoun: "Nosotros", form: "vivimos" }, { pronoun: "Vosotros", form: "vivís" }, { pronoun: "Ellos/Ellas/Uds.", form: "viven" }
        ]
      },
      {
        name: "Ser", translation: "이다 (본질)", isIrregular: true,
        conjugations: [
          { pronoun: "Yo", form: "soy" }, { pronoun: "Tú", form: "eres" }, { pronoun: "Él/Ella/Ud.", form: "es" },
          { pronoun: "Nosotros", form: "somos" }, { pronoun: "Vosotros", form: "sois" }, { pronoun: "Ellos/Ellas/Uds.", form: "son" }
        ]
      },
      {
        name: "Estar", translation: "이다 (상태)", isIrregular: true,
        conjugations: [
          { pronoun: "Yo", form: "estoy" }, { pronoun: "Tú", form: "estás" }, { pronoun: "Él/Ella/Ud.", form: "está" },
          { pronoun: "Nosotros", form: "estamos" }, { pronoun: "Vosotros", form: "estáis" }, { pronoun: "Ellos/Ellas/Uds.", form: "están" }
        ]
      },
      {
        name: "Ir", translation: "가다", isIrregular: true,
        conjugations: [
          { pronoun: "Yo", form: "voy" }, { pronoun: "Tú", form: "vas" }, { pronoun: "Él/Ella/Ud.", form: "va" },
          { pronoun: "Nosotros", form: "vamos" }, { pronoun: "Vosotros", form: "vais" }, { pronoun: "Ellos/Ellas/Uds.", form: "van" }
        ]
      },
      {
        name: "Tener", translation: "가지다", isIrregular: true,
        conjugations: [
          { pronoun: "Yo", form: "tengo" }, { pronoun: "Tú", form: "tienes" }, { pronoun: "Él/Ella/Ud.", form: "tiene" },
          { pronoun: "Nosotros", form: "tenemos" }, { pronoun: "Vosotros", form: "tenéis" }, { pronoun: "Ellos/Ellas/Uds.", form: "tienen" }
        ]
      }
    ]
  },
  {
    id: Tense.PROGRESSIVE,
    title: "Presente Progresivo (현재 진행)",
    usage: "현재 진행 중인 동작을 나타냅니다 (Estar + 현재분사).",
    verbs: [
      {
        name: "Estar + Hablar", translation: "말하고 있다",
        conjugations: [
          { pronoun: "Yo", form: "estoy hablando" }, { pronoun: "Tú", form: "estás hablando" }, { pronoun: "Él/Ella/Ud.", form: "está hablando" },
          { pronoun: "Nosotros", form: "estamos hablando" }, { pronoun: "Vosotros", form: "estáis hablando" }, { pronoun: "Ellos/Ellas/Uds.", form: "están hablando" }
        ]
      },
      {
        name: "Estar + Comer", translation: "먹고 있다",
        conjugations: [
          { pronoun: "Yo", form: "estoy comiendo" }, { pronoun: "Tú", form: "estás comiendo" }, { pronoun: "Él/Ella/Ud.", form: "está comiendo" },
          { pronoun: "Nosotros", form: "estamos comiendo" }, { pronoun: "Vosotros", form: "estáis comiendo" }, { pronoun: "Ellos/Ellas/Uds.", form: "están comiendo" }
        ]
      },
      {
        name: "Estar + Vivir", translation: "살고 있다",
        conjugations: [
          { pronoun: "Yo", form: "estoy viviendo" }, { pronoun: "Tú", form: "estás viviendo" }, { pronoun: "Él/Ella/Ud.", form: "está viviendo" },
          { pronoun: "Nosotros", form: "estamos viviendo" }, { pronoun: "Vosotros", form: "estáis viviendo" }, { pronoun: "Ellos/Ellas/Uds.", form: "están viviendo" }
        ]
      },
      {
        name: "Estar + Ir", translation: "가고 있다", isIrregular: true,
        conjugations: [
          { pronoun: "Yo", form: "estoy yendo" }, { pronoun: "Tú", form: "estás yendo" }, { pronoun: "Él/Ella/Ud.", form: "está yendo" },
          { pronoun: "Nosotros", form: "estamos yendo" }, { pronoun: "Vosotros", form: "estáis yendo" }, { pronoun: "Ellos/Ellas/Uds.", form: "están yendo" }
        ]
      },
      {
        name: "Estar + Leer", translation: "읽고 있다", isIrregular: true,
        conjugations: [
          { pronoun: "Yo", form: "estoy leyendo" }, { pronoun: "Tú", form: "estás leyendo" }, { pronoun: "Él/Ella/Ud.", form: "está leyendo" },
          { pronoun: "Nosotros", form: "estamos leyendo" }, { pronoun: "Vosotros", form: "estáis leyendo" }, { pronoun: "Ellos/Ellas/Uds.", form: "están leyendo" }
        ]
      },
      {
        name: "Estar + Decir", translation: "말하고 있다", isIrregular: true,
        conjugations: [
          { pronoun: "Yo", form: "estoy diciendo" }, { pronoun: "Tú", form: "estás diciendo" }, { pronoun: "Él/Ella/Ud.", form: "está diciendo" },
          { pronoun: "Nosotros", form: "estamos diciendo" }, { pronoun: "Vosotros", form: "estáis diciendo" }, { pronoun: "Ellos/Ellas/Uds.", form: "están diciendo" }
        ]
      }
    ]
  },
  {
    id: Tense.PRETERITE,
    title: "Pretérito Indefinido (단순 과거)",
    usage: "과거의 특정 시점에 완료된 동작을 나타냅니다.",
    verbs: [
      {
        name: "Hablar", translation: "말했다",
        conjugations: [
          { pronoun: "Yo", form: "hablé" }, { pronoun: "Tú", form: "hablaste" }, { pronoun: "Él/Ella/Ud.", form: "habló" },
          { pronoun: "Nosotros", form: "hablamos" }, { pronoun: "Vosotros", form: "hablasteis" }, { pronoun: "Ellos/Ellas/Uds.", form: "hablaron" }
        ]
      },
      {
        name: "Comer", translation: "먹었다",
        conjugations: [
          { pronoun: "Yo", form: "comí" }, { pronoun: "Tú", form: "comiste" }, { pronoun: "Él/Ella/Ud.", form: "comió" },
          { pronoun: "Nosotros", form: "comimos" }, { pronoun: "Vosotros", form: "comisteis" }, { pronoun: "Ellos/Ellas/Uds.", form: "comieron" }
        ]
      },
      {
        name: "Vivir", translation: "살았다",
        conjugations: [
          { pronoun: "Yo", form: "viví" }, { pronoun: "Tú", form: "viviste" }, { pronoun: "Él/Ella/Ud.", form: "vivió" },
          { pronoun: "Nosotros", form: "vivimos" }, { pronoun: "Vosotros", form: "vivisteis" }, { pronoun: "Ellos/Ellas/Uds.", form: "vivieron" }
        ]
      },
      {
        name: "Ser / Ir", translation: "이었다 / 갔다", isIrregular: true,
        conjugations: [
          { pronoun: "Yo", form: "fui" }, { pronoun: "Tú", form: "fuiste" }, { pronoun: "Él/Ella/Ud.", form: "fue" },
          { pronoun: "Nosotros", form: "fuimos" }, { pronoun: "Vosotros", form: "fuisteis" }, { pronoun: "Ellos/Ellas/Uds.", form: "fueron" }
        ]
      },
      {
        name: "Hacer", translation: "했다", isIrregular: true,
        conjugations: [
          { pronoun: "Yo", form: "hice" }, { pronoun: "Tú", form: "hiciste" }, { pronoun: "Él/Ella/Ud.", form: "hizo" },
          { pronoun: "Nosotros", form: "hicimos" }, { pronoun: "Vosotros", form: "hicisteis" }, { pronoun: "Ellos/Ellas/Uds.", form: "hicieron" }
        ]
      },
      {
        name: "Tener", translation: "가졌다", isIrregular: true,
        conjugations: [
          { pronoun: "Yo", form: "tuve" }, { pronoun: "Tú", form: "tuviste" }, { pronoun: "Él/Ella/Ud.", form: "tuvo" },
          { pronoun: "Nosotros", form: "tuvimos" }, { pronoun: "Vosotros", form: "tuvisteis" }, { pronoun: "Ellos/Ellas/Uds.", form: "tuvieron" }
        ]
      },
      {
        name: "Estar", translation: "있었다", isIrregular: true,
        conjugations: [
          { pronoun: "Yo", form: "estuve" }, { pronoun: "Tú", form: "estuviste" }, { pronoun: "Él/Ella/Ud.", form: "estuvo" },
          { pronoun: "Nosotros", form: "estuvimos" }, { pronoun: "Vosotros", form: "estuvisteis" }, { pronoun: "Ellos/Ellas/Uds.", form: "estuvieron" }
        ]
      }
    ]
  },
  {
    id: Tense.IMPERFECT,
    title: "Pretérito Imperfecto (불완료 과거)",
    usage: "과거의 반복적 행동이나 상태, 배경 묘사를 나타냅니다.",
    verbs: [
      {
        name: "Hablar", translation: "말하곤 했다",
        conjugations: [
          { pronoun: "Yo", form: "hablaba" }, { pronoun: "Tú", form: "hablabas" }, { pronoun: "Él/Ella/Ud.", form: "hablaba" },
          { pronoun: "Nosotros", form: "hablábamos" }, { pronoun: "Vosotros", form: "hablabais" }, { pronoun: "Ellos/Ellas/Uds.", form: "hablaban" }
        ]
      },
      {
        name: "Comer", translation: "먹곤 했다",
        conjugations: [
          { pronoun: "Yo", form: "comía" }, { pronoun: "Tú", form: "comías" }, { pronoun: "Él/Ella/Ud.", form: "comía" },
          { pronoun: "Nosotros", form: "comíamos" }, { pronoun: "Vosotros", form: "comíais" }, { pronoun: "Ellos/Ellas/Uds.", form: "comían" }
        ]
      },
      {
        name: "Vivir", translation: "살곤 했다",
        conjugations: [
          { pronoun: "Yo", form: "vivía" }, { pronoun: "Tú", form: "vivías" }, { pronoun: "Él/Ella/Ud.", form: "vivía" },
          { pronoun: "Nosotros", form: "vivíamos" }, { pronoun: "Vosotros", form: "vivíais" }, { pronoun: "Ellos/Ellas/Uds.", form: "vivían" }
        ]
      },
      {
        name: "Ser", translation: "이곤 했다", isIrregular: true,
        conjugations: [
          { pronoun: "Yo", form: "era" }, { pronoun: "Tú", form: "eras" }, { pronoun: "Él/Ella/Ud.", form: "era" },
          { pronoun: "Nosotros", form: "éramos" }, { pronoun: "Vosotros", form: "erais" }, { pronoun: "Ellos/Ellas/Uds.", form: "eran" }
        ]
      },
      {
        name: "Ir", translation: "가곤 했다", isIrregular: true,
        conjugations: [
          { pronoun: "Yo", form: "iba" }, { pronoun: "Tú", form: "ibas" }, { pronoun: "Él/Ella/Ud.", form: "iba" },
          { pronoun: "Nosotros", form: "íbamos" }, { pronoun: "Vosotros", form: "ibais" }, { pronoun: "Ellos/Ellas/Uds.", form: "iban" }
        ]
      },
      {
        name: "Ver", translation: "보곤 했다", isIrregular: true,
        conjugations: [
          { pronoun: "Yo", form: "veía" }, { pronoun: "Tú", form: "veías" }, { pronoun: "Él/Ella/Ud.", form: "veía" },
          { pronoun: "Nosotros", form: "veíamos" }, { pronoun: "Vosotros", form: "veíais" }, { pronoun: "Ellos/Ellas/Uds.", form: "veían" }
        ]
      }
    ]
  },
  {
    id: Tense.FUTURE,
    title: "Futuro Simple (단순 미래)",
    usage: "미래의 일이나 현재의 추측을 나타냅니다.",
    verbs: [
      {
        name: "Hablar", translation: "말할 것이다",
        conjugations: [
          { pronoun: "Yo", form: "hablaré" }, { pronoun: "Tú", form: "hablarás" }, { pronoun: "Él/Ella/Ud.", form: "hablará" },
          { pronoun: "Nosotros", form: "hablaremos" }, { pronoun: "Vosotros", form: "hablaréis" }, { pronoun: "Ellos/Ellas/Uds.", form: "hablarán" }
        ]
      },
      {
        name: "Comer", translation: "먹을 것이다",
        conjugations: [
          { pronoun: "Yo", form: "comeré" }, { pronoun: "Tú", form: "comerás" }, { pronoun: "Él/Ella/Ud.", form: "comerá" },
          { pronoun: "Nosotros", form: "comeremos" }, { pronoun: "Vosotros", form: "comeréis" }, { pronoun: "Ellos/Ellas/Uds.", form: "comerán" }
        ]
      },
      {
        name: "Vivir", translation: "살 것이다",
        conjugations: [
          { pronoun: "Yo", form: "viviré" }, { pronoun: "Tú", form: "vivirás" }, { pronoun: "Él/Ella/Ud.", form: "vivirá" },
          { pronoun: "Nosotros", form: "viviremos" }, { pronoun: "Vosotros", form: "viviréis" }, { pronoun: "Ellos/Ellas/Uds.", form: "vivirán" }
        ]
      },
      {
        name: "Tener", translation: "가질 것이다", isIrregular: true,
        conjugations: [
          { pronoun: "Yo", form: "tendré" }, { pronoun: "Tú", form: "tendrás" }, { pronoun: "Él/Ella/Ud.", form: "tendrá" },
          { pronoun: "Nosotros", form: "tendremos" }, { pronoun: "Vosotros", form: "tendréis" }, { pronoun: "Ellos/Ellas/Uds.", form: "tendrán" }
        ]
      },
      {
        name: "Hacer", translation: "할 것이다", isIrregular: true,
        conjugations: [
          { pronoun: "Yo", form: "haré" }, { pronoun: "Tú", form: "harás" }, { pronoun: "Él/Ella/Ud.", form: "hará" },
          { pronoun: "Nosotros", form: "haremos" }, { pronoun: "Vosotros", form: "haréis" }, { pronoun: "Ellos/Ellas/Uds.", form: "harán" }
        ]
      },
      {
        name: "Poder", translation: "할 수 있을 것이다", isIrregular: true,
        conjugations: [
          { pronoun: "Yo", form: "podré" }, { pronoun: "Tú", form: "podrás" }, { pronoun: "Él/Ella/Ud.", form: "podrá" },
          { pronoun: "Nosotros", form: "podremos" }, { pronoun: "Vosotros", form: "podréis" }, { pronoun: "Ellos/Ellas/Uds.", form: "podrán" }
        ]
      },
      {
        name: "Querer", translation: "원할 것이다", isIrregular: true,
        conjugations: [
          { pronoun: "Yo", form: "querré" }, { pronoun: "Tú", form: "querrás" }, { pronoun: "Él/Ella/Ud.", form: "querrá" },
          { pronoun: "Nosotros", form: "querremos" }, { pronoun: "Vosotros", form: "querréis" }, { pronoun: "Ellos/Ellas/Uds.", form: "querrán" }
        ]
      }
    ]
  },
  {
    id: Tense.PRESENT_PERFECT,
    title: "Pretérito Perfecto (현재 완료)",
    usage: "과거에 시작되어 현재와 연관된 동작을 나타냅니다.",
    verbs: [
      {
        name: "Haber + Hablar", translation: "말했다(현재까지 영향)",
        conjugations: [
          { pronoun: "Yo", form: "he hablado" }, { pronoun: "Tú", form: "has hablado" }, { pronoun: "Él/Ella/Ud.", form: "ha hablado" },
          { pronoun: "Nosotros", form: "hemos hablado" }, { pronoun: "Vosotros", form: "habéis hablado" }, { pronoun: "Ellos/Ellas/Uds.", form: "han hablado" }
        ]
      },
      {
        name: "Haber + Comer", translation: "먹었다(현재까지 영향)",
        conjugations: [
          { pronoun: "Yo", form: "he comido" }, { pronoun: "Tú", form: "has comido" }, { pronoun: "Él/Ella/Ud.", form: "ha comido" },
          { pronoun: "Nosotros", form: "hemos comido" }, { pronoun: "Vosotros", form: "habéis comido" }, { pronoun: "Ellos/Ellas/Uds.", form: "han comido" }
        ]
      },
      {
        name: "Haber + Vivir", translation: "살았다(현재까지 영향)",
        conjugations: [
          { pronoun: "Yo", form: "he vivido" }, { pronoun: "Tú", form: "has vivido" }, { pronoun: "Él/Ella/Ud.", form: "ha vivido" },
          { pronoun: "Nosotros", form: "hemos vivido" }, { pronoun: "Vosotros", form: "habéis vivido" }, { pronoun: "Ellos/Ellas/Uds.", form: "han vivido" }
        ]
      },
      {
        name: "Haber + Hacer", translation: "했다(현재까지 영향)", isIrregular: true,
        conjugations: [
          { pronoun: "Yo", form: "he hecho" }, { pronoun: "Tú", form: "has hecho" }, { pronoun: "Él/Ella/Ud.", form: "ha hecho" },
          { pronoun: "Nosotros", form: "hemos hecho" }, { pronoun: "Vosotros", form: "habéis hecho" }, { pronoun: "Ellos/Ellas/Uds.", form: "han hecho" }
        ]
      },
      {
        name: "Haber + Decir", translation: "말했다(현재까지 영향)", isIrregular: true,
        conjugations: [
          { pronoun: "Yo", form: "he dicho" }, { pronoun: "Tú", form: "has dicho" }, { pronoun: "Él/Ella/Ud.", form: "ha dicho" },
          { pronoun: "Nosotros", form: "hemos dicho" }, { pronoun: "Vosotros", form: "habéis dicho" }, { pronoun: "Ellos/Ellas/Uds.", form: "han dicho" }
        ]
      },
      {
        name: "Haber + Ver", translation: "봤다(현재까지 영향)", isIrregular: true,
        conjugations: [
          { pronoun: "Yo", form: "he visto" }, { pronoun: "Tú", form: "has visto" }, { pronoun: "Él/Ella/Ud.", form: "ha visto" },
          { pronoun: "Nosotros", form: "hemos visto" }, { pronoun: "Vosotros", form: "habéis visto" }, { pronoun: "Ellos/Ellas/Uds.", form: "han visto" }
        ]
      }
    ]
  },
  {
    id: Tense.PAST_PERFECT,
    title: "Pretérito Pluscuamperfecto (과거 완료)",
    usage: "과거의 어느 시점보다 더 이전에 일어난 일을 나타냅니다 (Haber + 과거분사).",
    verbs: [
      {
        name: "Haber + Hablar", translation: "말했었었다",
        conjugations: [
          { pronoun: "Yo", form: "había hablado" }, { pronoun: "Tú", form: "habías hablado" }, { pronoun: "Él/Ella/Ud.", form: "había hablado" },
          { pronoun: "Nosotros", form: "habíamos hablado" }, { pronoun: "Vosotros", form: "habíais hablado" }, { pronoun: "Ellos/Ellas/Uds.", form: "habían hablado" }
        ]
      },
      {
        name: "Haber + Comer", translation: "먹었었었다",
        conjugations: [
          { pronoun: "Yo", form: "había comido" }, { pronoun: "Tú", form: "habías comido" }, { pronoun: "Él/Ella/Ud.", form: "había comido" },
          { pronoun: "Nosotros", form: "habíamos comido" }, { pronoun: "Vosotros", form: "habíais comido" }, { pronoun: "Ellos/Ellas/Uds.", form: "habían comido" }
        ]
      },
      {
        name: "Haber + Vivir", translation: "살았었었다",
        conjugations: [
          { pronoun: "Yo", form: "había vivido" }, { pronoun: "Tú", form: "habías vivido" }, { pronoun: "Él/Ella/Ud.", form: "había vivido" },
          { pronoun: "Nosotros", form: "habíamos vivido" }, { pronoun: "Vosotros", form: "habíais vivido" }, { pronoun: "Ellos/Ellas/Uds.", form: "habían vivido" }
        ]
      },
      {
        name: "Haber + Hacer", translation: "했었었다", isIrregular: true,
        conjugations: [
          { pronoun: "Yo", form: "había hecho" }, { pronoun: "Tú", form: "habías hecho" }, { pronoun: "Él/Ella/Ud.", form: "había hecho" },
          { pronoun: "Nosotros", form: "habíamos hecho" }, { pronoun: "Vosotros", form: "habíais hecho" }, { pronoun: "Ellos/Ellas/Uds.", form: "habían hecho" }
        ]
      },
      {
        name: "Haber + Abrir", translation: "열었었었다", isIrregular: true,
        conjugations: [
          { pronoun: "Yo", form: "había abierto" }, { pronoun: "Tú", form: "habías abierto" }, { pronoun: "Él/Ella/Ud.", form: "había abierto" },
          { pronoun: "Nosotros", form: "habíamos abierto" }, { pronoun: "Vosotros", form: "habíais abierto" }, { pronoun: "Ellos/Ellas/Uds.", form: "habían abierto" }
        ]
      }
    ]
  }
];
