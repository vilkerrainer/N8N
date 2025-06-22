

import React, { useState, useEffect } from 'react';
import { Character, ATTRIBUTE_NAMES, ATTRIBUTE_LABELS, AttributeName, MagicInfo, Spell, ClassFeatureSelection, RacialFeatureSelection, RANKS, Rank } from '../types';
import AttributeField, { calculateModifier, formatModifier } from './AttributeField';
import Button from './ui/Button';
import Input from './ui/Input'; 
import Textarea from './ui/Textarea';
import { ALL_SKILLS, calculateProficiencyBonus, SkillDefinition } from '../skills';
import { FIGHTING_STYLE_OPTIONS } from '../dndOptions'; 
import { ALL_SPELLS_MAP } from '../spells'; 

interface CharacterSheetDisplayProps {
  character: Character;
  onEdit: () => void;
  onBackToList?: () => void; 
  onCharacterUpdate?: (characterId: string, updates: Partial<Character>) => void;
}

const CharacterSheetDisplay: React.FC<CharacterSheetDisplayProps> = ({ character, onEdit, onBackToList, onCharacterUpdate }) => {
  const [healAmount, setHealAmount] = useState<string>('');
  const [damageAmount, setDamageAmount] = useState<string>('');
  const [coinsAmount, setCoinsAmount] = useState<string>('');
  const [isEditingItems, setIsEditingItems] = useState<boolean>(false);
  const [editableItems, setEditableItems] = useState<string>(character.items);
  const [expandedSpellName, setExpandedSpellName] = useState<string | null>(null);

  useEffect(() => {
    setEditableItems(character.items); 
    setIsEditingItems(false); 
  }, [character.items, character.id]);


  const Section: React.FC<{ title: string; children: React.ReactNode; className?: string, titleActions?: React.ReactNode }> = 
    ({ title, children, className, titleActions }) => (
    <div className={`mb-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg shadow ${className}`}>
      <div className="flex justify-between items-center mb-3 border-b-2 border-sky-200 dark:border-sky-600 pb-2">
        <h3 className="text-xl font-semibold text-sky-600 dark:text-sky-400">{title}</h3>
        {titleActions && <div className="flex-shrink-0 ml-4">{titleActions}</div>}
      </div>
      {children}
    </div>
  );

  const InfoItem: React.FC<{ label: string; value: string | number | undefined | null }> = ({ label, value }) => (
    <div className="mb-1">
      <span className="font-semibold text-slate-600 dark:text-slate-400">{label}: </span> 
      <span className="text-slate-800 dark:text-slate-100">{value !== undefined && value !== null ? value : 'N/A'}</span>
    </div>
  );

  const proficiencyBonus = calculateProficiencyBonus(character.level);
  const magicInfo = character.magic || { spellSlots: Array(9).fill(0), cantripsKnown: [], spellsKnownPrepared: [], spellbook: [] } as MagicInfo;
  
  let fightingStyleName = character.fightingStyle;
  const fightingStyleFeature = character.classFeatures?.find(cf => cf.featureName.toLowerCase().includes("estilo de luta") && cf.choiceValue);
  if (fightingStyleFeature && fightingStyleFeature.choiceValue) {
    fightingStyleName = fightingStyleFeature.choiceValue;
  }
  const fightingStyleObj = FIGHTING_STYLE_OPTIONS.find(fs => fs.name === fightingStyleName);


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
    <div className="mt-2 p-3 bg-sky-100 dark:bg-slate-600/80 rounded text-xs text-slate-700 dark:text-slate-300 space-y-1 shadow-inner">
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
          <h4 className="font-semibold text-slate-700 dark:text-slate-300">{listTitle}:</h4>
          <p className="text-slate-800 dark:text-slate-100">Nenhuma</p>
        </div>
      );
    }
    return (
      <div className="mt-3">
        <h4 className="font-semibold text-slate-700 dark:text-slate-300">{listTitle}:</h4>
        <ul className="list-disc list-inside text-slate-800 dark:text-slate-100 space-y-1">
          {spellNames.map(spellName => {
            const spell = ALL_SPELLS_MAP[spellName];
            const spellIdSafe = spellName.replace(/\W/g, '-');
            return (
              <li key={spellIdSafe}>
                <button
                  onClick={() => setExpandedSpellName(expandedSpellName === spellName ? null : spellName)}
                  className="text-sky-600 dark:text-sky-400 hover:text-sky-500 dark:hover:text-sky-300 hover:underline focus:outline-none"
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


  const handlePlayerHeal = () => {
    if (!onCharacterUpdate || !healAmount) return;
    const amount = parseInt(healAmount, 10);
    if (isNaN(amount) || amount <= 0) return;
    const newHp = Math.min(character.hpt, character.hp + amount);
    onCharacterUpdate(character.id, { hp: newHp });
    setHealAmount('');
  };

  const handlePlayerTakeDamage = () => {
    if (!onCharacterUpdate || !damageAmount) return;
    const amount = parseInt(damageAmount, 10);
    if (isNaN(amount) || amount <= 0) return;
    const newHp = Math.max(0, character.hp - amount);
    onCharacterUpdate(character.id, { hp: newHp });
    setDamageAmount('');
  };

  const handlePlayerAddCoins = () => {
    if (!onCharacterUpdate || !coinsAmount) return;
    const amount = parseInt(coinsAmount, 10);
    if (isNaN(amount) || amount <= 0) return;
    onCharacterUpdate(character.id, { coins: character.coins + amount });
    setCoinsAmount('');
  };
  
  const handlePlayerRemoveCoins = () => {
    if (!onCharacterUpdate || !coinsAmount) return;
    const amount = parseInt(coinsAmount, 10);
    if (isNaN(amount) || amount <= 0) return;
    const newCoins = Math.max(0, character.coins - amount);
    onCharacterUpdate(character.id, { coins: newCoins });
    setCoinsAmount('');
  };

  const handleSaveItems = () => {
    if (onCharacterUpdate) {
      onCharacterUpdate(character.id, { items: editableItems });
    }
    setIsEditingItems(false);
  };

  const renderClassFeatures = (features?: ClassFeatureSelection[]) => {
    if (!features || features.length === 0) {
      return <p className="text-slate-800 dark:text-slate-100">Nenhuma característica de classe específica listada.</p>;
    }
    const featuresByLevel: Record<number, ClassFeatureSelection[]> = {};
    features.forEach(feature => {
        if (!featuresByLevel[feature.levelAcquired]) {
            featuresByLevel[feature.levelAcquired] = [];
        }
        featuresByLevel[feature.levelAcquired].push(feature);
    });

    return Object.entries(featuresByLevel)
      .sort(([levelA], [levelB]) => parseInt(levelA) - parseInt(levelB)) 
      .map(([level, levelFeatures]) => (
        <div key={`level-${level}-display`} className="mb-3">
          <h4 className="text-md font-semibold text-slate-700 dark:text-slate-300">Nível {level}:</h4>
          <ul className="list-disc list-inside ml-4 space-y-1">
            {levelFeatures.map(feature => (
              <li key={feature.featureId} className="text-sm text-slate-800 dark:text-slate-100">
                <span className="font-medium">{feature.featureName}</span>
                {feature.type === 'choice' && feature.choiceLabel && (
                  <span>: <span className="italic">{feature.choiceLabel}</span></span>
                )}
                {feature.type === 'asi' && (
                  <span className="italic"> (Incremento no Valor de Habilidade)</span>
                )}
                {feature.description && (feature.type !== 'choice' || !feature.choiceLabel) && ( // Show main description for auto/asi, or if choice has no specific label description
                    <details className="text-xs text-slate-600 dark:text-slate-400 pl-2 cursor-pointer">
                        <summary className="hover:text-sky-500 dark:hover:text-sky-400">Ver descrição</summary>
                        <p className="mt-1 whitespace-pre-wrap text-justify">{feature.description}</p>
                     </details>
                )}
                 {feature.type === 'choice' && feature.choiceLabel && feature.description && (
                     <details className="text-xs text-slate-600 dark:text-slate-400 pl-2 cursor-pointer">
                        <summary className="hover:text-sky-500 dark:hover:text-sky-400">Ver descrição da característica</summary>
                        <p className="mt-1 whitespace-pre-wrap text-justify">{feature.description}</p>
                     </details>
                 )}
              </li>
            ))}
          </ul>
        </div>
      ));
  };
  
  const renderRacialFeatures = (features?: RacialFeatureSelection[]) => {
    if (!features || features.length === 0) {
        return <p className="text-slate-800 dark:text-slate-100">Nenhuma característica racial específica listada.</p>;
    }
    return (
        <ul className="list-disc list-inside ml-4 space-y-1">
            {features.map(feature => (
                <li key={feature.featureId} className="text-sm text-slate-800 dark:text-slate-100">
                    <span className="font-medium">{feature.featureName}</span>
                    {feature.type === 'choice' && feature.choiceLabel && (
                        <span>: <span className="italic">{feature.choiceLabel}</span></span>
                    )}
                    {feature.description && (
                        <details className="text-xs text-slate-600 dark:text-slate-400 pl-2 cursor-pointer">
                            <summary className="hover:text-sky-500 dark:hover:text-sky-400">Ver descrição</summary>
                            <p className="mt-1 whitespace-pre-wrap text-justify">{feature.description}</p>
                        </details>
                    )}
                </li>
            ))}
        </ul>
    );
  };


  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white dark:bg-slate-800 shadow-2xl rounded-lg">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-4xl font-bold text-sky-700 dark:text-sky-400">{character.name}</h2>
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
        <div className="md:col-span-2 space-y-3 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg shadow">
          <InfoItem label="Raça" value={character.race} />
          <InfoItem label="Classe" value={character.charClass} />
          <InfoItem label="Nível" value={character.level} />
          <InfoItem label="Rank" value={character.rank || RANKS[0]} />
          <InfoItem label="Antecedentes" value={character.background} />
          <InfoItem label="Tendência" value={character.alignment} />
          <InfoItem label="Idade" value={character.age} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
        <div className="p-4 bg-sky-100 dark:bg-slate-700/70 rounded-lg shadow">
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300">HP</div>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">{character.hp} / {character.hpt}</div>
        </div>
        <div className="p-4 bg-sky-100 dark:bg-slate-700/70 rounded-lg shadow">
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300">CA</div>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">{character.ac}</div>
        </div>
        <div className="p-4 bg-sky-100 dark:bg-slate-700/70 rounded-lg shadow">
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Moedas</div>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">{character.coins}</div>
        </div>
      </div>
      
      {onCharacterUpdate && ( 
        <Section title="Ações do Personagem">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="p-3 bg-slate-100 dark:bg-slate-600/50 rounded-md">
              <Input 
                label="Curar HP" 
                type="number" 
                value={healAmount} 
                onChange={(e) => setHealAmount(e.target.value)}
                placeholder="Quantidade"
                id={`player-heal-${character.id}`}
              />
              <Button onClick={handlePlayerHeal} variant="primary" className="w-full mt-2">Curar HP</Button>
            </div>
            <div className="p-3 bg-slate-100 dark:bg-slate-600/50 rounded-md">
              <Input 
                label="Sofrer Dano" 
                type="number" 
                value={damageAmount} 
                onChange={(e) => setDamageAmount(e.target.value)}
                placeholder="Quantidade"
                id={`player-damage-${character.id}`}
              />
              <Button onClick={handlePlayerTakeDamage} variant="primary" className="w-full mt-2 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800">Sofrer Dano</Button>
            </div>
            <div className="p-3 bg-slate-100 dark:bg-slate-600/50 rounded-md md:col-span-2">
              <Input 
                label="Gerenciar Moedas" 
                type="number" 
                value={coinsAmount} 
                onChange={(e) => setCoinsAmount(e.target.value)}
                placeholder="Quantidade"
                id={`player-coins-${character.id}`}
              />
              <div className="flex space-x-2 mt-2">
                <Button onClick={handlePlayerAddCoins} variant="secondary" className="w-full">Adicionar Moedas</Button>
                <Button onClick={handlePlayerRemoveCoins} variant="secondary" className="w-full">Remover Moedas</Button>
              </div>
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
                <div key={skill.key} className={`flex justify-between p-2 rounded ${isProficient ? 'bg-sky-100 dark:bg-sky-700/50' : 'bg-slate-100 dark:bg-slate-600/50'}`}>
                  <span className={`font-medium ${isProficient ? 'text-sky-700 dark:text-sky-400' : 'text-slate-700 dark:text-slate-300'}`}>
                    {isProficient && <span title="Proficiente">● </span>}{skill.label}
                    <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">({ATTRIBUTE_LABELS[skill.attribute].substring(0,3)})</span>
                  </span>
                  <span className={`${isProficient ? 'text-slate-800 dark:text-slate-100 font-semibold' : 'text-slate-800 dark:text-slate-200'}`}>{formatModifier(skillModifier)}</span>
                </div>
              );
            })}
          </div>
        </Section>
      </div>
      
      <Section title="Resistências (Saving Throws)">
        <p className="text-slate-800 dark:text-slate-100 whitespace-pre-wrap">{character.savingThrows || 'Nenhuma resistência listada.'}</p>
      </Section>
      
      <Section title="Características Raciais">
        {renderRacialFeatures(character.racialFeatures)}
      </Section>

      <Section title="Características de Classe">
        {renderClassFeatures(character.classFeatures)}
      </Section>
      
      <Section 
        title="Inventário (Itens)"
        titleActions={onCharacterUpdate && (
          isEditingItems ? (
            <div className="flex space-x-2">
              <Button onClick={handleSaveItems} variant="primary" size="sm" className="text-xs px-2 py-1">Salvar</Button>
              <Button onClick={() => { setIsEditingItems(false); setEditableItems(character.items); }} variant="secondary" size="sm" className="text-xs px-2 py-1">Cancelar</Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditingItems(true)} variant="secondary" size="sm" className="text-xs px-2 py-1">Editar Inventário</Button>
          )
        )}
      >
        {isEditingItems && onCharacterUpdate ? (
          <Textarea
            label="" 
            id={`editable-items-${character.id}`}
            value={editableItems}
            onChange={(e) => setEditableItems(e.target.value)}
            rows={5}
            className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md"
          />
        ) : (
          <p className="text-slate-800 dark:text-slate-100 whitespace-pre-wrap">{character.items || 'Nenhum item listado.'}</p>
        )}
      </Section>

      <Section title="Habilidades Gerais (Raça/Outros) e Talentos">
        <p className="text-slate-800 dark:text-slate-100 whitespace-pre-wrap">{character.abilities || 'Nenhuma habilidade listada.'}</p>
      </Section>

      {character.skillNotes && (
        <Section title="Notas sobre Perícias e Habilidades">
          <p className="text-slate-800 dark:text-slate-100 whitespace-pre-wrap">{character.skillNotes}</p>
        </Section>
      )}

      {fightingStyleName && fightingStyleObj && fightingStyleName !== "" && (
        <Section title="Estilo de Luta">
          <p className="text-slate-800 dark:text-slate-100 font-semibold">{fightingStyleName}</p>
          {fightingStyleObj.description && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 whitespace-pre-wrap text-justify">{fightingStyleObj.description}</p>
          )}
        </Section>
      )}
       {(!fightingStyleName || fightingStyleName === "") && ( 
         <Section title="Estilo de Luta">
            <p className="text-slate-800 dark:text-slate-100">Nenhum</p>
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
            <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-1">Espaços de Magia por Nível:</h4>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {magicInfo.spellSlots?.map((slots, i) => (
                <div key={`slot-level-${i+1}`} className="p-2 bg-slate-100 dark:bg-slate-600/70 rounded text-center">
                  <div className="text-xs text-slate-600 dark:text-slate-400">Nível {i+1}</div>
                  <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">{slots === undefined ? 0 : slots}</div>
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
