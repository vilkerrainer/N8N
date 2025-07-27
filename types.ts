


export interface Feat {
  id: string;
  name: string;
  description: string;
}

export interface FeatSelection {
  featId: string;
  featName: string;
  description: string;
  levelAcquired: number; 
}

export interface CharacterAttributes {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

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
  attributes: CharacterAttributes;
  proficientSkills: string[];
  skillNotes: string;
  items: string;
  abilities: string; // General racial/class abilities not tied to level progression choices
  fightingStyle: string; 
  magic?: MagicInfo;
  classFeatures?: ClassFeatureSelection[]; 
  racialFeatures?: RacialFeatureSelection[]; 
  feats?: FeatSelection[];
  rank?: Rank; 

  // Hit Dice
  maxHitDice: number;
  currentHitDice: number;
  hitDieType: number; 

  // Limited Use Abilities - Class
  currentRages?: number;
  maxRages?: number;
  currentBardicInspirations?: number;
  maxBardicInspirations?: number;
  currentChannelDivinityUses?: number;
  maxChannelDivinityUses?: number;
  currentSecondWindUses?: number;
  maxSecondWindUses?: number;
  currentActionSurgeUses?: number;
  maxActionSurgeUses?: number;
  currentKiPoints?: number;
  maxKiPoints?: number;
  currentLayOnHandsPool?: number;
  maxLayOnHandsPool?: number;

  // Limited Use Abilities - Racial
  currentRelentlessEnduranceUses?: number;
  maxRelentlessEnduranceUses?: number;
  currentBreathWeaponUses?: number;
  maxBreathWeaponUses?: number;
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
  spellSlots: number[]; // Max spell slots per level (index 0 for 1st level, etc.)
  currentSpellSlots: number[]; // Current available spell slots per level
}

export type AttributeName = keyof CharacterAttributes;

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
  damage?: string; // e.g., "1d8 extra damage"
  damageType?: string; 
  breathWeaponDescription?: string; 
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
  subclassPrerequisite?: {
    featureId: string;
    choiceValue: string;
  };
}

export interface ClassFeatureDefinition extends BaseFeatureDefinition {
  level: number; 
}

export interface RacialFeatureDefinition extends BaseFeatureDefinition {
  grantsSkillProficiency?: string; 
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
  asiChoice?: 'asi' | 'feat';
}

export interface ClassFeatureSelection extends BaseFeatureSelection {
  levelAcquired: number;
}

export interface RacialFeatureSelection extends BaseFeatureSelection {
}


export const RANKS = ["Ferro", "Bronze", "Prata", "Ouro", "Platina", "Diamante"] as const;
export type Rank = typeof RANKS[number];

export interface BackgroundDefinition {
  name: string;
  skillProficiencies: string[];
  toolProficiencies: string[];
  languages: string[];
}

export const WIZARD_ARCANE_TRADITION_CHOICES: FeatureChoiceDefinition[] = [
    { value: "abjuration", label: "Escola de Abjuração", description: "Foco em magias de proteção e negação." },
    { value: "evocation", label: "Escola de Evocação", description: "Foco em magias destrutivas e elementais." },
    { value: "conjuration", label: "Escola de Conjuração", description: "Foco em magias de invocação e criação."},
    { value: "divination", label: "Escola de Adivinhação", description: "Foco em magias de conhecimento e previsão."},
    { value: "enchantment", label: "Escola de Encantamento", description: "Foco em magias de manipulação mental."},
    { value: "illusion", label: "Escola de Ilusão", description: "Foco em magias de engano e falsidade."},
    { value: "necromancy", label: "Escola de Necromancia", description: "Foco em magias que manipulam vida e morte."},
    { value: "transmutation", label: "Escola de Transmutação", description: "Foco em magias que alteram matéria e energia."},
];

export const FIGHTER_MARTIAL_ARCHETYPE_CHOICES: FeatureChoiceDefinition[] = [
    { value: "champion", label: "Campeão", description: "O arquétipo Campeão foca no desenvolvimento de poder físico bruto, levado a uma perfeição mortal." },
    { value: "battle_master", label: "Mestre de Batalha", description: "Mestres de Batalha usam técnicas especiais conhecidas como manobras para controlar o campo de batalha e capacitar seus ataques." },
    { value: "eldritch_knight", label: "Cavaleiro Arcano", description: "Cavaleiros Arcanos combinam a maestria marcial com o estudo cuidadoso da magia." },
];

export const BARBARIAN_PRIMAL_PATH_CHOICES: FeatureChoiceDefinition[] = [
    { value: "berserker", label: "Caminho do Furioso (Berserker)", description: "Para alguns bárbaros, a fúria é um meio para um fim – esse fim é a violência." },
    { value: "totem_warrior", label: "Caminho do Guerreiro Totêmico (Totem Warrior)", description: "O Caminho do Guerreiro Totêmico é uma jornada espiritual, à medida que o bárbaro aceita um espírito animal como guia." },
];

export const BARD_COLLEGE_CHOICES: FeatureChoiceDefinition[] = [
    { value: "lore", label: "Colégio do Conhecimento", description: "Bardos do Colégio do Conhecimento conhecem algo sobre a maioria das coisas." },
    { value: "valor", label: "Colégio da Bravura", description: "Bardos do Colégio da Bravura são escaldos destemidos cujos contos mantêm viva a memória dos grandes heróis." },
];

export const CLERIC_DOMAIN_CHOICES: FeatureChoiceDefinition[] = [
    { value: "life", label: "Domínio da Vida", description: "O domínio da Vida foca na vívida energia positiva que sustenta toda a vida." },
    { value: "knowledge", label: "Domínio do Conhecimento", description: "Os deuses do conhecimento valorizam o estudo e compreensão acima de tudo." },
    { value: "light", label: "Domínio da Luz", description: "Deuses da luz promovem os ideais do renascimento e renovação, verdade, vigilância e beleza." },
    { value: "nature", label: "Domínio da Natureza", description: "Os deuses da natureza são tão variados como a própria natureza do mundo." },
    { value: "tempest", label: "Domínio da Tempestade", description: "Deuses cujo portfólio contenha o domínio da Tempestade governam tormentas, mares e céus." },
    { value: "trickery", label: "Domínio da Enganação", description: "Deuses da enganação são causadores de travessuras e instigadores." },
    { value: "war", label: "Domínio da Guerra", description: "A guerra tem muitas manifestações. Os clérigos de tais deuses se sobressaem em batalha." },
];

export const WARLOCK_PATRON_CHOICES: FeatureChoiceDefinition[] = [
  { value: "archfey", label: "A Arquifada", description: "Seu patrono é um senhor ou senhora das fadas, uma criatura de lenda." },
  { value: "fiend", label: "O Corruptor", description: "Você fez um pacto com um corruptor dos planos inferiores." },
  { value: "great_old_one", label: "O Grande Antigo", description: "Seu patrono é uma entidade misteriosa cuja natureza é totalmente alheia ao tecido da realidade." },
];

export const WARLOCK_PACT_BOON_CHOICES: FeatureChoiceDefinition[] = [
  { value: "chain", label: "Pacto da Corrente", description: "Aprende convocar familiar; formas especiais: diabrete, pseudodragão, quasit ou sprite." },
  { value: "blade", label: "Pacto da Lâmina", description: "Pode criar uma arma de pacto corpo-a-corpo." },
  { value: "tome", label: "Pacto do Tomo", description: "Recebe um grimório (Livro das Sombras) com três truques de qualquer classe." },
];

export const WARLOCK_INVOCATION_CHOICES: FeatureChoiceDefinition[] = [
  { value: "agonizing_blast", label: "Rajada Agonizante", description: "Pré-requisito: truque rajada mística. Adiciona mod. Carisma ao dano de rajada mística." },
  { value: "armor_of_shadows", label: "Armadura de Sombras", description: "Pode conjurar armadura arcana à vontade." },
  { value: "eldritch_spear", label: "Lança Mística", description: "Pré-requisito: truque rajada mística. Alcance de rajada mística torna-se 90m." },
  // Many more needed
];

export const DRUID_CIRCLE_CHOICES: FeatureChoiceDefinition[] = [
  { value: "land", label: "Círculo da Terra", description: "Místicos e sábios que salvaguardam conhecimento e ritos antigos." },
  { value: "moon", label: "Círculo da Lua", description: "Ferrenhos guardiões na natureza, mestres da transformação em besta." },
];

export const SORCERER_ORIGIN_CHOICES: FeatureChoiceDefinition[] = [
  { value: "draconic", label: "Linhagem Dracônica", description: "Sua magia inata vem de magia dracônica misturada ao seu sangue." },
  { value: "wild_magic", label: "Magia Selvagem", description: "Sua magia inata vem das forças selvagens do caos." },
];

export const METAMAGIC_OPTIONS_CHOICES: FeatureChoiceDefinition[] = [
    { value: "careful", label: "Magia Cuidadosa", description: "Gaste 1 ponto de feitiçaria para proteger criaturas de magias de área." },
    { value: "distant", label: "Magia Distante", description: "Gaste 1 ponto de feitiçaria para dobrar o alcance de uma magia, ou tornar toque em 9m." },
    { value: "empowered", label: "Magia Fortalecida", description: "Gaste 1 ponto de feitiçaria para rerrolar dados de dano até seu mod. Carisma." },
    { value: "extended", label: "Magia Estendida", description: "Gaste 1 ponto de feitiçaria para dobrar a duração de uma magia (máx 24h)." },
    { value: "heightened", label: "Magia Elevada", description: "Gaste 3 pontos de feitiçaria para impor desvantagem no primeiro teste de resistência contra a magia." },
    { value: "quickened", label: "Magia Acelerada", description: "Gaste 2 pontos de feitiçaria para mudar o tempo de conjuração de 1 ação para 1 ação bônus." },
    { value: "subtle", label: "Magia Sutil", description: "Gaste 1 ponto de feitiçaria para conjurar sem componentes somáticos ou verbais." },
    { value: "twinned", label: "Magia Duplicada", description: "Gaste pontos de feitiçaria iguais ao nível da magia para afetar uma segunda criatura (se a magia afeta apenas uma e não tem alcance pessoal)." },
];

export const PALADIN_OATH_CHOICES: FeatureChoiceDefinition[] = [
    { value: "devotion", label: "Juramento de Devoção", description: "Vincula o paladino aos mais sublimes ideias de justiça, virtude e ordem." },
    { value: "ancients", label: "Juramento dos Anciões", description: "Antigo quanto a raça dos elfos e os rituais dos druidas, focado na luz e na vida." },
    { value: "vengeance", label: "Juramento de Vingança", description: "Um comprometimento solene de punir aqueles que cometeram pecados graves." },
];

export const ROGUE_ARCHETYPE_CHOICES: FeatureChoiceDefinition[] = [
    { value: "thief", label: "Ladrão (Thief)", description: "Aprimora habilidades de furto, agilidade e uso de objetos." },
    { value: "assassin", label: "Assassino (Assassin)", description: "Foca na arte da morte, disfarce e ataques surpresa mortais." },
    { value: "arcane_trickster", label: "Trapaceiro Arcano (Arcane Trickster)", description: "Incrementa furtividade e agilidade com magia, principalmente ilusão e encantamento." },
];

export const MONK_MONASTIC_TRADITION_CHOICES: FeatureChoiceDefinition[] = [
    { value: "open_hand", label: "Caminho da Mão Aberta", description: "Mestres das artes marciais, usando técnicas para controlar oponentes e curar a si mesmos." },
    { value: "shadow", label: "Caminho da Sombra", description: "Ninjas ou dançarinos das sombras, focados em furtividade e subterfúgio." },
    { value: "four_elements", label: "Caminho dos Quatro Elementos", description: "Ensina a dominar os elementos, moldando-os como uma extensão do próprio corpo." },
];


export const DRAGON_ANCESTRY_CHOICES: FeatureChoiceDefinition[] = [
  { value: "black", label: "Negro", description: "Resistência a Ácido. Sopro: Linha de 1,5m por 9m de ácido (Teste de DES).", damageType: "Ácido", breathWeaponDescription: "Linha de 1,5m por 9m (Teste de DES)" },
  { value: "blue", label: "Azul", description: "Resistência a Relâmpago. Sopro: Linha de 1,5m por 9m de relâmpago (Teste de DES).", damageType: "Relâmpago", breathWeaponDescription: "Linha de 1,5m por 9m (Teste de DES)" },
  { value: "brass", label: "Latão", description: "Resistência a Fogo. Sopro: Linha de 1,5m por 9m de fogo (Teste de DES).", damageType: "Fogo", breathWeaponDescription: "Linha de 1,5m por 9m (Teste de DES)" },
  { value: "bronze", label: "Bronze", description: "Resistência a Relâmpago. Sopro: Linha de 1,5m por 9m de relâmpago (Teste de DES).", damageType: "Relâmpago", breathWeaponDescription: "Linha de 1,5m por 9m (Teste de DES)" },
  { value: "copper", label: "Cobre", description: "Resistência a Ácido. Sopro: Linha de 1,5m por 9m de ácido (Teste de DES).", damageType: "Ácido", breathWeaponDescription: "Linha de 1,5m por 9m (Teste de DES)" },
  { value: "gold", label: "Ouro", description: "Resistência a Fogo. Sopro: Cone de 4,5m de fogo (Teste de DES).", damageType: "Fogo", breathWeaponDescription: "Cone de 4,5m (Teste de DES)" },
  { value: "green", label: "Verde", description: "Resistência a Veneno. Sopro: Cone de 4,5m de gás venenoso (Teste de CON).", damageType: "Veneno", breathWeaponDescription: "Cone de 4,5m (Teste de CON)" },
  { value: "red", label: "Vermelho", description: "Resistência a Fogo. Sopro: Cone de 4,5m de fogo (Teste de DES).", damageType: "Fogo", breathWeaponDescription: "Cone de 4,5m (Teste de DES)" },
  { value: "silver", label: "Prata", description: "Resistência a Frio. Sopro: Cone de 4,5m de frio (Teste de CON).", damageType: "Frio", breathWeaponDescription: "Cone de 4,5m (Teste de CON)" },
  { value: "white", label: "Branco", description: "Resistência a Frio. Sopro: Cone de 4,5m de frio (Teste de CON).", damageType: "Frio", breathWeaponDescription: "Cone de 4,5m (Teste de CON)" },
];
