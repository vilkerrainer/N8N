

import React, { useState, useEffect, useCallback } from 'react';
import { Character, AttributeName, ClassFeatureSelection, RacialFeatureSelection, RANKS, Rank, MagicInfo } from './types';
import CharacterForm from './components/CharacterForm';
import CharacterSheetDisplay from './components/CharacterSheetDisplay';
import Button from './components/ui/Button';
import RoleSelectionScreen from './components/RoleSelectionScreen';
import DMCharacterListView from './components/DMCharacterListView';
import PlayerCharacterList from './components/PlayerCharacterList';
import { 
    RACES, CLASSES, BACKGROUNDS, ALIGNMENTS, FIGHTING_STYLE_OPTIONS, 
    getHitDieTypeForClass, getMaxRages, getMaxBardicInspirations, getMaxChannelDivinityUses,
    getMaxRelentlessEnduranceUses, getMaxSecondWindUses, getMaxActionSurgeUses,
    getMaxBreathWeaponUses, getMaxKiPoints, getMaxLayOnHandsPool
} from './dndOptions'; 
import * as supabaseService from './supabaseService';
import { ALL_CLASS_FEATURES_MAP } from './classFeaturesData';
import { ALL_RACIAL_FEATURES_MAP } from './racialFeaturesData';
import { getClassSpellSlots } from './classFeatures';
import { calculateModifier } from './components/AttributeField';


const LOCAL_STORAGE_ROLE_KEY = 'dndUserRole';
const LOCAL_STORAGE_VIEWING_CHARACTER_ID_KEY = 'dndAppViewingCharacterId';
const LOCAL_STORAGE_ACTIVE_SCREEN_KEY = 'dndAppActiveScreen';


type Screen = 'role' | 'dm_list' | 'player_char_list' | 'player_sheet' | 'player_form';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);
  const [viewingCharacter, setViewingCharacter] = useState<Character | null>(null);
  const [screen, setScreen] = useState<Screen>('role');
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const clearViewingStateFromStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE_VIEWING_CHARACTER_ID_KEY);
    localStorage.removeItem(LOCAL_STORAGE_ACTIVE_SCREEN_KEY);
  };

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const savedRole = localStorage.getItem(LOCAL_STORAGE_ROLE_KEY);
      const savedViewingCharId = localStorage.getItem(LOCAL_STORAGE_VIEWING_CHARACTER_ID_KEY);
      const savedActiveScreen = localStorage.getItem(LOCAL_STORAGE_ACTIVE_SCREEN_KEY) as Screen | null;

      let fetchedCharacters = await supabaseService.getCharacters();
      
      fetchedCharacters = fetchedCharacters.map(c => {
        let updatedChar = { ...c };
        if (!updatedChar.rank) updatedChar.rank = RANKS[0];
        if (!updatedChar.classFeatures) updatedChar.classFeatures = [];
        if (!updatedChar.racialFeatures) updatedChar.racialFeatures = [];
        
        // Hit Dice
        updatedChar.maxHitDice = updatedChar.maxHitDice || updatedChar.level || 1;
        updatedChar.currentHitDice = updatedChar.currentHitDice !== undefined 
            ? Math.min(updatedChar.currentHitDice, updatedChar.maxHitDice) // Cap loaded currentHD by maxHD
            : updatedChar.maxHitDice; // Default to maxHD if undefined
        updatedChar.hitDieType = updatedChar.hitDieType || getHitDieTypeForClass(updatedChar.charClass || CLASSES[0]);

        // Magic Info
        const maxSpellSlots = getClassSpellSlots(updatedChar.charClass, updatedChar.level);
        if (updatedChar.magic) {
            updatedChar.magic.cantripsKnown = updatedChar.magic.cantripsKnown || [];
            updatedChar.magic.spellsKnownPrepared = updatedChar.magic.spellsKnownPrepared || [];
            updatedChar.magic.spellbook = updatedChar.magic.spellbook || [];
            updatedChar.magic.spellSlots = updatedChar.magic.spellSlots && updatedChar.magic.spellSlots.length === 9 
                                            ? updatedChar.magic.spellSlots 
                                            : maxSpellSlots;
            updatedChar.magic.currentSpellSlots = updatedChar.magic.currentSpellSlots && updatedChar.magic.currentSpellSlots.length === 9
                                            ? updatedChar.magic.currentSpellSlots
                                            : [...updatedChar.magic.spellSlots]; // Default current to max
        } else { 
            updatedChar.magic = {
                spellcastingAbilityName: undefined,
                spellSaveDC: 0,
                spellAttackBonus: 0,
                cantripsKnown: [],
                spellsKnownPrepared: [],
                spellbook: [],
                spellSlots: maxSpellSlots,
                currentSpellSlots: [...maxSpellSlots],
            };
        }

        // Limited Use Abilities - Class
        updatedChar.maxRages = updatedChar.maxRages ?? getMaxRages(updatedChar.level);
        updatedChar.currentRages = updatedChar.currentRages ?? updatedChar.maxRages;
        
        updatedChar.maxBardicInspirations = updatedChar.maxBardicInspirations ?? getMaxBardicInspirations(updatedChar.attributes.charisma);
        updatedChar.currentBardicInspirations = updatedChar.currentBardicInspirations ?? updatedChar.maxBardicInspirations;

        updatedChar.maxChannelDivinityUses = updatedChar.maxChannelDivinityUses ?? getMaxChannelDivinityUses(updatedChar.charClass, updatedChar.level);
        updatedChar.currentChannelDivinityUses = updatedChar.currentChannelDivinityUses ?? updatedChar.maxChannelDivinityUses;

        updatedChar.maxSecondWindUses = updatedChar.maxSecondWindUses ?? getMaxSecondWindUses(updatedChar.charClass);
        updatedChar.currentSecondWindUses = updatedChar.currentSecondWindUses ?? updatedChar.maxSecondWindUses;

        updatedChar.maxActionSurgeUses = updatedChar.maxActionSurgeUses ?? getMaxActionSurgeUses(updatedChar.charClass, updatedChar.level);
        updatedChar.currentActionSurgeUses = updatedChar.currentActionSurgeUses ?? updatedChar.maxActionSurgeUses;
        
        updatedChar.maxKiPoints = updatedChar.maxKiPoints ?? getMaxKiPoints(updatedChar.charClass, updatedChar.level);
        updatedChar.currentKiPoints = updatedChar.currentKiPoints ?? updatedChar.maxKiPoints;

        updatedChar.maxLayOnHandsPool = updatedChar.maxLayOnHandsPool ?? getMaxLayOnHandsPool(updatedChar.charClass, updatedChar.level);
        updatedChar.currentLayOnHandsPool = updatedChar.currentLayOnHandsPool ?? updatedChar.maxLayOnHandsPool;

        // Limited Use Abilities - Racial
        updatedChar.maxRelentlessEnduranceUses = updatedChar.maxRelentlessEnduranceUses ?? getMaxRelentlessEnduranceUses(updatedChar.race);
        updatedChar.currentRelentlessEnduranceUses = updatedChar.currentRelentlessEnduranceUses ?? updatedChar.maxRelentlessEnduranceUses;
        
        updatedChar.maxBreathWeaponUses = updatedChar.maxBreathWeaponUses ?? getMaxBreathWeaponUses(updatedChar.race);
        updatedChar.currentBreathWeaponUses = updatedChar.currentBreathWeaponUses ?? updatedChar.maxBreathWeaponUses;
        
        return updatedChar;
      });
      
      setCharacters(fetchedCharacters);

      if (savedRole === 'player' && savedActiveScreen === 'player_sheet' && savedViewingCharId) {
        const charToView = fetchedCharacters.find(c => c.id === savedViewingCharId);
        if (charToView) {
          setUserRole('player');
          setViewingCharacter(charToView);
          setScreen('player_sheet');
          setIsInitialized(true);
          setIsLoading(false);
          return; 
        } else {
          clearViewingStateFromStorage();
        }
      }
      
      if (savedRole) {
        setUserRole(savedRole);
        if (savedRole === 'dm') {
          setScreen('dm_list');
        } else if (savedRole === 'player') {
          setScreen('player_char_list'); 
        }
      } else {
        setScreen('role');
      }
    } catch (err: any) {
      console.error("Failed to load data from Supabase:", err.message || err);
      setError(`Falha ao carregar dados do servidor: ${err.message || 'Erro desconhecido'}. Tente recarregar a página.`);
    } finally {
      setIsLoading(false);
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCharacterSave = async (charToSave: Character) => {
    setIsLoading(true);
    setError(null);
    try {
      const maxSpellSlots = getClassSpellSlots(charToSave.charClass, charToSave.level);
      const characterWithEnsuredDetails: Character = { 
        ...charToSave, 
        id: charToSave.id || `char_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        classFeatures: charToSave.classFeatures || [], 
        racialFeatures: charToSave.racialFeatures || [],
        rank: charToSave.rank || RANKS[0],
        maxHitDice: charToSave.level > 0 ? charToSave.level : 1,
        currentHitDice: charToSave.currentHitDice !== undefined ? Math.min(charToSave.currentHitDice, (charToSave.level > 0 ? charToSave.level : 1)) : (charToSave.level > 0 ? charToSave.level : 1),
        hitDieType: charToSave.hitDieType || getHitDieTypeForClass(charToSave.charClass || CLASSES[0]),
        magic: { 
            spellcastingAbilityName: charToSave.magic?.spellcastingAbilityName,
            spellSaveDC: charToSave.magic?.spellSaveDC || 0,
            spellAttackBonus: charToSave.magic?.spellAttackBonus || 0,
            cantripsKnown: charToSave.magic?.cantripsKnown || [],
            spellsKnownPrepared: charToSave.magic?.spellsKnownPrepared || [],
            spellbook: charToSave.magic?.spellbook || [],
            spellSlots: (charToSave.magic?.spellSlots && charToSave.magic.spellSlots.length === 9)
                        ? charToSave.magic.spellSlots
                        : maxSpellSlots,
            currentSpellSlots: (charToSave.magic?.currentSpellSlots && charToSave.magic.currentSpellSlots.length === 9)
                        ? charToSave.magic.currentSpellSlots
                        : [...((charToSave.magic?.spellSlots && charToSave.magic.spellSlots.length === 9) ? charToSave.magic.spellSlots : maxSpellSlots)],
        },
        maxRages: charToSave.maxRages ?? getMaxRages(charToSave.level),
        currentRages: charToSave.currentRages ?? (charToSave.maxRages ?? getMaxRages(charToSave.level)),
        maxBardicInspirations: charToSave.maxBardicInspirations ?? getMaxBardicInspirations(charToSave.attributes.charisma),
        currentBardicInspirations: charToSave.currentBardicInspirations ?? (charToSave.maxBardicInspirations ?? getMaxBardicInspirations(charToSave.attributes.charisma)),
        maxChannelDivinityUses: charToSave.maxChannelDivinityUses ?? getMaxChannelDivinityUses(charToSave.charClass, charToSave.level),
        currentChannelDivinityUses: charToSave.currentChannelDivinityUses ?? (charToSave.maxChannelDivinityUses ?? getMaxChannelDivinityUses(charToSave.charClass, charToSave.level)),
        maxSecondWindUses: charToSave.maxSecondWindUses ?? getMaxSecondWindUses(charToSave.charClass),
        currentSecondWindUses: charToSave.currentSecondWindUses ?? (charToSave.maxSecondWindUses ?? getMaxSecondWindUses(charToSave.charClass)),
        maxActionSurgeUses: charToSave.maxActionSurgeUses ?? getMaxActionSurgeUses(charToSave.charClass, charToSave.level),
        currentActionSurgeUses: charToSave.currentActionSurgeUses ?? (charToSave.maxActionSurgeUses ?? getMaxActionSurgeUses(charToSave.charClass, charToSave.level)),
        maxKiPoints: charToSave.maxKiPoints ?? getMaxKiPoints(charToSave.charClass, charToSave.level),
        currentKiPoints: charToSave.currentKiPoints ?? (charToSave.maxKiPoints ?? getMaxKiPoints(charToSave.charClass, charToSave.level)),
        maxLayOnHandsPool: charToSave.maxLayOnHandsPool ?? getMaxLayOnHandsPool(charToSave.charClass, charToSave.level),
        currentLayOnHandsPool: charToSave.currentLayOnHandsPool ?? (charToSave.maxLayOnHandsPool ?? getMaxLayOnHandsPool(charToSave.charClass, charToSave.level)),
        maxRelentlessEnduranceUses: charToSave.maxRelentlessEnduranceUses ?? getMaxRelentlessEnduranceUses(charToSave.race),
        currentRelentlessEnduranceUses: charToSave.currentRelentlessEnduranceUses ?? (charToSave.maxRelentlessEnduranceUses ?? getMaxRelentlessEnduranceUses(charToSave.race)),
        maxBreathWeaponUses: charToSave.maxBreathWeaponUses ?? getMaxBreathWeaponUses(charToSave.race),
        currentBreathWeaponUses: charToSave.currentBreathWeaponUses ?? (charToSave.maxBreathWeaponUses ?? getMaxBreathWeaponUses(charToSave.race)),
      };
      const savedCharacter = await supabaseService.saveCharacter(characterWithEnsuredDetails);

      if (savedCharacter) {
        setCharacters(prevChars => {
          const isEditingExisting = prevChars.some(c => c.id === savedCharacter.id);
          if (isEditingExisting) {
            return prevChars.map(c => c.id === savedCharacter.id ? savedCharacter : c);
          } else {
            return [...prevChars, savedCharacter];
          }
        });
        setEditingCharacter(null);
        if (userRole === 'player') {
          setViewingCharacter(savedCharacter); 
          setScreen('player_sheet');
          localStorage.setItem(LOCAL_STORAGE_VIEWING_CHARACTER_ID_KEY, savedCharacter.id);
          localStorage.setItem(LOCAL_STORAGE_ACTIVE_SCREEN_KEY, 'player_sheet');
        } else { 
          setScreen('dm_list');
          clearViewingStateFromStorage(); 
        }
      } else {
        throw new Error("Character data was not returned after save.");
      }
    } catch (err: any) {
      console.error("Failed to save character to Supabase:", err.message || err);
      setError(`Falha ao salvar personagem: ${err.message || 'Erro desconhecido'}. Verifique sua conexão e tente novamente.`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleUpdateCharacterData = async (characterId: string, updates: Partial<Character>) => {
    try {
      const originalCharacter = characters.find(c => c.id === characterId);
      if (!originalCharacter) {
          console.error("Character not found for update:", characterId);
          setError(`Personagem com ID ${characterId} não encontrado para atualização.`);
          return;
      }

      let fullUpdates = { ...updates };

      if ('rank' in fullUpdates && !fullUpdates.rank) {
        fullUpdates.rank = RANKS[0];
      }
      if ('classFeatures' in fullUpdates && !fullUpdates.classFeatures) fullUpdates.classFeatures = [];
      if ('racialFeatures' in fullUpdates && !fullUpdates.racialFeatures) fullUpdates.racialFeatures = [];
      
      if (fullUpdates.magic) {
        const originalMagic = originalCharacter.magic || {} as MagicInfo;
        fullUpdates.magic = { ...originalMagic, ...fullUpdates.magic }; // Merge with original magic data

        fullUpdates.magic.cantripsKnown = fullUpdates.magic.cantripsKnown || [];
        fullUpdates.magic.spellsKnownPrepared = fullUpdates.magic.spellsKnownPrepared || [];
        fullUpdates.magic.spellbook = fullUpdates.magic.spellbook || [];
        
        const maxSlots = getClassSpellSlots(fullUpdates.charClass || originalCharacter.charClass, fullUpdates.level || originalCharacter.level);
        fullUpdates.magic.spellSlots = (fullUpdates.magic.spellSlots && fullUpdates.magic.spellSlots.length === 9)
                                    ? fullUpdates.magic.spellSlots
                                    : maxSlots;
        fullUpdates.magic.currentSpellSlots = (fullUpdates.magic.currentSpellSlots && fullUpdates.magic.currentSpellSlots.length === 9)
                                    ? fullUpdates.magic.currentSpellSlots
                                    : [...fullUpdates.magic.spellSlots]; // Default to new max if not provided
      }
      
      const newLevel = fullUpdates.level !== undefined ? fullUpdates.level : originalCharacter.level;
      const newCharClass = fullUpdates.charClass !== undefined ? fullUpdates.charClass : originalCharacter.charClass;
      const newRace = fullUpdates.race !== undefined ? fullUpdates.race : originalCharacter.race;
      const newAttributes = fullUpdates.attributes !== undefined ? fullUpdates.attributes : originalCharacter.attributes;

      if (fullUpdates.maxRages === undefined && (fullUpdates.level !== undefined || fullUpdates.charClass !== undefined)) {
          fullUpdates.maxRages = getMaxRages(newLevel);
          if (fullUpdates.currentRages === undefined || originalCharacter.maxRages !== fullUpdates.maxRages) fullUpdates.currentRages = fullUpdates.maxRages; 
      }
      if (fullUpdates.maxBardicInspirations === undefined && (fullUpdates.level !== undefined || fullUpdates.charClass !== undefined || fullUpdates.attributes?.charisma !== undefined)) {
          fullUpdates.maxBardicInspirations = getMaxBardicInspirations(newAttributes.charisma);
           if (fullUpdates.currentBardicInspirations === undefined || originalCharacter.maxBardicInspirations !== fullUpdates.maxBardicInspirations) fullUpdates.currentBardicInspirations = fullUpdates.maxBardicInspirations;
      }
      if (fullUpdates.maxChannelDivinityUses === undefined && (fullUpdates.level !== undefined || fullUpdates.charClass !== undefined)) {
          fullUpdates.maxChannelDivinityUses = getMaxChannelDivinityUses(newCharClass, newLevel);
           if (fullUpdates.currentChannelDivinityUses === undefined || originalCharacter.maxChannelDivinityUses !== fullUpdates.maxChannelDivinityUses) fullUpdates.currentChannelDivinityUses = fullUpdates.maxChannelDivinityUses;
      }
      if (fullUpdates.maxSecondWindUses === undefined && fullUpdates.charClass !== undefined) {
        fullUpdates.maxSecondWindUses = getMaxSecondWindUses(newCharClass);
        if (fullUpdates.currentSecondWindUses === undefined || originalCharacter.maxSecondWindUses !== fullUpdates.maxSecondWindUses) fullUpdates.currentSecondWindUses = fullUpdates.maxSecondWindUses;
      }
      if (fullUpdates.maxActionSurgeUses === undefined && (fullUpdates.charClass !== undefined || fullUpdates.level !== undefined)) {
        fullUpdates.maxActionSurgeUses = getMaxActionSurgeUses(newCharClass, newLevel);
         if (fullUpdates.currentActionSurgeUses === undefined || originalCharacter.maxActionSurgeUses !== fullUpdates.maxActionSurgeUses) fullUpdates.currentActionSurgeUses = fullUpdates.maxActionSurgeUses;
      }
      if (fullUpdates.maxKiPoints === undefined && (fullUpdates.charClass !== undefined || fullUpdates.level !== undefined)) {
        fullUpdates.maxKiPoints = getMaxKiPoints(newCharClass, newLevel);
        if (fullUpdates.currentKiPoints === undefined || originalCharacter.maxKiPoints !== fullUpdates.maxKiPoints) fullUpdates.currentKiPoints = fullUpdates.maxKiPoints;
      }
      if (fullUpdates.maxLayOnHandsPool === undefined && (fullUpdates.charClass !== undefined || fullUpdates.level !== undefined)) {
        fullUpdates.maxLayOnHandsPool = getMaxLayOnHandsPool(newCharClass, newLevel);
        if (fullUpdates.currentLayOnHandsPool === undefined || originalCharacter.maxLayOnHandsPool !== fullUpdates.maxLayOnHandsPool) fullUpdates.currentLayOnHandsPool = fullUpdates.maxLayOnHandsPool;
      }
      if (fullUpdates.maxRelentlessEnduranceUses === undefined && fullUpdates.race !== undefined) {
        fullUpdates.maxRelentlessEnduranceUses = getMaxRelentlessEnduranceUses(newRace);
        if (fullUpdates.currentRelentlessEnduranceUses === undefined || originalCharacter.maxRelentlessEnduranceUses !== fullUpdates.maxRelentlessEnduranceUses) fullUpdates.currentRelentlessEnduranceUses = fullUpdates.maxRelentlessEnduranceUses;
      }
      if (fullUpdates.maxBreathWeaponUses === undefined && fullUpdates.race !== undefined) {
        fullUpdates.maxBreathWeaponUses = getMaxBreathWeaponUses(newRace);
        if (fullUpdates.currentBreathWeaponUses === undefined || originalCharacter.maxBreathWeaponUses !== fullUpdates.maxBreathWeaponUses) fullUpdates.currentBreathWeaponUses = fullUpdates.maxBreathWeaponUses;
      }


      if (fullUpdates.level !== undefined && fullUpdates.maxHitDice === undefined) {
         fullUpdates.maxHitDice = fullUpdates.level > 0 ? fullUpdates.level : 1;
      }
      if (fullUpdates.maxHitDice !== undefined && fullUpdates.currentHitDice !== undefined) {
        fullUpdates.currentHitDice = Math.min(fullUpdates.currentHitDice, fullUpdates.maxHitDice);
      } else if (fullUpdates.maxHitDice !== undefined && viewingCharacter?.id === characterId) { 
        fullUpdates.currentHitDice = Math.min(originalCharacter.currentHitDice, fullUpdates.maxHitDice);
      } else if (fullUpdates.maxHitDice !== undefined) { 
        if (originalCharacter.maxHitDice !== fullUpdates.maxHitDice) {
            fullUpdates.currentHitDice = fullUpdates.maxHitDice; 
        } else {
            fullUpdates.currentHitDice = Math.min(originalCharacter.currentHitDice, fullUpdates.maxHitDice);
        }
      }


      const updatedCharacter = await supabaseService.updateCharacter(characterId, fullUpdates);
      if (updatedCharacter) {
        
        const fullyProcessedCharacter: Character = {
            ...originalCharacter, 
            ...updatedCharacter, 
            ...fullUpdates, 
        };
        
        
        fullyProcessedCharacter.maxRages = getMaxRages(fullyProcessedCharacter.level);
        if(originalCharacter.maxRages !== fullyProcessedCharacter.maxRages) fullyProcessedCharacter.currentRages = fullyProcessedCharacter.maxRages;
        else fullyProcessedCharacter.currentRages = Math.min(fullyProcessedCharacter.currentRages ?? fullyProcessedCharacter.maxRages, fullyProcessedCharacter.maxRages);

        fullyProcessedCharacter.maxBardicInspirations = getMaxBardicInspirations(fullyProcessedCharacter.attributes.charisma);
         if(originalCharacter.maxBardicInspirations !== fullyProcessedCharacter.maxBardicInspirations) fullyProcessedCharacter.currentBardicInspirations = fullyProcessedCharacter.maxBardicInspirations;
        else fullyProcessedCharacter.currentBardicInspirations = Math.min(fullyProcessedCharacter.currentBardicInspirations ?? fullyProcessedCharacter.maxBardicInspirations, fullyProcessedCharacter.maxBardicInspirations);
        
        fullyProcessedCharacter.maxChannelDivinityUses = getMaxChannelDivinityUses(fullyProcessedCharacter.charClass, fullyProcessedCharacter.level);
        if(originalCharacter.maxChannelDivinityUses !== fullyProcessedCharacter.maxChannelDivinityUses)  fullyProcessedCharacter.currentChannelDivinityUses = fullyProcessedCharacter.maxChannelDivinityUses;
        else fullyProcessedCharacter.currentChannelDivinityUses = Math.min(fullyProcessedCharacter.currentChannelDivinityUses ?? fullyProcessedCharacter.maxChannelDivinityUses, fullyProcessedCharacter.maxChannelDivinityUses);

        fullyProcessedCharacter.maxSecondWindUses = getMaxSecondWindUses(fullyProcessedCharacter.charClass);
        if(originalCharacter.maxSecondWindUses !== fullyProcessedCharacter.maxSecondWindUses) fullyProcessedCharacter.currentSecondWindUses = fullyProcessedCharacter.maxSecondWindUses;
        else fullyProcessedCharacter.currentSecondWindUses = Math.min(fullyProcessedCharacter.currentSecondWindUses ?? fullyProcessedCharacter.maxSecondWindUses, fullyProcessedCharacter.maxSecondWindUses);

        fullyProcessedCharacter.maxActionSurgeUses = getMaxActionSurgeUses(fullyProcessedCharacter.charClass, fullyProcessedCharacter.level);
        if(originalCharacter.maxActionSurgeUses !== fullyProcessedCharacter.maxActionSurgeUses) fullyProcessedCharacter.currentActionSurgeUses = fullyProcessedCharacter.maxActionSurgeUses;
        else fullyProcessedCharacter.currentActionSurgeUses = Math.min(fullyProcessedCharacter.currentActionSurgeUses ?? fullyProcessedCharacter.maxActionSurgeUses, fullyProcessedCharacter.maxActionSurgeUses);

        fullyProcessedCharacter.maxKiPoints = getMaxKiPoints(fullyProcessedCharacter.charClass, fullyProcessedCharacter.level);
        if(originalCharacter.maxKiPoints !== fullyProcessedCharacter.maxKiPoints)  fullyProcessedCharacter.currentKiPoints = fullyProcessedCharacter.maxKiPoints;
        else fullyProcessedCharacter.currentKiPoints = Math.min(fullyProcessedCharacter.currentKiPoints ?? fullyProcessedCharacter.maxKiPoints, fullyProcessedCharacter.maxKiPoints);

        fullyProcessedCharacter.maxLayOnHandsPool = getMaxLayOnHandsPool(fullyProcessedCharacter.charClass, fullyProcessedCharacter.level);
        if(originalCharacter.maxLayOnHandsPool !== fullyProcessedCharacter.maxLayOnHandsPool) fullyProcessedCharacter.currentLayOnHandsPool = fullyProcessedCharacter.maxLayOnHandsPool;
        else fullyProcessedCharacter.currentLayOnHandsPool = Math.min(fullyProcessedCharacter.currentLayOnHandsPool ?? fullyProcessedCharacter.maxLayOnHandsPool, fullyProcessedCharacter.maxLayOnHandsPool);
        
        fullyProcessedCharacter.maxRelentlessEnduranceUses = getMaxRelentlessEnduranceUses(fullyProcessedCharacter.race);
        if(originalCharacter.maxRelentlessEnduranceUses !== fullyProcessedCharacter.maxRelentlessEnduranceUses) fullyProcessedCharacter.currentRelentlessEnduranceUses = fullyProcessedCharacter.maxRelentlessEnduranceUses;
        else fullyProcessedCharacter.currentRelentlessEnduranceUses = Math.min(fullyProcessedCharacter.currentRelentlessEnduranceUses ?? fullyProcessedCharacter.maxRelentlessEnduranceUses, fullyProcessedCharacter.maxRelentlessEnduranceUses);

        fullyProcessedCharacter.maxBreathWeaponUses = getMaxBreathWeaponUses(fullyProcessedCharacter.race);
        if(originalCharacter.maxBreathWeaponUses !== fullyProcessedCharacter.maxBreathWeaponUses) fullyProcessedCharacter.currentBreathWeaponUses = fullyProcessedCharacter.maxBreathWeaponUses;
        else fullyProcessedCharacter.currentBreathWeaponUses = Math.min(fullyProcessedCharacter.currentBreathWeaponUses ?? fullyProcessedCharacter.maxBreathWeaponUses, fullyProcessedCharacter.maxBreathWeaponUses);

        fullyProcessedCharacter.maxHitDice = fullyProcessedCharacter.level > 0 ? fullyProcessedCharacter.level : 1;
        fullyProcessedCharacter.hitDieType = getHitDieTypeForClass(fullyProcessedCharacter.charClass);
        if (originalCharacter.maxHitDice !== fullyProcessedCharacter.maxHitDice) {
            fullyProcessedCharacter.currentHitDice = fullyProcessedCharacter.maxHitDice; 
        } else {
            fullyProcessedCharacter.currentHitDice = Math.min(fullyProcessedCharacter.currentHitDice ?? fullyProcessedCharacter.maxHitDice, fullyProcessedCharacter.maxHitDice);
        }

        if (fullyProcessedCharacter.magic && (!fullyProcessedCharacter.magic.currentSpellSlots || fullyProcessedCharacter.magic.currentSpellSlots.length !== 9)) {
            const currentMaxSlots = getClassSpellSlots(fullyProcessedCharacter.charClass, fullyProcessedCharacter.level);
            fullyProcessedCharacter.magic.spellSlots = currentMaxSlots;
            fullyProcessedCharacter.magic.currentSpellSlots = [...currentMaxSlots];
        }


        setCharacters(prevChars => prevChars.map(c => c.id === characterId ? fullyProcessedCharacter : c));
        if (viewingCharacter && viewingCharacter.id === characterId) {
          setViewingCharacter(fullyProcessedCharacter);
        }
      } else {
         console.warn("Character not found for update or no data returned:", characterId);
      }
    } catch (err: any) {
      console.error("Failed to save characters to Supabase during partial update:", err.message || err);
      setError(`Falha ao atualizar dados do personagem: ${err.message || 'Erro desconhecido'}.`);
    }
  };

  const handleDeleteCharacter = async (characterIdToDelete: string) => {
    if (window.confirm(`Tem certeza que deseja excluir este personagem? Esta ação não pode ser desfeita.`)) {
      setIsLoading(true);
      setError(null);
      try {
        const success = await supabaseService.deleteCharacter(characterIdToDelete);
        if (success) {
          let updatedCharacters = characters.filter(char => char.id !== characterIdToDelete);
          
          setCharacters(updatedCharacters);

          if (viewingCharacter && viewingCharacter.id === characterIdToDelete) {
            setViewingCharacter(null);
            clearViewingStateFromStorage();
            if (userRole === 'player') setScreen('player_char_list');
          }
          if (editingCharacter && editingCharacter.id === characterIdToDelete) {
            setEditingCharacter(null);
            if (userRole === 'player') setScreen('player_char_list'); 
          }
        } else {
          throw new Error("Deletion failed or was not confirmed by the service.");
        }
      } catch (err: any) {
        console.error("Failed to delete character from Supabase:", err.message || err);
        setError(`Falha ao excluir personagem: ${err.message || 'Erro desconhecido'}.`);
      } finally {
        setIsLoading(false);
      }
    }
  };


  const handlePlayerViewCharacter = (character: Character) => {
    setViewingCharacter(character);
    setScreen('player_sheet');
    localStorage.setItem(LOCAL_STORAGE_VIEWING_CHARACTER_ID_KEY, character.id);
    localStorage.setItem(LOCAL_STORAGE_ACTIVE_SCREEN_KEY, 'player_sheet');
  };

  const handlePlayerEditCharacter = (character: Character) => {
    setEditingCharacter(character);
    setScreen('player_form');
    localStorage.removeItem(LOCAL_STORAGE_VIEWING_CHARACTER_ID_KEY); 
    localStorage.setItem(LOCAL_STORAGE_ACTIVE_SCREEN_KEY, 'player_form');
  };

  const handlePlayerCreateCharacter = () => {
    setEditingCharacter(null); 
    setScreen('player_form');
    localStorage.removeItem(LOCAL_STORAGE_VIEWING_CHARACTER_ID_KEY);
    localStorage.setItem(LOCAL_STORAGE_ACTIVE_SCREEN_KEY, 'player_form');
  };

  const handleNavigateToList = () => {
    setViewingCharacter(null);
    setEditingCharacter(null);
    clearViewingStateFromStorage(); 
    if (userRole === 'player') {
        setScreen('player_char_list');
        localStorage.setItem(LOCAL_STORAGE_ACTIVE_SCREEN_KEY, 'player_char_list');
    } else {
        setScreen('dm_list');
        localStorage.setItem(LOCAL_STORAGE_ACTIVE_SCREEN_KEY, 'dm_list');
    }
  };

  const handleRoleSelect = (role: 'player' | 'dm') => {
    setUserRole(role);
    localStorage.setItem(LOCAL_STORAGE_ROLE_KEY, role);
    clearViewingStateFromStorage();
    if (role === 'dm') {
      setScreen('dm_list');
      localStorage.setItem(LOCAL_STORAGE_ACTIVE_SCREEN_KEY, 'dm_list');
    } else {
      setScreen('player_char_list');
      localStorage.setItem(LOCAL_STORAGE_ACTIVE_SCREEN_KEY, 'player_char_list');
    }
  };

  const handleChangeRole = () => {
    setUserRole(null);
    setViewingCharacter(null);
    setEditingCharacter(null);
    setScreen('role');
    localStorage.removeItem(LOCAL_STORAGE_ROLE_KEY);
    clearViewingStateFromStorage();
    localStorage.removeItem(LOCAL_STORAGE_ACTIVE_SCREEN_KEY); 
  };

  if (!isInitialized || isLoading && screen === 'role') { 
    return <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-slate-800 dark:text-slate-200">Carregando dados...</div>;
  }
  
  let currentView;

  switch (screen) {
    case 'role':
      currentView = <RoleSelectionScreen onSelectRole={handleRoleSelect} />;
      break;
    case 'dm_list':
      currentView = <DMCharacterListView 
                        characters={characters} 
                        onDMUpdateCharacter={handleUpdateCharacterData}
                        onDeleteCharacter={handleDeleteCharacter} 
                    />;
      break;
    case 'player_char_list':
      currentView = (
        <PlayerCharacterList
          characters={characters}
          onCreateCharacter={handlePlayerCreateCharacter}
          onViewCharacter={handlePlayerViewCharacter}
          onEditCharacter={handlePlayerEditCharacter}
          onDeleteCharacter={handleDeleteCharacter}
        />
      );
      break;
    case 'player_form':
      currentView = <CharacterForm
                        onSave={handleCharacterSave}
                        initialData={editingCharacter}
                    />;
      break;
    case 'player_sheet':
      if (viewingCharacter) {
        currentView = (
            <CharacterSheetDisplay
              character={viewingCharacter}
              onEdit={() => viewingCharacter && handlePlayerEditCharacter(viewingCharacter)}
              onBackToList={handleNavigateToList}
              onCharacterUpdate={handleUpdateCharacterData}
            />
        );
      } else { 
         currentView = (
            <div className="text-center">
                <p className="text-slate-800 dark:text-slate-200 text-xl mb-4">Personagem não encontrado ou não selecionado.</p>
                <Button onClick={handleNavigateToList}>
                    Voltar para Lista de Personagens
                </Button>
            </div>
        );
      }
      break;
    default:
      currentView = <RoleSelectionScreen onSelectRole={handleRoleSelect} />;
  }


  return (
    <div className="min-h-screen bg-slate-200 dark:bg-slate-900 py-8 px-4">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold text-sky-700 dark:text-sky-400 tracking-tight">Criador de Personagens D&amp;D 5e</h1>
        <p className="text-gray-900 dark:text-gray-300 mt-2">Crie e gerencie seus heróis de aventura!</p>
        {userRole && (
          <Button onClick={handleChangeRole} variant="secondary" className="mt-4">
            Mudar Papel (Mestre/Jogador)
          </Button>
        )}
      </header>

      {isLoading && screen !== 'role' && (
        <div className="text-center my-4 p-4 bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300 rounded-md">
          Carregando...
        </div>
      )}
      {error && (
        <div className="text-center my-4 p-4 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 rounded-md break-words">
          Erro: {error}
        </div>
      )}

      {currentView}

      <footer className="text-center mt-12 py-4 text-sm text-gray-800 dark:text-gray-400">
        
      </footer>
    </div>
  );
};

export default App;
