
import { RacialFeatureDefinition, FeatureChoiceDefinition } from './types';
import { ALL_AVAILABLE_SPELLS } from './spells'; // For High Elf Cantrip choices

// --- Hill Dwarf Racial Features ---
const HILL_DWARF_RACIAL_FEATURES: RacialFeatureDefinition[] = [
  {
    id: "dwarf_darkvision", name: "Visão no Escuro",
    description: "Acostumado à vida subterrânea, você tem visão superior em condições de escuridão e penumbra. Você enxerga na penumbra a até 18 metros como se fosse luz plena, e no escuro como se fosse na penumbra. Você não pode discernir cores no escuro, apenas tons de cinza.",
    type: 'auto',
  },
  {
    id: "dwarf_resilience", name: "Resiliência Anã",
    description: "Você possui vantagem em testes de resistência contra veneno e resistência a dano de veneno.",
    type: 'auto',
  },
  {
    id: "dwarf_combat_training", name: "Treinamento Anão em Combate",
    description: "Você tem proficiência com machados de batalha, machadinhas, martelos leves e martelos de guerra.",
    type: 'auto',
  },
  {
    id: "dwarf_tool_proficiency_smith", name: "Proficiência com Ferramentas de Ferreiro", // Example
    description: "Você ganha proficiência com um tipo de ferramenta de artesão à sua escolha: ferramentas de ferreiro, de cervejeiro ou de pedreiro.",
    type: 'auto', // PHB lists it as a choice, simplifying to smith's tools for now or assume player notes if choice is desired.
                 // For true choice, this would need `type: 'choice'` and `choices` array.
  },
  {
    id: "dwarf_stonecunning", name: "Afinidade com Rochas",
    description: "Sempre que você realizar um teste de Inteligência (História) relacionado à origem de um trabalho em pedra, você é considerado proficiente na perícia História e adiciona o dobro do seu bônus de proficiência ao teste, ao invés do seu bônus de proficiência normal.",
    type: 'auto',
  },
  {
    id: "hill_dwarf_toughness", name: "Robustez Anã (Anão da Colina)",
    description: "Seu máximo de pontos de vida aumenta em 1, e aumenta em 1 novamente cada vez que você ganha um nível. (Lembre-se de ajustar seus PV e PVT manualmente).",
    type: 'auto',
  }
];

// --- High Elf Racial Features ---
const WIZARD_CANTRIPS_FOR_HIGH_ELF: FeatureChoiceDefinition[] = ALL_AVAILABLE_SPELLS
    .filter(spell => spell.classes.includes("Mago") && spell.level === 0)
    .map(spell => ({ value: spell.name, label: spell.name, description: spell.description }));

const HIGH_ELF_RACIAL_FEATURES: RacialFeatureDefinition[] = [
  {
    id: "elf_darkvision", name: "Visão no Escuro",
    description: "Acostumado a florestas crepusculares e ao céu noturno, você tem visão superior em condições de escuridão e penumbra. Você enxerga na penumbra a até 18 metros como se fosse luz plena, e no escuro como se fosse na penumbra. Você não pode discernir cores no escuro, apenas tons de cinza.",
    type: 'auto',
  },
  {
    id: "elf_keen_senses", name: "Sentidos Aguçados",
    description: "Você tem proficiência na perícia Percepção.",
    type: 'auto', // Player should check Perception in skills.
  },
  {
    id: "elf_fey_ancestry", name: "Ancestralidade Feérica",
    description: "Você possui vantagem em testes de resistência contra ser enfeitiçado, e magia não pode colocá-lo para dormir.",
    type: 'auto',
  },
  {
    id: "elf_trance", name: "Transe",
    description: "Elfos não precisam dormir. Ao invés disso, eles meditam profundamente, permanecendo semiconscientes, durante 4 horas por dia. (A palavra em comum para tal meditação é “transe”.) Enquanto medita, você sonha de certa forma; tais sonhos na verdade são exercícios mentais que se tornaram reflexos através de anos de prática. Depois de descansar dessa forma, você ganha os mesmos benefícios que um humano depois de 8 horas de sono.",
    type: 'auto',
  },
  {
    id: "elf_weapon_training", name: "Treinamento Élfico em Armas",
    description: "Você tem proficiência com espadas longas, espadas curtas, arcos longos e arcos curtos.",
    type: 'auto',
  },
  {
    id: "high_elf_cantrip", name: "Truque de Alto Elfo",
    description: "Você conhece um truque à sua escolha da lista de truques de mago. Inteligência é sua habilidade de conjuração para ele.",
    type: 'choice',
    selectionPrompt: "Escolha um Truque de Mago:",
    choices: WIZARD_CANTRIPS_FOR_HIGH_ELF,
    maxChoices: 1,
  },
  {
    id: "high_elf_extra_language", name: "Idioma Adicional",
    description: "Você pode falar, ler e escrever um idioma adicional à sua escolha.",
    type: 'auto', // Player should note this.
  }
];

// Placeholder for other races
const HUMAN_RACIAL_FEATURES: RacialFeatureDefinition[] = [
    { id: "human_ability_score_increase_all", name: "Incremento no Valor de Habilidade (Todos)", description: "Todos os seus valores de habilidade aumentam em 1.", type: 'auto' },
    { id: "human_languages_common_extra", name: "Idiomas", description: "Você pode falar, ler e escrever Comum e um idioma adicional de sua escolha.", type: 'auto'}
    // Variant Human features (feat, skill) would need more complex handling
];


// --- Master List of All Racial Features ---
export const ALL_RACIAL_FEATURES_MAP: Record<string, RacialFeatureDefinition[]> = {
  "Anão da Colina": HILL_DWARF_RACIAL_FEATURES,
  "Alto Elfo": HIGH_ELF_RACIAL_FEATURES,
  "Humano": HUMAN_RACIAL_FEATURES,
  // Add other races and their features here
  // e.g., "Anão da Montanha": MOUNTAIN_DWARF_FEATURES,
  // "Elfo da Floresta": WOOD_ELF_FEATURES, etc.
};
