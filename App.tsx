
import React, { useState, useEffect, useCallback } from 'react';
import { Character, AttributeName, ClassFeatureSelection, RacialFeatureSelection, RANKS, Rank } from './types';
import CharacterForm from './components/CharacterForm';
import CharacterSheetDisplay from './components/CharacterSheetDisplay';
import Button from './components/ui/Button';
import RoleSelectionScreen from './components/RoleSelectionScreen';
import DMCharacterListView from './components/DMCharacterListView';
import PlayerCharacterList from './components/PlayerCharacterList';
import { RACES, CLASSES, BACKGROUNDS, ALIGNMENTS, FIGHTING_STYLE_OPTIONS } from './dndOptions'; 
import * as supabaseService from './supabaseService';
import { ALL_CLASS_FEATURES_MAP } from './classFeaturesData';
import { ALL_RACIAL_FEATURES_MAP } from './racialFeaturesData';

const TEST_CHARACTER_ID = "test-pavel-exemplo-001";

// Helper to generate initial class features for Pavel (now a Mage)
const getInitialPavelClassFeatures = (level: number): ClassFeatureSelection[] => {
  const pavelFeatures: ClassFeatureSelection[] = [];
  const mageDefs = ALL_CLASS_FEATURES_MAP["Mago"] || [];

  if (level >= 1) {
    const spellcastingDef = mageDefs.find(f => f.id === "wizard_spellcasting");
    if (spellcastingDef) {
      pavelFeatures.push({
        featureId: spellcastingDef.id,
        featureName: spellcastingDef.name,
        levelAcquired: spellcastingDef.level,
        type: spellcastingDef.type,
        description: spellcastingDef.description,
      });
    }
    const arcaneRecoveryDef = mageDefs.find(f => f.id === "wizard_arcane_recovery");
    if (arcaneRecoveryDef) {
      pavelFeatures.push({
        featureId: arcaneRecoveryDef.id,
        featureName: arcaneRecoveryDef.name,
        levelAcquired: arcaneRecoveryDef.level,
        type: arcaneRecoveryDef.type,
        description: arcaneRecoveryDef.description,
      });
    }
  }
  if (level >= 2) {
    const arcaneTraditionDef = mageDefs.find(f => f.id === "wizard_arcane_tradition");
    if (arcaneTraditionDef) {
       pavelFeatures.push({
        featureId: arcaneTraditionDef.id,
        featureName: arcaneTraditionDef.name,
        levelAcquired: arcaneTraditionDef.level,
        type: arcaneTraditionDef.type,
        choiceValue: "evocation", // Pavel's choice: Evocation
        choiceLabel: "Escola de Evocação",
        description: arcaneTraditionDef.description,
      });
    }
     const traditionFeature2Def = mageDefs.find(f => f.id === "wizard_tradition_feature_2");
    if (traditionFeature2Def) {
       pavelFeatures.push({
        featureId: traditionFeature2Def.id,
        featureName: traditionFeature2Def.name, // Will be generic, actual name depends on tradition
        levelAcquired: traditionFeature2Def.level,
        type: traditionFeature2Def.type,
        description: traditionFeature2Def.description, // Generic description
      });
    }
  }
  // Add more for level 3 if any auto/ASI
  return pavelFeatures;
};

// Helper to generate initial racial features for Pavel (Hill Dwarf)
const getInitialPavelRacialFeatures = (): RacialFeatureSelection[] => {
    const pavelRacialFeatures: RacialFeatureSelection[] = [];
    const hillDwarfDefs = ALL_RACIAL_FEATURES_MAP["Anão da Colina"] || [];

    hillDwarfDefs.forEach(def => {
        if (def.type === 'auto') {
            pavelRacialFeatures.push({
                featureId: def.id,
                featureName: def.name,
                type: def.type,
                description: def.description,
            });
        }
        // No default choices for Hill Dwarf in this basic setup
    });
    return pavelRacialFeatures;
};


const initialCharacterData: Character = {
  id: TEST_CHARACTER_ID,
  photoUrl: 'https://picsum.photos/300/400?grayscale&blur=2',
  name: 'Pavel Stonebeard', 
  background: BACKGROUNDS[11], // Sábio
  race: RACES[0], // Anão da Colina
  charClass: CLASSES[8], // Mago
  age: 45,
  alignment: ALIGNMENTS[3], // Leal e Neutro
  coins: 75,
  level: 3, 
  // Hill Dwarf: +1 HP per level. Base HP for Mage (CON 14 = +2) is 6 + 2 = 8. Level 3: 8 + (4+2)*2 = 8 + 12 = 20. Plus 3 from Dwarven Toughness = 23
  hp: 23, 
  hpt: 23,
  ac: 11, // Base 10 + DEX 11 (+0) -> Assuming no armor or Mage Armor up
  attributes: { // Human base + Hill Dwarf (+2 CON, +1 WIS) + ASI example
    strength: 10,
    dexterity: 11, // DEX was 15, changing for Mage concept, set to 11
    constitution: 14, // Base 10 -> 12 (Dwarf) -> 14 (Example Point Buy)
    intelligence: 16, // Mage primary
    wisdom: 12,      // Base 10 -> 11 (Dwarf) -> 12 (Example Point Buy)
    charisma: 8,
  },
  proficientSkills: ['arcana', 'history', 'investigation', 'perception'], // Perception from Keen Senses (if High Elf, for example)
  skillNotes: 'Conhecimentos de um estudioso anão.',
  items: 'Grimório, cajado, bolsa de componentes, pacote de estudioso.',
  savingThrows: 'INT +5, WIS +3 (Proficiency bonus for L3 is +2. INT Save: 16 INT = +3 mod; +2 prof = +5. WIS Save: 12 WIS = +1 mod; +2 prof = +3)',
  abilities: 'Visão no Escuro, Resiliência Anã, Treinamento Anão em Combate, Afinidade com Rochas, Robustez Anã.',
  fightingStyle: "", // Mages don't typically have fighting styles
  magic: {
    spellcastingAbilityName: 'intelligence' as AttributeName,
    spellSaveDC: 13, // 8 + 2 (prof) + 3 (INT mod 16)
    spellAttackBonus: 5, // 2 (prof) + 3 (INT mod 16)
    cantripsKnown: ["Rajada de Fogo (Fire Bolt)", "Luz (Light)", "Mãos Mágicas (Mage Hand)"], 
    spellsKnownPrepared: ["Mísseis Mágicos (Magic Missile)", "Escudo Arcano (Shield)", "Sono (Sleep)", "Detectar Magia (Detect Magic)"], 
    spellbook: ["Mísseis Mágicos (Magic Missile)", "Escudo Arcano (Shield)", "Sono (Sleep)", "Detectar Magia (Detect Magic)", "Área Escorregadia (Grease)", "Alarme (Alarm)"],
    spellSlots: [4,2,0,0,0,0,0,0,0], // Mage L3 slots
  },
  classFeatures: getInitialPavelClassFeatures(3),
  racialFeatures: getInitialPavelRacialFeatures(),
  rank: RANKS[2], // Pavel is Prata
};

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

      const testCharExists = fetchedCharacters.some(c => c.id === TEST_CHARACTER_ID);
      if (!testCharExists) {
        console.log("Test character Pavel not found in Supabase, attempting to add it.");
        const pavelWithDetails = { 
            ...initialCharacterData, 
            classFeatures: getInitialPavelClassFeatures(initialCharacterData.level),
            racialFeatures: getInitialPavelRacialFeatures(),
            rank: initialCharacterData.rank || RANKS[0] 
        };
        const addedTestChar = await supabaseService.saveCharacter(pavelWithDetails);
        if (addedTestChar) {
          fetchedCharacters.push(addedTestChar);
        } else {
          console.warn("Failed to add test character Pavel to Supabase.");
        }
      } else { 
        fetchedCharacters = fetchedCharacters.map(c => {
          let updatedChar = { ...c };
          if (c.id === TEST_CHARACTER_ID) { // Ensure Pavel from DB has necessary fields
            if (!c.classFeatures || c.classFeatures.length === 0 || c.charClass !== initialCharacterData.charClass) {
              console.log("Updating Pavel from DB with initial class features (Mage L3).");
              updatedChar.classFeatures = getInitialPavelClassFeatures(initialCharacterData.level);
            }
            if (!c.racialFeatures || c.racialFeatures.length === 0 || c.race !== initialCharacterData.race) {
              console.log("Updating Pavel from DB with initial racial features (Hill Dwarf).");
              updatedChar.racialFeatures = getInitialPavelRacialFeatures();
            }
            if (!c.rank) {
              updatedChar.rank = initialCharacterData.rank || RANKS[0];
            }
            // Overwrite Pavel's stats to match new design if different
            if (c.charClass !== initialCharacterData.charClass || c.race !== initialCharacterData.race || c.level !== initialCharacterData.level) {
                console.log("Pavel's core stats (class/race/level) from DB differ from new design. Overwriting with new design's example data.");
                updatedChar = {
                    ...updatedChar, // Keep ID and Supabase specific fields
                    ...initialCharacterData, // Apply new design stats
                    id: c.id, // Retain original ID
                    classFeatures: getInitialPavelClassFeatures(initialCharacterData.level),
                    racialFeatures: getInitialPavelRacialFeatures(),
                };
            }
          }
          // Ensure all characters have default fields if missing
          if (!updatedChar.rank) updatedChar.rank = RANKS[0];
          if (!updatedChar.classFeatures) updatedChar.classFeatures = [];
          if (!updatedChar.racialFeatures) updatedChar.racialFeatures = [];
          
          return updatedChar;
        });
      }
      
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
      const characterWithEnsuredDetails = { 
        ...charToSave, 
        id: charToSave.id || Date.now().toString(),
        classFeatures: charToSave.classFeatures || [], 
        racialFeatures: charToSave.racialFeatures || [],
        rank: charToSave.rank || RANKS[0] 
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
      if ('rank' in updates && !updates.rank) {
        updates.rank = RANKS[0];
      }
      // Ensure features arrays exist if being updated, even if to empty
      if ('classFeatures' in updates && !updates.classFeatures) updates.classFeatures = [];
      if ('racialFeatures' in updates && !updates.racialFeatures) updates.racialFeatures = [];

      const updatedCharacter = await supabaseService.updateCharacter(characterId, updates);
      if (updatedCharacter) {
        setCharacters(prevChars => prevChars.map(c => c.id === characterId ? updatedCharacter : c));
        if (viewingCharacter && viewingCharacter.id === characterId) {
          setViewingCharacter(updatedCharacter);
          localStorage.setItem(LOCAL_STORAGE_VIEWING_CHARACTER_ID_KEY, updatedCharacter.id);
          localStorage.setItem(LOCAL_STORAGE_ACTIVE_SCREEN_KEY, 'player_sheet');
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
          if (updatedCharacters.length === 0 && characterIdToDelete === TEST_CHARACTER_ID) {
              console.log("List is empty after deleting Pavel, re-adding test character Pavel to Supabase.");
              const pavelWithDetails = { 
                  ...initialCharacterData, 
                  classFeatures: getInitialPavelClassFeatures(initialCharacterData.level),
                  racialFeatures: getInitialPavelRacialFeatures(),
                  rank: initialCharacterData.rank || RANKS[0]
              };
              const addedTestChar = await supabaseService.saveCharacter(pavelWithDetails);
              if (addedTestChar) {
                  setCharacters([addedTestChar]); 
              }
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
    clearViewingStateFromStorage();
  };

  const handlePlayerCreateCharacter = () => {
    setEditingCharacter(null); 
    setScreen('player_form');
    clearViewingStateFromStorage();
  };

  const handleNavigateToList = () => {
    setViewingCharacter(null);
    setEditingCharacter(null);
    clearViewingStateFromStorage();
    if (userRole === 'player') setScreen('player_char_list');
    else setScreen('dm_list');
  };

  const handleRoleSelect = (role: 'player' | 'dm') => {
    setUserRole(role);
    localStorage.setItem(LOCAL_STORAGE_ROLE_KEY, role);
    clearViewingStateFromStorage();
    if (role === 'dm') {
      setScreen('dm_list');
    } else {
      setScreen('player_char_list');
    }
  };

  const handleChangeRole = () => {
    setUserRole(null);
    setViewingCharacter(null);
    setEditingCharacter(null);
    setScreen('role');
    localStorage.removeItem(LOCAL_STORAGE_ROLE_KEY);
    clearViewingStateFromStorage();
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