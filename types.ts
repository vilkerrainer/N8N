
export interface Character {
  id: string;
  photoUrl: string;
  name: string;
  background: string; 
  race: string;       
  charClass: string;  
  age: number;
  alignment: string;  
  coins: number;
  level: number;
  hp: number;
  hpt: number;
  ac: number;
  attributes: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  proficientSkills: string[]; 
  skillNotes: string; 
  items: string; 
  savingThrows: string;
  abilities: string;
  fightingStyle: string;
  magic?: MagicInfo; 
}

export interface Spell {
  name: string;
  level: number;
  school: string; // e.g., "Evocation", "Illusion"
  castingTime: string;
  range: string;
  components: string; // e.g., "V, S, M (a tiny ball of bat guano and sulfur)"
  duration: string;
  description: string;
  classes: string[]; // Classes that can learn/prepare this spell
}

export interface MagicInfo {
  spellcastingAbilityName?: AttributeName;
  spellSaveDC: number;
  spellAttackBonus: number;
  cantripsKnown: string[]; // Array of cantrip names/IDs
  spellsKnownPrepared: string[]; // Array of spell names/IDs
  spellbook?: string[]; // Optional: For Wizards
  spellSlots: number[]; // Array of 9 numbers for spell slots per level 1-9
}


export type AttributeName = keyof Character['attributes'];

export const ATTRIBUTE_NAMES: AttributeName[] = [
  'strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'
];

export const ATTRIBUTE_LABELS: Record<AttributeName, string> = {
  strength: 'Força (FOR)',
  dexterity: 'Destreza (DES)',
  constitution: 'Constituição (CON)',
  intelligence: 'Inteligência (INT)',
  wisdom: 'Sabedoria (SAB)',
  charisma: 'Carisma (CAR)',
};