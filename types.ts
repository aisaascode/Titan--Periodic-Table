export interface ElementData {
  number: number;
  symbol: string;
  name: string;
  atomic_mass: number;
  category: string;
  group: number | string;
  period: number;
  valency: string; // Often multiple, stored as string representation
  shells: number[]; // K, L, M, N, O, P, Q counts
  electron_configuration: string;
  summary: string;
}

export interface CompoundInfo {
  formula: string;
  name: string;
  ratio: string;
  description: string;
}

export enum ElementCategory {
  ALKALI_METAL = "Alkali Metal",
  ALKALINE_EARTH_METAL = "Alkaline Earth Metal",
  TRANSITION_METAL = "Transition Metal",
  POST_TRANSITION_METAL = "Post-transition Metal",
  METALLOID = "Metalloid",
  NONMETAL = "Reactive Nonmetal",
  HALOGEN = "Halogen",
  NOBLE_GAS = "Noble Gas",
  LANTHANIDE = "Lanthanide",
  ACTINIDE = "Actinide",
  UNKNOWN = "Unknown Property",
}