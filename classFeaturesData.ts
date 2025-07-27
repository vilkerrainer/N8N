import { ClassFeatureDefinition, FeatureChoiceDefinition, WIZARD_ARCANE_TRADITION_CHOICES, FIGHTER_MARTIAL_ARCHETYPE_CHOICES, BARBARIAN_PRIMAL_PATH_CHOICES, BARD_COLLEGE_CHOICES, CLERIC_DOMAIN_CHOICES, WARLOCK_PATRON_CHOICES, WARLOCK_PACT_BOON_CHOICES, WARLOCK_INVOCATION_CHOICES, DRUID_CIRCLE_CHOICES, SORCERER_ORIGIN_CHOICES, METAMAGIC_OPTIONS_CHOICES, PALADIN_OATH_CHOICES, ROGUE_ARCHETYPE_CHOICES, MONK_MONASTIC_TRADITION_CHOICES, DRAGON_ANCESTRY_CHOICES } from './types';
import { FIGHTING_STYLE_OPTIONS } from './dndOptions';

// --- Ranger Feature Choices ---
const FAVORED_ENEMY_CHOICES: FeatureChoiceDefinition[] = [
  { value: "aberrations", label: "Aberrações" }, { value: "beasts", label: "Bestas" },
  { value: "celestials", label: "Celestiais" }, { value: "constructs", label: "Construtos" },
  { value: "dragons", label: "Dragões" }, { value: "elementals", label: "Elementais" },
  { value: "fey", label: "Fadas (Fey)" }, { value: "fiends", label: "Infernais (Fiends)" },
  { value: "giants", label: "Gigantes" }, { value: "monstrosities", label: "Monstruosidades" },
  { value: "oozes", label: "Limos (Oozes)" }, { value: "plants", label: "Plantas" },
  { value: "undead", label: "Mortos-Vivos" },
];

const NATURAL_EXPLORER_TERRAIN_CHOICES: FeatureChoiceDefinition[] = [
  { value: "arctic", label: "Ártico" }, { value: "coast", label: "Costa" },
  { value: "desert", label: "Deserto" }, { value: "forest", label: "Floresta" },
  { value: "grassland", label: "Pradaria" }, { value: "mountain", label: "Montanha" },
  { value: "swamp", label: "Pântano" }, { value: "underdark", label: "Subterrâneo (Underdark)" },
];

const RANGER_CONCLAVE_CHOICES: FeatureChoiceDefinition[] = [
    { value: "hunter", label: "Caçador (Hunter Conclave)", description: "Este arquétipo se concentra em caçar ameaças que variam de feras furiosas e monstros horríveis a tiranos e vilões." },
    { value: "beast_master", label: "Mestre das Feras (Beast Master Conclave)", description: "Este arquétipo incorpora uma profunda conexão com o mundo natural, manifestada através de um companheiro animal." },
];

// --- Subclass Specific Choices (Ranger Hunter) ---
const HUNTER_PREY_CHOICES: FeatureChoiceDefinition[] = [
    { value: "colossus_slayer", label: "Abatedor de Colossos", description: "Sua tenacidade pode abater os inimigos mais potentes. Quando você atinge uma criatura com um ataque com arma, a criatura sofre 1d8 de dano extra se estiver abaixo de seu máximo de pontos de vida. Você pode causar esse dano extra apenas uma vez por turno.", damage: "1d8 uma vez por turno" },
    { value: "giant_killer", label: "Matador de Gigantes", description: "Quando uma criatura Grande ou maior, a 1,5 metro de você, atinge ou erra você com um ataque, você pode usar sua reação para atacar aquela criatura imediatamente após seu ataque, desde que você possa ver a criatura." },
    { value: "horde_breaker", label: "Quebrador de Horda", description: "Uma vez em cada um de seus turnos, quando você fizer um ataque com arma, você pode fazer outro ataque com a mesma arma contra uma criatura diferente que esteja a 1,5 metro do alvo original e dentro do alcance de sua arma." },
];

const DEFENSIVE_TACTICS_CHOICES: FeatureChoiceDefinition[] = [
    { value: "escape_the_horde", label: "Fuga da Horda", description: "Ataques de oportunidade feitos contra você têm desvantagem." },
    { value: "multiattack_defense", label: "Defesa contra Ataques Múltiplos", description: "Quando uma criatura atinge você com um ataque, você ganha +4 de bônus na CA contra todos os ataques subsequentes feitos pela mesma criatura pelo resto do turno." },
    { value: "steel_will", label: "Vontade de Aço", description: "Você tem vantagem em testes de resistência para não ser amedrontado." },
];

const MULTIATTACK_CHOICES: FeatureChoiceDefinition[] = [
    { value: "volley", label: "Saraivada (Volley)", description: "Você pode usar sua ação para fazer um ataque à distância contra qualquer número de criaturas a até 3 metros de um ponto que você possa ver dentro do alcance da sua arma. Você deve ter munição para cada alvo, como de costume, e você faz uma jogada de ataque separada para cada alvo." },
    { value: "whirlwind_attack", label: "Ataque Redemoinho", description: "Você pode usar sua ação para fazer um ataque corpo-a-corpo contra qualquer número de criaturas a 1,5 metro de você, com uma jogada de ataque separada para cada alvo." },
];

const SUPERIOR_HUNTERS_DEFENSE_CHOICES: FeatureChoiceDefinition[] = [
    { value: "evasion", label: "Evasão", description: "Quando você está sujeito a um efeito que permite fazer um teste de resistência de Destreza para sofrer apenas metade do dano, você, em vez disso, não sofre dano se for bem-sucedido no teste de resistência e apenas metade do dano se falhar." },
    { value: "stand_against_the_tide", label: "Resistir à Maré", description: "Quando uma criatura hostil erra você com um ataque corpo-a-corpo, você pode usar sua reação para forçar aquela criatura a repetir o mesmo ataque contra outra criatura (que não seja ela mesma) de sua escolha." },
    { value: "uncanny_dodge", label: "Esquiva Sobrenatural", description: "Quando um atacante que você pode ver atinge você com um ataque, você pode usar sua reação para reduzir pela metade o dano do ataque contra você." },
];


// --- Subclass Specific Choices (Fighter Battle Master) ---
const BATTLE_MASTER_MANEUVER_CHOICES: FeatureChoiceDefinition[] = [
    { value: "ambush", label: "Emboscada", description: "Quando você faz um teste de Destreza (Furtividade) ou uma jogada de iniciativa, você pode gastar um dado de superioridade para adicionar o dado à rolagem." },
    { value: "commanders_strike", label: "Golpe do Comandante", description: "Quando você realiza a ação de Ataque no seu turno, você pode renunciar a um de seus ataques e usar sua ação bônus para direcionar um de seus companheiros a atacar. Quando você faz isso, escolha uma criatura amigável que possa ver ou ouvir você, e gaste um dado de superioridade. Aquela criatura pode usar imediatamente sua reação para fazer um ataque com arma, adicionando o dado de superioridade à jogada de dano do ataque." },
    { value: "disarming_attack", label: "Ataque de Desarme", description: "Quando você atinge uma criatura com um ataque de arma, você pode gastar um dado de superioridade para tentar desarmar o alvo, forçando-o a soltar um item de sua escolha que esteja segurando. Você adiciona o dado de superioridade à jogada de dano do ataque, e o alvo deve fazer um teste de resistência de Força. Em uma falha, ele solta o objeto de sua escolha. O objeto cai a seus pés." },
    { value: "distracting_strike", label: "Ataque de Distração", description: "Quando você atinge uma criatura com um ataque de arma, você pode gastar um dado de superioridade para distrair a criatura, abrindo uma brecha para seus aliados. Você adiciona o dado de superioridade à jogada de dano do ataque. A próxima jogada de ataque contra o alvo por um atacante que não seja você tem vantagem se o ataque for feito antes do início do seu próximo turno." },
    { value: "evasive_footwork", label: "Trabalho de Pés Evasivo", description: "Quando você se move, você pode gastar um dado de superioridade, rolando o dado e adicionando o número rolado à sua CA até que você pare de se mover." },
    { value: "feinting_attack", label: "Ataque de Finta", description: "Você pode gastar um dado de superioridade e usar uma ação bônus em seu turno para fintar, escolhendo uma criatura a 1,5 metro de você como seu alvo. Você tem vantagem em sua próxima jogada de ataque contra aquela criatura. Se aquele ataque acertar, adicione o dado de superioridade à jogada de dano do ataque." },
    { value: "goading_attack", label: "Ataque Provocador", description: "Quando você atinge uma criatura com um ataque de arma, você pode gastar um dado de superioridade para tentar provocar o alvo a atacá-lo. Você adiciona o dado de superioridade à jogada de dano do ataque, e o alvo deve fazer um teste de resistência de Sabedoria. Em uma falha, o alvo tem desvantagem em todas as jogadas de ataque contra alvos que não sejam você até o final do seu próximo turno." },
    { value: "lunging_attack", label: "Ataque de Estocada", description: "Quando você faz um ataque corpo a corpo em seu turno, você pode gastar um dado de superioridade para aumentar seu alcance para aquele ataque em 1,5 metro. Se você acertar, você adiciona o dado de superioridade à jogada de dano do ataque." },
    { value: "maneuvering_attack", label: "Ataque de Manobra", description: "Quando você atinge uma criatura com um ataque de arma, você pode gastar um dado de superioridade para manobrar um de seus companheiros para uma posição mais vantajosa. Você adiciona o dado de superioridade à jogada de dano do ataque, e você escolhe uma criatura amigável que possa ver ou ouvir você. Aquela criatura pode usar sua reação para se mover até metade de seu deslocamento sem provocar ataques de oportunidade do alvo do seu ataque." },
    { value: "parry", label: "Aparar", description: "Quando outra criatura o danifica com um ataque corpo a corpo, você pode usar sua reação e gastar um dado de superioridade para reduzir o dano pelo número que você rolar em seu dado de superioridade + seu modificador de Destreza." },
    { value: "precision_attack", label: "Ataque de Precisão", description: "Quando você faz uma jogada de ataque de arma contra uma criatura, você pode gastar um dado de superioridade para adicioná-lo à rolagem. Você pode usar esta manobra antes ou depois de fazer a jogada de ataque, mas antes de quaisquer efeitos do ataque serem aplicados." },
    { value: "pushing_attack", label: "Ataque de Empurrão", description: "Quando você atinge uma criatura com um ataque de arma, você pode gastar um dado de superioridade para tentar empurrar o alvo para longe. Você adiciona o dado de superioridade à jogada de dano do ataque, e se o alvo for Grande ou menor, ele deve fazer um teste de resistência de Força. Em uma falha, você empurra o alvo até 4,5 metros para longe de você." },
    { value: "rally", label: "Incentivar", description: "Em seu turno, você pode usar uma ação bônus e gastar um dado de superioridade para encorajar um de seus companheiros. Quando você o faz, escolha uma criatura amigável que possa ver ou ouvir você. Aquela criatura ganha pontos de vida temporários iguais à rolagem do dado de superioridade + seu modificador de Carisma." },
    { value: "riposte", label: "Ripostar", description: "Quando uma criatura erra você com um ataque corpo a corpo, você pode usar sua reação e gastar um dado de superioridade para fazer um ataque de arma corpo a corpo contra a criatura. Se você acertar, você adiciona o dado de superioridade à jogada de dano do ataque." },
    { value: "sweeping_attack", label: "Ataque Amplo", description: "Quando você atinge uma criatura com um ataque de arma corpo a corpo, você pode gastar um dado de superioridade para tentar danificar outra criatura com o mesmo ataque. Escolha outra criatura a 1,5 metro do alvo original e dentro do seu alcance. Se a jogada de ataque original acertaria a segunda criatura, ela sofre dano igual ao número que você rolar em seu dado de superioridade. O tipo de dano é o mesmo do ataque original." },
    { value: "trip_attack", label: "Ataque de Derrubada", description: "Quando você atinge uma criatura com um ataque de arma, você pode gastar um dado de superioridade para tentar derrubar o alvo. Você adiciona o dado de superioridade à jogada de dano do ataque, e se o alvo for Grande ou menor, ele deve fazer um teste de resistência de Força. Em uma falha, ele é derrubado (fica caído)." },
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
    id: "ranger_fighting_style", level: 2, name: "Estilo de Luta (Patrulheiro)",
    description: "No 2º nível, você adota um estilo particular de luta como sua especialidade.",
    type: 'choice', selectionPrompt: "Escolha um Estilo de Luta:",
    choices: FIGHTING_STYLE_OPTIONS.filter(opt => opt.name !== "").map(opt => ({value: opt.name, label: opt.name, description: opt.description})),
    maxChoices: 1,
  },
  {
    id: "ranger_spellcasting", level: 2, name: "Conjuração (Patrulheiro)",
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
    id: "ranger_hunter_prey", level: 3, name: "Presa do Caçador",
    description: "Sua perícia em caça se manifesta de uma forma especializada. Escolha uma das seguintes opções.",
    type: 'choice', selectionPrompt: "Escolha sua tática de Presa do Caçador:",
    choices: HUNTER_PREY_CHOICES, maxChoices: 1,
    subclassPrerequisite: { featureId: 'ranger_conclave', choiceValue: 'hunter' }
  },
  {
    id: "ranger_beast_master_companion", level: 3, name: "Companheiro do Patrulheiro",
    description: "Você ganha um companheiro animal que o acompanha em suas aventuras e é treinado para lutar ao seu lado. (Detalhes específicos sobre o companheiro devem ser anotados separadamente).",
    type: 'auto',
    subclassPrerequisite: { featureId: 'ranger_conclave', choiceValue: 'beast_master' }
  },
  {
    id: "ranger_primeval_awareness", level: 3, name: "Consciência Primitiva",
    description: "A partir do 3º nível, você pode usar sua ação e gastar um espaço de magia para sentir a presença de certos tipos de criaturas (aberrações, celestiais, dragões, elementais, fadas, infernais, mortos-vivos) a até 1,5 km (ou 9 km em terreno favorito). Não revela localização ou número.",
    type: 'auto',
  },
  {
    id: "ranger_asi_4", level: 4, name: "Incremento no Valor de Habilidade (Patrulheiro Nível 4)",
    description: "Você pode aumentar um valor de habilidade à sua escolha em 2, ou pode aumentar dois valores de habilidade à sua escolha em 1. Você não pode aumentar um valor de habilidade acima de 20 usando esta característica.",
    type: 'asi',
  },
   {
    id: "ranger_extra_attack", level: 5, name: "Ataque Extra (Patrulheiro)",
    description: "A partir do 5° nível, você pode atacar duas vezes, ao invés de uma, sempre que você usar a ação de Ataque no seu turno.",
    type: 'auto',
  },
  {
    id: "ranger_favored_enemy_6", level: 6, name: "Inimigo Favorito (2º tipo)",
    description: "No 6º nível, você escolhe um tipo adicional de inimigo favorito. Os benefícios para este novo tipo são os mesmos do seu primeiro inimigo favorito. Você também aprende um idioma adicional falado por este inimigo.",
    type: 'choice', selectionPrompt: "Escolha seu segundo Inimigo Favorito:",
    choices: FAVORED_ENEMY_CHOICES, maxChoices: 1,
  },
  {
    id: "ranger_natural_explorer_6", level: 6, name: "Explorador Natural (2º terreno)",
    description: "No 6º nível, você escolhe um tipo de terreno favorito adicional. Você ganha os benefícios de Explorador Natural para este novo terreno.",
    type: 'choice', selectionPrompt: "Escolha seu segundo Terreno Favorito:",
    choices: NATURAL_EXPLORER_TERRAIN_CHOICES, maxChoices: 1,
  },
  {
    id: "ranger_hunter_defensive_tactics", level: 7, name: "Táticas Defensivas",
    description: "No 7º nível, você ganha uma das seguintes características de sua escolha.",
    type: 'choice', selectionPrompt: "Escolha sua Tática Defensiva:",
    choices: DEFENSIVE_TACTICS_CHOICES, maxChoices: 1,
    subclassPrerequisite: { featureId: 'ranger_conclave', choiceValue: 'hunter' }
  },
  {
    id: "ranger_beast_master_exceptional_training", level: 7, name: "Treinamento Excepcional",
    description: "No 7º nível, em qualquer um dos seus turnos em que seu companheiro animal não atacar, você pode usar uma ação bônus para comandar o companheiro a realizar a ação Ajudar, Correr, Desengajar ou Esquivar.",
    type: 'auto',
    subclassPrerequisite: { featureId: 'ranger_conclave', choiceValue: 'beast_master' }
  },
  {
    id: "ranger_asi_8", level: 8, name: "Incremento no Valor de Habilidade (Patrulheiro Nível 8)",
    description: "Aumente seus atributos conforme descrito na característica de Nível 4.",
    type: 'asi',
  },
  {
    id: "ranger_land_stride", level: 8, name: "Pés Rápidos (Land's Stride)",
    description: "A partir do 8° nível, mover-se através de terreno difícil não-mágico não te custa movimento extra. Você também pode passar através de plantas não-mágicas sem ser atrasado por elas e sem sofrer dano delas se elas tiverem espinhos, espinhos ou um perigo similar. Além disso, você tem vantagem em testes de resistência contra plantas que são criadas magicamente ou manipuladas para impedir o movimento.",
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
    id: "ranger_hunter_multiattack", level: 11, name: "Ataque Múltiplo",
    description: "No 11º nível, você ganha uma das seguintes características de sua escolha.",
    type: 'choice', selectionPrompt: "Escolha sua opção de Ataque Múltiplo:",
    choices: MULTIATTACK_CHOICES, maxChoices: 1,
    subclassPrerequisite: { featureId: 'ranger_conclave', choiceValue: 'hunter' }
  },
  {
    id: "ranger_beast_master_bestial_fury", level: 11, name: "Fúria Bestial",
    description: "A partir do 11º nível, seu companheiro animal pode fazer dois ataques quando você comanda que ele use a ação de Ataque.",
    type: 'auto',
    subclassPrerequisite: { featureId: 'ranger_conclave', choiceValue: 'beast_master' }
  },
  {
    id: "ranger_asi_12", level: 12, name: "Incremento no Valor de Habilidade (Patrulheiro Nível 12)",
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
    id: "ranger_hunter_superior_defense", level: 15, name: "Defesa Superior do Caçador",
    description: "No 15º nível, você ganha uma das seguintes características de sua escolha.",
    type: 'choice', selectionPrompt: "Escolha sua Defesa Superior:",
    choices: SUPERIOR_HUNTERS_DEFENSE_CHOICES, maxChoices: 1,
    subclassPrerequisite: { featureId: 'ranger_conclave', choiceValue: 'hunter' }
  },
  {
    id: "ranger_beast_master_share_spells", level: 15, name: "Compartilhar Magias",
    description: "A partir do 15º nível, quando você conjura uma magia que tem como alvo apenas você, você também pode fazer com que a magia afete seu companheiro animal se o companheiro estiver a até 9 metros de você.",
    type: 'auto',
    subclassPrerequisite: { featureId: 'ranger_conclave', choiceValue: 'beast_master' }
  },
  {
    id: "ranger_asi_16", level: 16, name: "Incremento no Valor de Habilidade (Patrulheiro Nível 16)",
    description: "Aumente seus atributos conforme descrito na característica de Nível 4.",
    type: 'asi',
  },
  {
    id: "ranger_feral_senses", level: 18, name: "Sentidos Selvagens (Feral Senses)",
    description: "No 18° nível, você ganha sentidos preternaturais que te ajudam a lutar contra criaturas que você não pode ver. Quando você atacar uma criatura que você não pode ver, sua incapacidade de ver não impõe desvantagem em suas jogadas de ataque contra ela. Você também está ciente da localização de qualquer criatura invisível a até 9 metros de você, desde que a criatura não esteja escondida de você e você não esteja cego ou surdo.",
    type: 'auto',
  },
  {
    id: "ranger_asi_19", level: 19, name: "Incremento no Valor de Habilidade (Patrulheiro Nível 19)",
    description: "Aumente seus atributos conforme descrito na característica de Nível 4.",
    type: 'asi',
  },
  {
    id: "ranger_foe_slayer_20", level: 20, name: "Matador de Inimigos (Foe Slayer)",
    description: "No 20º nível, você se torna um caçador incomparável. Uma vez em cada um de seus turnos, você pode adicionar seu modificador de Sabedoria à jogada de ataque ou à jogada de dano de um ataque que você fizer contra um de seus inimigos favoritos. Você pode escolher usar esta característica antes ou depois da jogada, mas antes que quaisquer efeitos da jogada sejam aplicados.",
    type: 'auto',
  },
];

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
    choices: WIZARD_ARCANE_TRADITION_CHOICES,
    maxChoices: 1,
  },
  {
    id: "wizard_tradition_feature_2", level: 2, name: "Característica de Tradição Arcana (Nível 2)",
    description: "Você ganha uma característica determinada pela sua Tradição Arcana escolhida. (Ex: Evocação - Esculpir Magias; Abjuração - Pupilo da Abjuração).",
    type: 'auto', 
  },
  {
    id: "wizard_asi_4", level: 4, name: "Incremento no Valor de Habilidade (Mago Nível 4)",
    description: "Você pode aumentar um valor de habilidade à sua escolha em 2, ou pode aumentar dois valores de habilidade à sua escolha em 1. Como sempre, você não pode aumentar um valor de habilidade acima de 20 usando esta característica.",
    type: 'asi',
  },
  {
    id: "wizard_tradition_feature_6", level: 6, name: "Característica de Tradição Arcana (Nível 6)",
    description: "Você ganha uma característica determinada pela sua Tradição Arcana escolhida.",
    type: 'auto',
  },
  {
    id: "wizard_asi_8", level: 8, name: "Incremento no Valor de Habilidade (Mago Nível 8)",
    description: "Aumente seus atributos conforme descrito na característica de Nível 4.",
    type: 'asi',
  },
  {
    id: "wizard_tradition_feature_10", level: 10, name: "Característica de Tradição Arcana (Nível 10)",
    description: "Você ganha uma característica determinada pela sua Tradição Arcana escolhida.",
    type: 'auto',
  },
   {
    id: "wizard_asi_12", level: 12, name: "Incremento no Valor de Habilidade (Mago Nível 12)",
    description: "Aumente seus atributos conforme descrito na característica de Nível 4.",
    type: 'asi',
  },
  {
    id: "wizard_tradition_feature_14", level: 14, name: "Característica de Tradição Arcana (Nível 14)",
    description: "Você ganha uma característica determinada pela sua Tradição Arcana escolhida.",
    type: 'auto',
  },
   {
    id: "wizard_asi_16", level: 16, name: "Incremento no Valor de Habilidade (Mago Nível 16)",
    description: "Aumente seus atributos conforme descrito na característica de Nível 4.",
    type: 'asi',
  },
  {
    id: "wizard_spell_mastery", level: 18, name: "Dominar Magia",
    description: "No 18º nível, você alcançou tal maestria sobre certas magias que pode conjurá-las à vontade. Escolha uma magia de mago de 1º nível e uma magia de mago de 2º nível que estejam em seu grimório. Você pode conjurar essas magias em seu nível mais baixo sem gastar um espaço de magia quando as tiver preparadas. Se você quiser conjurar qualquer uma delas em um nível superior, você deve gastar um espaço de magia como normal. Usando 8 horas de estudo, você pode trocar uma ou ambas as magias que escolheu por outras magias dos mesmos níveis.",
    type: 'auto', 
  },
   {
    id: "wizard_asi_19", level: 19, name: "Incremento no Valor de Habilidade (Mago Nível 19)",
    description: "Aumente seus atributos conforme descrito na característica de Nível 4.",
    type: 'asi',
  },
  {
    id: "wizard_signature_spells", level: 20, name: "Magias de Assinatura",
    description: "Quando você alcança o 20º nível, você ganha maestria sobre duas magias poderosas e pode conjurá-las com pouco esforço. Escolha duas magias de mago de 3º nível em seu grimório como suas magias de assinatura. Você sempre tem essas magias preparadas, elas não contam para o número de magias que você pode preparar, e você pode conjurar cada uma delas uma vez no 3º nível sem gastar um espaço de magia. Quando o fizer, você não poderá fazê-lo novamente até terminar um descanso curto ou longo. Se você quiser conjurar qualquer uma dessas magias em um nível superior, você deve gastar um espaço de magia como normal.",
    type: 'auto', 
  },
];

export const FIGHTER_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [
  {
    id: "fighter_fighting_style", level: 1, name: "Estilo de Luta (Guerreiro)",
    description: "Você adota um estilo particular de luta como sua especialidade. Escolha uma das opções de Estilo de Luta. Você não pode escolher o mesmo Estilo de Luta mais de uma vez, mesmo que posteriormente possa escolher novamente.",
    type: 'choice', selectionPrompt: "Escolha seu Estilo de Luta:",
    choices: FIGHTING_STYLE_OPTIONS.filter(opt => opt.name !== "").map(opt => ({value: opt.name, label: opt.name, description: opt.description})),
    maxChoices: 1,
  },
  {
    id: "fighter_second_wind", level: 1, name: "Retomar o Fôlego",
    description: "Você tem um poço limitado de estamina que pode usar para se proteger de perigos. No seu turno, você pode usar uma ação bônus para recuperar pontos de vida iguais a 1d10 + seu nível de guerreiro. Uma vez que você usa esta característica, você precisa terminar um descanso curto ou longo para poder usá-la novamente.",
    type: 'auto',
  },
  {
    id: "fighter_action_surge_2", level: 2, name: "Surto de Ação (um uso)",
    description: "A partir do 2° nível, você pode forçar seus limites para além do normal por um momento. No seu turno, você pode realizar uma ação adicional além da sua ação regular e possível ação bônus. Uma vez que você usa esta característica, você deve terminar um descanso curto ou longo para usá-la novamente. A partir do 17° nível, você pode usá-la duas vezes antes de um descanso, mas apenas uma vez no mesmo turno.",
    type: 'auto',
  },
  {
    id: "fighter_martial_archetype", level: 3, name: "Arquétipo Marcial",
    description: "No 3° nível, você escolhe um arquétipo que se esforça para emular em seus estilos de combate e técnicas.",
    type: 'choice', selectionPrompt: "Escolha seu Arquétipo Marcial:",
    choices: FIGHTER_MARTIAL_ARCHETYPE_CHOICES,
    maxChoices: 1,
  },
  {
    id: "fighter_champion_improved_critical", level: 3, name: "Crítico Aprimorado",
    description: "Seus ataques com arma marcam um acerto crítico em uma rolagem de 19 ou 20.",
    type: 'auto',
    subclassPrerequisite: { featureId: 'fighter_martial_archetype', choiceValue: 'champion' }
  },
  {
    id: "fighter_battle_master_combat_superiority", level: 3, name: "Superioridade em Combate",
    description: "Você aprende manobras que são abastecidas por dados especiais chamados dados de superioridade. Você aprende três manobras de sua escolha. Muitas manobras aprimoram um ataque de alguma forma. Você pode usar apenas uma manobra por ataque. Você tem quatro dados de superioridade, que são d8s. Um dado de superioridade é gasto quando você o usa. Você recupera todos os seus dados de superioridade gastos quando termina um descanso curto ou longo.",
    type: 'choice', selectionPrompt: "Escolha 3 Manobras:",
    choices: BATTLE_MASTER_MANEUVER_CHOICES, maxChoices: 3,
    subclassPrerequisite: { featureId: 'fighter_martial_archetype', choiceValue: 'battle_master' }
  },
  {
    id: "fighter_battle_master_student_of_war", level: 3, name: "Estudante da Guerra",
    description: "Você ganha proficiência com um tipo de ferramenta de artesão de sua escolha.",
    type: 'auto',
    subclassPrerequisite: { featureId: 'fighter_martial_archetype', choiceValue: 'battle_master' }
  },
  {
    id: "fighter_eldritch_knight_spellcasting", level: 3, name: "Conjuração (Cavaleiro Arcano)",
    description: "Você aumenta sua proeza marcial com a capacidade de conjurar magias. Você aprende dois truques de sua escolha da lista de magias de mago. Você aprende três magias de 1º nível de sua escolha, duas das quais devem ser de escolas de abjuração ou evocação. Inteligência é sua habilidade de conjuração.",
    type: 'auto',
    subclassPrerequisite: { featureId: 'fighter_martial_archetype', choiceValue: 'eldritch_knight' }
  },
  {
    id: "fighter_eldritch_knight_weapon_bond", level: 3, name: "Vínculo com Arma",
    description: "Você aprende um ritual que cria um vínculo mágico entre você e uma arma. Você realiza o ritual ao longo de 1 hora, que pode ser feito durante um descanso curto. A arma deve estar ao seu alcance durante todo o ritual. Você pode ter até duas armas vinculadas. Se tentar vincular uma terceira arma, deve quebrar o vínculo com uma das outras duas. Enquanto sua arma vinculada estiver no mesmo plano de existência, você pode convocá-la como uma ação bônus em seu turno, fazendo-a se teleportar instantaneamente para sua mão.",
    type: 'auto',
    subclassPrerequisite: { featureId: 'fighter_martial_archetype', choiceValue: 'eldritch_knight' }
  },
  {
    id: "fighter_asi_4", level: 4, name: "Incremento no Valor de Habilidade (Guerreiro Nível 4)",
    description: "Aumente seus atributos.",
    type: 'asi',
  },
  {
    id: "fighter_extra_attack_5", level: 5, name: "Ataque Extra (1)",
    description: "A partir do 5° nível, você pode atacar duas vezes, ao invés de uma, sempre que você usar a ação de Ataque no seu turno.",
    type: 'auto',
  },
  {
    id: "fighter_asi_6", level: 6, name: "Incremento no Valor de Habilidade (Guerreiro Nível 6)",
    description: "Aumente seus atributos.",
    type: 'asi',
  },
  {
    id: "fighter_champion_remarkable_athlete", level: 7, name: "Atleta Notável",
    description: "Você pode adicionar metade do seu bônus de proficiência (arredondado para cima) a qualquer teste de Força, Destreza ou Constituição que ainda não use seu bônus de proficiência. Além disso, quando você faz um salto em distância correndo, a distância que você pode saltar aumenta em um número de pés igual ao seu modificador de Força.",
    type: 'auto',
    subclassPrerequisite: { featureId: 'fighter_martial_archetype', choiceValue: 'champion' }
  },
  {
    id: "fighter_battle_master_know_your_enemy", level: 7, name: "Conheça seu Inimigo",
    description: "Se você passar pelo menos 1 minuto observando ou interagindo com outra criatura fora de combate, você pode aprender certas informações sobre suas capacidades em comparação com as suas. O Mestre diz se a criatura é igual, superior ou inferior em relação a duas das seguintes características de sua escolha: Valor de Força, Valor de Destreza, Valor de Constituição, Classe de Armadura, Pontos de Vida Atuais, Nível de Classe Total (se houver), Níveis de classe de Guerreiro (se houver).",
    type: 'auto',
    subclassPrerequisite: { featureId: 'fighter_martial_archetype', choiceValue: 'battle_master' }
  },
   {
    id: "fighter_battle_master_maneuvers_7", level: 7, name: "Manobras Adicionais (Nível 7)",
    description: "Você aprende duas manobras adicionais de sua escolha, que não contam para o seu número de manobras conhecidas.",
    type: 'choice', selectionPrompt: "Escolha 2 Manobras Adicionais:",
    choices: BATTLE_MASTER_MANEUVER_CHOICES, maxChoices: 2,
    subclassPrerequisite: { featureId: 'fighter_martial_archetype', choiceValue: 'battle_master' }
  },
  {
    id: "fighter_eldritch_knight_war_magic", level: 7, name: "Magia de Guerra",
    description: "A partir do 7º nível, quando você usa sua ação para conjurar um truque, você pode fazer um ataque com arma como uma ação bônus.",
    type: 'auto',
    subclassPrerequisite: { featureId: 'fighter_martial_archetype', choiceValue: 'eldritch_knight' }
  },
  {
    id: "fighter_asi_8", level: 8, name: "Incremento no Valor de Habilidade (Guerreiro Nível 8)",
    description: "Aumente seus atributos.",
    type: 'asi',
  },
  {
    id: "fighter_indomitable_9", level: 9, name: "Indomável (um uso)",
    description: "A partir do 9° nível, você pode rolar novamente um teste de resistência que você falhou. Se o fizer, você deve usar a nova rolagem. Você não pode usar esta característica novamente até terminar um descanso longo. Você pode usar esta característica duas vezes entre descansos longos a partir do 13° nível e três vezes entre descansos longos a partir do 17° nível.",
    type: 'auto',
  },
  {
    id: "fighter_champion_additional_style", level: 10, name: "Estilo de Luta Adicional",
    description: "Você pode escolher uma segunda opção da característica Estilo de Luta.",
    type: 'choice', selectionPrompt: "Escolha seu Estilo de Luta Adicional:",
    choices: FIGHTING_STYLE_OPTIONS.filter(opt => opt.name !== "").map(opt => ({ value: opt.name, label: opt.name, description: opt.description })), maxChoices: 1,
    subclassPrerequisite: { featureId: 'fighter_martial_archetype', choiceValue: 'champion' }
  },
  {
    id: "fighter_battle_master_improved_superiority_d10", level: 10, name: "Superioridade em Combate Aprimorada (d10)",
    description: "Seus dados de superioridade tornam-se d10s. No 18º nível, eles se tornam d12s.",
    type: 'auto',
    subclassPrerequisite: { featureId: 'fighter_martial_archetype', choiceValue: 'battle_master' }
  },
  {
    id: "fighter_battle_master_maneuvers_10", level: 10, name: "Manobras Adicionais (Nível 10)",
    description: "Você aprende duas manobras adicionais de sua escolha.",
    type: 'choice', selectionPrompt: "Escolha 2 Manobras Adicionais:",
    choices: BATTLE_MASTER_MANEUVER_CHOICES, maxChoices: 2,
    subclassPrerequisite: { featureId: 'fighter_martial_archetype', choiceValue: 'battle_master' }
  },
  {
    id: "fighter_eldritch_knight_eldritch_strike", level: 10, name: "Golpe Arcano",
    description: "No 10º nível, você aprende como fazer seus ataques com arma enfraquecerem as defesas de uma criatura. Quando você atinge uma criatura com um ataque de arma, aquela criatura tem desvantagem no próximo teste de resistência que fizer contra uma magia que você conjurar antes do final do seu próximo turno.",
    type: 'auto',
    subclassPrerequisite: { featureId: 'fighter_martial_archetype', choiceValue: 'eldritch_knight' }
  },
  {
    id: "fighter_extra_attack_11", level: 11, name: "Ataque Extra (2)",
    description: "A partir do 11° nível, você pode atacar três vezes sempre que você usar a ação de Ataque no seu turno.",
    type: 'auto',
  },
  {
    id: "fighter_asi_12", level: 12, name: "Incremento no Valor de Habilidade (Guerreiro Nível 12)",
    description: "Aumente seus atributos.",
    type: 'asi',
  },
  {
    id: "fighter_indomitable_13", level: 13, name: "Indomável (dois usos)",
    description: "Você agora pode usar Indomável duas vezes entre descansos longos.",
    type: 'auto',
  },
  {
    id: "fighter_asi_14", level: 14, name: "Incremento no Valor de Habilidade (Guerreiro Nível 14)",
    description: "Aumente seus atributos.",
    type: 'asi',
  },
  {
    id: "fighter_champion_superior_critical", level: 15, name: "Crítico Superior",
    description: "Seus ataques com arma marcam um acerto crítico em uma rolagem de 18-20.",
    type: 'auto',
    subclassPrerequisite: { featureId: 'fighter_martial_archetype', choiceValue: 'champion' }
  },
  {
    id: "fighter_battle_master_relentless", level: 15, name: "Implacável",
    description: "Quando você rola a iniciativa e não tem dados de superioridade restantes, você recupera 1 dado de superioridade.",
    type: 'auto',
    subclassPrerequisite: { featureId: 'fighter_martial_archetype', choiceValue: 'battle_master' }
  },
  {
    id: "fighter_battle_master_maneuvers_15", level: 15, name: "Manobras Adicionais (Nível 15)",
    description: "Você aprende duas manobras adicionais de sua escolha.",
    type: 'choice', selectionPrompt: "Escolha 2 Manobras Adicionais:",
    choices: BATTLE_MASTER_MANEUVER_CHOICES, maxChoices: 2,
    subclassPrerequisite: { featureId: 'fighter_martial_archetype', choiceValue: 'battle_master' }
  },
  {
    id: "fighter_eldritch_knight_arcane_charge", level: 15, name: "Carga Arcana",
    description: "No 15º nível, você ganha a habilidade de se teleportar até 9 metros para um espaço desocupado que você possa ver quando usa seu Surto de Ação. Você pode se teleportar antes ou depois da ação adicional.",
    type: 'auto',
    subclassPrerequisite: { featureId: 'fighter_martial_archetype', choiceValue: 'eldritch_knight' }
  },
  {
    id: "fighter_asi_16", level: 16, name: "Incremento no Valor de Habilidade (Guerreiro Nível 16)",
    description: "Aumente seus atributos.",
    type: 'asi',
  },
  {
    id: "fighter_action_surge_17", level: 17, name: "Surto de Ação (dois usos)",
    description: "Você agora pode usar Surto de Ação duas vezes antes de um descanso, mas apenas uma vez no mesmo turno.",
    type: 'auto',
  },
  {
    id: "fighter_indomitable_17", level: 17, name: "Indomável (três usos)",
    description: "Você agora pode usar Indomável três vezes entre descansos longos.",
    type: 'auto',
  },
  {
    id: "fighter_champion_survivor", level: 18, name: "Sobrevivente",
    description: "Você atinge o auge da resiliência em batalha. No início de cada um de seus turnos, você recupera pontos de vida iguais a 5 + seu modificador de Constituição se você não tiver mais da metade de seus pontos de vida. Você não ganha este benefício se tiver 0 pontos de vida.",
    type: 'auto',
    subclassPrerequisite: { featureId: 'fighter_martial_archetype', choiceValue: 'champion' }
  },
  {
    id: "fighter_battle_master_improved_superiority_d12", level: 18, name: "Superioridade em Combate Aprimorada (d12)",
    description: "Seus dados de superioridade tornam-se d12s.",
    type: 'auto',
    subclassPrerequisite: { featureId: 'fighter_martial_archetype', choiceValue: 'battle_master' }
  },
  {
    id: "fighter_eldritch_knight_improved_war_magic", level: 18, name: "Magia de Guerra Aprimorada",
    description: "A partir do 18º nível, quando você conjura uma magia como sua ação, você pode fazer um ataque com arma como uma ação bônus.",
    type: 'auto',
    subclassPrerequisite: { featureId: 'fighter_martial_archetype', choiceValue: 'eldritch_knight' }
  },
  {
    id: "fighter_asi_19", level: 19, name: "Incremento no Valor de Habilidade (Guerreiro Nível 19)",
    description: "Aumente seus atributos.",
    type: 'asi',
  },
  {
    id: "fighter_extra_attack_20", level: 20, name: "Ataque Extra (3)",
    description: "A partir do 20° nível, você pode atacar quatro vezes sempre que você usar a ação de Ataque no seu turno.",
    type: 'auto',
  },
];

export const BARBARIAN_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [
  {
    id: "barbarian_rage", level: 1, name: "Fúria",
    description: "Em batalha, você luta com uma ferocidade primitiva. No seu turno, você pode entrar em fúria com uma ação bônus. Enquanto estiver em fúria, você ganha os seguintes benefícios se não estiver vestindo armadura pesada: Vantagem em testes de Força e testes de resistência de Força. Bônus no dano com armas corpo-a-corpo usando Força (começa em +2). Resistência a dano de concussão, cortante e perfurante. Sua fúria dura por 1 minuto. Ela termina prematuramente se você cair inconsciente ou se seu turno acabar e você não tiver atacado uma criatura hostil desde seu último turno ou não tiver sofrido dano nesse período. Você também pode terminar sua fúria no seu turno com uma ação bônus. Você pode usar Fúria o número de vezes mostrado para seu nível de bárbaro na coluna Fúrias da tabela O Bárbaro. Você recupera todos os usos gastos quando termina um descanso longo.",
    type: 'auto',
  },
  {
    id: "barbarian_unarmored_defense", level: 1, name: "Defesa sem Armadura (Bárbaro)",
    description: "Enquanto você não estiver vestindo qualquer armadura, sua Classe de Armadura será 10 + seu modificador de Destreza + seu modificador de Constituição. Você pode usar um escudo e continuar a receber esse benefício.",
    type: 'auto',
  },
  {
    id: "barbarian_reckless_attack", level: 2, name: "Ataque Descuidado",
    description: "A partir do 2° nível, você pode desistir de toda preocupação com sua defesa para atacar com um desespero feroz. Quando você fizer o seu primeiro ataque no turno, você pode decidir atacar descuidadamente. Fazer isso lhe concede vantagem nas jogadas de ataque com armas corpo-a-corpo usando Força durante seu turno, porém, as jogadas de ataques feitas contra você possuem vantagem até o início do seu próximo turno.",
    type: 'auto',
  },
  {
    id: "barbarian_danger_sense", level: 2, name: "Sentido de Perigo",
    description: "No 2° nível, você adquire um sentido sobrenatural de quando as coisas próximas não estão como deveriam, concedendo a você uma chance maior quando estiver evitando perigos. Você possui vantagem em testes de resistência de Destreza contra efeitos que você possa ver, como armadilhas e magias. Para receber esse benefício você não pode estar cego, surdo ou incapacitado.",
    type: 'auto',
  },
  {
    id: "barbarian_primal_path", level: 3, name: "Caminho Primitivo",
    description: "No 3º nível, você escolhe um caminho que molda a natureza da sua fúria.",
    type: 'choice', selectionPrompt: "Escolha seu Caminho Primitivo:",
    choices: BARBARIAN_PRIMAL_PATH_CHOICES,
    maxChoices: 1,
  },
  {
    id: "barbarian_berserker_frenzy", level: 3, name: "Frenesi",
    description: "A partir do momento em que você escolhe este caminho no 3° nível, você pode entrar em frenesi quando estiver em fúria. Se o fizer, pela duração da sua fúria, você pode fazer um único ataque com arma corpo-a-corpo com sua ação bônus em cada um dos seus turnos após este. Quando sua fúria acabar, você sofre um nível de exaustão.",
    type: 'auto',
    subclassPrerequisite: { featureId: 'barbarian_primal_path', choiceValue: 'berserker' }
  },
  { id: "barbarian_asi_4", level: 4, name: "Incremento no Valor de Habilidade (Bárbaro Nível 4)", type: 'asi', description: "Aumente seus atributos." },
  { id: "barbarian_extra_attack_5", level: 5, name: "Ataque Extra", type: 'auto', description: "Pode atacar duas vezes." },
  { id: "barbarian_fast_movement_5", level: 5, name: "Movimento Rápido", type: 'auto', description: "Seu deslocamento aumenta em 3m se não estiver usando armadura pesada." },
  {
    id: "barbarian_berserker_mindless_rage", level: 6, name: "Fúria Incontrolável",
    description: "A partir do 6° nível, você não pode ser enfeitiçado ou amedrontado enquanto estiver em fúria. Se você estiver enfeitiçado ou amedrontado quando entrar em fúria, o efeito é suspenso pela duração da fúria.",
    type: 'auto',
    subclassPrerequisite: { featureId: 'barbarian_primal_path', choiceValue: 'berserker' }
  },
  { id: "barbarian_feral_instinct_7", level: 7, name: "Instinto Selvagem", type: 'auto', description: "Vantagem em iniciativa. Age no primeiro turno mesmo surpreso (se entrar em fúria)." },
  { id: "barbarian_asi_8", level: 8, name: "Incremento no Valor de Habilidade (Bárbaro Nível 8)", type: 'asi', description: "Aumente seus atributos." },
  { id: "barbarian_brutal_critical_9", level: 9, name: "Crítico Brutal (+1 dado)", type: 'auto', description: "Rola um dado de dano adicional em críticos." },
  {
    id: "barbarian_berserker_intimidating_presence", level: 10, name: "Presença Intimidadora",
    description: "A partir do 10° nível, você pode usar sua ação para amedrontar alguém com sua presença ameaçadora. Quando o fizer, escolha uma criatura que você possa ver a até 9 metros de você. Se a criatura puder ver ou ouvir você, ela deve ser bem-sucedida em um teste de resistência de Sabedoria (CD 8 + seu bônus de proficiência + seu modificador de Carisma) ou ficará amedrontada por você até o final do seu próximo turno. Nos turnos subsequentes, você pode usar sua ação para estender a duração deste efeito na criatura amedrontada até o final do seu próximo turno. Este efeito termina se a criatura terminar seu turno fora da sua linha de visão ou a mais de 18 metros de você.",
    type: 'auto',
    subclassPrerequisite: { featureId: 'barbarian_primal_path', choiceValue: 'berserker' }
  },
  { id: "barbarian_relentless_rage_11", level: 11, name: "Fúria Implacável", type: 'auto', description: "Pode fazer teste de CON CD 10 para ficar com 1 PV ao invés de 0 (se não morrer instantaneamente). CD aumenta em 5 a cada uso." },
  { id: "barbarian_asi_12", level: 12, name: "Incremento no Valor de Habilidade (Bárbaro Nível 12)", type: 'asi', description: "Aumente seus atributos." },
  { id: "barbarian_brutal_critical_13", level: 13, name: "Crítico Brutal (+2 dados)", type: 'auto', description: "Rola dois dados de dano adicionais em críticos." },
  {
    id: "barbarian_berserker_retaliation", level: 14, name: "Retaliação",
    description: "A partir do 14° nível, quando você sofrer dano de uma criatura que está a 1,5 metro de você, você pode usar sua reação para fazer um ataque com arma corpo-a-corpo contra aquela criatura.",
    type: 'auto',
    subclassPrerequisite: { featureId: 'barbarian_primal_path', choiceValue: 'berserker' }
  },
  { id: "barbarian_persistent_rage_15", level: 15, name: "Fúria Persistente", type: 'auto', description: "Sua fúria só termina prematuramente se você cair inconsciente ou decidir terminá-la." },
  { id: "barbarian_asi_16", level: 16, name: "Incremento no Valor de Habilidade (Bárbaro Nível 16)", type: 'asi', description: "Aumente seus atributos." },
  { id: "barbarian_brutal_critical_17", level: 17, name: "Crítico Brutal (+3 dados)", type: 'auto', description: "Rola três dados de dano adicionais em críticos." },
  { id: "barbarian_indomitable_might_18", level: 18, name: "Força Indomável", type: 'auto', description: "Se o total de um teste de Força for menor que seu valor de Força, use seu valor de Força no lugar do resultado." },
  { id: "barbarian_asi_19", level: 19, name: "Incremento no Valor de Habilidade (Bárbaro Nível 19)", type: 'asi', description: "Aumente seus atributos." },
  { id: "barbarian_primal_champion_20", level: 20, name: "Campeão Primitivo", type: 'auto', description: "Seus valores de Força e Constituição aumentam em 4. Seu máximo para esses valores agora é 24." },
];

// --- Bard Feature Definitions ---
export const BARD_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [
  { id: "bard_spellcasting", level: 1, name: "Conjuração (Bardo)", description: "Você aprendeu a desembaraçar e remodelar o tecido da realidade em harmonia com seus desejos e música. Suas magias são parte do seu vasto repertório. Carisma é sua habilidade de conjuração.", type: 'auto' },
  { id: "bard_bardic_inspiration_d6", level: 1, name: "Inspiração de Bardo (d6)", description: "Você pode inspirar outros através de palavras ou música animadoras. Para tanto, você usa uma ação bônus no seu turno para escolher uma outra criatura, que não seja você mesmo, a até 18 metros de você que possa ouvi-lo. Essa criatura ganha um dado de Inspiração de Bardo, um d6. Uma vez, nos próximos 10 minutos, a criatura poderá rolar o dado e adicionar o valor rolado a um teste de habilidade, jogada de ataque ou teste de resistência que ela fizer. A criatura pode esperar até rolar o d20 antes de decidir usar o dado de Inspiração de Bardo, mas deve decidir antes do Mestre dizer se a rolagem foi bem ou mal sucedida. Uma vez que o dado de Inspiração de Bardo for rolado, ele é gasto. Uma criatura pode ter apenas um dado de Inspiração de Bardo por vez. Você pode usar essa característica um número de vezes igual ao seu modificador de Carisma (no mínimo uma vez). Você recupera todos os usos quando termina um descanso longo. Seu dado de Inspiração de Bardo muda quando você atinge certos níveis nessa classe. O dado se torna um d8 no 5° nível, um d10 no 10° nível e um d12 no 15° nível.", type: 'auto' },
  { id: "bard_jack_of_all_trades", level: 2, name: "Pau para Toda Obra (Jack of All Trades)", description: "A partir do 2° nível, você pode adicionar metade do seu bônus de proficiência, arredondado para baixo, em qualquer teste de habilidade que você fizer que ainda não possua seu bônus de proficiência.", type: 'auto' },
  { id: "bard_song_of_rest_d6", level: 2, name: "Canção do Descanso (d6)", description: "A partir do 2° nível, você pode usar música ou oração calmantes para ajudar a revitalizar seus aliados feridos durante um descanso curto. Se você ou qualquer criatura amigável que puder ouvir sua atuação recuperar pontos de vida no fim do descanso curto ao gastar um ou mais Dados de Vida, cada uma dessas criaturas recupera 1d6 pontos de vida adicionais. Os pontos de vida adicionais aumentam quando você alcança determinados níveis nessa classe: para 1d8 no 9° nível, para 1d10 no 13° nível e para 1d12 no 17° nível.", type: 'auto' },
  { id: "bard_college", level: 3, name: "Colégio de Bardo", description: "No 3° nível, você investiga as técnicas avançadas de um colégio de bardo, à sua escolha.", type: 'choice', selectionPrompt: "Escolha seu Colégio de Bardo:", choices: BARD_COLLEGE_CHOICES, maxChoices: 1 },
  { id: "bard_expertise_1", level: 3, name: "Aptidão (Expertise - 1ª vez)", description: "No 3° nível, escolha duas de suas perícias proficientes. Seu bônus de proficiência é dobrado em qualquer teste de habilidade que você fizer que utilize qualquer das perícias escolhidas.", type: 'auto' }, // Player needs to select which skills
  { id: "bard_asi_4", level: 4, name: "Incremento no Valor de Habilidade (Bardo Nível 4)", type: 'asi', description: "Aumente seus atributos." },
  { id: "bard_font_of_inspiration", level: 5, name: "Fonte de Inspiração", description: "Começando no momento em que você atinge o 5° nível, você recupera todas as utilizações gastas da sua Inspiração de Bardo quando você termina um descanso curto ou longo.", type: 'auto' },
  { id: "bard_bardic_inspiration_d8", level: 5, name: "Inspiração de Bardo (d8)", description: "Seu dado de Inspiração de Bardo torna-se d8.", type: 'auto', prerequisiteFeatureId: "bard_bardic_inspiration_d6" },
  { id: "bard_countercharm", level: 6, name: "Canção de Proteção", description: "No 6° nível, você adquire a habilidade de usar notas musicais ou palavras de poder para interromper efeito de influência mental. Com uma ação, você pode começar uma atuação que dura até o fim do seu próximo turno. Durante esse tempo, você e qualquer criatura amigável a até 9 metros de você terá vantagem em testes de resistência para não ser amedrontado ou enfeitiçado. Uma criatura deve ser capaz de ouvir você para receber esse benefício. A atuação termina prematuramente se você for incapacitado ou silenciado ou se você terminá-la voluntariamente (não requer ação).", type: 'auto' },
  { id: "bard_college_feature_6", level: 6, name: "Habilidade de Colégio de Bardo (Nível 6)", description: "Você ganha uma característica determinada pelo seu Colégio de Bardo escolhido.", type: 'auto', prerequisiteFeatureId: "bard_college" },
  { id: "bard_asi_8", level: 8, name: "Incremento no Valor de Habilidade (Bardo Nível 8)", type: 'asi', description: "Aumente seus atributos." },
  { id: "bard_song_of_rest_d8", level: 9, name: "Canção do Descanso (d8)", description: "Seu dado de Canção do Descanso torna-se d8.", type: 'auto', prerequisiteFeatureId: "bard_song_of_rest_d6" },
  { id: "bard_expertise_2", level: 10, name: "Aptidão (Expertise - 2ª vez)", description: "No 10° nível, escolha mais duas de suas perícias proficientes. Seu bônus de proficiência é dobrado em qualquer teste de habilidade que você fizer que utilize qualquer das perícias escolhidas.", type: 'auto' }, 
  { id: "bard_bardic_inspiration_d10", level: 10, name: "Inspiração de Bardo (d10)", description: "Seu dado de Inspiração de Bardo torna-se d10.", type: 'auto', prerequisiteFeatureId: "bard_bardic_inspiration_d8" },
  { id: "bard_magical_secrets_10", level: 10, name: "Segredos Mágicos (10º nível)", description: "No 10º nível, você usurpou conhecimento mágico de um vasto espectro de disciplinas. Escolha duas magias de qualquer classe, incluindo essa. A magia que você escolher deve ser de um nível que você possa conjurar, como mostrado na tabela O Bardo, ou um truque. As magias escolhidas contam como magias de bardo para você e já estão incluídas no número da coluna Magias Conhecidas da tabela O Bardo.", type: 'auto' }, // Player needs to select spells
  { id: "bard_asi_12", level: 12, name: "Incremento no Valor de Habilidade (Bardo Nível 12)", type: 'asi', description: "Aumente seus atributos." },
  { id: "bard_song_of_rest_d10", level: 13, name: "Canção do Descanso (d10)", description: "Seu dado de Canção do Descanso torna-se d10.", type: 'auto', prerequisiteFeatureId: "bard_song_of_rest_d8" },
  { id: "bard_college_feature_14", level: 14, name: "Habilidade de Colégio de Bardo (Nível 14)", description: "Você ganha uma característica determinada pelo seu Colégio de Bardo escolhido.", type: 'auto', prerequisiteFeatureId: "bard_college" },
  { id: "bard_magical_secrets_14", level: 14, name: "Segredos Mágicos (14º nível)", description: "Você aprende duas magias adicionais de qualquer classe.", type: 'auto', prerequisiteFeatureId: "bard_magical_secrets_10" }, 
  { id: "bard_bardic_inspiration_d12", level: 15, name: "Inspiração de Bardo (d12)", description: "Seu dado de Inspiração de Bardo torna-se d12.", type: 'auto', prerequisiteFeatureId: "bard_bardic_inspiration_d10" },
  { id: "bard_asi_16", level: 16, name: "Incremento no Valor de Habilidade (Bardo Nível 16)", type: 'asi', description: "Aumente seus atributos." },
  { id: "bard_song_of_rest_d12", level: 17, name: "Canção do Descanso (d12)", description: "Seu dado de Canção do Descanso torna-se d12.", type: 'auto', prerequisiteFeatureId: "bard_song_of_rest_d10" },
  { id: "bard_magical_secrets_18", level: 18, name: "Segredos Mágicos (18º nível)", description: "Você aprende duas magias adicionais de qualquer classe.", type: 'auto', prerequisiteFeatureId: "bard_magical_secrets_14" }, 
  { id: "bard_asi_19", level: 19, name: "Incremento no Valor de Habilidade (Bardo Nível 19)", type: 'asi', description: "Aumente seus atributos." },
  { id: "bard_superior_inspiration", level: 20, name: "Inspiração Superior", description: "No 20° nível, quando você rolar iniciativa e não tiver nenhum uso restante de Inspiração de Bardo, você recupera um uso.", type: 'auto' },
];

// --- Cleric Feature Definitions ---
export const CLERIC_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [
  { id: "cleric_spellcasting", level: 1, name: "Conjuração (Clérigo)", description: "Como um canalizador de poder divino, você pode conjurar magias de clérigo. Sabedoria é sua habilidade de conjuração.", type: 'auto' },
  { id: "cleric_divine_domain", level: 1, name: "Domínio Divino", description: "Escolha um domínio relacionado à sua divindade. Sua escolha concede magias de domínio e outras características quando você a escolhe no 1º nível. Ela também concede a você maneiras adicionais de usar Canalizar Divindade quando você ganha essa característica no 2º nível, e um benefício adicional no 6º, 8º e 17º níveis.", type: 'choice', selectionPrompt: "Escolha seu Domínio Divino:", choices: CLERIC_DOMAIN_CHOICES, maxChoices: 1 },
  { id: "cleric_domain_feature_1", level: 1, name: "Característica de Domínio Divino (Nível 1)", description: "Você ganha uma característica determinada pelo seu Domínio Divino escolhido.", type: 'auto' },
  { id: "cleric_channel_divinity_1", level: 2, name: "Canalizar Divindade (1/descanso)", description: "No 2º nível, você ganha a habilidade de canalizar energia divina diretamente de sua divindade, usando essa energia para abastecer efeitos mágicos. Você começa com dois desses efeitos: Expulsar Mortos-Vivos e um efeito determinado pelo seu domínio. Você precisa terminar um descanso curto ou longo para usar seu Canalizar Divindade novamente.", type: 'auto' },
  { id: "cleric_channel_divinity_turn_undead", level: 2, name: "Canalizar Divindade: Expulsar Mortos-Vivos", description: "Com uma ação, você levanta seu símbolo sagrado e murmura uma prece repreendendo os mortos-vivos. Cada morto-vivo que puder ver ou ouvir você em um raio de 9 metros a partir de você, deve fazer um teste de resistência de Sabedoria. Se falhar, a criatura está expulsa por 1 minuto ou até sofrer algum dano.", type: 'auto' },
  { id: "cleric_domain_feature_2", level: 2, name: "Característica de Domínio Divino (Canalizar Divindade - Nível 2)", description: "Você ganha um uso adicional de Canalizar Divindade determinado pelo seu Domínio.", type: 'auto', prerequisiteFeatureId: "cleric_divine_domain" },
  { id: "cleric_asi_4", level: 4, name: "Incremento no Valor de Habilidade (Clérigo Nível 4)", type: 'asi', description: "Aumente seus atributos." },
  { id: "cleric_destroy_undead_cr_half", level: 5, name: "Destruir Mortos-Vivos (ND 1/2)", description: "A partir do 5º nível, quando um morto-vivo falhar no teste de resistência contra a sua característica Expulsar Mortos-Vivos, ele é instantaneamente destruído se o Nível de Desafio dele for menor ou igual a 1/2.", type: 'auto' },
  { id: "cleric_channel_divinity_2", level: 6, name: "Canalizar Divindade (2/descanso)", description: "A partir do 6º nível, você pode Canalizar Divindade duas vezes entre descansos.", type: 'auto' },
  { id: "cleric_domain_feature_6", level: 6, name: "Característica de Domínio Divino (Nível 6)", description: "Você ganha uma característica determinada pelo seu Domínio Divino escolhido.", type: 'auto', prerequisiteFeatureId: "cleric_divine_domain" },
  { id: "cleric_asi_8", level: 8, name: "Incremento no Valor de Habilidade (Clérigo Nível 8)", type: 'asi', description: "Aumente seus atributos." },
  { id: "cleric_destroy_undead_cr_1", level: 8, name: "Destruir Mortos-Vivos (ND 1)", description: "Sua capacidade de Destruir Mortos-Vivos aumenta para ND 1.", type: 'auto', prerequisiteFeatureId: "cleric_destroy_undead_cr_half" },
  { id: "cleric_domain_feature_8", level: 8, name: "Característica de Domínio Divino (Nível 8)", description: "Você ganha uma característica determinada pelo seu Domínio Divino escolhido.", type: 'auto', prerequisiteFeatureId: "cleric_divine_domain" },
  { id: "cleric_divine_intervention", level: 10, name: "Intervenção Divina", description: "A partir do 10º nível, você pode rogar à sua divindade para que auxilie você em uma árdua tarefa. Implorar pelo auxílio requer uma ação. Você precisa descrever o que busca e realizar uma rolagem de dado de porcentagem. Se o resultado for menor ou igual ao seu nível de clérigo, sua divindade intervém. O Mestre escolhe a natureza da intervenção. Se sua divindade intervir, você fica impedido de usar essa característica de novo por 7 dias. Do contrário, você pode usá-la de novo após terminar um descanso longo.", type: 'auto' },
  { id: "cleric_destroy_undead_cr_2", level: 11, name: "Destruir Mortos-Vivos (ND 2)", description: "Sua capacidade de Destruir Mortos-Vivos aumenta para ND 2.", type: 'auto', prerequisiteFeatureId: "cleric_destroy_undead_cr_1" },
  { id: "cleric_asi_12", level: 12, name: "Incremento no Valor de Habilidade (Clérigo Nível 12)", type: 'asi', description: "Aumente seus atributos." },
  { id: "cleric_destroy_undead_cr_3", level: 14, name: "Destruir Mortos-Vivos (ND 3)", description: "Sua capacidade de Destruir Mortos-Vivos aumenta para ND 3.", type: 'auto', prerequisiteFeatureId: "cleric_destroy_undead_cr_2" },
  { id: "cleric_asi_16", level: 16, name: "Incremento no Valor de Habilidade (Clérigo Nível 16)", type: 'asi', description: "Aumente seus atributos." },
  { id: "cleric_destroy_undead_cr_4", level: 17, name: "Destruir Mortos-Vivos (ND 4)", description: "Sua capacidade de Destruir Mortos-Vivos aumenta para ND 4.", type: 'auto', prerequisiteFeatureId: "cleric_destroy_undead_cr_3" },
  { id: "cleric_domain_feature_17", level: 17, name: "Característica de Domínio Divino (Nível 17)", description: "Você ganha uma característica determinada pelo seu Domínio Divino escolhido.", type: 'auto', prerequisiteFeatureId: "cleric_divine_domain" },
  { id: "cleric_channel_divinity_3", level: 18, name: "Canalizar Divindade (3/descanso)", description: "A partir do 18º nível, você pode Canalizar Divindade três vezes entre descansos.", type: 'auto' },
  { id: "cleric_asi_19", level: 19, name: "Incremento no Valor de Habilidade (Clérigo Nível 19)", type: 'asi', description: "Aumente seus atributos." },
  { id: "cleric_divine_intervention_improvement", level: 20, name: "Aprimoramento de Intervenção Divina", description: "No 20º nível, seus pedidos de intervenção funcionam automaticamente, sem necessidade de rolagem de dados.", type: 'auto', prerequisiteFeatureId: "cleric_divine_intervention" },
];

// --- Warlock Feature Definitions ---
export const WARLOCK_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [
  { id: "warlock_otherworldly_patron", level: 1, name: "Patrono Transcendental", description: "No 1º nível, você conclui uma barganha com um ser transcendental à sua escolha.", type: 'choice', selectionPrompt: "Escolha seu Patrono Transcendental:", choices: WARLOCK_PATRON_CHOICES, maxChoices: 1 },
  { id: "warlock_pact_magic", level: 1, name: "Magia de Pacto", description: "Sua pesquisa arcana e a magia outorgada a você por seu patrono lhe concedem uma gama de magias. Carisma é sua habilidade de conjuração.", type: 'auto' },
  { id: "warlock_eldritch_invocations", level: 2, name: "Invocações Místicas", description: "No 2° nível, você ganha duas invocações místicas, à sua escolha.", type: 'choice', selectionPrompt: "Escolha suas Invocações Místicas:", choices: WARLOCK_INVOCATION_CHOICES, maxChoices: 2 }, // Count increases with level
  { id: "warlock_pact_boon", level: 3, name: "Dádiva do Pacto", description: "No 3º nível, seu patrono transcendental lhe confere um dom por seus leais serviços.", type: 'choice', selectionPrompt: "Escolha sua Dádiva do Pacto:", choices: WARLOCK_PACT_BOON_CHOICES, maxChoices: 1 },
  { id: "warlock_asi_4", level: 4, name: "Incremento no Valor de Habilidade (Bruxo Nível 4)", type: 'asi', description: "Aumente seus atributos." },
  { id: "warlock_patron_feature_6", level: 6, name: "Característica de Patrono Transcendental (Nível 6)", description: "Você ganha uma característica do seu patrono.", type: 'auto' },
  { id: "warlock_asi_8", level: 8, name: "Incremento no Valor de Habilidade (Bruxo Nível 8)", type: 'asi', description: "Aumente seus atributos." },
  { id: "warlock_patron_feature_10", level: 10, name: "Característica de Patrono Transcendental (Nível 10)", description: "Você ganha uma característica do seu patrono.", type: 'auto' },
  { id: "warlock_mystic_arcanum_6", level: 11, name: "Arcana Mística (6º nível)", description: "Escolha uma magia de 6º nível da lista de bruxo como sua arcana. Pode conjurar uma vez sem espaço de magia (requer descanso longo).", type: 'auto' }, 
  { id: "warlock_asi_12", level: 12, name: "Incremento no Valor de Habilidade (Bruxo Nível 12)", type: 'asi', description: "Aumente seus atributos." },
  { id: "warlock_mystic_arcanum_7", level: 13, name: "Arcana Mística (7º nível)", description: "Escolha uma magia de 7º nível da lista de bruxo.", type: 'auto' }, 
  { id: "warlock_patron_feature_14", level: 14, name: "Característica de Patrono Transcendental (Nível 14)", description: "Você ganha uma característica do seu patrono.", type: 'auto' },
  { id: "warlock_mystic_arcanum_8", level: 15, name: "Arcana Mística (8º nível)", description: "Escolha uma magia de 8º nível da lista de bruxo.", type: 'auto' }, 
  { id: "warlock_asi_16", level: 16, name: "Incremento no Valor de Habilidade (Bruxo Nível 16)", type: 'asi', description: "Aumente seus atributos." },
  { id: "warlock_mystic_arcanum_9", level: 17, name: "Arcana Mística (9º nível)", description: "Escolha uma magia de 9º nível da lista de bruxo.", type: 'auto' }, 
  { id: "warlock_asi_19", level: 19, name: "Incremento no Valor de Habilidade (Bruxo Nível 19)", type: 'asi', description: "Aumente seus atributos." },
  { id: "warlock_eldritch_master", level: 20, name: "Mestre Místico", description: "Pode gastar 1 minuto suplicando ao patrono para recuperar todos os espaços de magia de pacto (requer descanso longo).", type: 'auto' },
];

// --- Druid Feature Definitions ---
export const DRUID_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [
  { id: "druid_druidic", level: 1, name: "Druídico", description: "Você conhece o Druídico, o idioma secreto dos druidas.", type: 'auto' },
  { id: "druid_spellcasting", level: 1, name: "Conjuração (Druida)", description: "Baseado na essência divina da própria natureza, você pode conjurar magias. Sabedoria é sua habilidade de conjuração.", type: 'auto' },
  { id: "druid_wild_shape", level: 2, name: "Forma Selvagem", description: "Usa sua ação para assumir a forma de uma besta que você já viu (2x por descanso curto/longo).", type: 'auto' },
  { id: "druid_druid_circle", level: 2, name: "Círculo Druídico", description: "Escolha um círculo druídico que reflita sua conexão com a natureza.", type: 'choice', selectionPrompt: "Escolha seu Círculo Druídico:", choices: DRUID_CIRCLE_CHOICES, maxChoices: 1 },
  { id: "druid_circle_feature_2", level: 2, name: "Característica de Círculo Druídico (Nível 2)", description: "Você ganha uma característica do seu círculo.", type: 'auto' },
  { id: "druid_asi_4", level: 4, name: "Incremento no Valor de Habilidade (Druida Nível 4)", type: 'asi', description: "Aumente seus atributos." },
  { id: "druid_wild_shape_improvement_4", level: 4, name: "Aprimoramento de Forma Selvagem (Nível 4)", description: "Seu ND máximo para Forma Selvagem aumenta (ND 1/2, sem voo).", type: 'auto' },
  { id: "druid_circle_feature_6", level: 6, name: "Característica de Círculo Druídico (Nível 6)", description: "Você ganha uma característica do seu círculo.", type: 'auto' },
  { id: "druid_asi_8", level: 8, name: "Incremento no Valor de Habilidade (Druida Nível 8)", type: 'asi', description: "Aumente seus atributos." },
  { id: "druid_wild_shape_improvement_8", level: 8, name: "Aprimoramento de Forma Selvagem (Nível 8)", description: "Seu ND máximo para Forma Selvagem aumenta (ND 1, com voo).", type: 'auto' },
  { id: "druid_circle_feature_10", level: 10, name: "Característica de Círculo Druídico (Nível 10)", description: "Você ganha uma característica do seu círculo.", type: 'auto' },
  { id: "druid_asi_12", level: 12, name: "Incremento no Valor de Habilidade (Druida Nível 12)", type: 'asi', description: "Aumente seus atributos." },
  { id: "druid_circle_feature_14", level: 14, name: "Característica de Círculo Druídico (Nível 14)", description: "Você ganha uma característica do seu círculo.", type: 'auto' },
  { id: "druid_asi_16", level: 16, name: "Incremento no Valor de Habilidade (Druida Nível 16)", type: 'asi', description: "Aumente seus atributos." },
  { id: "druid_timeless_body", level: 18, name: "Corpo Atemporal", description: "Envelhece mais lentamente (1 ano para cada 10 passados).", type: 'auto' },
  { id: "druid_beast_spells", level: 18, name: "Magias da Besta", description: "Pode conjurar magias de druida em forma selvagem.", type: 'auto' },
  { id: "druid_asi_19", level: 19, name: "Incremento no Valor de Habilidade (Druida Nível 19)", type: 'asi', description: "Aumente seus atributos." },
  { id: "druid_archdruid", level: 20, name: "Arquidruida", description: "Pode usar Forma Selvagem um número ilimitado de vezes.", type: 'auto' },
];

// --- Sorcerer Feature Definitions ---
export const SORCERER_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [
  { id: "sorcerer_spellcasting", level: 1, name: "Conjuração (Feiticeiro)", description: "Sua magia inata permite que você conjure magias. Carisma é sua habilidade de conjuração.", type: 'auto' },
  { id: "sorcerer_sorcerous_origin", level: 1, name: "Origem de Feitiçaria", description: "Escolha uma origem de feitiçaria que descreve a fonte do seu poder.", type: 'choice', selectionPrompt: "Escolha sua Origem de Feitiçaria:", choices: SORCERER_ORIGIN_CHOICES, maxChoices: 1 },
  { 
    id: "sorcerer_draconic_ancestry", level: 1, name: "Ancestralidade Dracônica", 
    description: "No 1º nível, você escolhe um tipo de dragão como seu ancestral. O tipo de dano associado a cada dragão é usado por características que você ganha mais tarde.",
    type: 'choice', selectionPrompt: 'Escolha sua Ancestralidade Dracônica:',
    choices: DRAGON_ANCESTRY_CHOICES.map(c => ({value: c.value, label: c.label, description: `Resistência a ${c.damageType}.`})),
    subclassPrerequisite: { featureId: "sorcerer_sorcerous_origin", choiceValue: "draconic" }
  },
  { 
    id: "sorcerer_draconic_resilience", level: 1, name: "Resiliência Dracônica", 
    description: "A magia que flui através de seu corpo o fortalece. No 1º nível, seu máximo de pontos de vida aumenta em 1 e aumenta em 1 novamente sempre que você ganha um nível nesta classe. Além disso, partes de sua pele são cobertas por um brilho fino de escamas de dragão. Quando você não está vestindo armadura, sua CA é igual a 13 + seu modificador de Destreza.",
    type: 'auto',
    subclassPrerequisite: { featureId: "sorcerer_sorcerous_origin", choiceValue: "draconic" }
  },
  {
    id: "sorcerer_wild_magic_surge", level: 1, name: "Surto de Magia Selvagem",
    description: "A partir do 1º nível, sua conjuração pode liberar surtos de magia indomada. Imediatamente após você conjurar uma magia de feiticeiro de 1º nível ou superior, o Mestre pode fazer você rolar um d20. Se você rolar um 1, role na Tabela de Surto de Magia Selvagem para criar um efeito mágico aleatório.",
    type: 'auto',
    subclassPrerequisite: { featureId: "sorcerer_sorcerous_origin", choiceValue: "wild_magic" }
  },
  {
    id: "sorcerer_tides_of_chaos", level: 1, name: "Marés do Caos",
    description: "Você pode manipular as forças da sorte e do caos para ganhar vantagem em uma jogada de ataque, teste de habilidade ou teste de resistência. Uma vez que o faça, você deve terminar um descanso longo antes de poder usar esta característica novamente. Qualquer vez antes de recuperar o uso desta característica, o Mestre pode fazer você rolar na Tabela de Surto de Magia Selvagem imediatamente após você conjurar uma magia de feiticeiro de 1º nível ou superior. Você então recupera o uso desta característica.",
    type: 'auto',
    subclassPrerequisite: { featureId: "sorcerer_sorcerous_origin", choiceValue: "wild_magic" }
  },
  { id: "sorcerer_font_of_magic", level: 2, name: "Fonte de Magia", description: "Você acessa uma fonte interna de magia, representada por pontos de feitiçaria. Você pode usar esses pontos para criar efeitos mágicos.", type: 'auto' }, // Sorcery points equal level
  { id: "sorcerer_metamagic_3", level: 3, name: "Metamágica (Opções Iniciais)", description: "Você ganha a habilidade de distorcer suas magias. Escolha duas opções de Metamágica.", type: 'choice', selectionPrompt: "Escolha 2 opções de Metamágica:", choices: METAMAGIC_OPTIONS_CHOICES, maxChoices: 2 },
  { id: "sorcerer_asi_4", level: 4, name: "Incremento no Valor de Habilidade (Feiticeiro Nível 4)", type: 'asi', description: "Aumente seus atributos." },
  { id: "sorcerer_origin_feature_6", level: 6, name: "Característica de Origem de Feitiçaria (Nível 6)", description: "Você ganha uma característica da sua origem.", type: 'auto' },
  { id: "sorcerer_asi_8", level: 8, name: "Incremento no Valor de Habilidade (Feiticeiro Nível 8)", type: 'asi', description: "Aumente seus atributos." },
  { id: "sorcerer_metamagic_10", level: 10, name: "Metamágica (Opção Adicional)", description: "Você ganha uma opção adicional de Metamágica.", type: 'choice', selectionPrompt: "Escolha mais 1 opção de Metamágica:", choices: METAMAGIC_OPTIONS_CHOICES, maxChoices: 1 },
  { id: "sorcerer_asi_12", level: 12, name: "Incremento no Valor de Habilidade (Feiticeiro Nível 12)", type: 'asi', description: "Aumente seus atributos." },
  { id: "sorcerer_origin_feature_14", level: 14, name: "Característica de Origem de Feitiçaria (Nível 14)", description: "Você ganha uma característica da sua origem.", type: 'auto' },
  { id: "sorcerer_asi_16", level: 16, name: "Incremento no Valor de Habilidade (Feiticeiro Nível 16)", type: 'asi', description: "Aumente seus atributos." },
  { id: "sorcerer_metamagic_17", level: 17, name: "Metamágica (Outra Opção Adicional)", description: "Você ganha uma opção adicional de Metamágica.", type: 'choice', selectionPrompt: "Escolha mais 1 opção de Metamágica:", choices: METAMAGIC_OPTIONS_CHOICES, maxChoices: 1 },
  { id: "sorcerer_origin_feature_18", level: 18, name: "Característica de Origem de Feitiçaria (Nível 18)", description: "Você ganha uma característica da sua origem.", type: 'auto' },
  { id: "sorcerer_asi_19", level: 19, name: "Incremento no Valor de Habilidade (Feiticeiro Nível 19)", type: 'asi', description: "Aumente seus atributos." },
  { id: "sorcerer_sorcerous_restoration", level: 20, name: "Restauração Mística", description: "Você recupera 4 pontos de feitiçaria gastos sempre que termina um descanso curto.", type: 'auto' },
];

// --- Paladin Feature Definitions ---
export const PALADIN_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [
  { id: "paladin_divine_sense", level: 1, name: "Sentido Divino", description: "Pode detectar celestiais, corruptores ou mortos-vivos a 18m (número de usos = 1 + mod. CAR).", type: 'auto' },
  { id: "paladin_lay_on_hands", level: 1, name: "Cura pelas Mãos", description: "Reserva de cura igual a nível de paladino x 5. Pode curar doenças ou neutralizar veneno por 5 PV da reserva.", type: 'auto' },
  { id: "paladin_fighting_style", level: 2, name: "Estilo de Luta (Paladino)", description: "Adota um estilo de combate particular.", type: 'choice', selectionPrompt: "Escolha um Estilo de Luta:", choices: FIGHTING_STYLE_OPTIONS.filter(opt => opt.name !== "").map(opt => ({ value: opt.name, label: opt.name, description: opt.description })), maxChoices: 1 },
  { id: "paladin_spellcasting", level: 2, name: "Conjuração (Paladino)", description: "Aprende a extrair magia divina através de meditação e oração. Carisma é sua habilidade de conjuração.", type: 'auto' },
  { id: "paladin_divine_smite", level: 2, name: "Destruição Divina", description: "Gasta espaço de magia para causar dano radiante extra em ataques corpo-a-corpo (2d8 para 1º nível, +1d8 por nível acima, máx 5d8; +1d8 contra corruptores/mortos-vivos).", type: 'auto' },
  { id: "paladin_divine_health", level: 3, name: "Saúde Divina", description: "A magia divina torna você imune a doenças.", type: 'auto' },
  { id: "paladin_sacred_oath", level: 3, name: "Juramento Sagrado", description: "Faz um juramento que o define como paladino.", type: 'choice', selectionPrompt: "Escolha seu Juramento Sagrado:", choices: PALADIN_OATH_CHOICES, maxChoices: 1 },
  { id: "paladin_oath_feature_3", level: 3, name: "Característica de Juramento Sagrado (Nível 3 - Canalizar Divindade)", description: "Você ganha usos de Canalizar Divindade do seu juramento.", type: 'auto' },
  { id: "paladin_asi_4", level: 4, name: "Incremento no Valor de Habilidade (Paladino Nível 4)", type: 'asi', description: "Aumente seus atributos." },
  { id: "paladin_extra_attack", level: 5, name: "Ataque Extra (Paladino)", description: "Pode atacar duas vezes com a ação de Ataque.", type: 'auto' },
  { id: "paladin_aura_of_protection", level: 6, name: "Aura de Proteção", description: "Você ou criatura amigável a 3m ganha bônus em testes de resistência igual ao seu mod. CAR (mín +1). Alcance aumenta para 9m no 18º nível.", type: 'auto' },
  { id: "paladin_oath_feature_7", level: 7, name: "Característica de Juramento Sagrado (Nível 7 - Aura)", description: "Você ganha uma característica de aura do seu juramento.", type: 'auto' },
  { id: "paladin_asi_8", level: 8, name: "Incremento no Valor de Habilidade (Paladino Nível 8)", type: 'asi', description: "Aumente seus atributos." },
  { id: "paladin_aura_of_courage", level: 10, name: "Aura da Coragem", description: "Você e criaturas amigáveis a 3m não podem ser amedrontadas. Alcance aumenta para 9m no 18º nível.", type: 'auto' },
  { id: "paladin_improved_divine_smite", level: 11, name: "Destruição Divina Aprimorada", description: "Seus ataques corpo-a-corpo com arma causam 1d8 de dano radiante extra.", type: 'auto' },
  { id: "paladin_asi_12", level: 12, name: "Incremento no Valor de Habilidade (Paladino Nível 12)", type: 'asi', description: "Aumente seus atributos." },
  { id: "paladin_cleansing_touch", level: 14, name: "Toque Purificador", description: "Usa ação para terminar uma magia em si mesmo ou criatura voluntária (usos = mod. CAR).", type: 'auto' },
  { id: "paladin_oath_feature_15", level: 15, name: "Característica de Juramento Sagrado (Nível 15)", description: "Você ganha uma característica do seu juramento.", type: 'auto' },
  { id: "paladin_asi_16", level: 16, name: "Incremento no Valor de Habilidade (Paladino Nível 16)", type: 'asi', description: "Aumente seus atributos." },
  { id: "paladin_aura_improvements_18", level: 18, name: "Aprimoramentos de Aura", description: "O alcance de suas auras aumenta para 9 metros.", type: 'auto' },
  { id: "paladin_asi_19", level: 19, name: "Incremento no Valor de Habilidade (Paladino Nível 19)", type: 'asi', description: "Aumente seus atributos." },
  { id: "paladin_oath_feature_20", level: 20, name: "Característica de Juramento Sagrado (Nível 20 - Transformação)", description: "No 20º nível, você ganha uma poderosa transformação baseada no seu juramento.", type: 'auto' },
];

export const ROGUE_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [
    { id: "rogue_expertise_1", level: 1, name: "Aptidão (Ladino - 1ª vez)", description: "Escolha duas de suas perícias proficientes, OU uma perícia proficiente e sua proficiência com ferramentas de ladrão. Seu bônus de proficiência é dobrado para qualquer teste de habilidade que você fizer que use qualquer uma das proficiências escolhidas.", type: 'auto' }, // Needs logic for selection
    { id: "rogue_sneak_attack_1d6", level: 1, name: "Ataque Furtivo (1d6)", description: "Uma vez por turno, você pode causar um extra 1d6 de dano a uma criatura que você atinge com um ataque se tiver vantagem na jogada de ataque. A arma deve usar a propriedade Acuidade ou ser uma arma à distância. Você não precisa de vantagem na jogada de ataque se outra criatura hostil ao alvo estiver a 1,5 metro dele, essa criatura não estiver incapacitada, e você não tiver desvantagem na jogada de ataque.", type: 'auto' },
    { id: "rogue_thieves_cant", level: 1, name: "Gíria de Ladrão", description: "Você aprendeu a gíria de ladrão, um misto de dialeto, jargão e código secreto que permite que você passe mensagens secretas durante uma conversa aparentemente normal.", type: 'auto' },
    { id: "rogue_cunning_action", level: 2, name: "Ação Ardilosa", description: "Seu pensamento rápido e agilidade permitem que você se mova e aja rapidamente. Você pode usar uma ação bônus durante cada um de seus turnos em combate. Esta ação pode ser usada somente para realizar as ações de Disparada, Desengajar ou Esconder.", type: 'auto' },
    { id: "rogue_roguish_archetype", level: 3, name: "Arquétipo de Ladino", description: "No 3º nível, você escolhe um arquétipo que se esforçará para se equiparar através de exercícios de suas habilidades de ladino.", type: 'choice', selectionPrompt: "Escolha seu Arquétipo de Ladino:", choices: ROGUE_ARCHETYPE_CHOICES, maxChoices: 1 },
    { id: "rogue_archetype_feature_3", level: 3, name: "Característica de Arquétipo de Ladino (Nível 3)", description: "Você ganha uma característica do seu arquétipo.", type: 'auto' },
    { id: "rogue_asi_4", level: 4, name: "Incremento no Valor de Habilidade (Ladino Nível 4)", type: 'asi', description: "Aumente seus atributos." },
    { id: "rogue_uncanny_dodge", level: 5, name: "Esquiva Sobrenatural", description: "A partir do 5º nível, quando um inimigo que você possa ver o acerta com um ataque, você pode usar sua reação para reduzir pela metade o dano sofrido.", type: 'auto' },
    { id: "rogue_expertise_2", level: 6, name: "Aptidão (Ladino - 2ª vez)", description: "Escolha mais duas de suas perícias proficientes (ou uma perícia e ferramentas de ladrão). Seu bônus de proficiência é dobrado.", type: 'auto' }, // Needs logic for selection
    { id: "rogue_evasion", level: 7, name: "Evasão", description: "A partir do 7º nível, você pode esquivar-se agilmente de certos efeitos em área. Quando você for alvo de um efeito que exige um teste de resistência de Destreza para sofrer metade do dano, você não sofre dano algum se passar, e somente metade do dano se falhar.", type: 'auto' },
    { id: "rogue_asi_8", level: 8, name: "Incremento no Valor de Habilidade (Ladino Nível 8)", type: 'asi', description: "Aumente seus atributos." },
    { id: "rogue_archetype_feature_9", level: 9, name: "Característica de Arquétipo de Ladino (Nível 9)", description: "Você ganha uma característica do seu arquétipo.", type: 'auto' },
    { id: "rogue_asi_10", level: 10, name: "Incremento no Valor de Habilidade (Ladino Nível 10)", type: 'asi', description: "Aumente seus atributos." },
    { id: "rogue_reliable_talent", level: 11, name: "Talento Confiável", description: "No 11º nível, você refinou suas perícias beirando à perfeição. Toda vez que você fizer um teste de habilidade no qual possa adicionar seu bônus de proficiência, você trata um resultado no d20 de 9 ou menor como um 10.", type: 'auto' },
    { id: "rogue_asi_12", level: 12, name: "Incremento no Valor de Habilidade (Ladino Nível 12)", type: 'asi', description: "Aumente seus atributos." },
    { id: "rogue_archetype_feature_13", level: 13, name: "Característica de Arquétipo de Ladino (Nível 13)", description: "Você ganha uma característica do seu arquétipo.", type: 'auto' },
    { id: "rogue_blindsense", level: 14, name: "Sentido Cego", description: "No 14º nível, se você for capaz de ouvir, você está ciente da localização de qualquer criatura escondida ou invisível a até 3 metros de você.", type: 'auto' },
    { id: "rogue_slippery_mind", level: 15, name: "Mente Escorregadia", description: "No 15º nível, você adquire uma grande força de vontade, adquirindo proficiência nos testes de resistência de Sabedoria.", type: 'auto' },
    { id: "rogue_asi_16", level: 16, name: "Incremento no Valor de Habilidade (Ladino Nível 16)", type: 'asi', description: "Aumente seus atributos." },
    { id: "rogue_archetype_feature_17", level: 17, name: "Característica de Arquétipo de Ladino (Nível 17)", description: "Você ganha uma característica do seu arquétipo.", type: 'auto' },
    { id: "rogue_elusive", level: 18, name: "Elusivo", description: "A partir do 18º nível, você se torna tão sagaz que raramente alguém encosta a mão em você. Nenhuma jogada de ataque tem vantagem contra você, desde que você não esteja incapacitado.", type: 'auto' },
    { id: "rogue_asi_19", level: 19, name: "Incremento no Valor de Habilidade (Ladino Nível 19)", type: 'asi', description: "Aumente seus atributos." },
    { id: "rogue_stroke_of_luck", level: 20, name: "Golpe de Sorte", description: "No 20º nível, você adquire um dom incrível para ter sucesso nos momentos em que mais precisa. Se um ataque seu falhar contra um alvo ao seu alcance, você pode transformar essa falha em um acerto. Ou se falhar em um teste qualquer, você pode tratar a jogada desse mesmo teste como 20 natural. Uma vez que você use essa característica, você não pode fazê-lo de novo até terminar um descanso curto ou longo.", type: 'auto' },
];

const FOUR_ELEMENTS_DISCIPLINES: FeatureChoiceDefinition[] = [
    {value: "fist_of_unbroken_air", label: "Punho do Ar Ininterrupto", description: "Você pode gastar 2 pontos de chi para escolher uma criatura a até 9 metros de você. A criatura deve fazer um teste de resistência de Força. Em uma falha, a criatura sofre 3d10 de dano de concussão, mais 1d10 de dano de concussão extra para cada ponto de chi adicional que você gastar, e você pode empurrar a criatura até 6 metros para longe de você e derrubá-la. Em um sucesso, a criatura sofre metade do dano e não é empurrada nem derrubada."},
    {value: "water_whip", label: "Chicote de Água", description: "Você pode gastar 2 pontos de chi como uma ação bônus para criar um chicote de água que atinge uma criatura que você possa ver a até 9 metros de você. A criatura deve fazer um teste de resistência de Destreza. Em uma falha, a criatura sofre 3d10 de dano de concussão, mais 1d10 por ponto de chi adicional gasto, e você pode derrubá-la ou puxá-la até 7,5 metros para perto de você. Em um sucesso, a criatura sofre metade do dano e não é puxada nem derrubada."},
    // More would be added here, especially those with level prerequisites.
];

export const MONK_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [
    { id: "monk_unarmored_defense", level: 1, name: "Defesa sem Armadura (Monge)", description: "Enquanto não estiver vestindo armadura nem empunhando escudo, sua CA é 10 + mod. Destreza + mod. Sabedoria.", type: 'auto' },
    { id: "monk_martial_arts_1d4", level: 1, name: "Artes Marciais (d4)", description: "Sua prática em artes marciais lhe concede maestria em estilos de combate que usam golpes desarmados e armas de monge (espadas curtas e qualquer arma corpo-a-corpo simples que não tenha a propriedade duas mãos ou pesada). Você ganha os seguintes benefícios enquanto estiver desarmado ou empunhando apenas armas de monge e não estiver vestindo armadura ou empunhando um escudo: Você pode usar Destreza ao invés de Força para as jogadas de ataque e dano de seus golpes desarmados e armas de monge. Você pode rolar um d4 no lugar do dano normal de seus golpes desarmados e armas de monge. Esse dado muda à medida que você ganha níveis de monge, como mostrado na coluna Artes Marciais da tabela O Monge. Quando você usa a ação de Ataque com um golpe desarmado ou uma arma de monge no seu turno, você pode realizar um golpe desarmado como uma ação bônus.", type: 'auto' },
    { id: "monk_ki_2", level: 2, name: "Chi (2 pontos)", description: "A partir do 2° nível, seu treinamento permitiu que você controlasse a energia mística do chi. Seu acesso a essa energia é representado por um número de pontos de chi. Seu nível de monge determina o número de pontos que você tem, como mostrado na coluna Pontos de Chi da tabela O Monge. Você pode gastar esses pontos para abastecer várias características de chi. Você começa conhecendo três dessas características: Rajada de Golpes, Defesa Paciente e Passo do Vento. Você aprende mais características de chi à medida que adquire níveis nessa classe. Quando você gasta um ponto de chi, ele se torna indisponível até você terminar um descanso curto ou longo, no fim deste, todos os pontos de chi gastos volta para você. Você deve gastar, pelo menos, 30 minutos do descanso meditando para recuperar seus pontos de chi.", type: 'auto' },
    { id: "monk_flurry_of_blows", level: 2, name: "Rajada de Golpes", description: "Imediatamente após você realizar a ação de Ataque no seu turno, você pode gastar 1 ponto de chi para realizar dois golpes desarmados com uma ação bônus.", type: 'auto', prerequisiteFeatureId: "monk_ki_2" },
    { id: "monk_patient_defense", level: 2, name: "Defesa Paciente", description: "Você pode gastar 1 ponto de chi para realizar a ação de Esquivar, com uma ação bônus, no seu turno.", type: 'auto', prerequisiteFeatureId: "monk_ki_2" },
    { id: "monk_step_of_the_wind", level: 2, name: "Passo do Vento", description: "Você pode gastar 1 ponto de chi para realizar a Ação de Desengajar ou Disparada, com uma ação bônus, no seu turno, e sua distância de salto é dobrada nesse turno.", type: 'auto', prerequisiteFeatureId: "monk_ki_2" },
    { id: "monk_unarmored_movement_2", level: 2, name: "Movimento sem Armadura (+3m)", description: "A partir do 2° nível, seu deslocamento aumenta em 3 metros enquanto você não estiver usando armadura nem empunhando um escudo.", type: 'auto' },
    { id: "monk_monastic_tradition", level: 3, name: "Tradição Monástica", description: "Quando você alcança o 3° nível, você ingressa numa tradição monástica.", type: 'choice', selectionPrompt: "Escolha sua Tradição Monástica:", choices: MONK_MONASTIC_TRADITION_CHOICES, maxChoices: 1 },
    { id: "monk_deflect_missiles", level: 3, name: "Defletir Projéteis", description: "A partir do 3° nível, você pode usar sua reação para defletir ou apanhar o projétil quando você é atingido por um ataque de arma à distância. Quando o fizer, o dano que você sofrer do ataque é reduzido em 1d10 + seu modificador de Destreza + seu nível de monge. Se o dano for reduzido a 0, você pode apanhar o projétil se ele for pequeno o suficiente para ser segurando em uma mão e você tenha, pelo menos, uma mão livre. Se você apanhar um projétil dessa forma, você pode gastar 1 ponto de chi para realizar uma ataque à distância com a arma ou munição que você acabou de pegar, como parte da mesma reação. Você realiza esse ataque com proficiência, independentemente das armas em que você é proficiente, e o projétil conta como uma arma de monge para o ataque. A distância do ataque do monge é de 6/18 metros.", type: 'auto' },
    { 
        id: "monk_four_elements_disciplines", 
        level: 3, 
        name: "Discípulo dos Elementos", 
        description: "Você aprende disciplinas mágicas que utilizam os elementos. Uma disciplina requer que você gaste pontos de chi cada vez que a usa. Você conhece a disciplina Sintonia Elemental e mais duas disciplinas elementais de sua escolha. Você aprende uma disciplina adicional de sua escolha nos níveis 6, 11 e 17.",
        type: 'choice',
        selectionPrompt: "Escolha 2 Disciplinas Elementais:",
        choices: FOUR_ELEMENTS_DISCIPLINES,
        maxChoices: 2,
        subclassPrerequisite: { featureId: "monk_monastic_tradition", choiceValue: "four_elements" }
    },
    { id: "monk_asi_4", level: 4, name: "Incremento no Valor de Habilidade (Monge Nível 4)", type: 'asi', description: "Aumente seus atributos." },
    { id: "monk_slow_fall", level: 4, name: "Queda Lenta", description: "Começando no 4° nível, você pode usar sua reação, quando você cai, para reduzir o dano de queda sofrido por um valor igual a cinco vezes seu nível de monge.", type: 'auto' },
    { id: "monk_extra_attack", level: 5, name: "Ataque Extra (Monge)", description: "Pode atacar duas vezes com a ação Ataque.", type: 'auto' },
    { id: "monk_stunning_strike", level: 5, name: "Ataque Atordoante", description: "Gasta 1 ponto de chi para tentar atordoar um alvo atingido por ataque corpo-a-corpo (teste de CON).", type: 'auto' },
    { id: "monk_ki_empowered_strikes", level: 6, name: "Golpes de Chi", description: "Seus golpes desarmados contam como mágicos para superar resistência e imunidade a dano não-mágico.", type: 'auto' },
    { id: "monk_tradition_feature_6", level: 6, name: "Característica de Tradição Monástica (Nível 6)", description: "Você ganha uma característica da sua tradição.", type: 'auto' },
    { id: "monk_evasion", level: 7, name: "Evasão (Monge)", description: "Seu instinto permite que você se esquive de certos efeitos de área. Em testes de resistência de DES para metade do dano, você não sofre dano se passar, e apenas metade se falhar.", type: 'auto' },
    { id: "monk_stillness_of_mind", level: 7, name: "Mente Tranquila", description: "Pode usar sua ação para terminar um efeito em si mesmo que o esteja enfeitiçando ou amedrontando.", type: 'auto' },
    { id: "monk_asi_8", level: 8, name: "Incremento no Valor de Habilidade (Monge Nível 8)", type: 'asi', description: "Aumente seus atributos." },
    { id: "monk_unarmored_movement_improvement_9", level: 9, name: "Aprimoramento de Movimento sem Armadura", description: "Seu deslocamento sem armadura aumenta e você pode se mover através de superfícies verticais e sobre líquidos.", type: 'auto' },
    { id: "monk_purity_of_body", level: 10, name: "Pureza Corporal", description: "Sua maestria do chi o torna imune a doenças e venenos.", type: 'auto' },
    { id: "monk_tradition_feature_11", level: 11, name: "Característica de Tradição Monástica (Nível 11)", description: "Você ganha uma característica da sua tradição.", type: 'auto' },
    { id: "monk_asi_12", level: 12, name: "Incremento no Valor de Habilidade (Monge Nível 12)", type: 'asi', description: "Aumente seus atributos." },
    { id: "monk_tongue_of_sun_and_moon", level: 13, name: "Idiomas do Sol e da Lua", description: "Você aprende a tocar o chi de outras mentes para que você compreenda todos os idiomas falados. Além do mais, qualquer criatura que possa entender um idioma poderá entender o que você fala.", type: 'auto' },
    { id: "monk_diamond_soul", level: 14, name: "Alma de Diamante", description: "Sua maestria do chi concede proficiência em todos os testes de resistência. Além disso, se falhar em um teste de resistência, pode gastar 1 ponto de chi para rolar novamente e ficar com o segundo resultado.", type: 'auto' },
    { id: "monk_timeless_body_monk", level: 15, name: "Corpo Atemporal (Monge)", description: "Seu chi o sustenta tanto que você não sofre os efeitos da velhice e não pode envelhecer magicamente. Você ainda morrerá de velhice, no entanto. Além disso, você não precisa mais de comida ou água.", type: 'auto' },
    { id: "monk_asi_16", level: 16, name: "Incremento no Valor de Habilidade (Monge Nível 16)", type: 'asi', description: "Aumente seus atributos." },
    { id: "monk_tradition_feature_17", level: 17, name: "Característica de Tradição Monástica (Nível 17)", description: "Você ganha uma característica da sua tradição.", type: 'auto' },
    { id: "monk_empty_body", level: 18, name: "Corpo Vazio", description: "Pode usar ação para gastar 4 pontos de chi e ficar invisível por 1 minuto (com resistência a todos os danos exceto energia). Pode gastar 8 pontos de chi para conjurar projeção astral (sem componentes materiais).", type: 'auto' },
    { id: "monk_asi_19", level: 19, name: "Incremento no Valor de Habilidade (Monge Nível 19)", type: 'asi', description: "Aumente seus atributos." },
    { id: "monk_perfect_self", level: 20, name: "Auto Aperfeiçoamento", description: "Quando rolar iniciativa e não tiver nenhum ponto de chi restante, você recupera 4 pontos de chi.", type: 'auto' },
];



export const ALL_CLASS_FEATURES_MAP: Record<string, ClassFeatureDefinition[]> = {
  "Patrulheiro": RANGER_FEATURES_DEFINITIONS,
  "Mago": WIZARD_FEATURES_DEFINITIONS,
  "Guerreiro": FIGHTER_FEATURES_DEFINITIONS,
  "Bárbaro": BARBARIAN_FEATURES_DEFINITIONS,
  "Bardo": BARD_FEATURES_DEFINITIONS,
  "Clérigo": CLERIC_FEATURES_DEFINITIONS,
  "Bruxo": WARLOCK_FEATURES_DEFINITIONS, 
  "Druida": DRUID_FEATURES_DEFINITIONS, 
  "Feiticeiro": SORCERER_FEATURES_DEFINITIONS, 
  "Ladino": ROGUE_FEATURES_DEFINITIONS,
  "Monge": MONK_FEATURES_DEFINITIONS,
  "Paladino": PALADIN_FEATURES_DEFINITIONS, 
};