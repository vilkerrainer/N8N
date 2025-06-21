
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

// This derived array can be used for select options if only names are needed for the value.
export const FIGHTING_STYLES: string[] = FIGHTING_STYLE_OPTIONS.map(fs => fs.name);


export const CLASS_SPELLCASTING_ABILITIES: Record<string, AttributeName | undefined> = {
  "Mago": "intelligence",
  "Clérigo": "wisdom",
  "Druida": "wisdom",
  "Feiticeiro": "charisma",
  "Bardo": "charisma",
  "Bruxo": "charisma",
  "Paladino": "charisma", // Paladinos usam Carisma
  "Patrulheiro": "wisdom", // Patrulheiros usam Sabedoria
  "Bárbaro": undefined,
  "Guerreiro": undefined,
  "Ladino": undefined,
  "Monge": undefined,
};