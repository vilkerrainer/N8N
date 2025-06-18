
import { AttributeName } from './types';

export const RACES = [
  "Anão da Colina", "Anão da Montanha", 
  "Alto Elfo", "Elfo da Floresta", "Elfo Negro (Drow)",
  "Halfling Pés Leves", "Halfling Robusto",
  "Humano", 
  "Draconato", 
  "Gnomo da Floresta", "Gnomo das Rochas",
  "Meio-Elfo", 
  "Meio-Orc", 
  "Tiefling"
];

export const CLASSES = [
  "Bárbaro", "Bardo", "Bruxo", "Clérigo", "Druida", "Feiticeiro",
  "Guerreiro", "Ladino", "Mago", "Monge", "Paladino", "Patrulheiro"
];

export const BACKGROUNDS = [
  "Acólito", "Artesão de Guilda", "Artista", "Charlatão", "Criminoso",
  "Eremita", "Forasteiro", "Herói do Povo", "Marinheiro", "Nobre", "Órfão", "Sábio", "Soldado"
];

export const ALIGNMENTS = [
  "Leal e Bom (LB)", "Neutro e Bom (NB)", "Caótico e Bom (CB)",
  "Leal e Neutro (LN)", "Neutro (N)", "Caótico e Neutro (CN)",
  "Leal e Mau (LM)", "Neutro e Mau (NM)", "Caótico e Mau (CM)"
];

export const FIGHTING_STYLES = [
  "", // Option for none
  "Arquearia",
  "Combate com Armas Grandes",
  "Combate com Duas Armas",
  "Defesa",
  "Duelismo",
  "Proteção"
];

export const CLASS_SPELLCASTING_ABILITIES: Record<string, AttributeName | undefined> = {
  "Mago": "intelligence",
  "Clérigo": "wisdom",
  "Druida": "wisdom",
  "Feiticeiro": "charisma",
  "Bardo": "charisma",
  "Bruxo": "charisma",
  "Paladino": "charisma", // Paladinos usam Carisma
  "Patrulheiro": "wisdom", // Patrulheiros usam Sabedoria
  // Classes sem conjuração primária ou com subclasses específicas (como Guerreiro Arcano ou Ladino Trapaceiro Arcano) podem ser omitidas ou mapeadas para undefined.
  "Bárbaro": undefined,
  "Guerreiro": undefined,
  "Ladino": undefined,
  "Monge": undefined,
};
