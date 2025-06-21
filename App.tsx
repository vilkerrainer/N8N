

import React, { useState, useEffect, useCallback } from 'react';
import { Character, AttributeName } from './types';
import CharacterForm from './components/CharacterForm';
import CharacterSheetDisplay from './components/CharacterSheetDisplay';
import Button from './components/ui/Button';
import RoleSelectionScreen from './components/RoleSelectionScreen';
import DMCharacterListView from './components/DMCharacterListView';
import PlayerCharacterList from './components/PlayerCharacterList';
import { RACES, CLASSES, BACKGROUNDS, ALIGNMENTS, FIGHTING_STYLE_OPTIONS } from './dndOptions'; // Updated import
import * as supabaseService from './supabaseService';

const TEST_CHARACTER_ID = "test-pavel-exemplo-001";

const initialCharacterData: Character = {
  id: TEST_CHARACTER_ID,
  photoUrl: 'https://picsum.photos/300/400',
  name: 'Pavel', // Updated name for clarity
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
  fightingStyle: FIGHTING_STYLE_OPTIONS[1].name, // Use name from options e.g. Arquearia
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
        if (viewingCharacter && viewingCharacter.id === characterId) {
          setViewingCharacter(updatedCharacter);
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
    return <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-black">Carregando dados...</div>;
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
                <p className="text-black text-xl mb-4">Nenhum personagem para exibir.</p>
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
    <div className="min-h-screen bg-slate-200 py-8 px-4">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold text-sky-700 tracking-tight">Criador de Personagens D&amp;D 5e</h1>
        <p className="text-gray-900 mt-2">Crie e gerencie seus heróis de aventura!</p>
        {userRole && (
          <Button onClick={handleChangeRole} variant="secondary" className="mt-4">
            Mudar Papel (Mestre/Jogador)
          </Button>
        )}
      </header>

      {isLoading && screen !== 'role' && (
        <div className="text-center my-4 p-4 bg-sky-100 text-sky-700 rounded-md">
          Carregando...
        </div>
      )}
      {error && (
        <div className="text-center my-4 p-4 bg-red-100 text-red-700 rounded-md break-words">
          Erro: {error}
        </div>
      )}

      {currentView}

      <footer className="text-center mt-12 py-4 text-sm text-gray-800">
        Feito com React e Tailwind CSS. Conectado ao Supabase.
      </footer>
    </div>
  );
};

export default App;
