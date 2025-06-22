
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
  abilities: string; // General racial/class abilities not tied to level progression choices
  fightingStyle: string; 
  magic?: MagicInfo;
  classFeatures?: ClassFeatureSelection[]; 
  racialFeatures?: RacialFeatureSelection[]; // New field for racial features
  rank?: Rank; 
}

export interface Spell {
  name: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  description: string;
  classes: string[];
}

export interface MagicInfo {
  spellcastingAbilityName?: AttributeName;
  spellSaveDC: number;
  spellAttackBonus: number;
  cantripsKnown: string[];
  spellsKnownPrepared: string[];
  spellbook?: string[];
  spellSlots: number[];
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

// Types for Class/Racial Feature Selection System
export interface FeatureChoiceDefinition {
  value: string;
  label: string;
  description?: string;
}

interface BaseFeatureDefinition {
  id: string; 
  name: string; 
  description: string;
  type: 'auto' | 'choice' | 'asi'; 
  selectionPrompt?: string; 
  choices?: FeatureChoiceDefinition[]; 
  maxChoices?: number;
  prerequisiteFeatureId?: string; 
}

export interface ClassFeatureDefinition extends BaseFeatureDefinition {
  level: number; // Level at which the class feature is gained
}

export interface RacialFeatureDefinition extends BaseFeatureDefinition {
  // Racial features are typically always active or chosen at creation, not tied to level in the same way class features are
  // If a racial feature *does* scale with level (e.g. Tiefling spellcasting), it might need special handling or a 'level' field here too.
  // For now, keeping it simple.
}

interface BaseFeatureSelection {
  featureId: string;      
  featureName: string;   
  type: 'auto' | 'choice' | 'asi';
  description?: string;   
  choiceValue?: string;   
  choiceLabel?: string;   
  customChoiceText?: string;
  appliesTo?: string; 
}

export interface ClassFeatureSelection extends BaseFeatureSelection {
  levelAcquired: number;
}

export interface RacialFeatureSelection extends BaseFeatureSelection {
  // Racial features are generally 'acquired' at character creation (level 1 by default)
  // No specific levelAcquired needed here unless we model level-scaling racial traits like Tiefling spells
}


// Player Ranks
export const RANKS = ["Ferro", "Bronze", "Prata", "Ouro", "Platina", "Diamante"] as const;
export type Rank = typeof RANKS[number];


// Example Wizard Arcane Tradition Choices (to be moved/expanded in classFeaturesData.ts)
export const WIZARD_ARCANE_TRADITION_CHOICES: FeatureChoiceDefinition[] = [
    { value: "abjuration", label: "Escola de Abjuração", description: "Foco em magias de proteção e negação." },
    { value: "evocation", label: "Escola de Evocação", description: "Foco em magias destrutivas e elementais." },
    // Add other schools like Conjuration, Divination, Enchantment, Illusion, Necromancy, Transmutation
];
