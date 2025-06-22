
import { RacialFeatureDefinition, FeatureChoiceDefinition, DRAGON_ANCESTRY_CHOICES } from './types'; 
import { ALL_AVAILABLE_SPELLS } from './spells'; 

const WIZARD_CANTRIPS_FOR_HIGH_ELF: FeatureChoiceDefinition[] = ALL_AVAILABLE_SPELLS
    .filter(spell => spell.classes.includes("Mago") && spell.level === 0)
    .map(spell => ({ value: spell.name, label: spell.name, description: spell.description }));

// --- Shared Elf Features ---
const ELF_DARKVISION: RacialFeatureDefinition = { id: "elf_darkvision", name: "Visão no Escuro (Elfo)", description: "Acostumado a florestas crepusculares e ao céu noturno, você tem visão superior em condições de escuridão e penumbra. Você enxerga na penumbra a até 18 metros como se fosse luz plena, e no escuro como se fosse na penumbra. Você não pode discernir cores no escuro, apenas tons de cinza.", type: 'auto' };
const ELF_KEEN_SENSES: RacialFeatureDefinition = { id: "elf_keen_senses", name: "Sentidos Aguçados", description: "Você tem proficiência na perícia Percepção.", type: 'auto' };
const ELF_FEY_ANCESTRY: RacialFeatureDefinition = { id: "elf_fey_ancestry", name: "Ancestralidade Feérica", description: "Você possui vantagem em testes de resistência contra ser enfeitiçado, e magia não pode colocá-lo para dormir.", type: 'auto' };
const ELF_TRANCE: RacialFeatureDefinition = { id: "elf_trance", name: "Transe", description: "Elfos não precisam dormir. Ao invés disso, eles meditam profundamente, permanecendo semiconscientes, durante 4 horas por dia. Depois de descansar dessa forma, você ganha os mesmos benefícios que um humano depois de 8 horas de sono.", type: 'auto' };
const ELF_WEAPON_TRAINING: RacialFeatureDefinition = { id: "elf_weapon_training", name: "Treinamento Élfico em Armas", description: "Você tem proficiência com espadas longas, espadas curtas, arcos longos e arcos curtos.", type: 'auto' };

// --- Shared Dwarf Features ---
const DWARF_DARKVISION: RacialFeatureDefinition = { id: "dwarf_darkvision", name: "Visão no Escuro (Anão)", description: "Acostumado à vida subterrânea, você tem visão superior em condições de escuridão e penumbra. Você enxerga na penumbra a até 18 metros como se fosse luz plena, e no escuro como se fosse na penumbra. Você não pode discernir cores no escuro, apenas tons de cinza.", type: 'auto' };
const DWARF_RESILIENCE: RacialFeatureDefinition = { id: "dwarf_resilience", name: "Resiliência Anã", description: "Você possui vantagem em testes de resistência contra veneno e resistência a dano de veneno.", type: 'auto' };
const DWARF_COMBAT_TRAINING: RacialFeatureDefinition = { id: "dwarf_combat_training", name: "Treinamento Anão em Combate", description: "Você tem proficiência com machados de batalha, machadinhas, martelos leves e martelos de guerra.", type: 'auto' };
const DWARF_TOOL_PROFICIENCY_CHOICE: FeatureChoiceDefinition[] = [
    {value: "ferreiro", label:"Ferramentas de Ferreiro"}, 
    {value:"cervejeiro", label:"Suprimentos de Cervejeiro"}, 
    {value:"pedreiro", label:"Ferramentas de Pedreiro"}
];
const DWARF_TOOL_PROFICIENCY: RacialFeatureDefinition = { 
    id: "dwarf_tool_proficiency", name: "Proficiência com Ferramentas de Anão", 
    description: "Você ganha proficiência com um tipo de ferramenta de artesão à sua escolha: ferramentas de ferreiro, de cervejeiro ou de pedreiro.", 
    type: 'choice', 
    choices: DWARF_TOOL_PROFICIENCY_CHOICE,
    maxChoices: 1,
};
const DWARF_STONECUNNING: RacialFeatureDefinition = { id: "dwarf_stonecunning", name: "Afinidade com Rochas", description: "Sempre que você realizar um teste de Inteligência (História) relacionado à origem de um trabalho em pedra, você é considerado proficiente na perícia História e adiciona o dobro do seu bônus de proficiência ao teste, ao invés do seu bônus de proficiência normal.", type: 'auto' };

// --- Hill Dwarf Racial Features ---
const HILL_DWARF_RACIAL_FEATURES: RacialFeatureDefinition[] = [
  DWARF_DARKVISION, DWARF_RESILIENCE, DWARF_COMBAT_TRAINING, DWARF_TOOL_PROFICIENCY, DWARF_STONECUNNING,
  {
    id: "hill_dwarf_toughness", name: "Robustez Anã (Anão da Colina)",
    description: "Seu máximo de pontos de vida aumenta em 1, e aumenta em 1 novamente cada vez que você ganha um nível.",
    type: 'auto',
  }
];
// --- Mountain Dwarf Racial Features ---
const MOUNTAIN_DWARF_RACIAL_FEATURES: RacialFeatureDefinition[] = [
  DWARF_DARKVISION, DWARF_RESILIENCE, DWARF_COMBAT_TRAINING, DWARF_TOOL_PROFICIENCY, DWARF_STONECUNNING,
  { id: "mountain_dwarf_armor_training", name: "Treinamento Anão em Armaduras (Anão da Montanha)", description: "Você tem proficiência em armaduras leves e médias.", type: 'auto'}
];


// --- High Elf Racial Features ---
const HIGH_ELF_RACIAL_FEATURES: RacialFeatureDefinition[] = [
  ELF_DARKVISION, ELF_KEEN_SENSES, ELF_FEY_ANCESTRY, ELF_TRANCE, ELF_WEAPON_TRAINING,
  {
    id: "high_elf_cantrip", name: "Truque de Alto Elfo",
    description: "Você conhece um truque à sua escolha da lista de truques de mago. Inteligência é sua habilidade de conjuração para ele.",
    type: 'choice',
    selectionPrompt: "Escolha um Truque de Mago:",
    choices: WIZARD_CANTRIPS_FOR_HIGH_ELF,
    maxChoices: 1,
  },
  {
    id: "high_elf_extra_language", name: "Idioma Adicional (Alto Elfo)",
    description: "Você pode falar, ler e escrever um idioma adicional à sua escolha.",
    type: 'auto', // Actually a choice, but usually handled via text input in character notes. For simplicity, 'auto' means it's granted.
  }
];

// --- Wood Elf Racial Features ---
const WOOD_ELF_RACIAL_FEATURES: RacialFeatureDefinition[] = [
  ELF_DARKVISION, ELF_KEEN_SENSES, ELF_FEY_ANCESTRY, ELF_TRANCE, ELF_WEAPON_TRAINING,
  {
    id: "wood_elf_fleet_of_foot", name: "Pés Ligeiros (Elfo da Floresta)",
    description: "Seu deslocamento base de caminhada aumenta para 10,5 metros.",
    type: 'auto',
  },
  {
    id: "wood_elf_mask_of_the_wild", name: "Máscara da Natureza",
    description: "Você pode tentar se esconder mesmo quando você está apenas levemente obscurecido por folhagem, chuva forte, neve caindo, névoa ou outro fenômeno natural.",
    type: 'auto',
  }
];

// Drow Elf Racial Features
const DROW_ELF_RACIAL_FEATURES: RacialFeatureDefinition[] = [
    { ...ELF_DARKVISION, id: "drow_superior_darkvision", name: "Visão no Escuro Superior (Drow)", description: "Sua visão no escuro tem alcance de 36 metros." },
    ELF_KEEN_SENSES, ELF_FEY_ANCESTRY, ELF_TRANCE,
    { id: "drow_sunlight_sensitivity", name: "Sensibilidade à Luz Solar", description: "Você possui desvantagem nas jogadas de ataque e testes de Sabedoria (Percepção) relacionados a visão quando você, o alvo do seu ataque, ou qualquer coisa que você está tentando perceber, esteja sob luz solar direta.", type: 'auto' },
    { id: "drow_drow_magic", name: "Magia Drow", description: "Você conhece o truque globos de luz. Quando você alcança o 3° nível, você pode conjurar a magia fogo das fadas. Quando você alcança o 5° nível, você pode conjurar escuridão. Você precisa terminar um descanso longo para poder conjurar as magias desse traço novamente. Carisma é sua habilidade chave para conjurar essas magias.", type: 'auto' }, // Specific spells would be added to character's spell list
    { id: "drow_weapon_training", name: "Treinamento Drow em Armas", description: "Você tem proficiência com rapieiras, espadas curtas e bestas de mão.", type: 'auto' },
];


// --- Shared Halfling Features ---
const HALFLING_LUCKY: RacialFeatureDefinition = { id: "halfling_lucky", name: "Sortudo", description: "Quando você obtiver um 1 natural em uma jogada de ataque, teste de habilidade ou teste de resistência, você pode jogar de novo o dado e deve utilizar o novo resultado.", type: 'auto' };
const HALFLING_BRAVE: RacialFeatureDefinition = { id: "halfling_brave", name: "Bravura", description: "Você tem vantagem em testes de resistência contra ficar amedrontado.", type: 'auto' };
const HALFLING_NIMBLENESS: RacialFeatureDefinition = { id: "halfling_nimbleness", name: "Agilidade Halfling", description: "Você pode mover-se através do espaço de qualquer criatura que for de um tamanho maior que o seu.", type: 'auto' };

const LIGHTFOOT_HALFLING_RACIAL_FEATURES: RacialFeatureDefinition[] = [
  HALFLING_LUCKY, HALFLING_BRAVE, HALFLING_NIMBLENESS,
  {
    id: "lightfoot_halfling_naturally_stealthy", name: "Furtividade Natural (Halfling Pés Leves)",
    description: "Você pode tentar se esconder mesmo quando possuir apenas a cobertura de uma criatura que for no mínimo um tamanho maior que o seu.",
    type: 'auto',
  }
];
const STOUT_HALFLING_RACIAL_FEATURES: RacialFeatureDefinition[] = [
    HALFLING_LUCKY, HALFLING_BRAVE, HALFLING_NIMBLENESS,
    { id: "stout_halfling_resilience", name: "Resiliência dos Robustos (Halfling Robusto)", description: "Você tem vantagem em testes de resistência contra veneno e tem resistência contra dano de veneno.", type: 'auto' }
];

// --- Dragonborn Racial Features ---
const DRAGONBORN_RACIAL_FEATURES: RacialFeatureDefinition[] = [
    {
        id: "dragonborn_draconic_ancestry", name: "Ancestralidade Dracônica",
        description: "Você possui ancestralidade dracônica. Escolha um tipo de dragão da lista. Sua arma de sopro e resistência a dano são determinadas pelo tipo de dragão, como mostrado na tabela (a descrição da sua escolha mostrará os detalhes).",
        type: 'choice',
        selectionPrompt: "Escolha sua Ancestralidade Dracônica:",
        choices: DRAGON_ANCESTRY_CHOICES,
        maxChoices: 1,
    },
    {
        id: "dragonborn_breath_weapon", name: "Arma de Sopro",
        description: "Você pode usar sua ação para exalar energia destrutiva. Sua ancestralidade dracônica determina o tamanho, forma e tipo de dano da exalação. Quando você usa sua arma de sopro, cada criatura na área da exalação deve fazer um teste de resistência, o tipo do qual é determinado por sua ancestralidade. A CD para este teste de resistência é 8 + seu modificador de Constituição + seu bônus de proficiência. Uma criatura sofre 2d6 de dano em uma falha no teste, e metade do dano em um sucesso. O dano aumenta para 3d6 no 6° nível, 4d6 no 11° nível e 5d6 no 16° nível. Depois de usar sua arma de sopro, você não pode usá-la novamente até completar um descanso curto ou longo.",
        type: 'auto', 
    },
    {
        id: "dragonborn_damage_resistance", name: "Resistência a Dano",
        description: "Você possui resistência ao tipo de dano associado à sua ancestralidade dracônica.",
        type: 'auto', 
    }
];

const TIEFLING_RACIAL_FEATURES: RacialFeatureDefinition[] = [
    {
        id: "tiefling_darkvision", name: "Visão no Escuro (Tiefling)",
        description: "Graças à sua herança infernal, você tem visão superior em condições de escuridão e penumbra. Você enxerga na penumbra a até 18 metros como se fosse luz plena, e no escuro como se fosse na penumbra. Você não pode discernir cores no escuro, apenas tons de cinza.",
        type: 'auto',
    },
    {
        id: "tiefling_hellish_resistance", name: "Resistência Infernal",
        description: "Você possui resistência a dano de fogo.",
        type: 'auto',
    },
    {
        id: "tiefling_infernal_legacy", name: "Legado Infernal",
        description: "Você conhece o truque Taumaturgia. Quando você alcança o 3º nível, você pode conjurar a magia Repreensão Infernal como uma magia de 2º nível uma vez com esta característica e recupera a habilidade de fazê-lo quando termina um descanso longo. Quando você alcança o 5º nível, você pode conjurar a magia Escuridão uma vez com esta característica e recupera a habilidade de fazê-lo quando termina um descanso longo. Carisma é sua habilidade de conjuração para essas magias.",
        type: 'auto', 
    }
];

// --- Human Racial Features ---
const HUMAN_RACIAL_FEATURES: RacialFeatureDefinition[] = [
    { id: "human_ability_score_increase_all", name: "Incremento no Valor de Habilidade (Todos)", description: "Todos os seus valores de habilidade aumentam em 1.", type: 'auto' },
    { id: "human_languages_common_extra", name: "Idiomas (Humano)", description: "Você pode falar, ler e escrever Comum e um idioma adicional de sua escolha.", type: 'auto'} // Choice handled via text input
];

// --- Shared Gnome Features ---
const GNOME_DARKVISION: RacialFeatureDefinition = { id: "gnome_darkvision", name: "Visão no Escuro (Gnomo)", description: "Acostumado à vida subterrânea, você tem visão superior em condições de escuridão e penumbra...", type: 'auto' };
const GNOME_CUNNING: RacialFeatureDefinition = { id: "gnome_cunning", name: "Esperteza Gnômica", description: "Você possui vantagem em todos os testes de resistência de Inteligência, Sabedoria e Carisma contra magia.", type: 'auto' };

// --- Forest Gnome Racial Features ---
const FOREST_GNOME_RACIAL_FEATURES: RacialFeatureDefinition[] = [
    GNOME_DARKVISION, GNOME_CUNNING,
    { id: "forest_gnome_natural_illusionist", name: "Ilusionista Nato", description: "Você conhece o truque ilusão menor. Inteligência é a sua habilidade usada para conjurá-la.", type: 'auto' },
    { id: "forest_gnome_speak_with_small_beasts", name: "Falar com Bestas Pequenas", description: "Através de sons e gestos, você pode comunicar ideias simples para Bestas pequenas ou menores. Gnomos da floresta amam os animais e normalmente possuem esquilos, doninhas, coelhos, toupeiras, pica-paus e outras criaturas como amados animais de estimação.", type: 'auto' }
];

// --- Rock Gnome Racial Features ---
const ROCK_GNOME_RACIAL_FEATURES: RacialFeatureDefinition[] = [
    GNOME_DARKVISION, GNOME_CUNNING,
    { id: "rock_gnome_artificers_lore", name: "Conhecimento de Artífice", description: "Toda vez que você fizer um teste de Inteligência (História) relacionado a itens mágicos, objetos alquímicos ou mecanismos tecnológicos, você pode adicionar o dobro do seu bônus de proficiência, ao invés de qualquer bônus de proficiência que você normalmente use.", type: 'auto' },
    { id: "rock_gnome_tinker", name: "Engenhoqueiro", description: "Você possui proficiência com ferramentas de artesão (ferramentas de engenhoqueiro). Usando essas ferramentas, você pode gastar 1 hora e 10 po em materiais para construir um mecanismo Miúdo (CA 5, 1 pv). O mecanismo para de funcionar após 24 horas (a não ser que você gaste 1 hora reparando-o) ou quando você usa sua ação para desmantelá-lo; nesse momento, você pode recuperar o material usado para criá-lo. Você pode ter até três desses mecanismos ativos ao mesmo tempo. Escolha entre: Brinquedo Mecânico, Isqueiro Mecânico, Caixa de Música.", type: 'auto' } // Player needs to select type of device if that matters.
];

// --- Half-Elf Racial Features ---
const HALF_ELF_RACIAL_FEATURES: RacialFeatureDefinition[] = [
    { id: "half_elf_darkvision", name: "Visão no Escuro (Meio-Elfo)", description: "Graças ao seu sangue élfico, você tem visão superior em condições de escuridão e penumbra...", type: 'auto' },
    ELF_FEY_ANCESTRY, // Inherited from Elf
    { id: "half_elf_skill_versatility", name: "Versatilidade em Perícia", description: "Você ganha proficiência em duas perícias, à sua escolha.", type: 'auto' } // Player choice of skills.
];

// --- Half-Orc Racial Features ---
const HALF_ORC_RACIAL_FEATURES: RacialFeatureDefinition[] = [
    { id: "half_orc_darkvision", name: "Visão no Escuro (Meio-Orc)", description: "Graças ao seu sangue orc, você tem visão superior em condições de escuridão e penumbra...", type: 'auto' },
    { id: "half_orc_menacing", name: "Ameaçador", description: "Você adquire proficiência na perícia Intimidação.", type: 'auto' },
    { id: "half_orc_relentless_endurance", name: "Resistência Implacável", description: "Quando você é reduzido a 0 pontos de vida mas não é completamente morto, você pode voltar para 1 ponto de vida. Você não pode usar essa característica novamente até completar um descanso longo.", type: 'auto' },
    { id: "half_orc_savage_attacks", name: "Ataques Selvagens", description: "Quando você atinge um ataque crítico com uma arma corpo-a-corpo, você pode rolar um dos dados de dano da arma mais uma vez e adicioná-lo ao dano extra causado pelo acerto crítico.", type: 'auto' }
];


export const ALL_RACIAL_FEATURES_MAP: Record<string, RacialFeatureDefinition[]> = {
  "Anão da Colina": HILL_DWARF_RACIAL_FEATURES,
  "Anão da Montanha": MOUNTAIN_DWARF_RACIAL_FEATURES,
  "Alto Elfo": HIGH_ELF_RACIAL_FEATURES,
  "Elfo da Floresta": WOOD_ELF_RACIAL_FEATURES,
  "Elfo Negro (Drow)": DROW_ELF_RACIAL_FEATURES,
  "Halfling Pés Leves": LIGHTFOOT_HALFLING_RACIAL_FEATURES,
  "Halfling Robusto": STOUT_HALFLING_RACIAL_FEATURES,
  "Humano": HUMAN_RACIAL_FEATURES,
  "Draconato": DRAGONBORN_RACIAL_FEATURES,
  "Gnomo da Floresta": FOREST_GNOME_RACIAL_FEATURES,
  "Gnomo das Rochas": ROCK_GNOME_RACIAL_FEATURES,
  "Meio-Elfo": HALF_ELF_RACIAL_FEATURES,
  "Meio-Orc": HALF_ORC_RACIAL_FEATURES,
  "Tiefling": TIEFLING_RACIAL_FEATURES,
};