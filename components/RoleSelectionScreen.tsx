import React from 'react';
import Button from './ui/Button';

interface RoleSelectionScreenProps {
  onSelectRole: (role: 'player' | 'dm') => void;
}

const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({ onSelectRole }) => {
  return (
    <div className="max-w-md mx-auto my-10 p-8 bg-white dark:bg-slate-800 shadow-xl rounded-lg text-center">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Qual o seu papel?</h2>
      <div className="space-y-4">
        <Button onClick={() => onSelectRole('dm')} className="w-full text-lg py-3">
          Sou Mestre
        </Button>
        <Button onClick={() => onSelectRole('player')} className="w-full text-lg py-3">
          Sou Jogador
        </Button>
      </div>
      <p className="mt-6 text-sm text-gray-700 dark:text-slate-300">
        Sua escolha será salva para a próxima vez.
      </p>
    </div>
  );
};

export default RoleSelectionScreen;