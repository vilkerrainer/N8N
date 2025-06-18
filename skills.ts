
import { AttributeName } from './types';

export interface SkillDefinition {
  key: string; // e.g., 'acrobatics'
  label: string; // e.g., 'Acrobacia'
  attribute: AttributeName; // e.g., 'dexterity'
}

export const ALL_SKILLS: SkillDefinition[] = [
  // Strength
  { key: 'athletics', label: 'Atletismo', attribute: 'strength' },
  // Dexterity
  { key: 'acrobatics', label: 'Acrobacia', attribute: 'dexterity' },
  { key: 'sleightOfHand', label: 'Prestidigitação', attribute: 'dexterity' },
  { key: 'stealth', label: 'Furtividade', attribute: 'dexterity' },
  // Intelligence
  { key: 'arcana', label: 'Arcanismo', attribute: 'intelligence' },
  { key: 'history', label: 'História', attribute: 'intelligence' },
  { key: 'investigation', label: 'Investigação', attribute: 'intelligence' },
  { key: 'nature', label: 'Natureza', attribute: 'intelligence' },
  { key: 'religion', label: 'Religião', attribute: 'intelligence' },
  // Wisdom
  { key: 'animalHandling', label: 'Adestrar Animais', attribute: 'wisdom' },
  { key: 'insight', label: 'Intuição', attribute: 'wisdom' },
  { key: 'medicine', label: 'Medicina', attribute: 'wisdom' },
  { key: 'perception', label: 'Percepção', attribute: 'wisdom' },
  { key: 'survival', label: 'Sobrevivência', attribute: 'wisdom' },
  // Charisma
  { key: 'deception', label: 'Enganação', attribute: 'charisma' },
  { key: 'intimidation', label: 'Intimidação', attribute: 'charisma' },
  { key: 'performance', label: 'Atuação', attribute: 'charisma' },
  { key: 'persuasion', label: 'Persuasão', attribute: 'charisma' },
];

export function calculateProficiencyBonus(level: number): number {
  if (level < 1) return 0;
  if (level <= 4) return 2;
  if (level <= 8) return 3;
  if (level <= 12) return 4;
  if (level <= 16) return 5;
  return 6;
}
