
import { ClassFeatureDefinition, FeatureChoiceDefinition, WIZARD_ARCANE_TRADITION_CHOICES } from './types'; // Import WIZARD_ARCANE_TRADITION_CHOICES
import { FIGHTING_STYLE_OPTIONS } from './dndOptions';

// --- Ranger Feature Choices ---
const FAVORED_ENEMY_CHOICES: FeatureChoiceDefinition[] = [
  { value: "aberrations", label: "Aberrações" },
  { value: "beasts", label: "Bestas" },
  { value: "celestials", label: "Celestiais" },
  { value: "constructs", label: "Construtos" },
  { value: "dragons", label: "Dragões" },
  { value: "elementals", label: "Elementais" },
  { value: "fey", label: "Fadas (Fey)" },
  { value: "fiends", label: "Infernais (Fiends)" },
  { value: "giants", label: "Gigantes" },
  { value: "monstrosities", label: "Monstruosidades" },
  { value: "oozes", label: "Limos (Oozes)" },
  { value: "plants", label: "Plantas" },
  { value: "undead", label: "Mortos-Vivos" },
];

const NATURAL_EXPLORER_TERRAIN_CHOICES: FeatureChoiceDefinition[] = [
  { value: "arctic", label: "Ártico" },
  { value: "coast", label: "Costa" },
  { value: "desert", label: "Deserto" },
  { value: "forest", label: "Floresta" },
  { value: "grassland", label: "Pradaria" },
  { value: "mountain", label: "Montanha" },
  { value: "swamp", label: "Pântano" },
  { value: "underdark", label: "Subterrâneo (Underdark)" },
];

const RANGER_CONCLAVE_CHOICES: FeatureChoiceDefinition[] = [
    { value: "hunter", label: "Caçador (Hunter Conclave)", description: "Este arquétipo se concentra em caçar ameaças que variam de feras furiosas e monstros horríveis a tiranos e vilões." },
    { value: "beast_master", label: "Mestre das Feras (Beast Master Conclave)", description: "Este arquétipo incorpora uma profunda conexão com o mundo natural, manifestada através de um companheiro animal." },
];

// --- Ranger Feature Definitions ---
export const RANGER_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [
  {
    id: "ranger_favored_enemy_1", level: 1, name: "Inimigo Favorito (1º tipo)",
    description: "Você tem experiência significativa estudando, rastreando e caçando um certo tipo de inimigo. Escolha um tipo de inimigo favorito. Você tem vantagem em testes de Sabedoria (Sobrevivência) para rastrear seus inimigos favoritos, bem como em testes de Inteligência para recordar informações sobre eles. Ao ganhar esta característica, você também aprende um idioma à sua escolha que é falado por seus inimigos favoritos, se eles falarem algum (anote o idioma em 'Habilidades').",
    type: 'choice', selectionPrompt: "Escolha seu primeiro Inimigo Favorito:",
    choices: FAVORED_ENEMY_CHOICES, maxChoices: 1,
  },
  {
    id: "ranger_natural_explorer_1", level: 1, name: "Explorador Natural (1º terreno)",
    description: "Você é um mestre em navegar pelo mundo natural. Escolha um tipo de terreno favorito. Ao fazer um teste de Inteligência ou Sabedoria relacionado ao seu terreno favorito, seu bônus de proficiência é dobrado se você estiver usando uma perícia na qual é proficiente. Enquanto viaja por uma hora ou mais em seu terreno favorito, você ganha benefícios como: terreno difícil não atrasa seu grupo, seu grupo não pode se perder (exceto magicamente), permanece alerta, encontra mais comida e rastreia melhor.",
    type: 'choice', selectionPrompt: "Escolha seu primeiro Terreno Favorito:",
    choices: NATURAL_EXPLORER_TERRAIN_CHOICES, maxChoices: 1,
  },
  {
    id: "ranger_fighting_style", level: 2, name: "Estilo de Luta",
    description: "No 2º nível, você adota um estilo particular de luta como sua especialidade.",
    type: 'choice', selectionPrompt: "Escolha um Estilo de Luta:",
    choices: FIGHTING_STYLE_OPTIONS.filter(opt => opt.name !== "").map(opt => ({value: opt.name, label: opt.name, description: opt.description})),
    maxChoices: 1,
  },
  {
    id: "ranger_spellcasting", level: 2, name: "Conjuração",
    description: "No 2º nível, você aprende a usar a essência mágica da natureza para conjurar magias de patrulheiro.",
    type: 'auto',
  },
  {
    id: "ranger_conclave", level: 3, name: "Conclave de Patrulheiro",
    description: "No 3º nível, você escolhe um arquétipo que se esforça para emular.",
    type: 'choice', selectionPrompt: "Escolha seu Conclave de Patrulheiro:",
    choices: RANGER_CONCLAVE_CHOICES, maxChoices: 1,
  },
  {
    id: "ranger_primeval_awareness", level: 3, name: "Consciência Primitiva",
    description: "A partir do 3º nível, você pode usar sua ação e gastar um espaço de magia para sentir a presença de certos tipos de criaturas (aberrações, celestiais, dragões, elementais, fadas, infernais, mortos-vivos) a até 1,5 km (ou 9 km em terreno favorito). Não revela localização ou número.",
    type: 'auto',
  },
  {
    id: "ranger_asi_4", level: 4, name: "Incremento no Valor de Habilidade (Nível 4)",
    description: "Você pode aumentar um valor de habilidade à sua escolha em 2, ou pode aumentar dois valores de habilidade à sua escolha em 1. Você não pode aumentar um valor de habilidade acima de 20 usando esta característica. (Ajuste seus atributos diretamente na seção de Atributos).",
    type: 'asi',
  },
  {
    id: "ranger_conclave_feature_5", level: 5, name: "Característica de Conclave de Patrulheiro (Nível 5)",
    description: "Você ganha uma característica determinada pelo seu Conclave de Patrulheiro escolhido. (Consulte a descrição do seu conclave para detalhes e adicione às Habilidades se necessário).",
    type: 'auto', 
  },
   {
    id: "ranger_extra_attack", level: 5, name: "Ataque Extra",
    description: "A partir do 5° nível, você pode atacar duas vezes, ao invés de uma, sempre que você usar a ação de Ataque no seu turno.",
    type: 'auto',
  },
  {
    id: "ranger_favored_enemy_6", level: 6, name: "Inimigo Favorito (2º tipo)",
    description: "No 6º nível, você escolhe um tipo adicional de inimigo favorito. Os benefícios para este novo tipo são os mesmos do seu primeiro inimigo favorito. Você também aprende um idioma adicional falado por este inimigo (anote o idioma em 'Habilidades').",
    type: 'choice', selectionPrompt: "Escolha seu segundo Inimigo Favorito:",
    choices: FAVORED_ENEMY_CHOICES, maxChoices: 1,
  },
  {
    id: "ranger_natural_explorer_6", level: 6, name: "Explorador Natural (2º terreno)",
    description: "No 6º nível, você escolhe um tipo de terreno favorito adicional. Você ganha os benefícios de Explorador Natural para este novo terreno. Além disso, enquanto estiver em qualquer um de seus terrenos favoritos, você ganha vantagem em jogadas de iniciativa e, no seu primeiro turno durante o combate, você tem vantagem nas jogadas de ataque contra criaturas que ainda não agiram.",
    type: 'choice', selectionPrompt: "Escolha seu segundo Terreno Favorito:",
    choices: NATURAL_EXPLORER_TERRAIN_CHOICES, maxChoices: 1,
  },
  {
    id: "ranger_conclave_feature_7", level: 7, name: "Característica de Conclave de Patrulheiro (Nível 7)",
    description: "Você ganha uma característica determinada pelo seu Conclave de Patrulheiro escolhido.",
    type: 'auto',
  },
  {
    id: "ranger_asi_8", level: 8, name: "Incremento no Valor de Habilidade (Nível 8)",
    description: "Aumente seus atributos conforme descrito na característica de Nível 4.",
    type: 'asi',
  },
  {
    id: "ranger_land_stride", level: 8, name: "Pés Rápidos (Land's Stride)",
    description: "A partir do 8° nível, mover-se através de terreno difícil não-mágico não te custa movimento extra. Você também pode passar através de plantas não-mágicas sem ser atrasado por elas e sem sofrer dano delas se elas tiverem espinhos, espinhos ou um perigo similar. Além disso, você tem vantagem em testes de resistência contra plantas que são criadas magicamente ou manipuladas para impedir o movimento, como aquelas criadas pela magia constrição.",
    type: 'auto',
  },
  {
    id: "ranger_natural_explorer_10", level: 10, name: "Explorador Natural (3º terreno)",
    description: "No 10º nível, você escolhe um tipo de terreno favorito adicional e ganha os benefícios associados.",
    type: 'choice', selectionPrompt: "Escolha seu terceiro Terreno Favorito:",
    choices: NATURAL_EXPLORER_TERRAIN_CHOICES, maxChoices: 1,
  },
  {
    id: "ranger_hide_in_plain_sight", level: 10, name: "Mimetismo (Hide in Plain Sight)",
    description: "A partir do 10° nível, você pode passar 1 minuto criando uma camuflagem para si mesmo. Você deve ter acesso a lama fresca, sujeira, plantas, fuligem e outros materiais de ocorrência natural com os quais criar sua camuflagem. Uma vez que você esteja camuflado desta forma, você pode tentar se esconder ficando pressionado contra uma superfície sólida, como uma árvore ou parede, que seja pelo menos tão alta e larga quanto você. Você ganha +10 de bônus em testes de Destreza (Furtividade) enquanto permanecer parado sem se mover ou realizar ações. Uma vez que você se move ou realiza uma ação ou reação, você deve se camuflar novamente para ganhar este benefício.",
    type: 'auto',
  },
  {
    id: "ranger_conclave_feature_11", level: 11, name: "Característica de Conclave de Patrulheiro (Nível 11)",
    description: "Você ganha uma característica determinada pelo seu Conclave de Patrulheiro escolhido.",
    type: 'auto',
  },
  {
    id: "ranger_asi_12", level: 12, name: "Incremento no Valor de Habilidade (Nível 12)",
    description: "Aumente seus atributos conforme descrito na característica de Nível 4.",
    type: 'asi',
  },
  {
    id: "ranger_favored_enemy_14", level: 14, name: "Inimigo Favorito (3º tipo)",
    description: "No 14º nível, você escolhe um terceiro tipo de inimigo favorito e ganha os benefícios e idioma associados.",
    type: 'choice', selectionPrompt: "Escolha seu terceiro Inimigo Favorito:",
    choices: FAVORED_ENEMY_CHOICES, maxChoices: 1,
  },
  {
    id: "ranger_vanish", level: 14, name: "Desaparecer (Vanish)",
    description: "A partir do 14° nível, você pode usar a ação de Esconder-se como uma ação bônus no seu turno. Além disso, você não pode ser rastreado por meios não-mágicos, a menos que você escolha deixar um rastro.",
    type: 'auto',
  },
  {
    id: "ranger_conclave_feature_15", level: 15, name: "Característica de Conclave de Patrulheiro (Nível 15)",
    description: "Você ganha uma característica determinada pelo seu Conclave de Patrulheiro escolhido.",
    type: 'auto',
  },
  {
    id: "ranger_asi_16", level: 16, name: "Incremento no Valor de Habilidade (Nível 16)",
    description: "Aumente seus atributos conforme descrito na característica de Nível 4.",
    type: 'asi',
  },
  {
    id: "ranger_feral_senses", level: 18, name: "Sentidos Selvagens (Feral Senses)",
    description: "No 18° nível, você ganha sentidos preternaturais que te ajudam a lutar contra criaturas que você não pode ver. Quando você atacar uma criatura que você não pode ver, sua incapacidade de ver não impõe desvantagem em suas jogadas de ataque contra ela. Você também está ciente da localização de qualquer criatura invisível a até 9 metros de você, desde que a criatura não esteja escondida de você e você não esteja cego ou surdo.",
    type: 'auto',
  },
  {
    id: "ranger_asi_19", level: 19, name: "Incremento no Valor de Habilidade (Nível 19)",
    description: "Aumente seus atributos conforme descrito na característica de Nível 4.",
    type: 'asi',
  },
  {
    id: "ranger_foe_slayer_20", level: 20, name: "Matador de Inimigos (Foe Slayer)",
    description: "No 20º nível, você se torna um caçador incomparável. Uma vez em cada um de seus turnos, você pode adicionar seu modificador de Sabedoria à jogada de ataque ou à jogada de dano de um ataque que você fizer contra um de seus inimigos favoritos. Você pode escolher usar esta característica antes ou depois da jogada, mas antes que quaisquer efeitos da jogada sejam aplicados.",
    type: 'auto',
  },
];

// --- Wizard Feature Definitions ---
export const WIZARD_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [
  {
    id: "wizard_spellcasting", level: 1, name: "Conjuração (Mago)",
    description: "Como um estudante da magia arcana, você possui um grimório contendo magias que mostram os primeiros vislumbres do seu verdadeiro poder. Você conhece seis magias de 1º nível à sua escolha da lista de magias de mago (selecione-as na seção de Magia). Inteligência é sua habilidade de conjuração.",
    type: 'auto',
  },
  {
    id: "wizard_arcane_recovery", level: 1, name: "Recuperação Arcana",
    description: "Você aprendeu a recuperar parte de suas energias mágicas com um breve estudo de seu grimório. Uma vez por dia, quando você terminar um descanso curto, você pode escolher espaços de magia gastos para recuperar. Os espaços de magia podem ter um nível combinado igual ou inferior à metade do seu nível de mago (arredondado para cima), e nenhum dos espaços pode ser de 6º nível ou superior.",
    type: 'auto',
  },
  {
    id: "wizard_arcane_tradition", level: 2, name: "Tradição Arcana",
    description: "Quando você alcança o 2º nível, você escolhe uma tradição arcana, moldando sua prática de magia através de uma das oito escolas: Abjuração, Conjuração, Adivinhação, Encantamento, Evocação, Ilusão, Necromancia ou Transmutação.",
    type: 'choice', selectionPrompt: "Escolha sua Tradição Arcana:",
    choices: WIZARD_ARCANE_TRADITION_CHOICES, // Defined in types.ts or here
    maxChoices: 1,
  },
  {
    id: "wizard_tradition_feature_2", level: 2, name: "Característica de Tradição Arcana (Nível 2)",
    description: "Você ganha uma característica determinada pela sua Tradição Arcana escolhida.",
    type: 'auto', // Specifics depend on chosen tradition
  },
  // Level 3: Spell slot progression
  {
    id: "wizard_asi_4", level: 4, name: "Incremento no Valor de Habilidade (Nível 4)",
    description: "Você pode aumentar um valor de habilidade à sua escolha em 2, ou pode aumentar dois valores de habilidade à sua escolha em 1. Como sempre, você não pode aumentar um valor de habilidade acima de 20 usando esta característica.",
    type: 'asi',
  },
  // Level 5: Spell slot progression (3rd level spells)
  {
    id: "wizard_tradition_feature_6", level: 6, name: "Característica de Tradição Arcana (Nível 6)",
    description: "Você ganha uma característica determinada pela sua Tradição Arcana escolhida.",
    type: 'auto',
  },
  // ... continue for other wizard levels and features
  {
    id: "wizard_asi_8", level: 8, name: "Incremento no Valor de Habilidade (Nível 8)",
    description: "Aumente seus atributos conforme descrito na característica de Nível 4.",
    type: 'asi',
  },
  {
    id: "wizard_tradition_feature_10", level: 10, name: "Característica de Tradição Arcana (Nível 10)",
    description: "Você ganha uma característica determinada pela sua Tradição Arcana escolhida.",
    type: 'auto',
  },
  {
    id: "wizard_tradition_feature_14", level: 14, name: "Característica de Tradição Arcana (Nível 14)",
    description: "Você ganha uma característica determinada pela sua Tradição Arcana escolhida.",
    type: 'auto',
  },
  {
    id: "wizard_spell_mastery", level: 18, name: "Maestria em Magia",
    description: "No 18º nível, você alcançou tal maestria sobre certas magias que pode conjurá-las à vontade. Escolha uma magia de mago de 1º nível e uma magia de mago de 2º nível que estejam em seu grimório. Você pode conjurar essas magias em seu nível mais baixo sem gastar um espaço de magia quando as tiver preparadas. Se você quiser conjurar qualquer uma delas em um nível superior, você deve gastar um espaço de magia como normal. Usando 8 horas de estudo, você pode trocar uma ou ambas as magias que escolheu por outras magias dos mesmos níveis.",
    type: 'auto', // Choice is complex, user notes for now.
  },
  {
    id: "wizard_signature_spells", level: 20, name: "Magias de Assinatura",
    description: "Quando você alcança o 20º nível, você ganha maestria sobre duas magias poderosas e pode conjurá-las com pouco esforço. Escolha duas magias de mago de 3º nível em seu grimório como suas magias de assinatura. Você sempre tem essas magias preparadas, elas não contam para o número de magias que você pode preparar, e você pode conjurar cada uma delas uma vez no 3º nível sem gastar um espaço de magia. Quando o fizer, você não poderá fazê-lo novamente até terminar um descanso curto ou longo. Se você quiser conjurar qualquer uma dessas magias em um nível superior, você deve gastar um espaço de magia como normal.",
    type: 'auto', // Choice is complex, user notes for now.
  },
];


// --- Placeholder Feature Definitions for Other Classes ---
export const BARBARIAN_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [];
export const BARD_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [];
export const CLERIC_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [];
export const DRUID_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [];
export const FIGHTER_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [];
export const MONK_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [];
export const PALADIN_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [];
export const ROGUE_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [];
export const SORCERER_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [];
export const WARLOCK_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [];


// --- Master List of All Class Features ---
export const ALL_CLASS_FEATURES_MAP: Record<string, ClassFeatureDefinition[]> = {
  "Patrulheiro": RANGER_FEATURES_DEFINITIONS,
  "Mago": WIZARD_FEATURES_DEFINITIONS,
  "Bárbaro": BARBARIAN_FEATURES_DEFINITIONS,
  "Bardo": BARD_FEATURES_DEFINITIONS,
  "Clérigo": CLERIC_FEATURES_DEFINITIONS,
  "Druida": DRUID_FEATURES_DEFINITIONS,
  "Guerreiro": FIGHTER_FEATURES_DEFINITIONS,
  "Monge": MONK_FEATURES_DEFINITIONS,
  "Paladino": PALADIN_FEATURES_DEFINITIONS,
  "Ladino": ROGUE_FEATURES_DEFINITIONS,
  "Feiticeiro": SORCERER_FEATURES_DEFINITIONS,
  "Bruxo": WARLOCK_FEATURES_DEFINITIONS,
};
