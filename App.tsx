
import React, { useState, useEffect, useCallback } from 'react';
import { Character, AttributeName } from './types';
import CharacterForm from './components/CharacterForm';
import CharacterSheetDisplay from './components/CharacterSheetDisplay';
import Button from './components/ui/Button';
import RoleSelectionScreen from './components/RoleSelectionScreen';
import DMCharacterListView from './components/DMCharacterListView';
import PlayerCharacterList from './components/PlayerCharacterList';
import { RACES, CLASSES, BACKGROUNDS, ALIGNMENTS, FIGHTING_STYLE_OPTIONS } from './dndOptions'; 
import * as supabaseService from './supabaseService';
import { RealtimeChannel } from '@supabase/supabase-js';

const TEST_CHARACTER_ID = "test-pavel-exemplo-001";

const initialCharacterData: Character = {
  id: TEST_CHARACTER_ID,
  photoUrl: 'https://picsum.photos/300/400',
  name: 'Pavel Exemplo (Supabase)',
  background: BACKGROUNDS[12], 
  race: RACES[7], 
  charClass: CLASSES[11], 
  age: 19,
  alignment: ALIGNMENTS[4], 
  coins: 316,
  level: 2,
  hp: 17,
  hpt: 17,
  ac: 16,
  attributes: {
    strength: 10,
    dexterity: 15,
    constitution: 13,
    intelligence: 11,
    wisdom: 15,
    charisma: 10,
  },
  proficientSkills: ['athletics', 'survival', 'stealth', 'investigation', 'perception'],
  skillNotes: 'Antecedentes e Classe definem as perícias. Personagem de teste, agora em Supabase.',
  items: 'Arco longo (1d8), 10 flechas, armadura de couro CA+11.\nPedra vermelha.',
  savingThrows: 'Força +2, Destreza +4',
  abilities: 'De manhã vejo isso',
  fightingStyle: FIGHTING_STYLE_OPTIONS[1].name, 
  magic: {
    spellcastingAbilityName: 'wisdom' as AttributeName,
    spellSaveDC: 12,
    spellAttackBonus: 4, 
    cantripsKnown: [], 
    spellsKnownPrepared: ['Hunter\'s Mark', 'Cure Wounds'], 
    spellSlots: [3,0,0,0,0,0,0,0,0], 
  }
};

const LOCAL_STORAGE_ROLE_KEY = 'dndUserRole';
const LOCAL_STORAGE_THEME_KEY = 'dndAppTheme';

type Screen = 'role' | 'dm_list' | 'player_char_list' | 'player_sheet' | 'player_form';
type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);
  const [viewingCharacter, setViewingCharacter] = useState<Character | null>(null);
  const [screen, setScreen] = useState<Screen>('role');
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme | null;
    return savedTheme || 'light';
  });

  let characterSubscription: RealtimeChannel | null = null;

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const savedRole = localStorage.getItem(LOCAL_STORAGE_ROLE_KEY);
      let fetchedCharacters = await supabaseService.getCharacters();

      const testCharExists = fetchedCharacters.some(c => c.id === TEST_CHARACTER_ID);
      if (!testCharExists) {
        console.log("Test character not found in Supabase, attempting to add it.");
        const addedTestChar = await supabaseService.saveCharacter(initialCharacterData);
        if (addedTestChar) {
          fetchedCharacters.push(addedTestChar);
        } else {
          console.warn("Failed to add test character to Supabase.");
        }
      }
      
      setCharacters(fetchedCharacters);

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

  // Real-time subscription for viewingCharacter
  useEffect(() => {
    if (screen === 'player_sheet' && viewingCharacter) {
      characterSubscription = supabaseService.subscribeToCharacterUpdates(
        viewingCharacter.id,
        (updatedCharacter) => {
          setViewingCharacter(updatedCharacter);
          // Optionally update the main list if needed, though DM updates already do.
          setCharacters(prevChars => prevChars.map(c => c.id === updatedCharacter.id ? updatedCharacter : c));
        }
      );
    }

    return () => {
      if (characterSubscription) {
        supabaseService.unsubscribeFromChannel(characterSubscription);
        characterSubscription = null;
      }
    };
  }, [screen, viewingCharacter]);


  const handleCharacterSave = async (charToSave: Character) => {
    setIsLoading(true);
    setError(null);
    try {
      const characterWithEnsuredId = { ...charToSave, id: charToSave.id || Date.now().toString() };
      const savedCharacter = await supabaseService.saveCharacter(characterWithEnsuredId);

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
        } else { 
          setScreen('dm_list');
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
      const updatedCharacter = await supabaseService.updateCharacter(characterId, updates);
      if (updatedCharacter) {
        setCharacters(prevChars => prevChars.map(c => c.id === characterId ? updatedCharacter : c));
        // If the player is viewing this character, their real-time subscription will update it.
        // However, if the DM is also viewing (e.g. via a different mechanism not built yet) or if this update affects a list
        // the player is on, this direct update to viewingCharacter is still good.
        if (viewingCharacter && viewingCharacter.id === characterId) {
           // The subscription should handle this, but as a fallback or for immediate UI consistency:
           // setViewingCharacter(updatedCharacter); 
           // Given the subscription handles viewingCharacter, this might not be strictly needed here anymore,
           // but won't harm. The subscription is the primary mechanism for player_sheet.
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
            if (userRole === 'player') setScreen('player_char_list');
          }
          if (editingCharacter && editingCharacter.id === characterIdToDelete) {
            setEditingCharacter(null);
            if (userRole === 'player') setScreen('player_char_list');
          }
          if (updatedCharacters.length === 0) {
            const testCharStillExists = await supabaseService.getCharacterById(TEST_CHARACTER_ID);
            if(!testCharStillExists){
                console.log("List is empty and test character is missing, re-adding test character to Supabase.");
                const addedTestChar = await supabaseService.saveCharacter(initialCharacterData);
                if (addedTestChar) {
                    setCharacters([addedTestChar]); 
                }
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
  };

  const handlePlayerEditCharacter = (character: Character) => {
    setEditingCharacter(character);
    setScreen('player_form');
  };

  const handlePlayerCreateCharacter = () => {
    setEditingCharacter(null); 
    setScreen('player_form');
  };

  const handleNavigateToList = () => {
    setViewingCharacter(null);
    setEditingCharacter(null);
    if (userRole === 'player') setScreen('player_char_list');
    else setScreen('dm_list');
  };

  const handleRoleSelect = (role: 'player' | 'dm') => {
    setUserRole(role);
    localStorage.setItem(LOCAL_STORAGE_ROLE_KEY, role);
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
  };

  if (!isInitialized || isLoading && screen === 'role') { 
    return <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-black dark:text-slate-200">Carregando dados...</div>;
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
              onCharacterUpdate={handleUpdateCharacterData} // This is for DM/quick actions on player sheet if they own it
            />
        );
      } else { 
         currentView = (
            <div className="text-center">
                <p className="text-black dark:text-slate-200 text-xl mb-4">Nenhum personagem para exibir.</p>
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
    <div className="min-h-screen bg-slate-200 dark:bg-slate-900 py-8 px-4 transition-colors duration-300">
      <header className="text-center mb-10">
        <div className="flex justify-center items-center mb-2 space-x-4">
            <h1 className="text-5xl font-bold text-sky-700 dark:text-sky-400 tracking-tight">Criador de Personagens D&amp;D 5e</h1>
            <Button onClick={toggleTheme} variant="secondary" className="px-3 py-1.5 text-sm">
                {theme === 'light' ? '🌙 Dark' : '☀️ Light'} Mode
            </Button>
        </div>
        <p className="text-gray-900 dark:text-slate-300 mt-2">Crie e gerencie seus heróis de aventura!</p>
        {userRole && (
          <Button onClick={handleChangeRole} variant="secondary" className="mt-4">
            Mudar Papel (Mestre/Jogador)
          </Button>
        )}
      </header>

      {isLoading && screen !== 'role' && (
        <div className="text-center my-4 p-4 bg-sky-100 dark:bg-sky-800 text-sky-700 dark:text-sky-300 rounded-md">
          Carregando...
        </div>
      )}
      {error && (
        <div className="text-center my-4 p-4 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300 rounded-md break-words">
          Erro: {error}
        </div>
      )}

      {currentView}

      <footer className="text-center mt-12 py-4 text-sm text-gray-800 dark:text-slate-400">
        {/* Content removed as per user request */}
      </footer>
    </div>
  );
};

export default App;
