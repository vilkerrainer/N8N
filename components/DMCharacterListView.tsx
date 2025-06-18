
import React, { useState } from 'react';
import { Character } from '../types';
import Button from './ui/Button'; 
import Input from './ui/Input';   

interface DMCharacterListViewProps {
  characters: Character[];
  onDMUpdateCharacter?: (characterId: string, updates: Partial<Character>) => void;
  onDeleteCharacter: (characterId: string) => void;
}

const DMCharacterListView: React.FC<DMCharacterListViewProps> = ({ characters, onDMUpdateCharacter, onDeleteCharacter }) => {
  const [dmInputs, setDmInputs] = useState<Record<string, { chargeAmount: string; damageAmount: string }>>({});

  const handleInputChange = (charId: string, field: 'chargeAmount' | 'damageAmount', value: string) => {
    setDmInputs(prev => ({
      ...prev,
      [charId]: {
        ...(prev[charId] || { chargeAmount: '', damageAmount: '' }),
        [field]: value,
      }
    }));
  };

  const handleChargePlayer = (char: Character) => {
    if (!onDMUpdateCharacter) return;
    const amountStr = dmInputs[char.id]?.chargeAmount || '0';
    const amount = parseInt(amountStr, 10);
    if (isNaN(amount) || amount <= 0) return;

    const newCoins = Math.max(0, char.coins - amount);
    onDMUpdateCharacter(char.id, { coins: newCoins });
    handleInputChange(char.id, 'chargeAmount', ''); 
  };

  const handleDealDamageToPlayer = (char: Character) => {
    if (!onDMUpdateCharacter) return;
    const amountStr = dmInputs[char.id]?.damageAmount || '0';
    const amount = parseInt(amountStr, 10);
    if (isNaN(amount) || amount <= 0) return;
    
    const newHp = Math.max(0, char.hp - amount);
    onDMUpdateCharacter(char.id, { hp: newHp });
    handleInputChange(char.id, 'damageAmount', ''); 
  };


  if (characters.length === 0) {
    return (
      <div className="max-w-4xl mx-auto my-8 p-6 bg-white shadow-xl rounded-lg text-center">
        <h2 className="text-3xl font-bold text-sky-800 mb-6">Visão do Mestre</h2>
        <p className="text-black text-lg">Nenhum personagem foi criado ainda (ou o personagem de teste não carregou).</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto my-8 p-6">
      <h2 className="text-3xl font-bold text-sky-800 mb-8 text-center">Visão do Mestre - Personagens Criados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.map((char) => (
          <div key={char.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
            <div className="flex items-center mb-4">
              <img 
                src={char.photoUrl || 'https://picsum.photos/100'} 
                alt={char.name} 
                className="w-16 h-16 rounded-full mr-4 object-cover flex-shrink-0"
                onError={(e) => (e.currentTarget.src = 'https://picsum.photos/100')}
              />
              <div>
                <h3 className="text-xl font-bold text-sky-700">{char.name}</h3>
                <p className="text-sm text-gray-700">{char.race} / {char.charClass} / Nível {char.level}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm mb-4 flex-grow">
              <div className="flex justify-between p-2 bg-slate-50 rounded">
                <span className="font-semibold text-gray-700">HP:</span>
                <span className="text-black">{char.hp} / {char.hpt}</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-50 rounded">
                <span className="font-semibold text-gray-700">CA:</span>
                <span className="text-black">{char.ac}</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-50 rounded">
                <span className="font-semibold text-gray-700">Moedas:</span>
                <span className="text-black">{char.coins}</span>
              </div>
            </div>

            {onDMUpdateCharacter && (
              <div className="mt-4 border-t pt-4 space-y-3">
                <div>
                  <Input
                    label="Cobrar Moedas"
                    id={`charge-${char.id}`}
                    type="number"
                    value={dmInputs[char.id]?.chargeAmount || ''}
                    onChange={(e) => handleInputChange(char.id, 'chargeAmount', e.target.value)}
                    placeholder="Quantidade"
                    className="text-xs py-1"
                  />
                  <Button onClick={() => handleChargePlayer(char)} variant="secondary" className="w-full mt-1 text-xs py-1">Cobrar</Button>
                </div>
                <div>
                  <Input
                    label="Dar Dano"
                    id={`damage-${char.id}`}
                    type="number"
                    value={dmInputs[char.id]?.damageAmount || ''}
                    onChange={(e) => handleInputChange(char.id, 'damageAmount', e.target.value)}
                    placeholder="Quantidade"
                    className="text-xs py-1"
                  />
                  <Button onClick={() => handleDealDamageToPlayer(char)} variant="secondary" className="w-full mt-1 text-xs py-1 bg-orange-500 hover:bg-orange-600 text-white focus:ring-orange-400">Dar Dano</Button>
                </div>
              </div>
            )}
             <div className="mt-4 border-t pt-4">
                <Button 
                    onClick={() => onDeleteCharacter(char.id)} 
                    variant="secondary" 
                    className="w-full text-xs py-1.5 bg-red-500 hover:bg-red-600 text-white focus:ring-red-400"
                    title={`Excluir ${char.name}`}
                >
                    Excluir Personagem
                </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DMCharacterListView;
