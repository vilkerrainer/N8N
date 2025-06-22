
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
      
      // Ensure all characters from DB have necessary default fields if missing
      fetchedCharacters = fetchedCharacters.map(c => {
        let updatedChar = { ...c };
        if (!updatedChar.rank) updatedChar.rank = RANKS[0];
        if (!updatedChar.classFeatures) updatedChar.classFeatures = [];
        if (!updatedChar.racialFeatures) updatedChar.racialFeatures = [];
        // Ensure magic object and its sub-arrays exist if magic is defined
        if (updatedChar.magic) {
            updatedChar.magic.cantripsKnown = updatedChar.magic.cantripsKnown || [];
            updatedChar.magic.spellsKnownPrepared = updatedChar.magic.spellsKnownPrepared || [];
            updatedChar.magic.spellbook = updatedChar.magic.spellbook || [];
            updatedChar.magic.spellSlots = updatedChar.magic.spellSlots && updatedChar.magic.spellSlots.length === 9 
                                            ? updatedChar.magic.spellSlots 
                                            : Array(9).fill(0);
        } else { // If magic object itself is missing
            updatedChar.magic = {
                spellcastingAbilityName: undefined,
                spellSaveDC: 0,
                spellAttackBonus: 0,
                cantripsKnown: [],
                spellsKnownPrepared: [],
                spellbook: [],
                spellSlots: Array(9).fill(0),
            };
        }
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
          // If the character ID from storage is not found (e.g., deleted), clear storage.
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
      const characterWithEnsuredDetails: Character = { 
        ...charToSave, 
        id: charToSave.id || `char_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`, // More robust ID
        classFeatures: charToSave.classFeatures || [], 
        racialFeatures: charToSave.racialFeatures || [],
        rank: charToSave.rank || RANKS[0],
        magic: { // Ensure magic object and its arrays are well-defined
            spellcastingAbilityName: charToSave.magic?.spellcastingAbilityName,
            spellSaveDC: charToSave.magic?.spellSaveDC || 0,
            spellAttackBonus: charToSave.magic?.spellAttackBonus || 0,
            cantripsKnown: charToSave.magic?.cantripsKnown || [],
            spellsKnownPrepared: charToSave.magic?.spellsKnownPrepared || [],
            spellbook: charToSave.magic?.spellbook || [],
            spellSlots: (charToSave.magic?.spellSlots && charToSave.magic.spellSlots.length === 9)
                        ? charToSave.magic.spellSlots
                        : Array(9).fill(0),
        }
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
      if ('classFeatures' in updates && !updates.classFeatures) updates.classFeatures = [];
      if ('racialFeatures' in updates && !updates.racialFeatures) updates.racialFeatures = [];
      
      // Ensure magic fields are properly handled if magic object is part of updates
      if (updates.magic) {
        updates.magic.cantripsKnown = updates.magic.cantripsKnown || [];
        updates.magic.spellsKnownPrepared = updates.magic.spellsKnownPrepared || [];
        updates.magic.spellbook = updates.magic.spellbook || [];
        updates.magic.spellSlots = (updates.magic.spellSlots && updates.magic.spellSlots.length === 9)
                                    ? updates.magic.spellSlots
                                    : Array(9).fill(0);
      }


      const updatedCharacter = await supabaseService.updateCharacter(characterId, updates);
      if (updatedCharacter) {
        setCharacters(prevChars => prevChars.map(c => c.id === characterId ? updatedCharacter : c));
        if (viewingCharacter && viewingCharacter.id === characterId) {
          setViewingCharacter(updatedCharacter);
          // No need to set localStorage here for viewingCharacter, it's already set or will be handled by navigation
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
            if (userRole === 'player') setScreen('player_char_list'); // Or 'dm_list' if DM initiated
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
    // Clear viewing state as we are moving to form, not directly viewing
    // but keep role and active screen context for form return.
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
    clearViewingStateFromStorage(); // Clears viewing char ID and active screen for sheet/form
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
    localStorage.removeItem(LOCAL_STORAGE_ACTIVE_SCREEN_KEY); // Clear active screen as well
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
