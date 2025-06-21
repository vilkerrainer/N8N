

import React, { useState } from 'react';
import { Character, ATTRIBUTE_NAMES, ATTRIBUTE_LABELS, AttributeName, MagicInfo, Spell } from '../types';
import AttributeField, { calculateModifier, formatModifier } from './AttributeField';
import Button from './ui/Button';
import Input from './ui/Input'; // For quick actions
import { ALL_SKILLS, calculateProficiencyBonus, SkillDefinition } from '../skills';
import { FIGHTING_STYLE_OPTIONS } from '../dndOptions'; 
import { ALL_SPELLS_MAP } from '../spells'; // Import map of all spells

interface CharacterSheetDisplayProps {
  character: Character;
  onEdit: () => void;
  onBackToList?: () => void; 
  onCharacterUpdate?: (characterId: string, updates: Partial<Character>) => void;
}

const CharacterSheetDisplay: React.FC<CharacterSheetDisplayProps> = ({ character, onEdit, onBackToList, onCharacterUpdate }) => {
  const [healAmount, setHealAmount] = useState<string>('');
  const [newItem, setNewItem] = useState<string>('');
  const [expandedSpellName, setExpandedSpellName] = useState<string | null>(null);

  const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <div className={`mb-6 p-4 bg-slate-50 rounded-lg shadow ${className}`}>
      <h3 className="text-xl font-semibold text-sky-700 mb-3 border-b-2 border-sky-200 pb-2">{title}</h3>
      {children}
    </div>
  );

  const InfoItem: React.FC<{ label: string; value: string | number | undefined | null }> = ({ label, value }) => (
    <div className="mb-1"><span className="font-semibold text-gray-700">{label}:</span> <span className="text-black">{value !== undefined && value !== null ? value : 'N/A'}</span></div>
  );

  const proficiencyBonus = calculateProficiencyBonus(character.level);
  const magicInfo = character.magic || { spellSlots: Array(9).fill(0), cantripsKnown: [], spellsKnownPrepared: [], spellbook: [] } as MagicInfo;
  const fightingStyleObj = FIGHTING_STYLE_OPTIONS.find(fs => fs.name === character.fightingStyle);

  let calculatedSpellSaveDC: number | null = null;
  let calculatedSpellAttackBonus: number | null = null;
  let spellcastingAbilityLabel: string | null = null;

  if (magicInfo.spellcastingAbilityName && character.attributes[magicInfo.spellcastingAbilityName]) {
    const spellcastingModifier = calculateModifier(character.attributes[magicInfo.spellcastingAbilityName]);
    calculatedSpellSaveDC = 8 + proficiencyBonus + spellcastingModifier;
    calculatedSpellAttackBonus = proficiencyBonus + spellcastingModifier;
    spellcastingAbilityLabel = ATTRIBUTE_LABELS[magicInfo.spellcastingAbilityName];
  }

  const renderSpellDetails = (spell: Spell) => (
    <div className="mt-2 p-3 bg-sky-50 rounded text-xs text-black space-y-1 shadow-inner">
      <p><strong>Nível:</strong> {spell.level === 0 ? "Truque" : spell.level}</p>
      <p><strong>Escola:</strong> {spell.school}</p>
      <p><strong>Tempo de Conjuração:</strong> {spell.castingTime}</p>
      <p><strong>Alcance:</strong> {spell.range}</p>
      <p><strong>Componentes:</strong> {spell.components}</p>
      <p><strong>Duração:</strong> {spell.duration}</p>
      <p className="mt-1 whitespace-pre-wrap text-justify"><strong>Descrição:</strong> {spell.description}</p>
    </div>
  );

  const displaySpellListWithDetails = (spellNames: string[] | undefined, listTitle: string) => {
    if (!spellNames || spellNames.length === 0) {
      return (
        <div className="mt-3">
          <h4 className="font-semibold text-gray-700">{listTitle}:</h4>
          <p className="text-black">Nenhuma</p>
        </div>
      );
    }
    return (
      <div className="mt-3">
        <h4 className="font-semibold text-gray-700">{listTitle}:</h4>
        <ul className="list-disc list-inside text-black space-y-1">
          {spellNames.map(spellName => {
            const spell = ALL_SPELLS_MAP[spellName];
            const spellIdSafe = spellName.replace(/\W/g, '-');
            return (
              <li key={spellIdSafe}>
                <button
                  onClick={() => setExpandedSpellName(expandedSpellName === spellName ? null : spellName)}
                  className="text-sky-600 hover:text-sky-800 hover:underline focus:outline-none"
                  aria-expanded={expandedSpellName === spellName}
                  aria-controls={`details-sheet-${spellIdSafe}`}
                >
                  {spellName}
                </button>
                {expandedSpellName === spellName && spell && (
                  <div id={`details-sheet-${spellIdSafe}`}>
                    {renderSpellDetails(spell)}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };


  const handleHeal = () => {
    if (!onCharacterUpdate || !healAmount) return;
    const amount = parseInt(healAmount, 10);
    if (isNaN(amount) || amount <= 0) return;
    const newHp = Math.min(character.hpt, character.hp + amount);
    onCharacterUpdate(character.id, { hp: newHp });
    setHealAmount('');
  };

  const handleAddItem = () => {
    if (!onCharacterUpdate || !newItem.trim()) return;
    const updatedItems = character.items 
      ? `${character.items}\n${newItem.trim()}`
      : newItem.trim();
    onCharacterUpdate(character.id, { items: updatedItems });
    setNewItem('');
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white shadow-2xl rounded-lg">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-4xl font-bold text-sky-800">{character.name}</h2>
        <div>
          {onBackToList && (
            <Button onClick={onBackToList} variant="secondary" className="mr-2">
              Voltar à Lista
            </Button>
          )}
          <Button onClick={onEdit} variant="secondary">Editar</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-1">
          <img 
            src={character.photoUrl || 'https://picsum.photos/300/400'} 
            alt={character.name} 
            className="w-full h-auto object-cover rounded-lg shadow-lg max-h-96" 
            onError={(e) => (e.currentTarget.src = 'https://picsum.photos/300/400')}
          />
        </div>
        <div className="md:col-span-2 space-y-3 p-4 bg-slate-50 rounded-lg shadow">
          <InfoItem label="Raça" value={character.race} />
          <InfoItem label="Classe" value={character.charClass} />
          <InfoItem label="Nível" value={character.level} />
          <InfoItem label="Antecedentes" value={character.background} />
          <InfoItem label="Tendência" value={character.alignment} />
          <InfoItem label="Idade" value={character.age} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
        <div className="p-4 bg-sky-100 rounded-lg shadow">
            <div className="text-sm font-medium text-sky-600">HP</div>
            <div className="text-3xl font-bold text-sky-800">{character.hp} / {character.hpt}</div>
        </div>
        <div className="p-4 bg-sky-100 rounded-lg shadow">
            <div className="text-sm font-medium text-sky-600">CA</div>
            <div className="text-3xl font-bold text-sky-800">{character.ac}</div>
        </div>
        <div className="p-4 bg-sky-100 rounded-lg shadow">
            <div className="text-sm font-medium text-sky-600">Moedas</div>
            <div className="text-3xl font-bold text-sky-800">{character.coins}</div>
        </div>
      </div>
      
      {onCharacterUpdate && onBackToList && ( // Only show if it's player's own sheet from list view
        <Section title="Ações Rápidas">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div>
              <Input 
                label="Curar HP" 
                type="number" 
                value={healAmount} 
                onChange={(e) => setHealAmount(e.target.value)}
                placeholder="Quantidade"
                id={`heal-${character.id}`}
              />
              <Button onClick={handleHeal} variant="primary" className="w-full mt-1">Curar</Button>
            </div>
            <div>
              <Input 
                label="Adicionar Item" 
                type="text" 
                value={newItem} 
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Descrição do item"
                id={`addItem-${character.id}`}
              />
              <Button onClick={handleAddItem} variant="primary" className="w-full mt-1">Adicionar Item</Button>
            </div>
          </div>
        </Section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Section title="Atributos">
          <div className="grid grid-cols-1 gap-2">
            {ATTRIBUTE_NAMES.map(attrName => (
              <AttributeField 
                key={attrName}
                label={ATTRIBUTE_LABELS[attrName]}
                score={character.attributes[attrName]}
              />
            ))}
          </div>
        </Section>

        <Section title="Perícias">
          <InfoItem label="Bônus de Proficiência" value={formatModifier(proficiencyBonus)} />
          <div className="grid grid-cols-1 gap-2 mt-2">
            {ALL_SKILLS.map((skill: SkillDefinition) => {
              const attributeScore = character.attributes[skill.attribute];
              const attributeModifier = calculateModifier(attributeScore);
              const isProficient = character.proficientSkills.includes(skill.key);
              const skillModifier = attributeModifier + (isProficient ? proficiencyBonus : 0);
              return (
                <div key={skill.key} className={`flex justify-between p-2 rounded ${isProficient ? 'bg-sky-50' : 'bg-slate-50'}`}>
                  <span className={`font-medium ${isProficient ? 'text-sky-700' : 'text-black'}`}>
                    {isProficient && <span title="Proficiente">● </span>}{skill.label}
                    <span className="text-xs text-gray-500 ml-1">({ATTRIBUTE_LABELS[skill.attribute].substring(0,3)})</span>
                  </span>
                  <span className={`${isProficient ? 'text-sky-900 font-semibold' : 'text-black'}`}>{formatModifier(skillModifier)}</span>
                </div>
              );
            })}
          </div>
        </Section>
      </div>
      
      <Section title="Resistências (Saving Throws)">
        <p className="text-black whitespace-pre-wrap">{character.savingThrows || 'Nenhuma resistência listada.'}</p>
      </Section>
      
      <Section title="Inventário (Itens)">
        <p className="text-black whitespace-pre-wrap">{character.items || 'Nenhum item listado.'}</p>
      </Section>
      <Section title="Habilidades da Classe/Raça e Talentos">
        <p className="text-black whitespace-pre-wrap">{character.abilities || 'Nenhuma habilidade listada.'}</p>
      </Section>

      {character.skillNotes && (
        <Section title="Notas sobre Perícias e Habilidades">
          <p className="text-black whitespace-pre-wrap">{character.skillNotes}</p>
        </Section>
      )}

      {character.fightingStyle && fightingStyleObj && fightingStyleObj.name !== "" && (
        <Section title="Estilo de Luta">
          <p className="text-black font-semibold">{character.fightingStyle}</p>
          {fightingStyleObj.description && (
            <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap text-justify">{fightingStyleObj.description}</p>
          )}
        </Section>
      )}
       {character.fightingStyle === "" && fightingStyleObj && ( // Handles case where "" is selected
         <Section title="Estilo de Luta">
            <p className="text-black">Nenhum</p>
         </Section>
        )}


      {magicInfo && (
        <Section title="Magia">
          {spellcastingAbilityLabel && <InfoItem label="Habilidade de Conjuração Principal" value={spellcastingAbilityLabel} />}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <div>
                {calculatedSpellSaveDC !== null && <InfoItem label="CD (Calculado)" value={calculatedSpellSaveDC} />}
                <InfoItem label="CD Magia (Informado)" value={magicInfo.spellSaveDC > 0 ? magicInfo.spellSaveDC : (calculatedSpellSaveDC || 'N/A')} />
            </div>
            <div>
                {calculatedSpellAttackBonus !== null && <InfoItem label="Bônus Ataque (Calculado)" value={formatModifier(calculatedSpellAttackBonus)} />}
                <InfoItem label="Bônus Ataque Mágico (Informado)" value={magicInfo.spellAttackBonus !== 0 ? formatModifier(magicInfo.spellAttackBonus) : (calculatedSpellAttackBonus !== null ? formatModifier(calculatedSpellAttackBonus) : 'N/A')} />
            </div>
          </div>
          
          {displaySpellListWithDetails(magicInfo.cantripsKnown, "Truques Conhecidos")}
          
          {character.charClass === 'Mago' && magicInfo.spellbook && 
            displaySpellListWithDetails(magicInfo.spellbook, "Grimório")}

          {displaySpellListWithDetails(magicInfo.spellsKnownPrepared, "Magias Conhecidas/Preparadas")}

          <div className="mt-3">
            <h4 className="font-semibold text-gray-700 mb-1">Espaços de Magia por Nível:</h4>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {magicInfo.spellSlots?.map((slots, i) => (
                <div key={`slot-level-${i+1}`} className="p-2 bg-slate-100 rounded text-center">
                  <div className="text-xs text-gray-600">Nível {i+1}</div>
                  <div className="text-lg font-semibold text-black">{slots === undefined ? 0 : slots}</div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}
    </div>
  );
};

export default CharacterSheetDisplay;