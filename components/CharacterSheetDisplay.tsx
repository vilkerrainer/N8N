

import React, { useState, useEffect } from 'react';
import { Character, ATTRIBUTE_NAMES, ATTRIBUTE_LABELS, AttributeName, MagicInfo, Spell, ClassFeatureSelection, RacialFeatureSelection, RANKS, Rank } from '../types';
import AttributeField, { calculateModifier, formatModifier } from './AttributeField';
import Button from './ui/Button';
import Input from './ui/Input'; 
import Textarea from './ui/Textarea';
import { ALL_SKILLS, calculateProficiencyBonus, SkillDefinition } from '../skills';
import { 
    FIGHTING_STYLE_OPTIONS, getHitDieTypeForClass,
    getMaxRages, getMaxBardicInspirations, getMaxChannelDivinityUses,
    getMaxRelentlessEnduranceUses, getMaxSecondWindUses, getMaxActionSurgeUses,
    getMaxBreathWeaponUses, getMaxKiPoints, getMaxLayOnHandsPool
} from '../dndOptions'; 
import { ALL_SPELLS_MAP } from '../spells'; 
import { getClassSpellSlots, WARLOCK_PACT_SLOT_LEVEL } from '../classFeatures';

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

  // Rest System State
  const [showRestModal, setShowRestModal] = useState<'short' | 'long' | null>(null);
  const [hitDiceToSpendInput, setHitDiceToSpendInput] = useState<string>('1');
  const [hdRollResults, setHdRollResults] = useState<string[]>([]); 
  const [totalHdHealed, setTotalHdHealed] = useState<number>(0);
  const [restMessage, setRestMessage] = useState<string | null>(null);

  // Lay on Hands state
  const [layOnHandsHealAmount, setLayOnHandsHealAmount] = useState<string>('1');


  useEffect(() => {
    setEditableItems(character.items); 
    setIsEditingItems(false); 
    setRestMessage(null);
    setHdRollResults([]);
    setTotalHdHealed(0);
    setLayOnHandsHealAmount('1');
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

  const InfoItem: React.FC<{ label: string; value: string | number | undefined | null; className?: string }> = ({ label, value, className }) => (
    <div className={`mb-1 ${className}`}>
      <span className="font-semibold text-slate-600 dark:text-slate-400">{label}: </span> 
      <span className="text-slate-800 dark:text-slate-100">{value !== undefined && value !== null ? value : 'N/A'}</span>
    </div>
  );

  const proficiencyBonus = calculateProficiencyBonus(character.level);
  const magicInfo = character.magic || { 
    spellSlots: Array(9).fill(0), 
    currentSpellSlots: Array(9).fill(0), 
    cantripsKnown: [], 
    spellsKnownPrepared: [], 
    spellbook: [] 
  } as MagicInfo;
  
  // Ensure currentSpellSlots array exists and has 9 elements, defaulting to spellSlots if not fully defined
  if (!magicInfo.currentSpellSlots || magicInfo.currentSpellSlots.length !== 9) {
    magicInfo.currentSpellSlots = [...magicInfo.spellSlots]; // Default to max if undefined/malformed
  }


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

  const handleUseSpellSlot = (slotLevelIndex: number) => {
    if (!onCharacterUpdate || !character.magic) return;
    const currentSlots = [...(character.magic.currentSpellSlots || character.magic.spellSlots)];
    if (currentSlots[slotLevelIndex] > 0) {
      currentSlots[slotLevelIndex]--;
      onCharacterUpdate(character.id, { magic: { ...character.magic, currentSpellSlots: currentSlots } });
    }
  };

  const handleRecoverSpellSlot = (slotLevelIndex: number) => {
    if (!onCharacterUpdate || !character.magic) return;
    const currentSlots = [...(character.magic.currentSpellSlots || character.magic.spellSlots)];
    const maxSlotsForLevel = character.magic.spellSlots[slotLevelIndex];
    if (currentSlots[slotLevelIndex] < maxSlotsForLevel) {
      currentSlots[slotLevelIndex]++;
      onCharacterUpdate(character.id, { magic: { ...character.magic, currentSpellSlots: currentSlots } });
    }
  };
  
  type LimitedAbilityType = 
    'rage' | 'bardicInspiration' | 'channelDivinity' | 
    'secondWind' | 'actionSurge' | 'kiPoints' | 
    'relentlessEndurance' | 'breathWeapon';

  const handleUseGenericAbility = (abilityType: LimitedAbilityType) => {
      if (!onCharacterUpdate) return;
      const updates: Partial<Character> = {};
      switch (abilityType) {
          case 'rage':
              if ((character.currentRages ?? 0) > 0) updates.currentRages = (character.currentRages ?? 0) - 1;
              break;
          case 'bardicInspiration':
              if ((character.currentBardicInspirations ?? 0) > 0) updates.currentBardicInspirations = (character.currentBardicInspirations ?? 0) - 1;
              break;
          case 'channelDivinity':
              if ((character.currentChannelDivinityUses ?? 0) > 0) updates.currentChannelDivinityUses = (character.currentChannelDivinityUses ?? 0) - 1;
              break;
          case 'secondWind':
              if ((character.currentSecondWindUses ?? 0) > 0) {
                  updates.currentSecondWindUses = (character.currentSecondWindUses ?? 0) - 1;
                  // Player applies HP gain manually: 1d10 + Fighter level
                  const fighterLevel = character.level; // Assuming level is correct
                  const roll = Math.floor(Math.random() * 10) + 1;
                  const healed = roll + fighterLevel;
                  updates.hp = Math.min(character.hpt, character.hp + healed);
                  setRestMessage(`Retomar o Fôlego usado! Curado ${healed} PV (Rolagem: ${roll} + Nível ${fighterLevel}).`);
              }
              break;
          case 'actionSurge':
              if ((character.currentActionSurgeUses ?? 0) > 0) updates.currentActionSurgeUses = (character.currentActionSurgeUses ?? 0) - 1;
              break;
          case 'kiPoints':
              if ((character.currentKiPoints ?? 0) > 0) updates.currentKiPoints = (character.currentKiPoints ?? 0) - 1;
              break;
          case 'relentlessEndurance':
              if ((character.currentRelentlessEnduranceUses ?? 0) > 0) updates.currentRelentlessEnduranceUses = (character.currentRelentlessEnduranceUses ?? 0) - 1;
              break;
          case 'breathWeapon':
              if ((character.currentBreathWeaponUses ?? 0) > 0) updates.currentBreathWeaponUses = (character.currentBreathWeaponUses ?? 0) - 1;
              break;
      }
      if (Object.keys(updates).length > 0) {
          onCharacterUpdate(character.id, updates);
      }
  };

  const handleRecoverGenericAbilityUse = (abilityType: LimitedAbilityType) => {
      if (!onCharacterUpdate) return;
      const updates: Partial<Character> = {};
      switch (abilityType) {
          case 'rage':
              if ((character.currentRages ?? 0) < (character.maxRages ?? 0)) updates.currentRages = (character.currentRages ?? 0) + 1;
              break;
          case 'bardicInspiration':
              if ((character.currentBardicInspirations ?? 0) < (character.maxBardicInspirations ?? 0)) updates.currentBardicInspirations = (character.currentBardicInspirations ?? 0) + 1;
              break;
          case 'channelDivinity':
              if ((character.currentChannelDivinityUses ?? 0) < (character.maxChannelDivinityUses ?? 0)) updates.currentChannelDivinityUses = (character.currentChannelDivinityUses ?? 0) + 1;
              break;
          case 'secondWind':
              if ((character.currentSecondWindUses ?? 0) < (character.maxSecondWindUses ?? 0)) updates.currentSecondWindUses = (character.currentSecondWindUses ?? 0) + 1;
              break;
          case 'actionSurge':
              if ((character.currentActionSurgeUses ?? 0) < (character.maxActionSurgeUses ?? 0)) updates.currentActionSurgeUses = (character.currentActionSurgeUses ?? 0) + 1;
              break;
          case 'kiPoints':
              if ((character.currentKiPoints ?? 0) < (character.maxKiPoints ?? 0)) updates.currentKiPoints = (character.currentKiPoints ?? 0) + 1;
              break;
          case 'relentlessEndurance':
              if ((character.currentRelentlessEnduranceUses ?? 0) < (character.maxRelentlessEnduranceUses ?? 0)) updates.currentRelentlessEnduranceUses = (character.currentRelentlessEnduranceUses ?? 0) + 1;
              break;
          case 'breathWeapon':
              if ((character.currentBreathWeaponUses ?? 0) < (character.maxBreathWeaponUses ?? 0)) updates.currentBreathWeaponUses = (character.currentBreathWeaponUses ?? 0) + 1;
              break;
      }
      if (Object.keys(updates).length > 0) {
          onCharacterUpdate(character.id, updates);
      }
  };
  
  const handleUseLayOnHands = (amount: number, isCureDiseasePoison: boolean = false) => {
    if (!onCharacterUpdate || !character.currentLayOnHandsPool === undefined) return;
    
    const cost = isCureDiseasePoison ? 5 : amount;
    if (cost <= 0 || (character.currentLayOnHandsPool ?? 0) < cost) {
        setRestMessage("Reserva de Cura pelas Mãos insuficiente.");
        return;
    }

    const updates: Partial<Character> = {};
    updates.currentLayOnHandsPool = (character.currentLayOnHandsPool ?? 0) - cost;

    if (!isCureDiseasePoison) {
        updates.hp = Math.min(character.hpt, character.hp + amount);
        setRestMessage(`Curado ${amount} PV com Cura pelas Mãos. Reserva restante: ${updates.currentLayOnHandsPool}`);
    } else {
        setRestMessage(`Doença/Veneno curado com Cura pelas Mãos (custo 5 PV). Reserva restante: ${updates.currentLayOnHandsPool}`);
    }
    
    onCharacterUpdate(character.id, updates);
    setLayOnHandsHealAmount('1');
  };


  const handleSpendHitDice = () => {
    if (!onCharacterUpdate) return;
    const numDiceToSpend = parseInt(hitDiceToSpendInput, 10);
    if (isNaN(numDiceToSpend) || numDiceToSpend <= 0 || numDiceToSpend > character.currentHitDice) {
      setRestMessage("Número inválido de Dados de Vida para gastar.");
      return;
    }

    const conModifier = calculateModifier(character.attributes.constitution);
    const hitDieType = character.hitDieType;
    let totalHealedThisAction = 0;
    const currentRollResults: string[] = [];

    for (let i = 0; i < numDiceToSpend; i++) {
      const roll = Math.floor(Math.random() * hitDieType) + 1;
      const healedAmount = Math.max(1, roll + conModifier); 
      totalHealedThisAction += healedAmount;
      currentRollResults.push(`d${hitDieType} rolado: ${roll} + CON ${conModifier} = ${healedAmount} PV`);
    }

    const newHp = Math.min(character.hpt, character.hp + totalHealedThisAction);
    const newCurrentHitDice = character.currentHitDice - numDiceToSpend;

    onCharacterUpdate(character.id, { hp: newHp, currentHitDice: newCurrentHitDice });
    setHdRollResults(currentRollResults);
    setTotalHdHealed(totalHealedThisAction);
    setRestMessage(`Curado ${totalHealedThisAction} PV. ${numDiceToSpend} Dados de Vida gastos.`);
    setHitDiceToSpendInput('1'); 
  };

  const applyShortRestBenefits = () => {
    if (!onCharacterUpdate) return;
    const updates: Partial<Character> = { ...character }; 
    let messages = ["Descanso Curto finalizado."];

    if (character.charClass === 'Bruxo' && updates.magic) {
        updates.magic.spellSlots = getClassSpellSlots(character.charClass, character.level); 
        updates.magic.currentSpellSlots = [...updates.magic.spellSlots]; 
        messages.push("Espaços de Magia de Pacto do Bruxo recuperados.");
    }
    
    if (character.charClass === 'Clérigo' || character.charClass === 'Paladino') {
        if(character.maxChannelDivinityUses !== undefined) updates.currentChannelDivinityUses = character.maxChannelDivinityUses;
        messages.push("Usos de Canalizar Divindade recuperados.");
    }

    if (character.charClass === 'Bardo' && character.level >= 5 && character.maxBardicInspirations !== undefined) {
        updates.currentBardicInspirations = character.maxBardicInspirations;
        messages.push("Usos de Inspiração de Bardo recuperados.");
    }
    
    if (character.charClass === 'Guerreiro') {
        if (character.maxSecondWindUses !== undefined) updates.currentSecondWindUses = character.maxSecondWindUses;
        if (character.maxActionSurgeUses !== undefined) updates.currentActionSurgeUses = character.maxActionSurgeUses;
        messages.push("Usos de Retomar o Fôlego e Surto de Ação recuperados.");
    }
    
    if (character.race === 'Draconato' && character.maxBreathWeaponUses !== undefined) {
        updates.currentBreathWeaponUses = character.maxBreathWeaponUses;
        messages.push("Uso da Arma de Sopro recuperado.");
    }

    if (character.charClass === 'Monge' && character.maxKiPoints !== undefined) {
        updates.currentKiPoints = character.maxKiPoints;
        messages.push("Pontos de Chi recuperados.");
    }
    
    messages.push("Lembre-se de recuperar usos de habilidades que recarregam em descanso curto (ex: Ki de Monge, Retomar Fôlego de Guerreiro).");

    onCharacterUpdate(character.id, updates);
    setRestMessage(messages.join(" "));
    setShowRestModal(null);
    setHdRollResults([]);
    setTotalHdHealed(0);
  };

  const applyLongRestBenefits = () => {
    if (!onCharacterUpdate) return;
    const updates: Partial<Character> = { ...character };
    let messages = ["Descanso Longo finalizado."];

    updates.hp = character.hpt;
    messages.push(`HP totalmente recuperado para ${character.hpt}.`);

    const hitDiceRecovered = Math.max(1, Math.floor(character.maxHitDice / 2));
    updates.currentHitDice = Math.min(character.maxHitDice, character.currentHitDice + hitDiceRecovered);
    messages.push(`${hitDiceRecovered} Dados de Vida recuperados (Total agora: ${updates.currentHitDice}/${character.maxHitDice}).`);

    if (updates.magic) {
        const maxSpellSlots = getClassSpellSlots(character.charClass, character.level);
        updates.magic.spellSlots = maxSpellSlots; 
        updates.magic.currentSpellSlots = [...maxSpellSlots]; 
        messages.push("Todos os espaços de magia recuperados.");
    }
    
    // Restore all trackable limited use abilities
    if (character.maxRages !== undefined) updates.currentRages = character.maxRages;
    if (character.maxBardicInspirations !== undefined) updates.currentBardicInspirations = character.maxBardicInspirations;
    if (character.maxChannelDivinityUses !== undefined) updates.currentChannelDivinityUses = character.maxChannelDivinityUses;
    if (character.maxSecondWindUses !== undefined) updates.currentSecondWindUses = character.maxSecondWindUses;
    if (character.maxActionSurgeUses !== undefined) updates.currentActionSurgeUses = character.maxActionSurgeUses;
    if (character.maxKiPoints !== undefined) updates.currentKiPoints = character.maxKiPoints;
    if (character.maxLayOnHandsPool !== undefined) updates.currentLayOnHandsPool = character.maxLayOnHandsPool;
    if (character.maxRelentlessEnduranceUses !== undefined) updates.currentRelentlessEnduranceUses = character.maxRelentlessEnduranceUses;
    if (character.maxBreathWeaponUses !== undefined) updates.currentBreathWeaponUses = character.maxBreathWeaponUses;

    messages.push("Todos os usos de habilidades rastreáveis recuperados.");
    messages.push("Lembre-se de recuperar usos de habilidades que recarregam em descanso longo.");

    onCharacterUpdate(character.id, updates);
    setRestMessage(messages.join(" "));
    setShowRestModal(null);
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
                {feature.description && (feature.type !== 'choice' || !feature.choiceLabel) && ( 
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
  
  const renderRacialFeaturesDisplay = (features?: RacialFeatureSelection[]) => {
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
          <InfoItem label="Dados de Vida" value={`${character.currentHitDice}d${character.hitDieType} / ${character.maxHitDice}d${character.hitDieType}`} />
        </div>
      </div>

       <Section title="Recursos e Habilidades de Uso Limitado">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Class Abilities */}
                {character.charClass === 'Bárbaro' && character.maxRages !== undefined && (
                    <div className="p-3 bg-slate-100 dark:bg-slate-600/50 rounded-md">
                        <InfoItem label="Fúrias" value={`${character.currentRages ?? 0} / ${character.maxRages ?? 0}`} />
                        <div className="flex space-x-1 mt-1">
                            <Button onClick={() => handleUseGenericAbility('rage')} size="sm" className="text-xs px-2 py-1 flex-1" disabled={(character.currentRages ?? 0) === 0}>Usar</Button>
                            <Button onClick={() => handleRecoverGenericAbilityUse('rage')} variant="secondary" size="sm" className="text-xs px-2 py-1 flex-1"  disabled={(character.currentRages ?? 0) >= (character.maxRages ?? 0)}>Recuperar</Button>
                        </div>
                    </div>
                )}
                {character.charClass === 'Bardo' && character.maxBardicInspirations !== undefined && (
                    <div className="p-3 bg-slate-100 dark:bg-slate-600/50 rounded-md">
                        <InfoItem label="Inspirações de Bardo" value={`${character.currentBardicInspirations ?? 0} / ${character.maxBardicInspirations ?? 0}`} />
                         <div className="flex space-x-1 mt-1">
                            <Button onClick={() => handleUseGenericAbility('bardicInspiration')} size="sm" className="text-xs px-2 py-1 flex-1" disabled={(character.currentBardicInspirations ?? 0) === 0}>Usar</Button>
                            <Button onClick={() => handleRecoverGenericAbilityUse('bardicInspiration')} variant="secondary" size="sm" className="text-xs px-2 py-1 flex-1" disabled={(character.currentBardicInspirations ?? 0) >= (character.maxBardicInspirations ?? 0)}>Recuperar</Button>
                        </div>
                    </div>
                )}
                {(character.charClass === 'Clérigo' || character.charClass === 'Paladino') && character.maxChannelDivinityUses !== undefined && (
                     <div className="p-3 bg-slate-100 dark:bg-slate-600/50 rounded-md">
                        <InfoItem label="Canalizar Divindade" value={`${character.currentChannelDivinityUses ?? 0} / ${character.maxChannelDivinityUses ?? 0}`} />
                         <div className="flex space-x-1 mt-1">
                            <Button onClick={() => handleUseGenericAbility('channelDivinity')} size="sm" className="text-xs px-2 py-1 flex-1" disabled={(character.currentChannelDivinityUses ?? 0) === 0}>Usar</Button>
                            <Button onClick={() => handleRecoverGenericAbilityUse('channelDivinity')} variant="secondary" size="sm" className="text-xs px-2 py-1 flex-1" disabled={(character.currentChannelDivinityUses ?? 0) >= (character.maxChannelDivinityUses ?? 0)}>Recuperar</Button>
                        </div>
                    </div>
                )}
                {character.charClass === 'Guerreiro' && character.maxSecondWindUses !== undefined && (
                    <div className="p-3 bg-slate-100 dark:bg-slate-600/50 rounded-md">
                        <InfoItem label="Retomar o Fôlego" value={`${character.currentSecondWindUses ?? 0} / ${character.maxSecondWindUses ?? 0}`} />
                        <div className="flex space-x-1 mt-1">
                            <Button onClick={() => handleUseGenericAbility('secondWind')} size="sm" className="text-xs px-2 py-1 flex-1" disabled={(character.currentSecondWindUses ?? 0) === 0}>Usar</Button>
                            <Button onClick={() => handleRecoverGenericAbilityUse('secondWind')} variant="secondary" size="sm" className="text-xs px-2 py-1 flex-1" disabled={(character.currentSecondWindUses ?? 0) >= (character.maxSecondWindUses ?? 0)}>Recuperar</Button>
                        </div>
                    </div>
                )}
                {character.charClass === 'Guerreiro' && character.maxActionSurgeUses !== undefined && (
                    <div className="p-3 bg-slate-100 dark:bg-slate-600/50 rounded-md">
                        <InfoItem label="Surto de Ação" value={`${character.currentActionSurgeUses ?? 0} / ${character.maxActionSurgeUses ?? 0}`} />
                        <div className="flex space-x-1 mt-1">
                            <Button onClick={() => handleUseGenericAbility('actionSurge')} size="sm" className="text-xs px-2 py-1 flex-1" disabled={(character.currentActionSurgeUses ?? 0) === 0}>Usar</Button>
                            <Button onClick={() => handleRecoverGenericAbilityUse('actionSurge')} variant="secondary" size="sm" className="text-xs px-2 py-1 flex-1" disabled={(character.currentActionSurgeUses ?? 0) >= (character.maxActionSurgeUses ?? 0)}>Recuperar</Button>
                        </div>
                    </div>
                )}
                {character.charClass === 'Monge' && character.maxKiPoints !== undefined && (
                     <div className="p-3 bg-slate-100 dark:bg-slate-600/50 rounded-md">
                        <InfoItem label="Pontos de Chi" value={`${character.currentKiPoints ?? 0} / ${character.maxKiPoints ?? 0}`} />
                        <div className="flex space-x-1 mt-1">
                            <Button onClick={() => handleUseGenericAbility('kiPoints')} size="sm" className="text-xs px-2 py-1 flex-1" disabled={(character.currentKiPoints ?? 0) === 0}>Gastar Ponto</Button>
                            <Button onClick={() => handleRecoverGenericAbilityUse('kiPoints')} variant="secondary" size="sm" className="text-xs px-2 py-1 flex-1" disabled={(character.currentKiPoints ?? 0) >= (character.maxKiPoints ?? 0)}>Recuperar Ponto</Button>
                        </div>
                    </div>
                )}
                 {character.charClass === 'Paladino' && character.maxLayOnHandsPool !== undefined && (
                     <div className="p-3 bg-slate-100 dark:bg-slate-600/50 rounded-md md:col-span-2 lg:col-span-1">
                        <InfoItem label="Cura Pelas Mãos (Reserva)" value={`${character.currentLayOnHandsPool ?? 0} / ${character.maxLayOnHandsPool ?? 0} PV`} />
                        <div className="mt-1">
                             <Input 
                                label="PV para Curar"
                                id={`layonhands-heal-${character.id}`}
                                type="number"
                                value={layOnHandsHealAmount}
                                onChange={(e) => setLayOnHandsHealAmount(e.target.value)}
                                min="1"
                                max={character.currentLayOnHandsPool?.toString() ?? '1'}
                                className="text-xs"
                             />
                             <Button onClick={() => handleUseLayOnHands(parseInt(layOnHandsHealAmount,10) || 0)} size="sm" className="text-xs px-2 py-1 w-full mt-1" disabled={(character.currentLayOnHandsPool ?? 0) === 0}>Curar PV</Button>
                             <Button onClick={() => handleUseLayOnHands(0, true)} variant="secondary" size="sm" className="text-xs px-2 py-1 w-full mt-1" disabled={(character.currentLayOnHandsPool ?? 0) < 5}>Curar Doença/Veneno (5PV)</Button>
                        </div>
                    </div>
                )}

                {/* Racial Abilities */}
                {character.race === 'Meio-Orc' && character.maxRelentlessEnduranceUses !== undefined && (
                    <div className="p-3 bg-slate-100 dark:bg-slate-600/50 rounded-md">
                        <InfoItem label="Resistência Implacável" value={`${character.currentRelentlessEnduranceUses ?? 0} / ${character.maxRelentlessEnduranceUses ?? 0}`} />
                        <div className="flex space-x-1 mt-1">
                            <Button onClick={() => handleUseGenericAbility('relentlessEndurance')} size="sm" className="text-xs px-2 py-1 flex-1" disabled={(character.currentRelentlessEnduranceUses ?? 0) === 0}>Marcar Usado</Button>
                            <Button onClick={() => handleRecoverGenericAbilityUse('relentlessEndurance')} variant="secondary" size="sm" className="text-xs px-2 py-1 flex-1" disabled={(character.currentRelentlessEnduranceUses ?? 0) >= (character.maxRelentlessEnduranceUses ?? 0)}>Recuperar</Button>
                        </div>
                    </div>
                )}
                {character.race === 'Draconato' && character.maxBreathWeaponUses !== undefined && (
                    <div className="p-3 bg-slate-100 dark:bg-slate-600/50 rounded-md">
                        <InfoItem label="Arma de Sopro" value={`${character.currentBreathWeaponUses ?? 0} / ${character.maxBreathWeaponUses ?? 0}`} />
                        <div className="flex space-x-1 mt-1">
                            <Button onClick={() => handleUseGenericAbility('breathWeapon')} size="sm" className="text-xs px-2 py-1 flex-1" disabled={(character.currentBreathWeaponUses ?? 0) === 0}>Usar</Button>
                            <Button onClick={() => handleRecoverGenericAbilityUse('breathWeapon')} variant="secondary" size="sm" className="text-xs px-2 py-1 flex-1" disabled={(character.currentBreathWeaponUses ?? 0) >= (character.maxBreathWeaponUses ?? 0)}>Recuperar</Button>
                        </div>
                    </div>
                )}
            </div>
        </Section>


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

      {onCharacterUpdate && (
        <Section title="Descanso">
          <div className="flex space-x-2 mb-4">
            <Button onClick={() => { setShowRestModal('short'); setRestMessage(null); setHdRollResults([]); setTotalHdHealed(0); }} variant="primary">Descanso Curto</Button>
            <Button onClick={() => { setShowRestModal('long'); setRestMessage(null);}} variant="primary">Descanso Longo</Button>
          </div>

          {restMessage && (
            <div className={`p-3 my-2 rounded-md text-sm ${restMessage.includes("inválido") || restMessage.includes("insuficiente") ? 'bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200' : 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200'}`}>
              {restMessage.split('. ').map((msg, idx) => <p key={idx}>{msg}{idx < restMessage.split('. ').length -1 ? '.' : ''}</p>)}
            </div>
          )}

          {showRestModal === 'short' && (
            <div className="p-4 border border-slate-300 dark:border-slate-600 rounded-md mt-4 bg-slate-100 dark:bg-slate-700">
              <h4 className="text-lg font-semibold text-sky-700 dark:text-sky-300 mb-2">Opções de Descanso Curto</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">Dados de Vida Atuais: {character.currentHitDice}d{character.hitDieType}</p>
              {character.currentHitDice > 0 ? (
                <div className="flex items-end space-x-2 mb-3">
                  <Input
                    label="Dados de Vida a Gastar"
                    id={`spend-hd-${character.id}`}
                    type="number"
                    value={hitDiceToSpendInput}
                    onChange={(e) => setHitDiceToSpendInput(e.target.value)}
                    min="1"
                    max={character.currentHitDice.toString()}
                    className="w-32"
                  />
                  <Button onClick={handleSpendHitDice} variant="secondary" className="py-2.5">Gastar Dados & Curar</Button>
                </div>
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Nenhum Dado de Vida restante para gastar.</p>
              )}
              {hdRollResults.length > 0 && (
                <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                  <p><strong>Rolagens:</strong></p>
                  {hdRollResults.map((roll, idx) => <p key={idx}>{roll}</p>)}
                  <p><strong>Total Curado com Dados de Vida: {totalHdHealed} PV</strong></p>
                </div>
              )}
              <Button onClick={applyShortRestBenefits} variant="primary" className="w-full mt-2">Finalizar Descanso Curto (Outros Benefícios)</Button>
              <Button onClick={() => setShowRestModal(null)} variant="secondary" className="w-full mt-2">Cancelar</Button>
            </div>
          )}

          {showRestModal === 'long' && (
            <div className="p-4 border border-slate-300 dark:border-slate-600 rounded-md mt-4 bg-slate-100 dark:bg-slate-700">
              <h4 className="text-lg font-semibold text-sky-700 dark:text-sky-300 mb-2">Confirmar Descanso Longo?</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                Isso irá recuperar todo o HP, metade dos Dados de Vida (mín. 1), todos os espaços de magia e outros recursos de classe.
              </p>
              <div className="flex space-x-2">
                <Button onClick={applyLongRestBenefits} variant="primary" className="flex-1">Sim, Descansar</Button>
                <Button onClick={() => setShowRestModal(null)} variant="secondary" className="flex-1">Cancelar</Button>
              </div>
            </div>
          )}
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
        {renderRacialFeaturesDisplay(character.racialFeatures)}
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {magicInfo.spellSlots?.map((maxSlots, i) => {
                if (maxSlots === 0 && (magicInfo.currentSpellSlots?.[i] ?? 0) === 0 && character.charClass !== 'Bruxo') return null; 
                
                let displayLevel = i + 1;
                let actualMaxSlots = maxSlots;
                let actualCurrentSlots = magicInfo.currentSpellSlots?.[i] ?? 0;

                if (character.charClass === 'Bruxo' && character.level > 0 && WARLOCK_PACT_SLOT_LEVEL.length >= character.level) {
                    const warlockPactSlotLevel = WARLOCK_PACT_SLOT_LEVEL[character.level -1];
                    if (displayLevel !== warlockPactSlotLevel) return null; 
                    actualMaxSlots = magicInfo.spellSlots[warlockPactSlotLevel-1];
                    actualCurrentSlots = magicInfo.currentSpellSlots[warlockPactSlotLevel-1];
                }
                 if(actualMaxSlots === 0 && actualCurrentSlots === 0) return null;


                return (
                  <div key={`slot-level-${i+1}`} className="p-2 bg-slate-100 dark:bg-slate-600/70 rounded shadow">
                    <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">Nível {displayLevel}</div>
                    <div className="text-lg font-semibold text-slate-800 dark:text-slate-100 my-1">
                      {actualCurrentSlots} / {actualMaxSlots}
                    </div>
                    {onCharacterUpdate && actualMaxSlots > 0 && (
                      <div className="flex space-x-1 mt-1">
                        <Button 
                          onClick={() => handleUseSpellSlot(i)} 
                          size="sm" 
                          className="text-xs px-1.5 py-0.5 flex-1"
                          disabled={actualCurrentSlots === 0}
                          aria-label={`Usar espaço de magia nível ${displayLevel}`}
                        >
                          Usar
                        </Button>
                        <Button 
                          onClick={() => handleRecoverSpellSlot(i)} 
                          variant="secondary" 
                          size="sm" 
                          className="text-xs px-1.5 py-0.5 flex-1"
                          disabled={actualCurrentSlots >= actualMaxSlots}
                          aria-label={`Recuperar espaço de magia nível ${displayLevel}`}
                        >
                          Rec.
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Section>
      )}
    </div>
  );
};

export default CharacterSheetDisplay;
