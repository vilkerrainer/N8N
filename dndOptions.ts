
import { AttributeName, RANKS as RANK_OPTIONS, BackgroundDefinition } from './types'; // Import RANK_OPTIONS from types
import { calculateModifier } from './components/AttributeField';


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

export const BACKGROUND_DETAILS: Record<string, BackgroundDefinition> = {
    "Acólito": { name: "Acólito", skillProficiencies: ["insight", "religion"], toolProficiencies: [], languages: ["any_two"] },
    "Artesão de Guilda": { name: "Artesão de Guilda", skillProficiencies: ["insight", "persuasion"], toolProficiencies: ["artisans_tools_one"], languages: ["any_one"] },
    "Artista": { name: "Artista", skillProficiencies: ["acrobatics", "performance"], toolProficiencies: ["disguise_kit", "musical_instrument_one"], languages: [] },
    "Charlatão": { name: "Charlatão", skillProficiencies: ["deception", "sleightOfHand"], toolProficiencies: ["disguise_kit", "forgery_kit"], languages: [] },
    "Criminoso": { name: "Criminoso", skillProficiencies: ["deception", "stealth"], toolProficiencies: ["gaming_set_one", "thieves_tools"], languages: [] },
    "Eremita": { name: "Eremita", skillProficiencies: ["medicine", "religion"], toolProficiencies: ["herbalism_kit"], languages: ["any_one"] },
    "Forasteiro": { name: "Forasteiro", skillProficiencies: ["athletics", "survival"], toolProficiencies: ["musical_instrument_one"], languages: ["any_one"] },
    "Herói do Povo": { name: "Herói do Povo", skillProficiencies: ["animalHandling", "survival"], toolProficiencies: ["artisans_tools_one", "vehicles_land"], languages: [] },
    "Marinheiro": { name: "Marinheiro", skillProficiencies: ["athletics", "perception"], toolProficiencies: ["navigators_tools", "vehicles_water"], languages: [] },
    "Nobre": { name: "Nobre", skillProficiencies: ["history", "persuasion"], toolProficiencies: ["gaming_set_one"], languages: ["any_one"] },
    "Órfão": { name: "Órfão", skillProficiencies: ["sleightOfHand", "stealth"], toolProficiencies: ["disguise_kit", "thieves_tools"], languages: [] },
    "Sábio": { name: "Sábio", skillProficiencies: ["arcana", "history"], toolProficiencies: [], languages: ["any_two"] },
    "Soldado": { name: "Soldado", skillProficiencies: ["athletics", "intimidation"], toolProficiencies: ["gaming_set_one", "vehicles_land"], languages: [] }
};

export const CLASS_SKILL_OPTIONS: Record<string, { count: number; options: string[] }> = {
    "Bárbaro": { count: 2, options: ["animalHandling", "athletics", "intimidation", "nature", "perception", "survival"] },
    "Bardo": { count: 3, options: ["acrobatics", "athletics", "deception", "history", "insight", "intimidation", "investigation", "medicine", "nature", "perception", "performance", "persuasion", "religion", "sleightOfHand", "stealth", "survival"] }, // any three
    "Clérigo": { count: 2, options: ["history", "insight", "medicine", "persuasion", "religion"] },
    "Druida": { count: 2, options: ["arcana", "animalHandling", "insight", "medicine", "nature", "perception", "religion", "survival"] },
    "Guerreiro": { count: 2, options: ["acrobatics", "animalHandling", "athletics", "history", "insight", "intimidation", "perception", "survival"] },
    "Monge": { count: 2, options: ["acrobatics", "athletics", "history", "insight", "religion", "stealth"] },
    "Paladino": { count: 2, options: ["athletics", "insight", "intimidation", "medicine", "persuasion", "religion"] },
    "Patrulheiro": { count: 3, options: ["animalHandling", "athletics", "insight", "investigation", "nature", "perception", "stealth", "survival"] },
    "Ladino": { count: 4, options: ["acrobatics", "athletics", "deception", "insight", "intimidation", "investigation", "perception", "performance", "persuasion", "sleightOfHand", "stealth"] },
    "Feiticeiro": { count: 2, options: ["arcana", "deception", "insight", "intimidation", "persuasion", "religion"] },
    "Bruxo": { count: 2, options: ["arcana", "deception", "history", "intimidation", "investigation", "nature", "religion"] },
    "Mago": { count: 2, options: ["arcana", "history", "insight", "investigation", "medicine", "religion"] },
};


export const ALIGNMENTS = [
  "Leal e Bom (LB)", "Neutro e Bom (NB)", "Caótico e Bom (CB)",
  "Leal e Neutro (LN)", "Neutro (N)", "Caótico e Neutro (CN)",
  "Leal e Mau (LM)", "Neutro e Mau (NM)", "Caótico e Mau (CM)"
];

export interface FightingStyleOption {
  name: string;
  description: string;
}

export const FIGHTING_STYLE_OPTIONS: FightingStyleOption[] = [
  { name: "", description: "Nenhum estilo de luta selecionado." },
  { name: "Arquearia", description: "Você ganha +2 de bônus nas jogadas de ataque com armas de ataque à distância." },
  { name: "Combate com Armas Grandes", description: "Quando você rolar um 1 ou 2 num dado de dano de um ataque com arma corpo-a-corpo que você esteja empunhando com duas mãos, você pode rolar o dado novamente e deve usar a nova rolagem, mesmo que o novo resultado seja 1 ou 2. A arma deve ter a propriedade duas mãos ou versátil para ganhar esse benefício." },
  { name: "Combate com Duas Armas", description: "Quando você estiver engajado em uma luta com duas armas, você pode adicionar seu modificador de habilidade ao dano do segundo ataque." },
  { name: "Defesa", description: "Enquanto você estiver utilizando uma armadura, você ganha +1 de bônus em sua CA." },
  { name: "Duelismo", description: "Quando você empunhar uma arma de ataque corpo-a-corpo em uma mão e nenhuma outra arma, você ganha +2 de bônus nas jogadas de dano com essa arma." },
  { name: "Proteção", description: "Quando uma criatura que você pode ver atacar um alvo que não seja você e esteja a até 1,5 metro de você, você pode usar sua reação para impor desvantagem na jogada de ataque. Você deve estar empunhando um escudo." }
];

export const FIGHTING_STYLES: string[] = FIGHTING_STYLE_OPTIONS.map(fs => fs.name);


export const CLASS_SPELLCASTING_ABILITIES: Record<string, AttributeName | undefined> = {
  "Mago": "intelligence",
  "Clérigo": "wisdom",
  "Druida": "wisdom",
  "Feiticeiro": "charisma",
  "Bardo": "charisma",
  "Bruxo": "charisma",
  "Paladino": "charisma", 
  "Patrulheiro": "wisdom", 
  "Bárbaro": undefined,
  "Guerreiro": "intelligence", // For Eldritch Knight
  "Ladino": "intelligence",    // For Arcane Trickster
  "Monge": "wisdom", // For Way of Four Elements
};

export const CLASS_SAVING_THROWS: Record<string, AttributeName[]> = {
  "Bárbaro": ['strength', 'constitution'],
  "Bardo": ['dexterity', 'charisma'],
  "Clérigo": ['wisdom', 'charisma'],
  "Druida": ['intelligence', 'wisdom'],
  "Guerreiro": ['strength', 'constitution'],
  "Monge": ['strength', 'dexterity'],
  "Paladino": ['wisdom', 'charisma'],
  "Patrulheiro": ['strength', 'dexterity'],
  "Ladino": ['dexterity', 'intelligence'],
  "Feiticeiro": ['constitution', 'charisma'],
  "Bruxo": ['wisdom', 'charisma'],
  "Mago": ['intelligence', 'wisdom'],
};

export const RANKS = [...RANK_OPTIONS];

export const getHitDieTypeForClass = (className: string): number => {
  switch (className) {
    case 'Feiticeiro':
    case 'Mago':
      return 6; // d6
    case 'Bardo':
    case 'Clérigo':
    case 'Druida':
    case 'Monge':
    case 'Ladino':
    case 'Bruxo':
      return 8; // d8
    case 'Guerreiro':
    case 'Paladino':
    case 'Patrulheiro':
      return 10; // d10
    case 'Bárbaro':
      return 12; // d12
    default:
      return 8; // Default to d8 if class is unknown or not typically a player class
  }
};

// Limited Use Abilities - Max Uses Calculation
export const getMaxRages = (level: number): number => {
  if (level < 1) return 0;
  if (level < 3) return 2;
  if (level < 6) return 3;
  if (level < 12) return 4;
  if (level < 17) return 5;
  if (level < 20) return 6;
  return 99; // Represents "Unlimited" for Level 20 Barbarians (Primal Champion)
};

export const getMaxBardicInspirations = (charismaScore: number): number => {
  return Math.max(1, calculateModifier(charismaScore));
};

export const getMaxChannelDivinityUses = (className: string, level: number): number => {
  if (className === 'Clérigo') {
    if (level < 2) return 0;
    if (level < 6) return 1;
    if (level < 18) return 2;
    return 3;
  }
  if (className === 'Paladino') {
    if (level < 3) return 0;
    return 1; // Paladins generally get 1 use of Channel Divinity per short/long rest. Specific oaths might grant more, handled by feature text.
  }
  return 0;
};

export const getMaxRelentlessEnduranceUses = (race: string): number => {
  return race === "Meio-Orc" ? 1 : 0;
};

export const getMaxSecondWindUses = (charClass: string): number => {
  return charClass === "Guerreiro" ? 1 : 0;
};

export const getMaxActionSurgeUses = (charClass: string, level: number): number => {
  if (charClass === "Guerreiro") {
    if (level >= 17) return 2;
    if (level >= 2) return 1;
  }
  return 0;
};

export const getMaxBreathWeaponUses = (race: string): number => {
  return race === "Draconato" ? 1 : 0;
};

export const getMaxKiPoints = (charClass: string, level: number): number => {
  if (charClass === "Monge" && level >= 2) {
    return level;
  }
  return 0;
};

export const getMaxLayOnHandsPool = (charClass: string, level: number): number => {
  if (charClass === "Paladino" && level >= 1) {
    return level * 5;
  }
  return 0;
};
