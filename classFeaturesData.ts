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
    choices: FIGHTING_STYLE_OPTIONS.filter(opt => opt.name !== "" && ["Arquearia", "Combate com Duas Armas", "Defesa", "Duelismo"].includes(opt.name)).map(opt => ({value: opt.name, label: opt.name, description: opt.description})),
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
    id: "wizard_abjuration_savant", level: 2, name: "Pupilo da Abjuração",
    description: "O ouro e o tempo que você deve gastar para copiar uma magia da escola de Abjuração em seu grimório são reduzidos pela metade.",
    type: 'auto',
    subclassPrerequisite: { featureId: "wizard_arcane_tradition", choiceValue: "abjuration" }
  },
  {
    id: "wizard_arcane_ward", level: 2, name: "Ala Arcana",
    description: "Você pode tecer a magia ao seu redor para proteção. Quando você conjura uma magia de abjuração de 1º nível ou superior, você pode, simultaneamente, usar os fios de magia para criar uma ala mágica em você que dura até você terminar um descanso longo. A ala tem pontos de vida iguais ao dobro do seu nível de mago + seu modificador de Inteligência. Sempre que você sofre dano, a ala sofre o dano em seu lugar. Se este dano reduzir a ala a 0 pontos de vida, você sofre qualquer dano remanescente. Enquanto a ala tiver 0 pontos de vida, ela não pode absorver dano, mas sua magia permanece. Sempre que você conjura uma magia de abjuração de 1º nível ou superior, a ala recupera um número de pontos de vida igual ao dobro do nível da magia.",
    type: 'auto',
    subclassPrerequisite: { featureId: "wizard_arcane_tradition", choiceValue: "abjuration" }
  },
  {
    id: "wizard_evocation_savant", level: 2, name: "Pupilo da Evocação",
    description: "O ouro e o tempo para copiar magias de Evocação em seu grimório são reduzidos pela metade.",
    type: 'auto',
    subclassPrerequisite: { featureId: "wizard_arcane_tradition", choiceValue: "evocation" }
  },
  {
    id: "wizard_sculpt_spells", level: 2, name: "Esculpir Magias",
    description: "Você pode criar bolsões de segurança relativa dentro dos efeitos de suas magias de evocação. Ao conjurar uma magia de evocação que afeta outras criaturas que você possa ver, escolha um número de criaturas igual a 1 + o nível da magia. As criaturas escolhidas passam automaticamente nos testes de resistência contra a magia e não sofrem dano se normalmente sofreriam metade do dano em um teste bem-sucedido.",
    type: 'auto',
    subclassPrerequisite: { featureId: "wizard_arcane_tradition", choiceValue: "evocation" }
  },
  {
    id: "wizard_portent", level: 2, name: "Portento",
    description: "Você vislumbra o futuro. Ao terminar um descanso longo, role dois d20s e anote os números. Você pode substituir qualquer jogada de ataque, teste de resistência ou teste de habilidade feito por você ou por uma criatura que você possa ver por um desses rolagens de presságio. Você deve optar por fazer isso antes da rolagem e só pode substituir uma rolagem por turno. Cada rolagem de presságio pode ser usada apenas uma vez. Você perde quaisquer rolagens de presságio não utilizadas quando terminar um descanso longo.",
    type: 'auto',
    subclassPrerequisite: { featureId: "wizard_arcane_tradition", choiceValue: "divination" }
  },
  {
    id: "wizard_asi_4", level: 4, name: "Incremento no Valor de Habilidade (Mago Nível 4)",
    description: "Você pode aumentar um valor de habilidade à sua escolha em 2, ou pode aumentar dois valores de habilidade à sua escolha em 1. Como sempre, você não pode aumentar um valor de habilidade acima de 20 usando esta característica.",
    type: 'asi',
  },
  {
    id: "wizard_projected_ward", level: 6, name: "Ala Projetada",
    description: "Quando uma criatura que você pode ver a até 9 metros de você sofre dano, você pode usar sua reação para que sua Ala Arcana absorva esse dano. Se esse dano reduzir a ala a 0 pontos de vida, a criatura protegida sofre qualquer dano remanescente.",
    type: 'auto',
    subclassPrerequisite: { featureId: "wizard_arcane_tradition", choiceValue: "abjuration" }
  },
  {
    id: "wizard_potent_cantrip", level: 6, name: "Truque Potente",
    description: "Quando uma criatura passa no teste de resistência contra seu truque, a criatura sofre metade do dano do truque (se houver), mas não sofre nenhum efeito adicional do truque.",
    type: 'auto',
    subclassPrerequisite: { featureId: "wizard_arcane_tradition", choiceValue: "evocation" }
  },
  {
    id: "wizard_expert_divination", level: 6, name: "Adivinhação Perita",
    description: "Ao conjurar uma magia de adivinhação de 2º nível ou superior usando um espaço de magia, você recupera um espaço de magia gasto. O espaço que você recupera deve ser de um nível inferior à magia que você conjurou e não pode ser de nível superior ao 5º.",
    type: 'auto',
    subclassPrerequisite: { featureId: "wizard_arcane_tradition", choiceValue: "divination" }
  },
  {
    id: "wizard_asi_8", level: 8, name: "Incremento no Valor de Habilidade (Mago Nível 8)",
    description: "Aumente seus atributos conforme descrito na característica de Nível 4.",
    type: 'asi',
  },
  {
    id: "wizard_improved_abjuration", level: 10, name: "Abjuração Aprimorada",
    description: "Quando você conjura uma magia de abjuração que requer que você faça um teste de habilidade como parte da conjuração (como em dissipar magia ou contra-mágica), você adiciona seu bônus de proficiência ao seu teste de habilidade.",
    type: 'auto',
    subclassPrerequisite: { featureId: "wizard_arcane_tradition", choiceValue: "abjuration" }
  },
  {
    id: "wizard_empowered_evocation", level: 10, name: "Evocação Fortalecida",
    description: "Você pode adicionar seu modificador de Inteligência a uma jogada de dano de qualquer magia de evocação de mago que você conjurar.",
    type: 'auto',
    subclassPrerequisite: { featureId: "wizard_arcane_tradition", choiceValue: "evocation" }
  },
  {
    id: "wizard_the_third_eye", level: 10, name: "O Terceiro Olho",
    description: "Você pode usar sua ação para aumentar seus poderes de percepção. Ao fazer isso, escolha um dos seguintes benefícios, que dura até você ser incapacitado ou começar um descanso longo: Visão no escuro, Visão etérea, Compreensão maior (ler qualquer idioma), Ver invisibilidade.",
    type: 'auto',
    subclassPrerequisite: { featureId: "wizard_arcane_tradition", choiceValue: "divination" }
  },
   {
    id: "wizard_asi_12", level: 12, name: "Incremento no Valor de Habilidade (Mago Nível 12)",
    description: "Aumente seus atributos conforme descrito na característica de Nível 4.",
    type: 'asi',
  },
  {
    id: "wizard_spell_resistance", level: 14, name: "Resistência à Magia",
    description: "Você tem vantagem em testes de resistência contra magias. Além disso, você tem resistência ao dano de magias.",
    type: 'auto',
    subclassPrerequisite: { featureId: "wizard_arcane_tradition", choiceValue: "abjuration" }
  },
  {
    id: "wizard_overchannel", level: 14, name: "Sobrecarregar Magia",
    description: "Você pode aumentar o poder de suas magias mais simples. Ao conjurar uma magia de mago de 1º a 5º nível que causa dano, você pode causar dano máximo com essa magia. Na primeira vez que fizer isso, você não sofre efeitos adversos. Se usar esta característica novamente antes de terminar um descanso longo, você sofre 2d12 de dano necrótico para cada nível da magia, imediatamente após conjurá-la. Cada vez que usar esta característica novamente antes de terminar um descanso longo, o dano necrótico por nível de magia aumenta em 1d12.",
    type: 'auto',
    subclassPrerequisite: { featureId: "wizard_arcane_tradition", choiceValue: "evocation" }
  },
  {
    id: "wizard_greater_portent", level: 14, name: "Portento Maior",
    description: "Você rola três d20s para sua característica Portento, em vez de dois.",
    type: 'auto',
    subclassPrerequisite: { featureId: "wizard_arcane_tradition", choiceValue: "divination" }
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

const TOTEM_SPIRIT_CHOICES: FeatureChoiceDefinition[] = [
    { value: "bear", label: "Urso", description: "Enquanto estiver em fúria, você tem resistência a todos os tipos de dano, exceto psíquico." },
    { value: "eagle", label: "Águia", description: "Enquanto estiver em fúria e não estiver vestindo armadura pesada, outras criaturas têm desvantagem em ataques de oportunidade contra você, e você pode usar a ação de Disparada como uma ação bônus em seu turno." },
    { value: "wolf", label: "Lobo", description: "Enquanto estiver em fúria, seus amigos têm vantagem nas jogadas de ataque corpo-a-corpo contra qualquer criatura a 1,5 metro de você que seja hostil a você." },
];

const ASPECT_OF_THE_BEAST_CHOICES: FeatureChoiceDefinition[] = [
    { value: "bear", label: "Urso", description: "Você ganha a força de um urso. Sua capacidade de carga (incluindo carga máxima e levantamento) é dobrada, e você tem vantagem em testes de Força feitos para empurrar, levantar, puxar ou quebrar objetos." },
    { value: "eagle", label: "Águia", description: "Você ganha os olhos de uma águia. Você pode ver até 1,6 km de distância sem dificuldade, capaz de discernir detalhes como se estivesse olhando para algo a não mais de 30 metros de distância. Além disso, a penumbra não impõe desvantagem em seus testes de Sabedoria (Percepção)." },
    { value: "wolf", label: "Lobo", description: "Você ganha os instintos de caça de um lobo. Você pode rastrear outras criaturas enquanto viaja em um ritmo rápido, e pode se mover furtivamente enquanto viaja em um ritmo normal." },
];

const TOTEMIC_ATTUNEMENT_CHOICES: FeatureChoiceDefinition[] = [
    { value: "bear", label: "Urso", description: "Enquanto você está em fúria, qualquer criatura a 1,5 metro de você que seja hostil a você tem desvantagem nas jogadas de ataque contra alvos que não sejam você ou outra pessoa com esta característica. Um inimigo é imune a este efeito se não puder ver ou ouvir você ou se não puder ser amedrontado." },
    { value: "eagle", label: "Águia", description: "Enquanto estiver em fúria, você tem um deslocamento de voo igual ao seu deslocamento de caminhada atual. Este benefício funciona apenas em rajadas curtas; você cai se terminar seu turno no ar e nada além do seu voo o estiver segurando no ar." },
    { value: "wolf", label: "Lobo", description: "Enquanto estiver em fúria, você pode usar uma ação bônus em seu turno para derrubar uma criatura Grande ou menor quando a atingir com um ataque corpo a corpo com arma." },
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
  {
    id: "barbarian_totem_spirit_animal", level: 3, name: "Animal Espiritual (Totem)",
    description: "O seu é um caminho que busca a sintonia com o mundo natural, dando-lhe uma afinidade com os animais. No 3º nível, quando você adota este caminho, você ganha a habilidade de conjurar as magias sentido animal e falar com animais, mas apenas como rituais.",
    type: 'auto',
    subclassPrerequisite: { featureId: 'barbarian_primal_path', choiceValue: 'totem_warrior' }
  },
  {
    id: "barbarian_totem_spirit_choice", level: 3, name: "Espírito Totêmico",
    description: "No 3º nível, você escolhe um espírito totêmico e ganha sua característica. Você deve fazer ou adquirir uma representação física do totem - um amuleto ou objeto similar - e carregá-lo com você.",
    type: 'choice', selectionPrompt: "Escolha seu Espírito Totêmico:",
    choices: TOTEM_SPIRIT_CHOICES, maxChoices: 1,
    subclassPrerequisite: { featureId: 'barbarian_primal_path', choiceValue: 'totem_warrior' }
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
  {
    id: "barbarian_totem_aspect_of_beast", level: 6, name: "Aspecto da Fera",
    description: "No 6º nível, você ganha um benefício mágico baseado no totem animal de sua escolha. Você pode escolher o mesmo animal que selecionou no 3º nível ou um diferente.",
    type: 'choice', selectionPrompt: "Escolha seu Aspecto da Fera:",
    choices: ASPECT_OF_THE_BEAST_CHOICES, maxChoices: 1,
    subclassPrerequisite: { featureId: 'barbarian_primal_path', choiceValue: 'totem_warrior' }
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
  {
    id: "barbarian_totem_spirit_walker", level: 10, name: "Caminhante Espiritual",
    description: "No 10º nível, você pode conjurar a magia comunhão com a natureza, mas apenas como um ritual. Quando o fizer, uma versão espiritual de um dos animais que você escolheu para Espírito Totêmico ou Aspecto da Fera aparece para você para transmitir as informações que você busca.",
    type: 'auto',
    subclassPrerequisite: { featureId: 'barbarian_primal_path', choiceValue: 'totem_warrior' }
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
  {
    id: "barbarian_totem_attunement", level: 14, name: "Sintonia Totêmica",
    description: "No 14º nível, você ganha um benefício mágico baseado em um totem animal de sua escolha. Você pode escolher o mesmo animal que selecionou anteriormente ou um diferente.",
    type: 'choice', selectionPrompt: "Escolha sua Sintonia Totêmica:",
    choices: TOTEMIC_ATTUNEMENT_CHOICES, maxChoices: 1,
    subclassPrerequisite: { featureId: 'barbarian_primal_path', choiceValue: 'totem_warrior' }
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
  { 
    id: "bard_lore_bonus_proficiencies", level: 3, name: "Proficiências Bônus (Conhecimento)",
    description: "Você ganha proficiência em três perícias de sua escolha.",
    type: 'auto', // Player needs to select skills
    subclassPrerequisite: { featureId: 'bard_college', choiceValue: 'lore' }
  },
  { 
    id: "bard_lore_cutting_words", level: 3, name: "Palavras Cortantes",
    description: "Você aprende a usar sua perspicácia para distrair, confundir e minar a confiança e competência de outros. Quando uma criatura que você pode ver a até 18 metros de você faz uma jogada de ataque, um teste de habilidade ou uma jogada de dano, você pode usar sua reação para gastar um de seus usos de Inspiração de Bardo, rolando um dado de Inspiração de Bardo e subtraindo o número rolado da rolagem da criatura.",
    type: 'auto',
    subclassPrerequisite: { featureId: 'bard_college', choiceValue: 'lore' }
  },
  { 
    id: "bard_valor_bonus_proficiencies", level: 3, name: "Proficiências Bônus (Bravura)",
    description: "Você ganha proficiência com armaduras médias, escudos e armas marciais.",
    type: 'auto',
    subclassPrerequisite: { featureId: 'bard_college', choiceValue: 'valor' }
  },
  { 
    id: "bard_valor_combat_inspiration", level: 3, name: "Inspiração em Combate",
    description: "Você aprende a inspirar outros em batalha. Uma criatura que tenha um dado de Inspiração de Bardo seu pode rolar esse dado e adicioná-lo a uma jogada de dano de arma que acabou de fazer. Alternativamente, quando uma jogada de ataque é feita contra a criatura, ela pode usar sua reação para rolar o dado de Inspiração de Bardo e adicioná-lo à sua CA contra aquele ataque, depois que a rolagem for feita, mas antes de saber se acerta ou erra.",
    type: 'auto',
    subclassPrerequisite: { featureId: 'bard_college', choiceValue: 'valor' }
  },
  { id: "bard_asi_4", level: 4, name: "Incremento no Valor de Habilidade (Bardo Nível 4)", type: 'asi', description: "Aumente seus atributos." },
  { id: "bard_font_of_inspiration", level: 5, name: "Fonte de Inspiração", description: "Começando no momento em que você atinge o 5° nível, você recupera todas as utilizações gastas da sua Inspiração de Bardo quando você termina um descanso curto ou longo.", type: 'auto' },
  { id: "bard_bardic_inspiration_d8", level: 5, name: "Inspiração de Bardo (d8)", description: "Seu dado de Inspiração de Bardo torna-se d8.", type: 'auto', prerequisiteFeatureId: "bard_bardic_inspiration_d6" },
  { id: "bard_countercharm", level: 6, name: "Canção de Proteção", description: "No 6° nível, você adquire a habilidade de usar notas musicais ou palavras de poder para interromper efeito de influência mental. Com uma ação, você pode começar uma atuação que dura até o fim do seu próximo turno. Durante esse tempo, você e qualquer criatura amigável a até 9 metros de você terá vantagem em testes de resistência para não ser amedrontado ou enfeitiçado. Uma criatura deve ser capaz de ouvir você para receber esse benefício. A atuação termina prematuramente se você for incapacitado ou silenciado ou se você terminá-la voluntariamente (não requer ação).", type: 'auto' },
  { 
    id: "bard_lore_additional_magical_secrets", level: 6, name: "Segredos Mágicos Adicionais",
    description: "No 6º nível, você aprende duas magias de sua escolha de qualquer classe. A magia que você escolher deve ser de um nível que você possa conjurar, como mostrado na tabela de Bardo, ou um truque. As magias escolhidas contam como magias de bardo para você, mas não contam para o número de magias de bardo que você conhece.",
    type: 'auto', // Player needs to select spells
    subclassPrerequisite: { featureId: 'bard_college', choiceValue: 'lore' }
  },
  { 
    id: "bard_valor_extra_attack", level: 6, name: "Ataque Extra (Bravura)",
    description: "A partir do 6º nível, você pode atacar duas vezes, em vez de uma, sempre que realizar a ação de Ataque em seu turno.",
    type: 'auto',
    subclassPrerequisite: { featureId: 'bard_college', choiceValue: 'valor' }
  },
  { id: "bard_asi_8", level: 8, name: "Incremento no Valor de Habilidade (Bardo Nível 8)", type: 'asi', description: "Aumente seus atributos." },
  { id: "bard_song_of_rest_d8", level: 9, name: "Canção do Descanso (d8)", description: "Seu dado de Canção do Descanso torna-se d8.", type: 'auto', prerequisiteFeatureId: "bard_song_of_rest_d6" },
  { id: "bard_expertise_2", level: 10, name: "Aptidão (Expertise - 2ª vez)", description: "No 10° nível, escolha mais duas de suas perícias proficientes. Seu bônus de proficiência é dobrado em qualquer teste de habilidade que você fizer que utilize qualquer das perícias escolhidas.", type: 'auto' }, 
  { id: "bard_bardic_inspiration_d10", level: 10, name: "Inspiração de Bardo (d10)", description: "Seu dado de Inspiração de Bardo torna-se d10.", type: 'auto', prerequisiteFeatureId: "bard_bardic_inspiration_d8" },
  { id: "bard_magical_secrets_10", level: 10, name: "Segredos Mágicos (10º nível)", description: "No 10º nível, você usurpou conhecimento mágico de um vasto espectro de disciplinas. Escolha duas magias de qualquer classe, incluindo essa. A magia que você escolher deve ser de um nível que você possa conjurar, como mostrado na tabela O Bardo, ou um truque. As magias escolhidas contam como magias de bardo para você e já estão incluídas no número da coluna Magias Conhecidas da tabela O Bardo.", type: 'auto' }, // Player needs to select spells
  { id: "bard_asi_12", level: 12, name: "Incremento no Valor de Habilidade (Bardo Nível 12)", type: 'asi', description: "Aumente seus atributos." },
  { id: "bard_song_of_rest_d10", level: 13, name: "Canção do Descanso (d10)", description: "Seu dado de Canção do Descanso torna-se d10.", type: 'auto', prerequisiteFeatureId: "bard_song_of_rest_d8" },
  { 
    id: "bard_lore_peerless_skill", level: 14, name: "Perícia Inigualável",
    description: "A partir do 14º nível, quando você faz um teste de habilidade, você pode gastar um uso de Inspiração de Bardo. Role um dado de Inspiração de Bardo e adicione o número rolado ao seu teste de habilidade. Você pode escolher fazer isso depois de rolar o dado para o teste de habilidade, mas antes que o Mestre diga se você foi bem-sucedido ou falhou.",
    type: 'auto',
    subclassPrerequisite: { featureId: 'bard_college', choiceValue: 'lore' }
  },
  { 
    id: "bard_valor_battle_magic", level: 14, name: "Magia de Batalha",
    description: "No 14º nível, você dominou a arte de tecer conjuração e uso de armas em um ato harmonioso. Quando você usa sua ação para conjurar uma magia de bardo, você pode fazer um ataque com arma como uma ação bônus.",
    type: 'auto',
    subclassPrerequisite: { featureId: 'bard_college', choiceValue: 'valor' }
  },
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
  { id: "cleric_life_bonus_proficiency", level: 1, name: "Proficiência Bônus (Vida)", description: "Você ganha proficiência com armadura pesada.", type: 'auto', subclassPrerequisite: { featureId: 'cleric_divine_domain', choiceValue: 'life' } },
  { id: "cleric_life_disciple_of_life", level: 1, name: "Discípulo da Vida", description: "Sempre que você usar uma magia de 1º nível ou superior para restaurar pontos de vida a uma criatura, a criatura recupera pontos de vida adicionais iguais a 2 + o nível da magia.", type: 'auto', subclassPrerequisite: { featureId: 'cleric_divine_domain', choiceValue: 'life' } },
  { id: "cleric_war_bonus_proficiency", level: 1, name: "Proficiência Bônus (Guerra)", description: "Você ganha proficiência com armas marciais e armadura pesada.", type: 'auto', subclassPrerequisite: { featureId: 'cleric_divine_domain', choiceValue: 'war' } },
  { id: "cleric_war_priest", level: 1, name: "Sacerdote da Guerra", description: "Você pode fazer um ataque como uma ação bônus quando usa a ação de Ataque. Você pode usar esta característica um número de vezes igual ao seu modificador de Sabedoria (mínimo de uma vez). Você recupera todos os usos gastos após um descanso longo.", type: 'auto', subclassPrerequisite: { featureId: 'cleric_divine_domain', choiceValue: 'war' } },
  { id: "cleric_channel_divinity_1", level: 2, name: "Canalizar Divindade (1/descanso)", description: "No 2º nível, você ganha a habilidade de canalizar energia divina diretamente de sua divindade, usando essa energia para abastecer efeitos mágicos. Você começa com dois desses efeitos: Expulsar Mortos-Vivos e um efeito determinado pelo seu domínio. Você precisa terminar um descanso curto ou longo para usar seu Canalizar Divindade novamente.", type: 'auto' },
  { id: "cleric_channel_divinity_turn_undead", level: 2, name: "Canalizar Divindade: Expulsar Mortos-Vivos", description: "Com uma ação, você levanta seu símbolo sagrado e murmura uma prece repreendendo os mortos-vivos. Cada morto-vivo que puder ver ou ouvir você em um raio de 9 metros a partir de você, deve fazer um teste de resistência de Sabedoria. Se falhar, a criatura está expulsa por 1 minuto ou até sofrer algum dano.", type: 'auto' },
  { id: "cleric_life_channel_divinity", level: 2, name: "Canalizar Divindade: Preservar a Vida", description: "Como uma ação, você apresenta seu símbolo sagrado e evoca energia curativa que pode restaurar um número de pontos de vida igual a cinco vezes seu nível de clérigo. Escolha qualquer criatura a até 9 metros de você, e divida esses pontos de vida entre elas. Esta característica não pode restaurar uma criatura a mais da metade de seus pontos de vida máximos. Você não pode usar esta característica em um morto-vivo ou um construto.", type: 'auto', subclassPrerequisite: { featureId: 'cleric_divine_domain', choiceValue: 'life' } },
  { id: "cleric_war_channel_divinity", level: 2, name: "Canalizar Divindade: Ataque Guiado", description: "Você pode usar seu Canalizar Divindade para golpear com precisão sobrenatural. Quando você faz uma jogada de ataque, você pode usar seu Canalizar Divindade para ganhar um bônus de +10 na rolagem. Você faz essa escolha depois de ver a rolagem, mas antes que o Mestre diga se o ataque acerta ou erra.", type: 'auto', subclassPrerequisite: { featureId: 'cleric_divine_domain', choiceValue: 'war' } },
  { id: "cleric_asi_4", level: 4, name: "Incremento no Valor de Habilidade (Clérigo Nível 4)", type: 'asi', description: "Aumente seus atributos." },
  { id: "cleric_destroy_undead_cr_half", level: 5, name: "Destruir Mortos-Vivos (ND 1/2)", description: "A partir do 5º nível, quando um morto-vivo falhar no teste de resistência contra a sua característica Expulsar Mortos-Vivos, ele é instantaneamente destruído se o Nível de Desafio dele for menor ou igual a 1/2.", type: 'auto' },
  { id: "cleric_channel_divinity_2", level: 6, name: "Canalizar Divindade (2/descanso)", description: "A partir do 6º nível, você pode Canalizar Divindade duas vezes entre descansos.", type: 'auto' },
  { id: "cleric_life_blessed_healer", level: 6, name: "Curandeiro Abençoado", description: "A partir do 6º nível, as magias de cura que você conjura nos outros também curam você. Quando você conjura uma magia de 1º nível ou superior que restaura pontos de vida a uma criatura que não seja você, você recupera pontos de vida iguais a 2 + o nível da magia.", type: 'auto', subclassPrerequisite: { featureId: 'cleric_divine_domain', choiceValue: 'life' } },
  { id: "cleric_war_channel_divinity_2", level: 6, name: "Canalizar Divindade: Bênção do Deus da Guerra", description: "Quando uma criatura a até 9 metros de você faz uma jogada de ataque, você pode usar sua reação para conceder a essa criatura um bônus de +10 na rolagem, usando seu Canalizar Divindade. Você faz essa escolha depois de ver a rolagem, mas antes que o Mestre diga se o ataque acerta ou erra.", type: 'auto', subclassPrerequisite: { featureId: 'cleric_divine_domain', choiceValue: 'war' } },
  { id: "cleric_asi_8", level: 8, name: "Incremento no Valor de Habilidade (Clérigo Nível 8)", type: 'asi', description: "Aumente seus atributos." },
  { id: "cleric_destroy_undead_cr_1", level: 8, name: "Destruir Mortos-Vivos (ND 1)", description: "Sua capacidade de Destruir Mortos-Vivos aumenta para ND 1.", type: 'auto', prerequisiteFeatureId: "cleric_destroy_undead_cr_half" },
  { id: "cleric_life_divine_strike", level: 8, name: "Golpe Divino (Vida)", description: "No 8º nível, você ganha a habilidade de infundir seus ataques com arma com poder divino. Uma vez em cada um de seus turnos, quando você atinge uma criatura com um ataque com arma, você pode fazer com que o ataque cause um extra 1d8 de dano radiante ao alvo. Quando você alcança o 14º nível, o dano extra aumenta para 2d8.", type: 'auto', subclassPrerequisite: { featureId: 'cleric_divine_domain', choiceValue: 'life' } },
  { id: "cleric_war_divine_strike", level: 8, name: "Golpe Divino (Guerra)", description: "Você ganha a habilidade de infundir seus ataques com arma com poder divino. Uma vez em cada um de seus turnos, quando você atinge uma criatura com um ataque com arma, você pode fazer com que o ataque cause um dano extra do mesmo tipo do dano da arma. O dano extra é 1d8 no 8º nível e aumenta para 2d8 no 14º nível.", type: 'auto', subclassPrerequisite: { featureId: 'cleric_divine_domain', choiceValue: 'war' } },
  { id: "cleric_divine_intervention", level: 10, name: "Intervenção Divina", description: "A partir do 10º nível, você pode rogar à sua divindade para que auxilie você em uma árdua tarefa. Implorar pelo auxílio requer uma ação. Você precisa descrever o que busca e realizar uma rolagem de dado de porcentagem. Se o resultado for menor ou igual ao seu nível de clérigo, sua divindade intervém. O Mestre escolhe a natureza da intervenção. Se sua divindade intervir, você fica impedido de usar essa característica de novo por 7 dias. Do contrário, você pode usá-la de novo após terminar um descanso longo.", type: 'auto' },
  { id: "cleric_destroy_undead_cr_2", level: 11, name: "Destruir Mortos-Vivos (ND 2)", description: "Sua capacidade de Destruir Mortos-Vivos aumenta para ND 2.", type: 'auto', prerequisiteFeatureId: "cleric_destroy_undead_cr_1" },
  { id: "cleric_asi_12", level: 12, name: "Incremento no Valor de Habilidade (Clérigo Nível 12)", type: 'asi', description: "Aumente seus atributos." },
  { id: "cleric_destroy_undead_cr_3", level: 14, name: "Destruir Mortos-Vivos (ND 3)", description: "Sua capacidade de Destruir Mortos-Vivos aumenta para ND 3.", type: 'auto', prerequisiteFeatureId: "cleric_destroy_undead_cr_2" },
  { id: "cleric_asi_16", level: 16, name: "Incremento no Valor de Habilidade (Clérigo Nível 16)", type: 'asi', description: "Aumente seus atributos." },
  { id: "cleric_destroy_undead_cr_4", level: 17, name: "Destruir Mortos-Vivos (ND 4)", description: "Sua capacidade de Destruir Mortos-Vivos aumenta para ND 4.", type: 'auto', prerequisiteFeatureId: "cleric_destroy_undead_cr_3" },
  { id: "cleric_life_supreme_healing", level: 17, name: "Cura Suprema", description: "A partir do 17º nível, quando você normalmente rolaria um ou mais dados para restaurar pontos de vida com uma magia, você em vez disso usa o maior número possível para cada dado. Por exemplo, em vez de restaurar 2d6 pontos de vida a uma criatura, você restaura 12.", type: 'auto', subclassPrerequisite: { featureId: 'cleric_divine_domain', choiceValue: 'life' } },
  { id: "cleric_war_avatar_of_battle", level: 17, name: "Avatar da Batalha", description: "No 17º nível, você ganha resistência a dano de concussão, cortante e perfurante de ataques não mágicos.", type: 'auto', subclassPrerequisite: { featureId: 'cleric_divine_domain', choiceValue: 'war' } },
  { id: "cleric_channel_divinity_3", level: 18, name: "Canalizar Divindade (3/descanso)", description: "A partir do 18º nível, você pode Canalizar Divindade três vezes entre descansos.", type: 'auto' },
  { id: "cleric_asi_19", level: 19, name: "Incremento no Valor de Habilidade (Clérigo Nível 19)", type: 'asi', description: "Aumente seus atributos." },
  { id: "cleric_divine_intervention_improvement", level: 20, name: "Aprimoramento de Intervenção Divina", description: "No 20º nível, seus pedidos de intervenção funcionam automaticamente, sem necessidade de rolagem de dados.", type: 'auto', prerequisiteFeatureId: "cleric_divine_intervention" },
];

// --- Warlock Feature Definitions ---
export const WARLOCK_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [
  { id: "warlock_otherworldly_patron", level: 1, name: "Patrono Transcendental", description: "No 1º nível, você conclui uma barganha com um ser transcendental à sua escolha.", type: 'choice', selectionPrompt: "Escolha seu Patrono Transcendental:", choices: WARLOCK_PATRON_CHOICES, maxChoices: 1 },
  { id: "warlock_pact_magic", level: 1, name: "Magia de Pacto", description: "Sua pesquisa arcana e a magia outorgada a você por seu patrono lhe concedem uma gama de magias. Carisma é sua habilidade de conjuração.", type: 'auto' },
  { id: "warlock_archfey_fey_presence", level: 1, name: "Presença Feérica", description: "A partir do 1º nível, seu patrono lhe concede a habilidade de projetar a presença sedutora e aterrorizante das fadas. Como uma ação, você pode fazer com que cada criatura em um cubo de 3 metros originado de você faça um teste de resistência de Sabedoria contra a CD de sua magia de bruxo. As criaturas que falharem em seu teste de resistência ficam todas enfeitiçadas ou amedrontadas por você (à sua escolha) até o final do seu próximo turno.", type: 'auto', subclassPrerequisite: { featureId: "warlock_otherworldly_patron", choiceValue: "archfey" } },
  { id: "warlock_fiend_dark_ones_blessing", level: 1, name: "Bênção do Tinhoso", description: "A partir do 1º nível, quando você reduz uma criatura hostil a 0 pontos de vida, você ganha pontos de vida temporários iguais ao seu modificador de Carisma + seu nível de bruxo (mínimo de 1).", type: 'auto', subclassPrerequisite: { featureId: "warlock_otherworldly_patron", choiceValue: "fiend" } },
  { id: "warlock_great_old_one_awakened_mind", level: 1, name: "Mente Desperta", description: "A partir do 1º nível, seu conhecimento alienígena lhe dá a habilidade de tocar a mente de outras criaturas. Você pode se comunicar telepaticamente com qualquer criatura que você possa ver a até 9 metros de você. Você não precisa compartilhar um idioma com a criatura para que ela entenda sua fala telepática, mas a criatura deve ser capaz de entender pelo menos um idioma.", type: 'auto', subclassPrerequisite: { featureId: "warlock_otherworldly_patron", choiceValue: "great_old_one" } },
  { id: "warlock_eldritch_invocations", level: 2, name: "Invocações Místicas", description: "No 2° nível, você ganha duas invocações místicas, à sua escolha. A lista de invocações disponíveis detalha os pré-requisitos.", type: 'choice', selectionPrompt: "Escolha 2 Invocações Místicas:", choices: WARLOCK_INVOCATION_CHOICES, maxChoices: 2 },
  { id: "warlock_pact_boon", level: 3, name: "Dádiva do Pacto", description: "No 3º nível, seu patrono transcendental lhe confere um dom por seus leais serviços.", type: 'choice', selectionPrompt: "Escolha sua Dádiva do Pacto:", choices: WARLOCK_PACT_BOON_CHOICES, maxChoices: 1 },
  { id: "warlock_asi_4", level: 4, name: "Incremento no Valor de Habilidade (Bruxo Nível 4)", type: 'asi', description: "Aumente seus atributos." },
  { id: "warlock_archfey_misty_escape", level: 6, name: "Fuga Enevoada", description: "A partir do 6º nível, você pode desaparecer em uma nuvem de névoa em resposta a um dano. Quando você sofre dano, você pode usar sua reação para se tornar invisível e se teleportar até 18 metros para um espaço desocupado que você possa ver. Você permanece invisível até o início do seu próximo turno ou até atacar ou conjurar uma magia. Uma vez que você usa esta característica, você não pode usá-la novamente até terminar um descanso curto ou longo.", type: 'auto', subclassPrerequisite: { featureId: "warlock_otherworldly_patron", choiceValue: "archfey" } },
  { id: "warlock_fiend_dark_ones_own_luck", level: 6, name: "Sorte do Tinhoso", description: "A partir do 6º nível, você pode recorrer ao seu patrono para alterar o destino a seu favor. Quando você faz um teste de habilidade ou um teste de resistência, você pode adicionar um d10 à sua rolagem. Você pode fazer isso depois de ver a rolagem inicial, mas antes que quaisquer efeitos da rolagem ocorram. Uma vez que você usa esta característica, você não pode usá-la novamente até terminar um descanso curto ou longo.", type: 'auto', subclassPrerequisite: { featureId: "warlock_otherworldly_patron", choiceValue: "fiend" } },
  { id: "warlock_great_old_one_entropic_ward", level: 6, name: "Guarda Entrópica", description: "No 6º nível, você aprende a se proteger magicamente contra ataques e a transformar os ataques fracassados de seus inimigos em boa sorte para você. Quando uma criatura faz uma jogada de ataque contra você, você pode usar sua reação para impor desvantagem nessa rolagem. Se o ataque errar você, sua próxima jogada de ataque contra a criatura tem vantagem se você a fizer antes do final do seu próximo turno. Uma vez que você usa esta característica, você não pode usá-la novamente até terminar um descanso curto ou longo.", type: 'auto', subclassPrerequisite: { featureId: "warlock_otherworldly_patron", choiceValue: "great_old_one" } },
  { id: "warlock_asi_8", level: 8, name: "Incremento no Valor de Habilidade (Bruxo Nível 8)", type: 'asi', description: "Aumente seus atributos." },
  { id: "warlock_archfey_beguiling_defenses", level: 10, name: "Defesas Enganosas", description: "A partir do 10º nível, seu patrono lhe ensinou como se defender de encantamentos. Você é imune à condição de enfeitiçado, e quando outra criatura tenta enfeitiçá-lo, você pode usar sua reação para tentar voltar o feitiço contra ela. A criatura deve ser bem-sucedida em um teste de resistência de Sabedoria contra sua CD de magia de bruxo ou ficará enfeitiçada por você por 1 minuto ou até que a criatura sofra algum dano.", type: 'auto', subclassPrerequisite: { featureId: "warlock_otherworldly_patron", choiceValue: "archfey" } },
  { id: "warlock_fiend_fiendish_resilience", level: 10, name: "Resistência Infernal", description: "A partir do 10º nível, você pode escolher um tipo de dano quando terminar um descanso curto ou longo. Você ganha resistência a esse tipo de dano até escolher um tipo de dano diferente com esta característica. Dano de armas mágicas ou de prata ignora esta resistência.", type: 'auto', subclassPrerequisite: { featureId: "warlock_otherworldly_patron", choiceValue: "fiend" } },
  { id: "warlock_great_old_one_thought_shield", level: 10, name: "Escudo de Pensamento", description: "A partir do 10º nível, seus pensamentos não podem ser lidos por telepatia ou outros meios, a menos que você permita. Você também tem resistência a dano psíquico, e sempre que uma criatura causa dano psíquico a você, essa criatura sofre a mesma quantidade de dano que você sofreu.", type: 'auto', subclassPrerequisite: { featureId: "warlock_otherworldly_patron", choiceValue: "great_old_one" } },
  { id: "warlock_mystic_arcanum_6", level: 11, name: "Arcana Mística (6º nível)", description: "Escolha uma magia de 6º nível da lista de bruxo como sua arcana. Pode conjurar uma vez sem espaço de magia (requer descanso longo).", type: 'auto' }, 
  { id: "warlock_asi_12", level: 12, name: "Incremento no Valor de Habilidade (Bruxo Nível 12)", type: 'asi', description: "Aumente seus atributos." },
  { id: "warlock_mystic_arcanum_7", level: 13, name: "Arcana Mística (7º nível)", description: "Escolha uma magia de 7º nível da lista de bruxo.", type: 'auto' }, 
  { id: "warlock_archfey_dark_delirium", level: 14, name: "Delírio Sombrio", description: "A partir do 14º nível, você pode mergulhar uma criatura em um reino de ilusão. Como uma ação, escolha uma criatura que você possa ver a até 18 metros de você. Ela deve fazer um teste de resistência de Sabedoria contra sua CD de magia de bruxo. Em uma falha, ela fica enfeitiçada ou amedrontada por você (à sua escolha) por 1 minuto ou até que sua concentração seja quebrada (como se você estivesse se concentrando em uma magia). Este efeito termina prematuramente se a criatura sofrer algum dano. Até que esta ilusão termine, a criatura pensa que está perdida em um reino enevoado, cuja aparência você escolhe. A criatura só pode ver e ouvir a si mesma, a você e à ilusão.", type: 'auto', subclassPrerequisite: { featureId: "warlock_otherworldly_patron", choiceValue: "archfey" } },
  { id: "warlock_fiend_hurl_through_hell", level: 14, name: "Atirar através do Inferno", description: "A partir do 14º nível, quando você atinge uma criatura com um ataque, você pode usar esta característica para instantaneamente transportar o alvo através dos planos inferiores. A criatura desaparece e é arremessada por uma paisagem de pesadelos. No final do seu próximo turno, o alvo retorna ao espaço que ocupava anteriormente, ou ao espaço desocupado mais próximo. Se o alvo não for um demônio, ele sofre 10d10 de dano psíquico ao retornar de sua terrível experiência. Uma vez que você usa esta característica, você não pode usá-la novamente até terminar um descanso longo.", type: 'auto', subclassPrerequisite: { featureId: "warlock_otherworldly_patron", choiceValue: "fiend" } },
  { id: "warlock_great_old_one_create_thrall", level: 14, name: "Criar Escravo", description: "No 14º nível, você ganha a habilidade de infectar a mente de um humanoide com a magia alienígena de seu patrono. Você pode usar sua ação para tocar um humanoide incapacitado. Aquela criatura é então enfeitiçada por você até que uma magia de remover maldição seja conjurada nela, a condição de enfeitiçado seja removida dela, ou você use esta característica novamente. Você pode se comunicar telepaticamente com a criatura enfeitiçada, contanto que ambos estejam no mesmo plano de existência.", type: 'auto', subclassPrerequisite: { featureId: "warlock_otherworldly_patron", choiceValue: "great_old_one" } },
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
  { id: "druid_wild_shape", level: 2, name: "Forma Selvagem", description: "Usa sua ação para assumir a forma de uma besta que você já viu (2x por descanso curto/longo). Seu ND máximo é 1/4 e a besta não pode ter deslocamento de voo ou natação.", type: 'auto' },
  { id: "druid_druid_circle", level: 2, name: "Círculo Druídico", description: "Escolha um círculo druídico que reflita sua conexão com a natureza.", type: 'choice', selectionPrompt: "Escolha seu Círculo Druídico:", choices: DRUID_CIRCLE_CHOICES, maxChoices: 1 },
  { 
    id: "druid_land_natural_recovery", level: 2, name: "Recuperação Natural",
    description: "Durante um descanso curto, você pode recuperar alguns de seus espaços de magia gastos. Uma vez por dia, ao terminar um descanso curto, você pode escolher espaços de magia gastos para recuperar. Os espaços podem ter um nível combinado igual ou inferior à metade do seu nível de druida (arredondado para cima), e nenhum pode ser de 6º nível ou superior.",
    type: 'auto',
    subclassPrerequisite: { featureId: "druid_druid_circle", choiceValue: "land" }
  },
  { 
    id: "druid_moon_combat_wild_shape", level: 2, name: "Forma Selvagem de Combate",
    description: "Você ganha a habilidade de usar a Forma Selvagem em seu turno como uma ação bônus, em vez de uma ação. Além disso, enquanto estiver transformado pela Forma Selvagem, você pode usar uma ação bônus para gastar um espaço de magia para recuperar 1d8 pontos de vida por nível do espaço de magia gasto.",
    type: 'auto',
    subclassPrerequisite: { featureId: "druid_druid_circle", choiceValue: "moon" }
  },
  { 
    id: "druid_moon_circle_forms", level: 2, name: "Formas do Círculo",
    description: "Os ritos do seu círculo concedem a você a habilidade de se transformar em bestas mais perigosas. A partir do 2º nível, você pode usar sua Forma Selvagem para se transformar em uma besta com um nível de desafio de até 1 (você ignora a coluna ND Máx. da tabela Formas de Besta, mas deve obedecer às outras limitações). A partir do 6º nível, você pode se transformar em uma besta com um nível de desafio tão alto quanto seu nível de druida dividido por 3, arredondado para baixo.",
    type: 'auto',
    subclassPrerequisite: { featureId: "druid_druid_circle", choiceValue: "moon" }
  },
  { id: "druid_asi_4", level: 4, name: "Incremento no Valor de Habilidade (Druida Nível 4)", type: 'asi', description: "Aumente seus atributos." },
  { id: "druid_wild_shape_improvement_4", level: 4, name: "Aprimoramento de Forma Selvagem (Natação)", description: "Seu ND máximo para Forma Selvagem aumenta para 1/2. As bestas agora podem ter deslocamento de natação, mas não de voo.", type: 'auto' },
  { 
    id: "druid_land_lands_stride", level: 6, name: "Passos da Terra",
    description: "Mover-se através de terreno difícil não mágico não custa movimento extra. Você também pode passar por plantas não mágicas sem ser retardado por elas e sem sofrer dano delas se tiverem espinhos ou perigos semelhantes. Além disso, você tem vantagem em testes de resistência contra plantas que são criadas ou manipuladas magicamente para impedir o movimento.",
    type: 'auto',
    subclassPrerequisite: { featureId: "druid_druid_circle", choiceValue: "land" }
  },
  { 
    id: "druid_moon_primal_strike", level: 6, name: "Golpes Primais",
    description: "Seus ataques na forma de besta contam como mágicos com o propósito de superar resistência e imunidade a ataques e danos não mágicos.",
    type: 'auto',
    subclassPrerequisite: { featureId: "druid_druid_circle", choiceValue: "moon" }
  },
  { id: "druid_asi_8", level: 8, name: "Incremento no Valor de Habilidade (Druida Nível 8)", type: 'asi', description: "Aumente seus atributos." },
  { id: "druid_wild_shape_improvement_8", level: 8, name: "Aprimoramento de Forma Selvagem (Voo)", description: "Seu ND máximo para Forma Selvagem aumenta para 1. As bestas agora podem ter deslocamento de voo.", type: 'auto' },
  { 
    id: "druid_land_natures_ward", level: 10, name: "Guarda da Natureza",
    description: "Você não pode ser enfeitiçado ou amedrontado por elementais ou fadas, e você ganha imunidade a veneno e doenças.",
    type: 'auto',
    subclassPrerequisite: { featureId: "druid_druid_circle", choiceValue: "land" }
  },
  { 
    id: "druid_moon_elemental_wild_shape", level: 10, name: "Forma Selvagem Elemental",
    description: "Você pode gastar dois usos de Forma Selvagem ao mesmo tempo para se transformar em um elemental do ar, elemental da terra, elemental do fogo ou elemental da água.",
    type: 'auto',
    subclassPrerequisite: { featureId: "druid_druid_circle", choiceValue: "moon" }
  },
  { id: "druid_asi_12", level: 12, name: "Incremento no Valor de Habilidade (Druida Nível 12)", type: 'asi', description: "Aumente seus atributos." },
  { 
    id: "druid_land_natures_sanctuary", level: 14, name: "Santuário da Natureza",
    description: "Quando uma besta ou criatura planta ataca você, essa criatura deve fazer um teste de resistência de Sabedoria contra sua CD de magia de druida. Em uma falha, a criatura deve escolher um alvo diferente, ou o ataque erra automaticamente. Em um sucesso, a criatura é imune a este efeito por 24 horas. A criatura está ciente deste efeito antes de fazer seu ataque contra você.",
    type: 'auto',
    subclassPrerequisite: { featureId: "druid_druid_circle", choiceValue: "land" }
  },
  { 
    id: "druid_moon_thousand_forms", level: 14, name: "Mil Formas",
    description: "Você aprende a usar magia para alterar sua forma física de maneiras mais sutis. Você pode conjurar a magia alterar-se à vontade.",
    type: 'auto',
    subclassPrerequisite: { featureId: "druid_druid_circle", choiceValue: "moon" }
  },
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
  { 
    id: "sorcerer_draconic_elemental_affinity", level: 6, name: "Afinidade Elemental", 
    description: "Quando você conjura uma magia que causa dano do tipo associado à sua ancestralidade dracônica, você pode adicionar seu modificador de Carisma a uma jogada de dano dessa magia. Ao mesmo tempo, você pode gastar 1 ponto de feitiçaria para ganhar resistência a esse tipo de dano por 1 hora.",
    type: 'auto',
    subclassPrerequisite: { featureId: "sorcerer_sorcerous_origin", choiceValue: "draconic" }
  },
  { 
    id: "sorcerer_wild_magic_bend_luck", level: 6, name: "Dobra a Sorte", 
    description: "Você tem a habilidade de distorcer o destino usando sua magia selvagem. Quando outra criatura que você pode ver faz uma jogada de ataque, um teste de habilidade ou um teste de resistência, você pode usar sua reação e gastar 2 pontos de feitiçaria para rolar 1d4 e aplicar o número como um bônus ou penalidade (à sua escolha) à rolagem da criatura. Você pode fazer isso depois que a criatura rolar, mas antes que o Mestre determine o resultado.",
    type: 'auto',
    subclassPrerequisite: { featureId: "sorcerer_sorcerous_origin", choiceValue: "wild_magic" }
  },
  { id: "sorcerer_asi_8", level: 8, name: "Incremento no Valor de Habilidade (Feiticeiro Nível 8)", type: 'asi', description: "Aumente seus atributos." },
  { id: "sorcerer_metamagic_10", level: 10, name: "Metamágica (Opção Adicional)", description: "Você ganha uma opção adicional de Metamágica.", type: 'choice', selectionPrompt: "Escolha mais 1 opção de Metamágica:", choices: METAMAGIC_OPTIONS_CHOICES, maxChoices: 1 },
  { id: "sorcerer_asi_12", level: 12, name: "Incremento no Valor de Habilidade (Feiticeiro Nível 12)", type: 'asi', description: "Aumente seus atributos." },
  { 
    id: "sorcerer_draconic_dragon_wings", level: 14, name: "Asas de Dragão", 
    description: "Você ganha a habilidade de brotar um par de asas de dragão de suas costas, ganhando um deslocamento de voo igual ao seu deslocamento atual. Você pode criar essas asas como uma ação bônus em seu turno. Elas duram até você as dispensar como uma ação bônus em seu turno. Você não pode manifestar suas asas enquanto estiver vestindo armadura, a menos que a armadura seja feita para acomodá-las, e roupas não feitas para acomodar suas asas podem ser destruídas quando você as manifesta.",
    type: 'auto',
    subclassPrerequisite: { featureId: "sorcerer_sorcerous_origin", choiceValue: "draconic" }
  },
  { 
    id: "sorcerer_wild_magic_controlled_chaos", level: 14, name: "Caos Controlado", 
    description: "Sempre que você rolar na Tabela de Surto de Magia Selvagem, você pode rolar duas vezes e usar qualquer um dos números.",
    type: 'auto',
    subclassPrerequisite: { featureId: "sorcerer_sorcerous_origin", choiceValue: "wild_magic" }
  },
  { id: "sorcerer_asi_16", level: 16, name: "Incremento no Valor de Habilidade (Feiticeiro Nível 16)", type: 'asi', description: "Aumente seus atributos." },
  { id: "sorcerer_metamagic_17", level: 17, name: "Metamágica (Outra Opção Adicional)", description: "Você ganha uma opção adicional de Metamágica.", type: 'choice', selectionPrompt: "Escolha mais 1 opção de Metamágica:", choices: METAMAGIC_OPTIONS_CHOICES, maxChoices: 1 },
  { 
    id: "sorcerer_draconic_draconic_presence", level: 18, name: "Presença Dracônica", 
    description: "Você pode canalizar as presenças temíveis dos dragões. Como uma ação, você pode gastar 5 pontos de feitiçaria para extrair a presença dracônica, fazendo com que cada criatura hostil a até 18 metros de você faça um teste de resistência de Sabedoria contra sua CD de magia de feiticeiro. Em uma falha, uma criatura fica enfeitiçada ou amedrontada por você (à sua escolha) por 1 minuto. Uma criatura pode repetir o teste de resistência no final de cada um de seus turnos, terminando o efeito em si mesma com um sucesso.",
    type: 'auto',
    subclassPrerequisite: { featureId: "sorcerer_sorcerous_origin", choiceValue: "draconic" }
  },
  { 
    id: "sorcerer_wild_magic_spell_bombardment", level: 18, name: "Bombardeio de Magias", 
    description: "O poder prejudicial de suas magias se intensifica. Quando você rola dano para uma magia e rola o valor mais alto possível em qualquer um dos dados, escolha um desses dados, role-o novamente e adicione essa rolagem ao dano.",
    type: 'auto',
    subclassPrerequisite: { featureId: "sorcerer_sorcerous_origin", choiceValue: "wild_magic" }
  },
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
  { id: "paladin_devotion_channel_divinity", level: 3, name: "Canalizar Divindade (Devoção)", description: "Você ganha as seguintes duas opções de Canalizar Divindade.\n\n• Arma Sagrada: Como uma ação, você pode imbuir uma arma que está segurando com energia positiva, usando seu Canalizar Divindade. Por 1 minuto, você adiciona seu modificador de Carisma às jogadas de ataque feitas com essa arma (com um bônus mínimo de +1). A arma também emite luz brilhante em um raio de 6 metros e penumbra por mais 6 metros. Se a arma não for já mágica, ela se torna mágica por essa duração.\n\n• Expulsar o Profano: Como uma ação, você apresenta seu símbolo sagrado e fala uma oração censurando demônios e mortos-vivos, usando seu Canalizar Divindade. Cada demônio ou morto-vivo que puder ver ou ouvir você a até 9 metros de você deve fazer um teste de resistência de Sabedoria. Se a criatura falhar em seu teste de resistência, ela é expulsa por 1 minuto ou até sofrer dano.", type: 'auto', subclassPrerequisite: { featureId: "paladin_sacred_oath", choiceValue: "devotion" } },
  { id: "paladin_ancients_channel_divinity", level: 3, name: "Canalizar Divindade (Anciões)", description: "Você ganha as seguintes duas opções de Canalizar Divindade.\n\n• Fúria da Natureza: Você pode usar seu Canalizar Divindade para invocar vinhas primordiais para prender um inimigo. Como uma ação, você pode fazer com que vinhas espectrais brotem e alcancem uma criatura a até 3 metros de você que você possa ver. A criatura deve ser bem-sucedida em um teste de resistência de Força ou Destreza (à escolha dela) ou ficará contida. Enquanto contida pelas vinhas, a criatura repete o teste de resistência no final de cada um de seus turnos. Com um sucesso, ela se liberta e as vinhas desaparecem.\n\n• Expulsar os Infiéis: Você pode usar seu Canalizar Divindade para proferir palavras antigas que são dolorosas para fadas e demônios ouvirem. Como uma ação, você apresenta seu símbolo sagrado, e cada fada ou demônio a até 9 metros de você que possa ouvi-lo deve fazer um teste de resistência de Sabedoria. Se a criatura falhar, ela é expulsa por 1 minuto ou até sofrer dano.", type: 'auto', subclassPrerequisite: { featureId: "paladin_sacred_oath", choiceValue: "ancients" } },
  { id: "paladin_vengeance_channel_divinity", level: 3, name: "Canalizar Divindade (Vingança)", description: "Você ganha as seguintes duas opções de Canalizar Divindade.\n\n• Abjurar Inimigo: Como uma ação, você apresenta seu símbolo sagrado e fala uma oração de denúncia, usando seu Canalizar Divindade. Escolha uma criatura a até 18 metros de você que você possa ver. Essa criatura deve fazer um teste de resistência de Sabedoria, a menos que seja imune a ser amedrontada. Demônios e mortos-vivos têm desvantagem neste teste de resistência. Em uma falha, a criatura é amedrontada por 1 minuto ou até sofrer algum dano. Enquanto amedrontada, o deslocamento da criatura é 0, e ela não pode se beneficiar de nenhum bônus em seu deslocamento.\n\n• Voto de Inimizade: Como uma ação bônus, você pode pronunciar um voto de inimizade contra uma criatura que você possa ver a até 3 metros de você, usando seu Canalizar Divindade. Você ganha vantagem nas jogadas de ataque contra a criatura por 1 minuto ou até que ela caia a 0 pontos de vida ou fique inconsciente.", type: 'auto', subclassPrerequisite: { featureId: "paladin_sacred_oath", choiceValue: "vengeance" } },
  { id: "paladin_asi_4", level: 4, name: "Incremento no Valor de Habilidade (Paladino Nível 4)", type: 'asi', description: "Aumente seus atributos." },
  { id: "paladin_extra_attack", level: 5, name: "Ataque Extra (Paladino)", description: "Pode atacar duas vezes com a ação de Ataque.", type: 'auto' },
  { id: "paladin_aura_of_protection", level: 6, name: "Aura de Proteção", description: "Você ou criatura amigável a 3m ganha bônus em testes de resistência igual ao seu mod. CAR (mín +1). Alcance aumenta para 9m no 18º nível.", type: 'auto' },
  { id: "paladin_devotion_aura", level: 7, name: "Aura de Devoção", description: "A partir do 7º nível, você e as criaturas amigáveis a até 3 metros de você não podem ser enfeitiçados enquanto você estiver consciente. No 18º nível, o alcance desta aura aumenta para 9 metros.", type: 'auto', subclassPrerequisite: { featureId: "paladin_sacred_oath", choiceValue: "devotion" } },
  { id: "paladin_ancients_aura", level: 7, name: "Aura de Sentinela", description: "A partir do 7º nível, a magia antiga se apega à sua presença: você e as criaturas amigáveis a até 3 metros de você têm resistência ao dano de magias. No 18º nível, o alcance desta aura aumenta para 9 metros.", type: 'auto', subclassPrerequisite: { featureId: "paladin_sacred_oath", choiceValue: "ancients" } },
  { id: "paladin_vengeance_relentless_avenger", level: 7, name: "Vingador Implacável", description: "Sua determinação sobrenatural permite que você intercepte inimigos que tentam escapar. Quando você acerta uma criatura com um ataque de oportunidade, você pode se mover até metade do seu deslocamento imediatamente após o ataque e como parte da mesma reação. Este movimento não provoca ataques de oportunidade.", type: 'auto', subclassPrerequisite: { featureId: "paladin_sacred_oath", choiceValue: "vengeance" } },
  { id: "paladin_asi_8", level: 8, name: "Incremento no Valor de Habilidade (Paladino Nível 8)", type: 'asi', description: "Aumente seus atributos." },
  { id: "paladin_aura_of_courage", level: 10, name: "Aura da Coragem", description: "Você e criaturas amigáveis a 3m não podem ser amedrontadas. Alcance aumenta para 9m no 18º nível.", type: 'auto' },
  { id: "paladin_improved_divine_smite", level: 11, name: "Destruição Divina Aprimorada", description: "Seus ataques corpo-a-corpo com arma causam 1d8 de dano radiante extra.", type: 'auto' },
  { id: "paladin_asi_12", level: 12, name: "Incremento no Valor de Habilidade (Paladino Nível 12)", type: 'asi', description: "Aumente seus atributos." },
  { id: "paladin_cleansing_touch", level: 14, name: "Toque Purificador", description: "Usa ação para terminar uma magia em si mesmo ou criatura voluntária (usos = mod. CAR).", type: 'auto' },
  { id: "paladin_devotion_purity_of_spirit", level: 15, name: "Pureza de Espírito", description: "Você está sempre sob o efeito da magia proteção contra o mal e o bem.", type: 'auto', subclassPrerequisite: { featureId: "paladin_sacred_oath", choiceValue: "devotion" } },
  { id: "paladin_ancients_undying_sentinel", level: 15, name: "Sentinela Imortal", description: "Você sofre nenhum dos inconvenientes da velhice, e você não pode ser envelhecido magicamente. Além disso, quando você é reduzido a 0 pontos de vida, mas não é morto instantaneamente, você pode escolher cair para 1 ponto de vida em vez disso. Uma vez que você usa esta habilidade, você não pode usá-la novamente até que você termine um descanso longo.", type: 'auto', subclassPrerequisite: { featureId: "paladin_sacred_oath", choiceValue: "ancients" } },
  { id: "paladin_vengeance_soul_of_vengeance", level: 15, name: "Alma da Vingança", description: "Você ganha a habilidade de punir inimigos que ousam atacar seus aliados. Quando você vê uma criatura sob o efeito de seu Voto de Inimizade fazendo um ataque, você pode usar sua reação para fazer um ataque corpo a corpo com arma contra essa criatura se ela estiver ao seu alcance.", type: 'auto', subclassPrerequisite: { featureId: "paladin_sacred_oath", choiceValue: "vengeance" } },
  { id: "paladin_asi_16", level: 16, name: "Incremento no Valor de Habilidade (Paladino Nível 16)", type: 'asi', description: "Aumente seus atributos." },
  { id: "paladin_aura_improvements_18", level: 18, name: "Aprimoramentos de Aura", description: "O alcance de suas auras aumenta para 9 metros.", type: 'auto' },
  { id: "paladin_asi_19", level: 19, name: "Incremento no Valor de Habilidade (Paladino Nível 19)", type: 'asi', description: "Aumente seus atributos." },
  { id: "paladin_devotion_holy_nimbus", level: 20, name: "Nimbo Sagrado", description: "Como uma ação, você pode emanar uma aura de luz solar. Por 1 minuto, luz brilhante emana de você em um raio de 9 metros, e penumbra por mais 9 metros. Sempre que uma criatura inimiga começa seu turno na luz brilhante, a criatura sofre 10 de dano radiante. Além disso, por essa duração, você tem vantagem em testes de resistência contra magias conjuradas por demônios ou mortos-vivos.", type: 'auto', subclassPrerequisite: { featureId: "paladin_sacred_oath", choiceValue: "devotion" } },
  { id: "paladin_ancients_elder_champion", level: 20, name: "Campeão Ancião", description: "Você pode assumir a forma de uma força da natureza antiga. Como uma ação, você se transforma, ganhando os seguintes benefícios por 1 minuto: No início de cada um de seus turnos, você recupera 10 pontos de vida. Sempre que você conjura uma magia de paladino que tem um tempo de conjuração de 1 ação, você pode conjurá-la como uma ação bônus. Criaturas inimigas a até 3 metros de você têm desvantagem em testes de resistência contra suas magias de paladino e opções de Canalizar Divindade.", type: 'auto', subclassPrerequisite: { featureId: "paladin_sacred_oath", choiceValue: "ancients" } },
  { id: "paladin_vengeance_avenging_angel", level: 20, name: "Anjo Vingador", description: "Você pode assumir a forma de um anjo vingador. Como uma ação, você se transforma, ganhando os seguintes benefícios por 1 hora: Asas brotam de suas costas e lhe concedem um deslocamento de voo de 18 metros. Você emana uma aura de ameaça em um raio de 9 metros. Qualquer criatura inimiga que comece seu turno nesta aura deve ser bem-sucedida em um teste de resistência de Sabedoria ou ficará amedrontada por você por 1 minuto ou até sofrer algum dano.", type: 'auto', subclassPrerequisite: { featureId: "paladin_sacred_oath", choiceValue: "vengeance" } },
];

export const ROGUE_FEATURES_DEFINITIONS: ClassFeatureDefinition[] = [
    { id: "rogue_expertise_1", level: 1, name: "Aptidão (Ladino - 1ª vez)", description: "Escolha duas de suas perícias proficientes, OU uma perícia proficiente e sua proficiência com ferramentas de ladrão. Seu bônus de proficiência é dobrado para qualquer teste de habilidade que você fizer que use qualquer uma das proficiências escolhidas.", type: 'auto' }, // Needs logic for selection
    { id: "rogue_sneak_attack_1d6", level: 1, name: "Ataque Furtivo (1d6)", description: "Uma vez por turno, você pode causar um extra 1d6 de dano a uma criatura que você atinge com um ataque se tiver vantagem na jogada de ataque. A arma deve usar a propriedade Acuidade ou ser uma arma à distância. Você não precisa de vantagem na jogada de ataque se outra criatura hostil ao alvo estiver a 1,5 metro dele, essa criatura não estiver incapacitada, e você não tiver desvantagem na jogada de ataque.", type: 'auto' },
    { id: "rogue_thieves_cant", level: 1, name: "Gíria de Ladrão", description: "Você aprendeu a gíria de ladrão, um misto de dialeto, jargão e código secreto que permite que você passe mensagens secretas durante uma conversa aparentemente normal.", type: 'auto' },
    { id: "rogue_cunning_action", level: 2, name: "Ação Ardilosa", description: "Seu pensamento rápido e agilidade permitem que você se mova e aja rapidamente. Você pode usar uma ação bônus durante cada um de seus turnos em combate. Esta ação pode ser usada somente para realizar as ações de Disparada, Desengajar ou Esconder.", type: 'auto' },
    { id: "rogue_roguish_archetype", level: 3, name: "Arquétipo de Ladino", description: "No 3º nível, você escolhe um arquétipo que se esforçará para se equiparar através de exercícios de suas habilidades de ladino.", type: 'choice', selectionPrompt: "Escolha seu Arquétipo de Ladino:", choices: ROGUE_ARCHETYPE_CHOICES, maxChoices: 1 },
    { id: "rogue_thief_fast_hands", level: 3, name: "Mãos Rápidas", description: "Você pode usar a ação bônus concedida por sua Ação Ardilosa para fazer um teste de Destreza (Prestidigitação), usar suas ferramentas de ladrão para desarmar uma armadilha ou abrir uma fechadura, ou realizar a ação de Usar um Objeto.", type: 'auto', subclassPrerequisite: { featureId: 'rogue_roguish_archetype', choiceValue: 'thief' } },
    { id: "rogue_thief_second_story_work", level: 3, name: "Ladrão de Andar Superior", description: "Você ganha a habilidade de escalar mais rápido do que o normal; escalar não custa mais movimento extra para você. Além disso, quando você faz um salto em distância correndo, a distância que você cobre aumenta em um número de pés igual ao seu modificador de Destreza.", type: 'auto', subclassPrerequisite: { featureId: 'rogue_roguish_archetype', choiceValue: 'thief' } },
    { id: "rogue_assassin_bonus_proficiencies", level: 3, name: "Proficiências Bônus (Assassino)", description: "Você ganha proficiência com o kit de disfarce e o kit de venenos.", type: 'auto', subclassPrerequisite: { featureId: 'rogue_roguish_archetype', choiceValue: 'assassin' } },
    { id: "rogue_assassin_assassinate", level: 3, name: "Assassinar", description: "Você é mais mortal quando pega seus inimigos de surpresa. Você tem vantagem em jogadas de ataque contra qualquer criatura que ainda não tenha tido um turno no combate. Além disso, qualquer acerto que você marcar contra uma criatura que está surpresa é um acerto crítico.", type: 'auto', subclassPrerequisite: { featureId: 'rogue_roguish_archetype', choiceValue: 'assassin' } },
    { id: "rogue_arcane_trickster_spellcasting", level: 3, name: "Conjuração (Trapaceiro Arcano)", description: "Você ganha a habilidade de conjurar magias. Você conhece três truques: Mãos Mágicas e dois outros truques de sua escolha da lista de magias de mago. Você aprende três magias de 1º nível de sua escolha, duas das quais devem ser da escola de encantamento ou ilusão.", type: 'auto', subclassPrerequisite: { featureId: 'rogue_roguish_archetype', choiceValue: 'arcane_trickster' } },
    { id: "rogue_arcane_trickster_mage_hand_legerdemain", level: 3, name: "Mão Mágica Ardileira", description: "Quando você conjura Mãos Mágicas, você pode fazer a mão espectral invisível, e você pode realizar as seguintes tarefas adicionais com ela: Você pode guardar um objeto que a mão está segurando no recipiente de outra criatura. Você pode recuperar um objeto de um recipiente de outra criatura. Você pode usar ferramentas de ladrão para pegar fechaduras e desarmar armadilhas à distância. Você pode realizar qualquer uma dessas tarefas sem ser notado por uma criatura se for bem-sucedido em um teste de Destreza (Prestidigitação) contestado pelo teste de Sabedoria (Percepção) da criatura.", type: 'auto', subclassPrerequisite: { featureId: 'rogue_roguish_archetype', choiceValue: 'arcane_trickster' } },
    { id: "rogue_asi_4", level: 4, name: "Incremento no Valor de Habilidade (Ladino Nível 4)", type: 'asi', description: "Aumente seus atributos." },
    { id: "rogue_uncanny_dodge", level: 5, name: "Esquiva Sobrenatural", description: "A partir do 5º nível, quando um inimigo que você possa ver o acerta com um ataque, você pode usar sua reação para reduzir pela metade o dano sofrido.", type: 'auto' },
    { id: "rogue_expertise_2", level: 6, name: "Aptidão (Ladino - 2ª vez)", description: "Escolha mais duas de suas perícias proficientes (ou uma perícia e ferramentas de ladrão). Seu bônus de proficiência é dobrado.", type: 'auto' }, // Needs logic for selection
    { id: "rogue_evasion", level: 7, name: "Evasão", description: "A partir do 7º nível, você pode esquivar-se agilmente de certos efeitos em área. Quando você for alvo de um efeito que exige um teste de resistência de Destreza para sofrer metade do dano, você não sofre dano algum se passar, e somente metade do dano se falhar.", type: 'auto' },
    { id: "rogue_asi_8", level: 8, name: "Incremento no Valor de Habilidade (Ladino Nível 8)", type: 'asi', description: "Aumente seus atributos." },
    { id: "rogue_thief_supreme_sneak", level: 9, name: "Furtividade Suprema", description: "Você tem vantagem em um teste de Destreza (Furtividade) se você se mover não mais da metade do seu deslocamento no mesmo turno.", type: 'auto', subclassPrerequisite: { featureId: 'rogue_roguish_archetype', choiceValue: 'thief' } },
    { id: "rogue_assassin_infiltration_expertise", level: 9, name: "Perito em Infiltração", description: "Você pode gastar 1 minuto para criar infalivelmente uma identidade falsa. Você não pode estabelecer uma identidade como uma pessoa específica. Em vez disso, você pode criar uma persona que é uma mistura de suas próprias características com as de outras pessoas. A partir daí, se você adotar a nova identidade por pelo menos 10 minutos, você pode manter essa identidade por até 24 horas. Para outros, sua persona é indistinguível de uma pessoa real.", type: 'auto', subclassPrerequisite: { featureId: 'rogue_roguish_archetype', choiceValue: 'assassin' } },
    { id: "rogue_arcane_trickster_magical_ambush", level: 9, name: "Emboscada Mágica", description: "Se você estiver escondido de uma criatura quando conjura uma magia nela, a criatura tem desvantagem em qualquer teste de resistência que fizer contra a magia neste turno.", type: 'auto', subclassPrerequisite: { featureId: 'rogue_roguish_archetype', choiceValue: 'arcane_trickster' } },
    { id: "rogue_asi_10", level: 10, name: "Incremento no Valor de Habilidade (Ladino Nível 10)", type: 'asi', description: "Aumente seus atributos." },
    { id: "rogue_reliable_talent", level: 11, name: "Talento Confiável", description: "No 11º nível, você refinou suas perícias beirando à perfeição. Toda vez que você fizer um teste de habilidade no qual possa adicionar seu bônus de proficiência, você trata um resultado no d20 de 9 ou menor como um 10.", type: 'auto' },
    { id: "rogue_asi_12", level: 12, name: "Incremento no Valor de Habilidade (Ladino Nível 12)", type: 'asi', description: "Aumente seus atributos." },
    { id: "rogue_thief_use_magic_device", level: 13, name: "Usar Dispositivo Mágico", description: "Você aprendeu o suficiente sobre magia para poder improvisar o uso de itens mágicos, mesmo quando eles não são destinados a você. Você ignora todos os requisitos de classe, raça e nível no uso de itens mágicos.", type: 'auto', subclassPrerequisite: { featureId: 'rogue_roguish_archetype', choiceValue: 'thief' } },
    { id: "rogue_assassin_impostor", level: 13, name: "Impostor", description: "Você ganha a habilidade de imitar infalivelmente a fala, a escrita e o comportamento de outra pessoa. Você deve passar pelo menos três horas estudando esses três componentes do comportamento de uma pessoa, ouvindo a fala, examinando a caligrafia e observando suas maneirismos.", type: 'auto', subclassPrerequisite: { featureId: 'rogue_roguish_archetype', choiceValue: 'assassin' } },
    { id: "rogue_arcane_trickster_versatile_trickster", level: 13, name: "Trapaceiro Versátil", description: "Você ganha a habilidade de distrair alvos com sua Mão Mágica. Como uma ação bônus em seu turno, você pode designar uma criatura a até 1,5 metro da mão espectral. Fazer isso lhe dá vantagem nas jogadas de ataque contra essa criatura até o final do turno.", type: 'auto', subclassPrerequisite: { featureId: 'rogue_roguish_archetype', choiceValue: 'arcane_trickster' } },
    { id: "rogue_blindsense", level: 14, name: "Sentido Cego", description: "No 14º nível, se você for capaz de ouvir, você está ciente da localização de qualquer criatura escondida ou invisível a até 3 metros de você.", type: 'auto' },
    { id: "rogue_slippery_mind", level: 15, name: "Mente Escorregadia", description: "No 15º nível, você adquire uma grande força de vontade, adquirindo proficiência nos testes de resistência de Sabedoria.", type: 'auto' },
    { id: "rogue_asi_16", level: 16, name: "Incremento no Valor de Habilidade (Ladino Nível 16)", type: 'asi', description: "Aumente seus atributos." },
    { id: "rogue_thief_thiefs_reflexes", level: 17, name: "Reflexos de Ladrão", description: "Você se tornou adepto a preparar uma emboscada e a fugir rapidamente do perigo. Você pode ter dois turnos durante a primeira rodada de qualquer combate. Você realiza seu primeiro turno em sua iniciativa normal e seu segundo turno em sua iniciativa menos 10. Você não pode usar esta característica quando está surpreso.", type: 'auto', subclassPrerequisite: { featureId: 'rogue_roguish_archetype', choiceValue: 'thief' } },
    { id: "rogue_assassin_death_strike", level: 17, name: "Golpe Mortal", description: "Você se torna um mestre da morte instantânea. Quando você ataca e atinge uma criatura que está surpresa, ela deve fazer um teste de resistência de Constituição (CD 8 + seu modificador de Destreza + seu bônus de proficiência). Em uma falha, dobre o dano de seu ataque contra a criatura.", type: 'auto', subclassPrerequisite: { featureId: 'rogue_roguish_archetype', choiceValue: 'assassin' } },
    { id: "rogue_arcane_trickster_spell_thief", level: 17, name: "Ladrão de Magias", description: "Você ganha a habilidade de roubar magicamente o conhecimento de como conjurar uma magia da mente de outro conjurador. Imediatamente após uma criatura conjurar uma magia que o atinge ou que tem você como alvo, você pode usar sua reação para forçar a criatura a fazer um teste de resistência com seu modificador de habilidade de conjuração. A CD é igual à sua CD de magia. Em uma falha, você nega o efeito da magia em você, e você rouba o conhecimento da magia se ela for de pelo menos 1º nível e de um nível que você possa conjurar (não precisa ser uma magia de mago). Pelas próximas 8 horas, você conhece a magia e pode conjurá-la usando seus espaços de magia. A criatura não pode conjurar essa magia até que as 8 horas tenham passado.", type: 'auto', subclassPrerequisite: { featureId: 'rogue_roguish_archetype', choiceValue: 'arcane_trickster' } },
    { id: "rogue_elusive", level: 18, name: "Elusivo", description: "A partir do 18º nível, você se torna tão sagaz que raramente alguém encosta a mão em você. Nenhuma jogada de ataque tem vantagem contra você, desde que você não esteja incapacitado.", type: 'auto' },
    { id: "rogue_asi_19", level: 19, name: "Incremento no Valor de Habilidade (Ladino Nível 19)", type: 'asi', description: "Aumente seus atributos." },
    { id: "rogue_stroke_of_luck", level: 20, name: "Golpe de Sorte", description: "No 20º nível, você adquire um dom incrível para ter sucesso nos momentos em que mais precisa. Se um ataque seu falhar contra um alvo ao seu alcance, você pode transformar essa falha em um acerto. Ou se falhar em um teste qualquer, você pode tratar a jogada desse mesmo teste como 20 natural. Uma vez que você use essa característica, você não pode fazê-lo de novo até terminar um descanso curto ou longo.", type: 'auto' },
];

const FOUR_ELEMENTS_DISCIPLINES: FeatureChoiceDefinition[] = [
    {value: "fist_of_unbroken_air", label: "Punho do Ar Ininterrupto", description: "Você pode gastar 2 pontos de chi para escolher uma criatura a até 9 metros de você. A criatura deve fazer um teste de resistência de Força. Em uma falha, a criatura sofre 3d10 de dano de concussão, mais 1d10 de dano de concussão extra para cada ponto de chi adicional que você gastar, e você pode empurrar a criatura até 6 metros para longe de você e derrubá-la. Em um sucesso, a criatura sofre metade do dano e não é empurrada nem derrubada."},
    {value: "water_whip", label: "Chicote de Água", description: "Você pode gastar 2 pontos de chi como uma ação bônus para criar um chicote de água que atinge uma criatura que você possa ver a até 9 metros de você. A criatura deve fazer um teste de resistência de Destreza. Em uma falha, a criatura sofre 3d10 de dano de concussão, mais 1d10 por ponto de chi adicional gasto, e você pode derrubá-la ou puxá-la até 7,5 metros para perto de você. Em um sucesso, a criatura sofre metade do dano e não é puxada nem derrubada."},
    {value: "fangs_of_the_fire_snake", label: "Presas da Serpente de Fogo", description: "Quando você usa a ação de Ataque em seu turno, você pode gastar 1 ponto de chi para fazer com que tentáculos de fogo saiam de seus punhos e pés. Seu alcance com seus ataques desarmados aumenta em 3 metros para essa ação, bem como para o resto do turno. Um acerto com tal ataque causa dano de fogo em vez de dano de concussão, e se você gastar 1 ponto de chi quando o ataque acertar, ele causa 1d10 de dano de fogo extra."},
    {value: "fist_of_four_thunders", label: "Punho dos Quatro Trovões", description: "Você pode gastar 2 pontos de chi para conjurar onda trovejante."},
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
        id: "monk_open_hand_technique", 
        level: 3, 
        name: "Técnica da Mão Aberta", 
        description: "Você pode manipular o chi de seu inimigo quando aproveita o seu. Sempre que você atingir uma criatura com um dos ataques concedidos por sua Rajada de Golpes, você pode impor um dos seguintes efeitos ao alvo: Ele deve ser bem-sucedido em um teste de resistência de Destreza ou ser derrubado. Ele deve fazer um teste de resistência de Força. Se falhar, você pode empurrá-lo até 4,5 metros para longe de você. Ele não pode ter reações até o final do seu próximo turno.",
        type: 'auto',
        subclassPrerequisite: { featureId: "monk_monastic_tradition", choiceValue: "open_hand" }
    },
    { 
        id: "monk_shadow_arts", 
        level: 3, 
        name: "Artes Sombrias", 
        description: "Você pode usar seu chi para duplicar os efeitos de certas magias. Como uma ação, você pode gastar 2 pontos de chi para conjurar escuridão, visão no escuro, passar sem deixar rastros ou silêncio, sem fornecer componentes materiais. Além disso, você ganha o truque ilusão menor se ainda não o conhecer.",
        type: 'auto',
        subclassPrerequisite: { featureId: "monk_monastic_tradition", choiceValue: "shadow" }
    },
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
    { 
        id: "monk_open_hand_wholeness_of_body", 
        level: 6, 
        name: "Inteireza Corporal", 
        description: "Você ganha a habilidade de se curar. Como uma ação, você pode recuperar pontos de vida iguais a três vezes seu nível de monge. Você deve terminar um descanso longo antes de poder usar esta característica novamente.",
        type: 'auto',
        subclassPrerequisite: { featureId: "monk_monastic_tradition", choiceValue: "open_hand" }
    },
    { 
        id: "monk_shadow_step", 
        level: 6, 
        name: "Passo Sombrio", 
        description: "Você ganha a habilidade de entrar em uma sombra e sair de outra. Quando você está em penumbra ou escuridão, como uma ação bônus, você pode se teleportar até 18 metros para um espaço desocupado que você possa ver que também esteja em penumbra ou escuridão. Você então tem vantagem na primeira jogada de ataque corpo a corpo que fizer antes do final do turno.",
        type: 'auto',
        subclassPrerequisite: { featureId: "monk_monastic_tradition", choiceValue: "shadow" }
    },
    { id: "monk_evasion", level: 7, name: "Evasão (Monge)", description: "Seu instinto permite que você se esquive de certos efeitos de área. Em testes de resistência de DES para metade do dano, você não sofre dano se passar, e apenas metade se falhar.", type: 'auto' },
    { id: "monk_stillness_of_mind", level: 7, name: "Mente Tranquila", description: "Pode usar sua ação para terminar um efeito em si mesmo que o esteja enfeitiçando ou amedrontando.", type: 'auto' },
    { id: "monk_asi_8", level: 8, name: "Incremento no Valor de Habilidade (Monge Nível 8)", type: 'asi', description: "Aumente seus atributos." },
    { id: "monk_unarmored_movement_improvement_9", level: 9, name: "Aprimoramento de Movimento sem Armadura", description: "Seu deslocamento sem armadura aumenta e você pode se mover através de superfícies verticais e sobre líquidos.", type: 'auto' },
    { id: "monk_purity_of_body", level: 10, name: "Pureza Corporal", description: "Sua maestria do chi o torna imune a doenças e venenos.", type: 'auto' },
    { 
        id: "monk_open_hand_tranquility", 
        level: 11, 
        name: "Tranquilidade", 
        description: "No final de um descanso longo, você ganha o efeito da magia santuário que dura até o início do seu próximo descanso longo (a magia pode terminar prematuramente como normal). A CD para a magia é 8 + seu modificador de Sabedoria + seu bônus de proficiência.",
        type: 'auto',
        subclassPrerequisite: { featureId: "monk_monastic_tradition", choiceValue: "open_hand" }
    },
    { 
        id: "monk_shadow_cloak", 
        level: 11, 
        name: "Manto de Sombras", 
        description: "Quando você está em uma área de penumbra ou escuridão, você pode usar sua ação para se tornar invisível. Você permanece invisível até fazer um ataque, conjurar uma magia, ou entrar em uma área de luz brilhante.",
        type: 'auto',
        subclassPrerequisite: { featureId: "monk_monastic_tradition", choiceValue: "shadow" }
    },
    { id: "monk_asi_12", level: 12, name: "Incremento no Valor de Habilidade (Monge Nível 12)", type: 'asi', description: "Aumente seus atributos." },
    { id: "monk_tongue_of_sun_and_moon", level: 13, name: "Idiomas do Sol e da Lua", description: "Você aprende a tocar o chi de outras mentes para que você compreenda todos os idiomas falados. Além do mais, qualquer criatura que possa entender um idioma poderá entender o que você fala.", type: 'auto' },
    { id: "monk_diamond_soul", level: 14, name: "Alma de Diamante", description: "Sua maestria do chi concede proficiência em todos os testes de resistência. Além disso, se falhar em um teste de resistência, pode gastar 1 ponto de chi para rolar novamente e ficar com o segundo resultado.", type: 'auto' },
    { id: "monk_timeless_body_monk", level: 15, name: "Corpo Atemporal (Monge)", description: "Seu chi o sustenta tanto que você não sofre os efeitos da velhice e não pode envelhecer magicamente. Você ainda morrerá de velhice, no entanto. Além disso, você não precisa mais de comida ou água.", type: 'auto' },
    { id: "monk_asi_16", level: 16, name: "Incremento no Valor de Habilidade (Monge Nível 16)", type: 'asi', description: "Aumente seus atributos." },
    { 
        id: "monk_open_hand_quivering_palm", 
        level: 17, 
        name: "Palma Vibrante", 
        description: "Você ganha a habilidade de criar vibrações letais no corpo de alguém. Quando você atinge uma criatura com um golpe desarmado, você pode gastar 3 pontos de chi para iniciar vibrações imperceptíveis, que duram por um número de dias igual ao seu nível de monge. As vibrações são inofensivas, a menos que você use sua ação para terminá-las. Para fazer isso, você e o alvo devem estar no mesmo plano de existência. Quando você usa esta ação, a criatura deve fazer um teste de resistência de Constituição. Se falhar, ela é reduzida a 0 pontos de vida. Se for bem-sucedida, sofre 10d10 de dano necrótico.",
        type: 'auto',
        subclassPrerequisite: { featureId: "monk_monastic_tradition", choiceValue: "open_hand" }
    },
    { 
        id: "monk_shadow_opportunist", 
        level: 17, 
        name: "Oportunista", 
        description: "Você pode explorar a distração momentânea de uma criatura quando ela é atingida por um ataque. Sempre que uma criatura a até 1,5 metro de você é atingida por um ataque feito por uma criatura que não seja você, você pode usar sua reação para fazer um ataque corpo a corpo contra essa criatura.",
        type: 'auto',
        subclassPrerequisite: { featureId: "monk_monastic_tradition", choiceValue: "shadow" }
    },
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