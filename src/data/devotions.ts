export type DevotionCategory =
  | "Liturgia"
  | "Meditación"
  | "Devociones"
  | "Formación"
  | "Eucaristía"
  | "Ofrecimientos";

export type DevotionType =
  | "check"
  | "counter"
  | "journal";

export interface Devotion {

  /**
   * Identificador único.
   */
  id: string;

  /**
   * Nombre mostrado.
   */
  title: string;

  /**
   * Tipo de práctica.
   *
   * check   -> cuenta para el porcentaje
   * counter -> registra una cantidad
   * journal -> registra entradas de texto
   */
  type: DevotionType;

  /**
   * Categoría.
   */
  category: DevotionCategory;

  /**
   * Orden.
   */
  order: number;

  /**
   * Meta diaria.
   */
  target: number;

  /**
   * Valor realizado hoy.
   */
  completed: number;

  /**
   * ¿Fue creada por el sacerdote?
   */
  custom: boolean;

  /**
   * Visible en el plan.
   */
  enabled: boolean;

}

export const DEFAULT_DEVOTIONS: Devotion[] = [

  // ------------------------------------------------------------------
  // LITURGIA
  // ------------------------------------------------------------------

  {
    id: "oficio",
    title: "Oficio de Lectura",
    type: "check",
    category: "Liturgia",
    order: 1,
    target: 1,
    completed: 0,
    custom: false,
    enabled: true,
  },

  {
    id: "laudes",
    title: "Laudes",
    type: "check",
    category: "Liturgia",
    order: 2,
    target: 1,
    completed: 0,
    custom: false,
    enabled: true,
  },

  {
    id: "hora",
    title: "Hora Intermedia",
    type: "check",
    category: "Liturgia",
    order: 3,
    target: 1,
    completed: 0,
    custom: false,
    enabled: true,
  },

  {
    id: "visperas",
    title: "Vísperas",
    type: "check",
    category: "Liturgia",
    order: 4,
    target: 1,
    completed: 0,
    custom: false,
    enabled: true,
  },

  {
    id: "completas",
    title: "Completas",
    type: "check",
    category: "Liturgia",
    order: 5,
    target: 1,
    completed: 0,
    custom: false,
    enabled: true,
  },

  // ------------------------------------------------------------------
  // MEDITACIÓN
  // ------------------------------------------------------------------

  {
    id: "med1",
    title: "Meditación (mañana)",
    type: "check",
    category: "Meditación",
    order: 1,
    target: 1,
    completed: 0,
    custom: false,
    enabled: true,
  },

  {
    id: "med2",
    title: "Meditación (tarde)",
    type: "check",
    category: "Meditación",
    order: 2,
    target: 1,
    completed: 0,
    custom: false,
    enabled: true,
  },

    // ------------------------------------------------------------------
  // DEVOCIONES
  // ------------------------------------------------------------------

  {
    id: "rosario",
    title: "Rosario",
    type: "counter",
    category: "Devociones",
    order: 1,
    target: 0,
    completed: 0,
    custom: false,
    enabled: true,
  },

  {
    id: "angelus",
    title: "Ángelus",
    type: "check",
    category: "Devociones",
    order: 2,
    target: 1,
    completed: 0,
    custom: false,
    enabled: true,
  },

  {
    id: "jaculatorias",
    title: "Jaculatorias",
    type: "counter",
    category: "Devociones",
    order: 3,
    target: 0,
    completed: 0,
    custom: false,
    enabled: true,
  },

  // ------------------------------------------------------------------
  // FORMACIÓN
  // ------------------------------------------------------------------

  {
    id: "papa",
    title: "Palabras del Papa",
    type: "check",
    category: "Formación",
    order: 1,
    target: 1,
    completed: 0,
    custom: false,
    enabled: true,
  },

  {
    id: "lectura",
    title: "Lectura espiritual",
    type: "check",
    category: "Formación",
    order: 2,
    target: 1,
    completed: 0,
    custom: false,
    enabled: true,
  },

  {
    id: "biblia",
    title: "Sagrada Escritura",
    type: "check",
    category: "Formación",
    order: 3,
    target: 1,
    completed: 0,
    custom: false,
    enabled: true,
  },

  // ------------------------------------------------------------------
  // EUCARISTÍA
  // ------------------------------------------------------------------

  {
    id: "preparacion_misa",
    title: "Preparación de la Santa Misa",
    type: "check",
    category: "Eucaristía",
    order: 1,
    target: 1,
    completed: 0,
    custom: false,
    enabled: true,
  },

  {
    id: "comunion",
    title: "Comunión espiritual",
    type: "check",
    category: "Eucaristía",
    order: 2,
    target: 1,
    completed: 0,
    custom: false,
    enabled: true,
  },

  {
    id: "accion_de_gracias",
    title: "Acción de gracias",
    type: "check",
    category: "Eucaristía",
    order: 3,
    target: 1,
    completed: 0,
    custom: false,
    enabled: true,
  },

  {
    id: "santisimo",
    title: "Visita al Santísimo",
    type: "counter",
    category: "Eucaristía",
    order: 4,
    target: 0,
    completed: 0,
    custom: false,
    enabled: true,
  },

    // ------------------------------------------------------------------
  // OFRECIMIENTOS
  // ------------------------------------------------------------------

  {
    id: "heroico",
    title: "Minuto heroico",
    type: "check",
    category: "Ofrecimientos",
    order: 1,
    target: 1,
    completed: 0,
    custom: false,
    enabled: true,
  },

  {
    id: "obras",
    title: "Ofrecimiento de obras",
    type: "check",
    category: "Ofrecimientos",
    order: 2,
    target: 1,
    completed: 0,
    custom: false,
    enabled: true,
  },

  {
    id: "sacrificio",
    title: "Actos de sacrificio",
    type: "counter",
    category: "Ofrecimientos",
    order: 3,
    target: 0,
    completed: 0,
    custom: false,
    enabled: true,
  },

  {
    id: "caridad",
    title: "Obras de caridad",
    type: "counter",
    category: "Ofrecimientos",
    order: 4,
    target: 0,
    completed: 0,
    custom: false,
    enabled: true,
  },

];

export const DEVOTION_CATEGORIES: DevotionCategory[] = [
  "Liturgia",
  "Meditación",
  "Devociones",
  "Formación",
  "Eucaristía",
  "Ofrecimientos",
];