export interface Recept {
  id: string;
  nazev: string;
  popis?: string;
  fotografie: string[];
  dobaPrivavy: number; // v minutách
  dobaVareni: number; // v minutách
  pocetPorci: number;
  kategorie: string[];
  ingredience: Ingredience[];
  postup: KrokPostupu[];
  vytvoreno: string; // ISO string
  upraveno: string; // ISO string
}

export interface Ingredience {
  id: string;
  mnozstvi: number;
  jednotka: string;
  nazev: string;
  odskrtnuto?: boolean;
}

export interface KrokPostupu {
  id: string;
  cislo: number;
  text: string;
  odskrtnuto?: boolean;
  casovac?: number; // v minutách
}

export interface Kategorie {
  id: string;
  nazev: string;
  pocetReceptu: number;
}

export type JednotkaType =
  | 'g'
  | 'kg'
  | 'ml'
  | 'l'
  | 'pcs'
  | 'tbsp'
  | 'tsp'
  | 'cup'
  | 'pinch';

export interface NovaIngredience {
  mnozstvi: number;
  jednotka: string;
  nazev: string;
  odskrtnuto?: boolean;
}

export interface NovyKrokPostupu {
  cislo: number;
  text: string;
  odskrtnuto?: boolean;
  casovac?: number;
}

// Pomocné typy pro formuláře
export interface NovyRecept {
  nazev: string;
  popis?: string;
  fotografie: string[];
  dobaPrivavy: number;
  dobaVareni: number;
  pocetPorci: number;
  kategorie: string[];
  ingredience: NovaIngredience[];
  postup: NovyKrokPostupu[];
} 