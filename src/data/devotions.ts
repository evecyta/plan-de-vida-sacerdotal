export type DevotionCategory =
  | "Liturgia"
  | "Meditación"
  | "Devociones"
  | "Formación"
  | "Ofrecimientos"
  | "Personal";

export interface Devotion {
  id: string;
  title: string;
  category: DevotionCategory;
  order: number;
  completed: boolean;
  custom: boolean;
}

export const initialDevotions: Devotion[] = [
  // Liturgia de las Horas
  {
    id: "oficio",
    title: "Oficio de Lectura",
    category: "Liturgia",
    order: 1,
    completed: false,
    custom: false,
  },
  {
    id: "laudes",
    title: "Laudes",
    category: "Liturgia",
    order: 2,
    completed: false,
    custom: false,
  },
  {
    id: "hora",
    title: "Hora Intermedia",
    category: "Liturgia",
    order: 3,
    completed: false,
    custom: false,
  },
  {
    id: "visperas",
    title: "Vísperas",
    category: "Liturgia",
    order: 4,
    completed: false,
    custom: false,
  },
  {
    id: "completas",
    title: "Completas",
    category: "Liturgia",
    order: 5,
    completed: false,
    custom: false,
  },

  // Meditación
  {
    id: "med1",
    title: "Meditación (mañana)",
    category: "Meditación",
    order: 6,
    completed: false,
    custom: false,
  },
  {
    id: "med2",
    title: "Meditación (tarde)",
    category: "Meditación",
    order: 7,
    completed: false,
    custom: false,
  },

  // Devociones
  {
    id: "rosario",
    title: "Rosario",
    category: "Devociones",
    order: 8,
    completed: false,
    custom: false,
  },
  {
    id: "angelus",
    title: "Ángelus",
    category: "Devociones",
    order: 9,
    completed: false,
    custom: false,
  },
  {
    id: "santisimo",
    title: "Visita al Santísimo",
    category: "Devociones",
    order: 10,
    completed: false,
    custom: false,
  },
  {
    id: "comunion",
    title: "Comunión espiritual",
    category: "Devociones",
    order: 11,
    completed: false,
    custom: false,
  },
  {
    id: "jaculatorias",
    title: "Jaculatorias",
    category: "Devociones",
    order: 12,
    completed: false,
    custom: false,
  },

  // Formación
  {
    id: "papa",
    title: "Palabras del Papa",
    category: "Formación",
    order: 13,
    completed: false,
    custom: false,
  },
  {
    id: "lectura",
    title: "Lectura espiritual",
    category: "Formación",
    order: 14,
    completed: false,
    custom: false,
  },
  {
    id: "biblia",
    title: "Sagrada Escritura",
    category: "Formación",
    order: 15,
    completed: false,
    custom: false,
  },

  // Ofrecimientos
  {
    id: "heroico",
    title: "Minuto heroico",
    category: "Ofrecimientos",
    order: 16,
    completed: false,
    custom: false,
  },
  {
    id: "obras",
    title: "Ofrecimiento de obras",
    category: "Ofrecimientos",
    order: 17,
    completed: false,
    custom: false,
  },
  {
    id: "sacrificio",
    title: "Actos de sacrificio",
    category: "Ofrecimientos",
    order: 18,
    completed: false,
    custom: false,
  },
  {
    id: "caridad",
    title: "Obras de caridad",
    category: "Ofrecimientos",
    order: 19,
    completed: false,
    custom: false,
  },
];