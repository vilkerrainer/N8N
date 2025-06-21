

import React, { useState, useEffect } from 'react';
import { Character, AttributeName, ATTRIBUTE_NAMES, ATTRIBUTE_LABELS, MagicInfo, Spell } from '../types';
import { ALL_SKILLS, SkillDefinition, calculateProficiencyBonus } from '../skills';
import { RACES, CLASSES, BACKGROUNDS, ALIGNMENTS, FIGHTING_STYLE_OPTIONS, CLASS_SPELLCASTING_ABILITIES } from '../dndOptions';
import { ALL_AVAILABLE_SPELLS, getCantripsByClass, getSpellsByClassAndLevel } from '../spells'; 
import { 
  getClassSpellSlots, 
  getClassCantripsKnownCount, 
  getClassSpellsKnownCount,
  getWizardLevel1SpellsForSpellbook,
  getClassMaxSpellLevel 
} from '../classFeatures'; 
import { calculateModifier, formatModifier } from './AttributeField';

import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';

interface CharacterFormProps {
  onSave: (character: Character) => void;
  initialData?: Character | null; 
}

const initialCharacterValues: Omit<Character, 'id' | 'magic'> & { id?: string; magic: MagicInfo } = {
  photoUrl: 'https://picsum.photos/200/300',
  name: '',
  background: BACKGROUNDS[0],
  race: RACES[0],
  charClass: CLASSES[0],
  age: 18,
  alignment: ALIGNMENTS[0],
  coins: 0,
  level: 1,
  hp: 10,
  hpt: 10,
  ac: 10,
  attributes: {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  },
  proficientSkills: [],
  skillNotes: '',
  items: '',
  savingThrows: '',
  abilities: '',
  fightingStyle: FIGHTING_STYLE_OPTIONS[0].name,
  magic: {
    spellcastingAbilityName: undefined,
    spellSaveDC: 0,
    spellAttackBonus: 0,
    cantripsKnown: [],
    spellsKnownPrepared: [],
    spellbook: [], 
    spellSlots: Array(9).fill(0),
  }
};


const CharacterForm: React.FC<CharacterFormProps> = ({ onSave, initialData }) => {
  const [formData, setFormData] = useState<Character>(() => {
    const baseData = initialData && initialData.id 
      ? { ...initialData } 
      : { ...initialCharacterValues, id: '', proficientSkills: initialData?.proficientSkills || [] };
    
    baseData.magic = {
      ...(initialCharacterValues.magic), 
      ...(baseData.magic || {}), 
      spellSlots: baseData.magic?.spellSlots && baseData.magic.spellSlots.length === 9 
                    ? baseData.magic.spellSlots 
                    : Array(9).fill(0), 
    };
    
    const initialPrimaryAbility = CLASS_SPELLCASTING_ABILITIES[baseData.charClass] || undefined;
    baseData.magic.spellcastingAbilityName = baseData.magic.spellcastingAbilityName || initialPrimaryAbility;
    
    if (baseData.charClass && baseData.level) {
        baseData.magic.spellSlots = getClassSpellSlots(baseData.charClass, baseData.level);
    }
    if (!FIGHTING_STYLE_OPTIONS.some(fso => fso.name === baseData.fightingStyle)) {
        baseData.fightingStyle = FIGHTING_STYLE_OPTIONS[0].name;
    }


    return baseData;
  });

  const [availableCantrips, setAvailableCantrips] = useState<Spell[]>([]);
  const [numCantripsAllowed, setNumCantripsAllowed] = useState<number>(0);
  
  const [availableL1WizardSpells, setAvailableL1WizardSpells] = useState<Spell[]>([]);
  const numInitialWizardSpellbookSpells = getWizardLevel1SpellsForSpellbook(); 

  const [availableSpellsForSelection, setAvailableSpellsForSelection] = useState<Spell[]>([]);
  const [numSpellsKnownAllowed, setNumSpellsKnownAllowed] = useState<number>(0);

  const [expandedSpellName, setExpandedSpellName] = useState<string | null>(null);

  const [calculatedSpellSaveDC, setCalculatedSpellSaveDC] = useState<number | null>(null);
  const [calculatedSpellAttackBonus, setCalculatedSpellAttackBonus] = useState<string | null>(null);
  const [selectedFightingStyleDescription, setSelectedFightingStyleDescription] = useState<string>('');


  useEffect(() => {
    const baseData = initialData && initialData.id 
      ? { ...initialData }
      : { ...initialCharacterValues, id: '', proficientSkills: initialData?.proficientSkills || [] };

    baseData.magic = {
      ...(initialCharacterValues.magic),
      ...(baseData.magic || {}),
      spellSlots: baseData.magic?.spellSlots && baseData.magic.spellSlots.length === 9 
                    ? baseData.magic.spellSlots 
                    : Array(9).fill(0),
    };
    
    const initialPrimaryAbility = CLASS_SPELLCASTING_ABILITIES[baseData.charClass] || undefined;
    baseData.magic.spellcastingAbilityName = baseData.magic.spellcastingAbilityName || initialPrimaryAbility;

    if (baseData.charClass && baseData.level) {
        baseData.magic.spellSlots = getClassSpellSlots(baseData.charClass, baseData.level);
    }
    if (!FIGHTING_STYLE_OPTIONS.some(fso => fso.name === baseData.fightingStyle)) {
        baseData.fightingStyle = FIGHTING_STYLE_OPTIONS[0].name;
    }
    setFormData(baseData);
  }, [initialData]);

  useEffect(() => {
    const style = FIGHTING_STYLE_OPTIONS.find(fs => fs.name === formData.fightingStyle);
    setSelectedFightingStyleDescription(style ? style.description : (FIGHTING_STYLE_OPTIONS[0]?.description || ''));
  }, [formData.fightingStyle]);


  useEffect(() => {
    const className = formData.charClass;
    const level = formData.level;

    setExpandedSpellName(null); 

    let currentAvailableCantrips: Spell[] = [];
    let currentNumCantripsAllowed = 0;
    let currentAvailableL1WizardSpells: Spell[] = [];
    let currentAvailableSpellsForSelection: Spell[] = [];
    let currentNumSpellsKnownAllowed = 0;

    if (className && level >= 1) {
      currentAvailableCantrips = getCantripsByClass(className);
      currentNumCantripsAllowed = getClassCantripsKnownCount(className, level);

      if (className === 'Mago') {
        currentAvailableL1WizardSpells = getSpellsByClassAndLevel('Mago', 1);
      } else if (['Patrulheiro', 'Feiticeiro', 'Bardo', 'Bruxo'].includes(className)) {
        const maxSpellLvlForClass = getClassMaxSpellLevel(className, level);
        let learnableSpells: Spell[] = [];
        for (let spellLvl = 1; spellLvl <= maxSpellLvlForClass; spellLvl++) {
          learnableSpells = [...learnableSpells, ...getSpellsByClassAndLevel(className, spellLvl)];
        }
        currentAvailableSpellsForSelection = learnableSpells;
        currentNumSpellsKnownAllowed = getClassSpellsKnownCount(className, level);
      } else if (['Clérigo', 'Druida', 'Paladino'].includes(className)){
        const maxSpellLvlForClass = getClassMaxSpellLevel(className, level);
        let preparableSpells: Spell[] = [];
         for (let spellLvl = 1; spellLvl <= maxSpellLvlForClass; spellLvl++) {
          preparableSpells = [...preparableSpells, ...getSpellsByClassAndLevel(className, spellLvl)];
        }
        currentAvailableSpellsForSelection = preparableSpells;
        currentNumSpellsKnownAllowed = Infinity; 
      }
    }
    
    setAvailableCantrips(currentAvailableCantrips);
    setNumCantripsAllowed(currentNumCantripsAllowed);
    setAvailableL1WizardSpells(currentAvailableL1WizardSpells);
    setAvailableSpellsForSelection(currentAvailableSpellsForSelection);
    setNumSpellsKnownAllowed(currentNumSpellsKnownAllowed);

    setFormData(prev => {
      const currentClass = prev.charClass;
      const currentLevel = prev.level;
      
      const updatedMagic = { ...(prev.magic || initialCharacterValues.magic) };
      const primaryAbility = CLASS_SPELLCASTING_ABILITIES[currentClass] || undefined;
      
      if (updatedMagic.spellcastingAbilityName !== primaryAbility && 
        (!updatedMagic.spellcastingAbilityName || CLASS_SPELLCASTING_ABILITIES[initialData?.charClass || ''] !== updatedMagic.spellcastingAbilityName)) {
           if(CLASS_SPELLCASTING_ABILITIES[currentClass]) { 
             updatedMagic.spellcastingAbilityName = primaryAbility;
           }
      }
        
      updatedMagic.spellSlots = getClassSpellSlots(currentClass, currentLevel);

      const validCantripNames = getCantripsByClass(currentClass).map(s => s.name);
      updatedMagic.cantripsKnown = (updatedMagic.cantripsKnown || []).filter(spellName => 
        validCantripNames.includes(spellName)
      );

      if (currentClass === 'Mago') {
        const allWizardSpellNames = [];
        for(let i=0; i<=9; i++) allWizardSpellNames.push(...getSpellsByClassAndLevel('Mago', i).map(s => s.name));
        
        updatedMagic.spellbook = (updatedMagic.spellbook || []).filter(spellName =>
          allWizardSpellNames.includes(spellName)
        );
         updatedMagic.spellsKnownPrepared = (updatedMagic.spellsKnownPrepared || []).filter(spellName =>
            allWizardSpellNames.includes(spellName)
        );

      } else if (['Patrulheiro', 'Feiticeiro', 'Bardo', 'Bruxo'].includes(currentClass)) {
        const maxSpellLvl = getClassMaxSpellLevel(currentClass, currentLevel);
        let validKnownSpellNames: string[] = [];
        for (let spellLvl = 1; spellLvl <= maxSpellLvl; spellLvl++) {
          validKnownSpellNames = [...validKnownSpellNames, ...getSpellsByClassAndLevel(currentClass, spellLvl).map(s => s.name)];
        }
        updatedMagic.spellsKnownPrepared = (updatedMagic.spellsKnownPrepared || []).filter(spellName => 
          validKnownSpellNames.includes(spellName)
        );
      } else if (['Clérigo', 'Druida', 'Paladino'].includes(currentClass)) {
        const maxSpellLvl = getClassMaxSpellLevel(currentClass, currentLevel);
        let validPreparableSpellNames: string[] = [];
        for (let spellLvl = 1; spellLvl <= maxSpellLvl; spellLvl++) {
          validPreparableSpellNames = [...validPreparableSpellNames, ...getSpellsByClassAndLevel(currentClass, spellLvl).map(s => s.name)];
        }
        updatedMagic.spellsKnownPrepared = (updatedMagic.spellsKnownPrepared || []).filter(spellName =>
            validPreparableSpellNames.includes(spellName)
        );
      }

      if (JSON.stringify(prev.magic) !== JSON.stringify(updatedMagic)) {
        return { ...prev, magic: updatedMagic };
      }
      return prev; 
    });

  }, [formData.charClass, formData.level, initialData?.charClass]);


  useEffect(() => {
    const spellcastingAbility = formData.magic?.spellcastingAbilityName;
    const attributes = formData.attributes;
    const level = formData.level;

    if (spellcastingAbility && attributes[spellcastingAbility] && level >= 1) {
      const abilityScore = attributes[spellcastingAbility];
      const modifier = calculateModifier(abilityScore);
      const proficiency = calculateProficiencyBonus(level);

      setCalculatedSpellSaveDC(8 + proficiency + modifier);
      setCalculatedSpellAttackBonus(formatModifier(proficiency + modifier));
    } else {
      setCalculatedSpellSaveDC(null);
      setCalculatedSpellAttackBonus(null);
    }
  }, [formData.magic?.spellcastingAbilityName, formData.attributes, formData.level]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'file' && name === 'photoUrlFile') {
      const inputElement = e.target as HTMLInputElement;
      if (inputElement.files && inputElement.files[0]) {
        const file = inputElement.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({
            ...prev,
            photoUrl: reader.result as string,
          }));
        };
        reader.readAsDataURL(file);
      } else {
        setFormData(prev => ({
          ...prev,
          photoUrl: initialData?.photoUrl || initialCharacterValues.photoUrl,
        }));
      }
      return; 
    }
    
    if (name.startsWith('attributes.')) {
      const attributeName = name.split('.')[1] as AttributeName;
      setFormData(prev => ({
        ...prev,
        attributes: {
          ...prev.attributes,
          [attributeName]: type === 'number' ? parseInt(value) || 0 : value,
        }
      }));
    } else if (name.startsWith('magic.')) {
      const magicField = name.split('.')[1];
      if (magicField === 'spellSlots') {
        const slotIndex = parseInt(name.split('.')[2]);
        const newSpellSlots = [...(formData.magic?.spellSlots || Array(9).fill(0))];
        newSpellSlots[slotIndex] = parseInt(value) || 0;
        setFormData(prev => ({
          ...prev,
          magic: {
            ...(prev.magic || initialCharacterValues.magic),
            spellSlots: newSpellSlots,
          }
        }));
      } else if (magicField === 'spellcastingAbilityName') {
          setFormData(prev => ({
            ...prev,
            magic: {
              ...(prev.magic || initialCharacterValues.magic),
              spellcastingAbilityName: value as AttributeName || undefined,
            }
          }));
      } else if (['cantripsKnown', 'spellsKnownPrepared', 'spellbook'].includes(magicField) && e.target.type === 'textarea') {
         setFormData(prev => ({
            ...prev,
            magic: {
                ...(prev.magic || initialCharacterValues.magic),
                [magicField]: value.split(',').map(s => s.trim()).filter(s => s),
            }
        }));
      }
       else {
        setFormData(prev => ({
          ...prev,
          magic: {
            ...(prev.magic || initialCharacterValues.magic),
            [magicField]: type === 'number' ? parseInt(value) || 0 : value,
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseInt(value) || 0 : value,
      }));
    }
  };

  const handleSkillProficiencyChange = (skillKey: string) => {
    setFormData(prev => {
      const newProficientSkills = prev.proficientSkills.includes(skillKey)
        ? prev.proficientSkills.filter(s => s !== skillKey)
        : [...prev.proficientSkills, skillKey];
      return { ...prev, proficientSkills: newProficientSkills };
    });
  };
  
  const handleMagicArrayChange = (fieldName: 'cantripsKnown' | 'spellbook' | 'spellsKnownPrepared', spellName: string) => {
    setFormData(prev => {
        const currentArray: string[] = prev.magic?.[fieldName as keyof MagicInfo] as string[] || [];
        const newArray = currentArray.includes(spellName)
            ? currentArray.filter(s => s !== spellName)
            : [...currentArray, spellName];
        
        let limit = Infinity;
        if (fieldName === 'cantripsKnown') {
            limit = numCantripsAllowed;
        } else if (fieldName === 'spellbook' && prev.charClass === 'Mago') {
            limit = numInitialWizardSpellbookSpells; 
        } else if (fieldName === 'spellsKnownPrepared' && ['Patrulheiro', 'Feiticeiro', 'Bardo', 'Bruxo'].includes(prev.charClass)) {
            limit = numSpellsKnownAllowed;
        }
        
        if (newArray.length > limit && !currentArray.includes(spellName) && limit !== Infinity) {
             console.warn(`Cannot add ${spellName}. Limit of ${limit} for ${fieldName} reached.`);
             return prev; 
        }

        return {
            ...prev,
            magic: {
                ...(prev.magic || initialCharacterValues.magic),
                [fieldName]: newArray,
            }
        };
    });
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const characterToSave: Character = { 
        ...formData, 
        id: formData.id || `char_${Date.now()}`, // Ensure unique ID
        magic: { 
            ...(formData.magic || initialCharacterValues.magic),
            spellcastingAbilityName: formData.magic?.spellcastingAbilityName || CLASS_SPELLCASTING_ABILITIES[formData.charClass] || undefined,
            spellSaveDC: formData.magic?.spellSaveDC || calculatedSpellSaveDC || 0,
            spellAttackBonus: formData.magic?.spellAttackBonus || (calculatedSpellAttackBonus ? parseFloat(calculatedSpellAttackBonus) : 0),
            cantripsKnown: Array.isArray(formData.magic?.cantripsKnown) 
                ? formData.magic.cantripsKnown 
                : ((formData.magic?.cantripsKnown as unknown as string)?.split(',').map(s=>s.trim()).filter(s=>s) || []),
            spellsKnownPrepared: Array.isArray(formData.magic?.spellsKnownPrepared) 
                ? formData.magic.spellsKnownPrepared 
                : ((formData.magic?.spellsKnownPrepared as unknown as string)?.split(',').map(s=>s.trim()).filter(s=>s) || []),
            spellbook: Array.isArray(formData.magic?.spellbook) 
                ? formData.magic.spellbook 
                : ((formData.magic?.spellbook as unknown as string)?.split(',').map(s=>s.trim()).filter(s=>s) || []),
            spellSlots: formData.magic?.spellSlots && formData.magic.spellSlots.length === 9 ? formData.magic.spellSlots : Array(9).fill(0),
        }
    };
    onSave(characterToSave);
  };

  const SelectInput: React.FC<{label: string, name: string, value: string | undefined, options: {value: string, label: string}[], onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, required?: boolean}> = 
    ({label, name, value, options, onChange, required = false}) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 dark:focus:ring-sky-500 dark:focus:border-sky-500 sm:text-sm text-slate-900 dark:text-slate-100"
        required={required}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );

  const StringSelectInput: React.FC<{label: string, name: keyof Character | string, value: string, options: string[], onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, required?: boolean}> = 
  ({label, name, value, options, onChange, required = false}) => (
  <div className="mb-4">
    <label htmlFor={name as string} className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
      {label}
    </label>
    <select
      id={name as string}
      name={name as string}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 dark:focus:ring-sky-500 dark:focus:border-sky-500 sm:text-sm text-slate-900 dark:text-slate-100"
      required={required}
    >
      {options.map(option => (
        <option key={option} value={option}>{option || "Nenhum"}</option>
      ))}
    </select>
  </div>
);

  const renderSpellDetails = (spell: Spell) => (
    <div id={`details-${spell.name.replace(/\W/g, '-')}`} className="mt-2 p-3 bg-sky-50 dark:bg-slate-700 rounded text-xs text-slate-700 dark:text-slate-300 space-y-1 shadow-inner">
      <p><strong>Nível:</strong> {spell.level === 0 ? "Truque" : spell.level}</p>
      <p><strong>Escola:</strong> {spell.school}</p>
      <p><strong>Tempo de Conjuração:</strong> {spell.castingTime}</p>
      <p><strong>Alcance:</strong> {spell.range}</p>
      <p><strong>Componentes:</strong> {spell.components}</p>
      <p><strong>Duração:</strong> {spell.duration}</p>
      <p className="mt-1 whitespace-pre-wrap text-justify"><strong>Descrição:</strong> {spell.description}</p>
    </div>
  );

  const renderSpellListItem = (spell: Spell, listType: 'cantripsKnown' | 'spellbook' | 'spellsKnownPrepared', currentSelected: string[] | undefined, limit: number) => {
    const spellIdSafe = spell.name.replace(/\W/g, '-');
    const isChecked = currentSelected?.includes(spell.name) || false;
    const isDisabled = !isChecked && currentSelected && currentSelected.length >= limit && limit !== Infinity;

    return (
      <div key={`${listType}-${spell.name}`} className="p-3 border border-slate-200 dark:border-slate-700 rounded-md shadow-sm bg-white dark:bg-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id={`${listType}-${spellIdSafe}`}
              checked={isChecked}
              onChange={() => handleMagicArrayChange(listType, spell.name)}
              disabled={isDisabled}
              className="h-4 w-4 text-sky-600 border-slate-300 rounded focus:ring-sky-500 dark:text-sky-500 dark:border-slate-500 dark:focus:ring-sky-500 dark:bg-slate-600"
            />
            <label htmlFor={`${listType}-${spellIdSafe}`} className={`ml-3 text-sm font-medium text-slate-800 dark:text-slate-200 ${isDisabled && !isChecked ? 'text-slate-400 dark:text-slate-500' : ''}`}>
              {spell.name} {spell.level > 0 ? `(${spell.level}º Nível)` : ''}
            </label>
          </div>
          <button 
            type="button" 
            onClick={() => setExpandedSpellName(expandedSpellName === spell.name ? null : spell.name)}
            className="px-2 py-1 text-xs text-sky-700 dark:text-sky-300 hover:text-sky-600 dark:hover:text-sky-200 rounded bg-sky-100 dark:bg-sky-800 hover:bg-sky-200 dark:hover:bg-sky-700 transition-colors"
            aria-expanded={expandedSpellName === spell.name}
            aria-controls={`details-${spellIdSafe}`}
          >
            {expandedSpellName === spell.name ? 'Esconder' : 'Detalhes'}
          </button>
        </div>
        {expandedSpellName === spell.name && renderSpellDetails(spell)}
      </div>
    );
  }


  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white dark:bg-slate-800 shadow-xl rounded-lg space-y-6 max-w-2xl mx-auto my-8">
      <h2 className="text-2xl font-bold text-sky-700 dark:text-sky-400 text-center mb-6">{initialData && initialData.id ? 'Editar Personagem' : 'Criar Novo Personagem'}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Nome do Personagem" name="name" value={formData.name} onChange={handleChange} required />
        <StringSelectInput label="Raça" name="race" value={formData.race} onChange={handleChange} options={RACES} required/>
        <StringSelectInput label="Classe" name="charClass" value={formData.charClass} onChange={handleChange} options={CLASSES} required/>
        <StringSelectInput label="Antecedentes" name="background" value={formData.background} onChange={handleChange} options={BACKGROUNDS} required/>
        
        <div className="mb-4 md:col-span-2">
          <label htmlFor="photoUrlFile" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
            Foto do Personagem
          </label>
          <input
            id="photoUrlFile"
            name="photoUrlFile"
            type="file"
            accept="image/png, image/jpeg, image/gif, image/webp"
            onChange={handleChange}
            className="mt-1 block w-full text-sm text-slate-500 dark:text-slate-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-sky-100 dark:file:bg-sky-800 file:text-sky-700 dark:file:text-sky-300
              hover:file:bg-sky-200 dark:hover:file:bg-sky-700
              focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-sky-500 dark:focus:ring-sky-500
              text-slate-900 dark:text-slate-100"
          />
          {formData.photoUrl && (
            <div className="mt-2">
              <span className="text-xs text-slate-600 dark:text-gray-400">Prévia:</span>
              <img src={formData.photoUrl} alt="Prévia" className="mt-1 w-24 h-24 object-cover rounded shadow" />
            </div>
          )}
        </div>

        <Input label="Idade" name="age" type="number" value={formData.age} onChange={handleChange} />
        <StringSelectInput label="Tendência" name="alignment" value={formData.alignment} onChange={handleChange} options={ALIGNMENTS} required/>
        <Input label="Nível" name="level" type="number" value={formData.level} onChange={handleChange} min="1" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input label="HP Atual" name="hp" type="number" value={formData.hp} onChange={handleChange} />
        <Input label="HP Máximo (HPT)" name="hpt" type="number" value={formData.hpt} onChange={handleChange} />
        <Input label="Classe de Armadura (CA)" name="ac" type="number" value={formData.ac} onChange={handleChange} />
        <Input label="Moedas" name="coins" type="number" value={formData.coins} onChange={handleChange} />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-sky-600 dark:text-sky-400 mb-2">Atributos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {ATTRIBUTE_NAMES.map(attrName => (
            <Input
              key={attrName}
              label={ATTRIBUTE_LABELS[attrName]}
              name={`attributes.${attrName}`}
              type="number"
              value={formData.attributes[attrName]}
              onChange={handleChange}
              min="1" max="30"
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-sky-600 dark:text-sky-400 mb-3">Perícias Proficientes</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {ALL_SKILLS.map((skill: SkillDefinition) => (
            <div key={skill.key} className="flex items-center">
              <input
                type="checkbox"
                id={`skill-${skill.key}`}
                name={`skill-${skill.key}`}
                checked={formData.proficientSkills.includes(skill.key)}
                onChange={() => handleSkillProficiencyChange(skill.key)}
                className="h-4 w-4 text-sky-600 border-slate-300 rounded focus:ring-sky-500 dark:text-sky-500 dark:border-slate-500 dark:focus:ring-sky-500 dark:bg-slate-600"
              />
              <label htmlFor={`skill-${skill.key}`} className="ml-2 block text-sm text-slate-700 dark:text-slate-300">
                {skill.label} <span className="text-xs text-slate-500 dark:text-gray-400">({ATTRIBUTE_LABELS[skill.attribute].substring(0,3)})</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <Textarea label="Notas sobre Perícias e Habilidades" name="skillNotes" value={formData.skillNotes} onChange={handleChange} placeholder="Notas sobre perícias, talentos, etc." />
      <Textarea label="Resistências (Saving Throws)" name="savingThrows" value={formData.savingThrows} onChange={handleChange} placeholder="Ex: Força +2, Destreza +5" />
      <Textarea label="Inventário (Itens)" name="items" value={formData.items} onChange={handleChange} />
      <Textarea label="Habilidades da Classe/Raça" name="abilities" value={formData.abilities} onChange={handleChange} />
      
      <div>
        <StringSelectInput 
            label="Estilo de Luta" 
            name="fightingStyle" 
            value={formData.fightingStyle} 
            onChange={handleChange} 
            options={FIGHTING_STYLE_OPTIONS.map(opt => opt.name)} 
        />
        {selectedFightingStyleDescription && formData.fightingStyle && (
            <div className="mt-2 p-3 bg-sky-50 dark:bg-sky-900 rounded text-sm text-slate-700 dark:text-slate-300 shadow-inner">
                <p className="font-semibold">Descrição do Estilo de Luta:</p>
                <p className="whitespace-pre-wrap text-justify">{selectedFightingStyleDescription}</p>
            </div>
        )}
      </div>
      
      <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-4 border-b border-slate-300 dark:border-slate-600 pb-2">Magia</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
           <SelectInput 
            label="Habilidade de Conjuração Principal" 
            name="magic.spellcastingAbilityName"
            value={formData.magic?.spellcastingAbilityName || ''}
            onChange={handleChange}
            options={[
                { value: '', label: 'Nenhuma' },
                ...ATTRIBUTE_NAMES.map(attr => ({ value: attr, label: ATTRIBUTE_LABELS[attr] }))
            ]}
          />
          <div>
            <Input label="CD de Magia (Informado)" name="magic.spellSaveDC" type="number" value={formData.magic?.spellSaveDC || 0} onChange={handleChange} />
            {calculatedSpellSaveDC !== null && (
              <p className="text-xs text-slate-600 dark:text-gray-400 mt-1" aria-live="polite">CD Calculado: {calculatedSpellSaveDC}</p>
            )}
          </div>
          <div>
            <Input label="Bônus de Ataque Mágico (Informado)" name="magic.spellAttackBonus" type="number" value={formData.magic?.spellAttackBonus || 0} onChange={handleChange} />
             {calculatedSpellAttackBonus !== null && (
              <p className="text-xs text-slate-600 dark:text-gray-400 mt-1" aria-live="polite">Bônus Ataque Calculado: {calculatedSpellAttackBonus}</p>
            )}
          </div>
        </div>

        {!(formData.charClass && formData.level >= 1) && (
          <div className="my-4 p-4 bg-sky-100 dark:bg-sky-900 border border-sky-200 dark:border-sky-800 rounded-md text-center">
            <p className="text-sm text-sky-700 dark:text-sky-300">
              Por favor, selecione a Classe e o Nível do personagem acima para ver e escolher magias disponíveis.
            </p>
          </div>
        )}

        {formData.charClass && formData.level >= 1 && (
          <>
            <div className="my-6">
              <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">
                Truques Conhecidos{' '}
                {numCantripsAllowed > 0 && availableCantrips.length > 0
                  ? `(Escolha ${Math.min(numCantripsAllowed, availableCantrips.length)} de ${availableCantrips.length} disponíveis. Limite da classe: ${numCantripsAllowed})`
                  : formData.charClass && getClassCantripsKnownCount(formData.charClass, formData.level) === 0
                  ? '(Nenhum para esta classe/nível)'
                  : numCantripsAllowed > 0 && availableCantrips.length === 0 
                  ? `(Limite da classe: ${numCantripsAllowed}, nenhum truque cadastrado para seleção)`
                  : ''}
              </h4>
              {numCantripsAllowed > 0 ? (
                availableCantrips.length > 0 ? (
                  <div className="space-y-3">
                    {availableCantrips.map(spell => renderSpellListItem(spell, 'cantripsKnown', formData.magic?.cantripsKnown, numCantripsAllowed))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 dark:text-gray-400">Nenhum truque disponível para esta classe/nível ou lista de truques não carregada/cadastrada.</p>
                )
              ) : (
                 getClassCantripsKnownCount(formData.charClass, formData.level) === 0 && <p className="text-sm text-slate-500 dark:text-gray-400">Esta classe/nível não concede truques.</p>
              )}
            </div>

            {formData.charClass === 'Mago' && (
              <div className="my-6">
                <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">
                  Grimório - Magias de 1º Nível{' '}
                  {availableL1WizardSpells.length > 0 
                    ? `(Escolha ${Math.min(numInitialWizardSpellbookSpells, availableL1WizardSpells.length)} de ${availableL1WizardSpells.length} disponíveis. Limite inicial: ${numInitialWizardSpellbookSpells})`
                    : `(Limite inicial: ${numInitialWizardSpellbookSpells}, nenhuma magia de 1º nível cadastrada para seleção)`}
                </h4>
                {availableL1WizardSpells.length > 0 ? (
                  <div className="space-y-3">
                    {availableL1WizardSpells.map(spell => renderSpellListItem(spell, 'spellbook', formData.magic?.spellbook, numInitialWizardSpellbookSpells))}
                  </div>
                ) : (
                   <p className="text-sm text-slate-500 dark:text-gray-400">Nenhuma magia de 1º nível disponível para Magos neste momento ou lista não carregada/cadastrada.</p>
                )}
              </div>
            )}

            {['Patrulheiro', 'Feiticeiro', 'Bardo', 'Bruxo'].includes(formData.charClass) && numSpellsKnownAllowed > 0 && numSpellsKnownAllowed !== Infinity && (
              <div className="my-6">
                <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">
                  Magias Conhecidas{' '}
                  {availableSpellsForSelection.length > 0
                    ? `(Escolha ${Math.min(numSpellsKnownAllowed, availableSpellsForSelection.length)} de ${availableSpellsForSelection.length} disponíveis. Limite da classe: ${numSpellsKnownAllowed})`
                    : `(Limite da classe: ${numSpellsKnownAllowed}, nenhuma magia cadastrada para seleção)`}
                </h4>
                {availableSpellsForSelection.length > 0 ? (
                  <div className="space-y-3">
                    {availableSpellsForSelection.map(spell => renderSpellListItem(spell, 'spellsKnownPrepared', formData.magic?.spellsKnownPrepared, numSpellsKnownAllowed))}
                  </div>
                ) : (
                   <p className="text-sm text-slate-500 dark:text-gray-400">Nenhuma magia disponível para seleção para esta classe/nível, ou lista de magias não carregada/cadastrada.</p>
                )}
              </div>
            )}
            
            { (['Clérigo', 'Druida', 'Paladino'].includes(formData.charClass) || formData.charClass === 'Mago' ) && (
              <Textarea 
                label={`Magias ${formData.charClass === 'Mago' ? 'Preparadas do Grimório' : 'Preparadas'} (lista separada por vírgulas)`}
                name="magic.spellsKnownPrepared" 
                value={Array.isArray(formData.magic?.spellsKnownPrepared) ? formData.magic.spellsKnownPrepared.join(', ') : (formData.magic?.spellsKnownPrepared || '')}
                onChange={handleChange}
                placeholder={`Liste as magias ${formData.charClass === 'Mago' ? 'preparadas do grimório' : 'que você preparou para hoje'}`}
              />
            )}
             {['Patrulheiro', 'Feiticeiro', 'Bardo', 'Bruxo'].includes(formData.charClass) && numSpellsKnownAllowed === 0 && ( 
                <Textarea 
                    label="Magias Conhecidas (lista separada por vírgulas)" 
                    name="magic.spellsKnownPrepared" 
                    value={Array.isArray(formData.magic?.spellsKnownPrepared) ? formData.magic.spellsKnownPrepared.join(', ') : (formData.magic?.spellsKnownPrepared || '')}
                    onChange={handleChange}
                    placeholder="Ex: Curar Ferimentos, Marca do Caçador"
                />
            )}
            
            <div>
              <h4 className="text-md font-semibold text-slate-800 dark:text-slate-100 my-3">Espaços de Magia por Nível (Automático):</h4>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={`spellSlotDisplay${i+1}`} className="mb-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Nível {i+1}</label>
                    <input 
                        type="number"
                        name={`magic.spellSlots.${i}`} 
                        value={formData.magic?.spellSlots?.[i] !== undefined ? formData.magic.spellSlots[i] : 0}
                        onChange={handleChange} 
                        min="0"
                        className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm sm:text-sm text-slate-900 dark:text-slate-100"
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      
      <Button type="submit" className="w-full mt-8 py-3 text-lg">
        {initialData && initialData.id ? 'Salvar Alterações' : 'Criar Personagem'}
      </Button>
    </form>
  );
};

export default CharacterForm;
