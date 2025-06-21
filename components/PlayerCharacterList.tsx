

import React from 'react';
import { Character } from '../types';
import Button from './ui/Button';

interface PlayerCharacterListProps {
  characters: Character[];
  onCreateCharacter: () => void;
  onViewCharacter: (character: Character) => void;
  onEditCharacter: (character: Character) => void;
  onDeleteCharacter: (characterId: string) => void;
}

const PlayerCharacterList: React.FC<PlayerCharacterListProps> = ({
  characters,
  onCreateCharacter,
  onViewCharacter,
  onEditCharacter,
  onDeleteCharacter
}) => {
  return (
    <div className="max-w-3xl mx-auto my-8 p-6">
      <h2 className="text-3xl font-bold text-sky-700 dark:text-sky-400 mb-8 text-center">Meus Personagens</h2>
      {characters.length === 0 ? (
        <div className="text-center p-6 bg-white dark:bg-slate-800 shadow-md rounded-lg">
          <p className="text-slate-800 dark:text-slate-100 text-lg mb-4">Você ainda não criou nenhum personagem.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {characters.map((char) => (
            <div
              key={char.id}
              className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center"
            >
              <div className="flex items-center mb-3 sm:mb-0">
                <img
                  src={char.photoUrl || 'https://picsum.photos/80'}
                  alt={char.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover flex-shrink-0"
                  onError={(e) => (e.currentTarget.src = 'https://picsum.photos/80')}
                />
                <div>
                  <h3 className="text-lg font-semibold text-sky-600 dark:text-sky-500">{char.name}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {char.race} {char.charClass} - Nível {char.level}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2 flex-shrink-0">
                <Button onClick={() => onViewCharacter(char)} variant="secondary" className="text-xs px-3 py-1">
                  Ver Ficha
                </Button>
                <Button onClick={() => onEditCharacter(char)} variant="secondary" className="text-xs px-3 py-1">
                  Editar
                </Button>
                <Button 
                  onClick={() => onDeleteCharacter(char.id)} 
                  variant="secondary" 
                  className="text-xs px-3 py-1 bg-red-500 hover:bg-red-600 text-white focus:ring-red-400 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-500"
                  title={`Excluir ${char.name}`}
                >
                  Excluir
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-8 text-center">
        <Button onClick={onCreateCharacter} className="px-6 py-3 text-lg">
          Criar Novo Personagem
        </Button>
      </div>
    </div>
  );
};

export default PlayerCharacterList;
