
import React, { useState, useEffect, useCallback } from 'react';
import { Character, MagicInfo, AttributeName } from './types';
import CharacterForm from './components/CharacterForm';
import CharacterSheetDisplay from './components/CharacterSheetDisplay';
import Button from './components/ui/Button';
import RoleSelectionScreen from './components/RoleSelectionScreen';
import DMCharacterListView from './components/DMCharacterListView';
import PlayerCharacterList from './components/PlayerCharacterList';
import { RACES, CLASSES, BACKGROUNDS, ALIGNMENTS, FIGHTING_STYLES } from './dndOptions';

const TEST_CHARACTER_ID = "test-pavel-exemplo-001";

const initialCharacterData: Character = {
  id: TEST_CHARACTER_ID,
  photoUrl: 'https://picsum.photos/300/400',
  name: 'Pavel Exemplo (Teste)',
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
  skillNotes: 'Antecedentes e Classe definem as perícias. Personagem de teste.',
  items: 'Arco longo (1d8), 10 flechas, armadura de couro CA+11.\nPedra vermelha.',
  savingThrows: 'Força +2, Destreza +4',
  abilities: 'De manhã vejo isso',
  fightingStyle: FIGHTING_STYLES[1], 
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
const LOCAL_STORAGE_CHARACTERS_KEY = 'dndCharactersList';

type Screen = 'role' | 'dm_list' | 'player_char_list' | 'player_sheet' | 'player_form';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);
  const [viewingCharacter, setViewingCharacter] = useState<Character | null>(null);
  const [screen, setScreen] = useState<Screen>('role');
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const loadData = useCallback(() => {
    try {
      const savedRole = localStorage.getItem(LOCAL_STORAGE_ROLE_KEY);
      const savedCharactersString = localStorage.getItem(LOCAL_STORAGE_CHARACTERS_KEY);
      let loadedCharacters: Character[] = savedCharactersString ? JSON.parse(savedCharactersString) : [];

      if (loadedCharacters.length === 0) {
        loadedCharacters = [initialCharacterData];
        localStorage.setItem(LOCAL_STORAGE_CHARACTERS_KEY, JSON.stringify(loadedCharacters));
      } else {
        // Ensure test character exists if it was somehow deleted from a non-empty list
        const testCharExists = loadedCharacters.some(c => c.id === TEST_CHARACTER_ID);
        if (!testCharExists) {
            loadedCharacters.push(initialCharacterData);
            localStorage.setItem(LOCAL_STORAGE_CHARACTERS_KEY, JSON.stringify(loadedCharacters));
        }
      }

      setCharacters(loadedCharacters);

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
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
      setCharacters([initialCharacterData]); // Fallback to test character
      localStorage.setItem(LOCAL_STORAGE_CHARACTERS_KEY, JSON.stringify([initialCharacterData]));
      setScreen('role');
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCharacterSave = (charToSave: Character) => {
    let newCharactersList: Character[];
    const isEditingExisting = charToSave.id && characters.some(c => c.id === charToSave.id);
    const characterWithEnsuredId = { ...charToSave, id: charToSave.id || Date.now().toString() };

    if (isEditingExisting) {
        newCharactersList = characters.map(c => c.id === characterWithEnsuredId.id ? characterWithEnsuredId : c);
    } else {
        newCharactersList = [...characters, characterWithEnsuredId];
    }

    setCharacters(newCharactersList);
    try {
      localStorage.setItem(LOCAL_STORAGE_CHARACTERS_KEY, JSON.stringify(newCharactersList));
    } catch (error) {
      console.error("Failed to save characters to localStorage", error);
    }

    setEditingCharacter(null);
    if (userRole === 'player') {
      setViewingCharacter(characterWithEnsuredId); 
      setScreen('player_sheet');
    } else { 
      setScreen('dm_list');
    }
  };
  
  const handleUpdateCharacterData = (characterId: string, updates: Partial<Character>) => {
    const characterIndex = characters.findIndex(c => c.id === characterId);
    if (characterIndex === -1) {
      console.warn("Character not found for update:", characterId);
      return;
    }

    const oldCharacter = characters[characterIndex];
    const updatedCharacter = { ...oldCharacter, ...updates };
    
    const newCharactersList = [...characters];
    newCharactersList[characterIndex] = updatedCharacter;

    setCharacters(newCharactersList);
    try {
      localStorage.setItem(LOCAL_STORAGE_CHARACTERS_KEY, JSON.stringify(newCharactersList));
    } catch (error) {
      console.error("Failed to save characters to localStorage during partial update", error);
    }

    if (viewingCharacter && viewingCharacter.id === characterId) {
      setViewingCharacter(updatedCharacter);
    }
  };

  const handleDeleteCharacter = (characterIdToDelete: string) => {
    if (window.confirm(`Tem certeza que deseja excluir este personagem? Esta ação não pode ser desfeita.`)) {
      let updatedCharacters = characters.filter(char => char.id !== characterIdToDelete);

      if (updatedCharacters.length === 0) {
        updatedCharacters = [initialCharacterData]; 
      }
      
      setCharacters(updatedCharacters);
      try {
        localStorage.setItem(LOCAL_STORAGE_CHARACTERS_KEY, JSON.stringify(updatedCharacters));
      } catch (error) {
        console.error("Failed to save characters to localStorage after deletion", error);
      }

      if (viewingCharacter && viewingCharacter.id === characterIdToDelete) {
        setViewingCharacter(null);
        if (userRole === 'player') setScreen('player_char_list');
      }
      if (editingCharacter && editingCharacter.id === characterIdToDelete) {
        setEditingCharacter(null);
        if (userRole === 'player') setScreen('player_char_list');
      }
      // If the DM list becomes empty (which it won't due to test char logic), it just re-renders.
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

  if (!isInitialized) {
    return <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-black">Carregando...</div>;
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

      {currentView}

      <footer className="text-center mt-12 py-4 text-sm text-gray-800">
        Feito com React e Tailwind CSS.
      </footer>
    </div>
  );
};

export default App;
