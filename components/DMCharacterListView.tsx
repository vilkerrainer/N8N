
import React, { useState } from 'react';
import { Character, ATTRIBUTE_NAMES, ATTRIBUTE_LABELS, AttributeName } from '../types';
import Button from './ui/Button'; 
import Input from './ui/Input';   
import AttributeField, { calculateModifier, formatModifier } from './AttributeField';
import { ALL_SKILLS, SkillDefinition, calculateProficiencyBonus } from '../skills';


interface DMCharacterListViewProps {
  characters: Character[];
  onDMUpdateCharacter?: (characterId: string, updates: Partial<Character>) => void;
  onDeleteCharacter: (characterId: string) => void;
}

const DMCharacterListView: React.FC<DMCharacterListViewProps> = ({ characters, onDMUpdateCharacter, onDeleteCharacter }) => {
  const [dmInputs, setDmInputs] = useState<Record<string, { chargeAmount: string; damageAmount: string }>>({});
  const [showAttributes, setShowAttributes] = useState<boolean>(true);
  const [showSkills, setShowSkills] = useState<boolean>(false);

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
      <div className="max-w-4xl mx-auto my-8 p-6 bg-white dark:bg-slate-800 shadow-xl rounded-lg text-center">
        <h2 className="text-3xl font-bold text-sky-800 dark:text-sky-300 mb-6">Visão do Mestre</h2>
        <p className="text-black dark:text-slate-200 text-lg">Nenhum personagem foi criado ainda (ou o personagem de teste não carregou).</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto my-8 p-6">
      <h2 className="text-3xl font-bold text-sky-800 dark:text-sky-300 mb-6 text-center">Visão do Mestre - Personagens Criados</h2>
      
      <div className="mb-6 flex justify-center space-x-4">
        <Button onClick={() => setShowAttributes(!showAttributes)} variant="secondary">
            {showAttributes ? 'Ocultar' : 'Mostrar'} Atributos
        </Button>
        <Button onClick={() => setShowSkills(!showSkills)} variant="secondary">
            {showSkills ? 'Ocultar' : 'Mostrar'} Perícias
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.map((char) => {
          const proficiencyBonus = calculateProficiencyBonus(char.level);
          return (
            <div key={char.id} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
              <div className="flex items-center mb-4">
                <img 
                  src={char.photoUrl || 'https://picsum.photos/100'} 
                  alt={char.name} 
                  className="w-16 h-16 rounded-full mr-4 object-cover flex-shrink-0"
                  onError={(e) => (e.currentTarget.src = 'https://picsum.photos/100')}
                />
                <div>
                  <h3 className="text-xl font-bold text-sky-700 dark:text-sky-400">{char.name}</h3>
                  <p className="text-sm text-gray-700 dark:text-slate-400">{char.race} / {char.charClass} / Nível {char.level}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm mb-4 flex-grow">
                <div className="flex justify-between p-2 bg-slate-50 dark:bg-slate-700 rounded">
                  <span className="font-semibold text-gray-700 dark:text-slate-300">HP:</span>
                  <span className="text-black dark:text-slate-100">{char.hp} / {char.hpt}</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 dark:bg-slate-700 rounded">
                  <span className="font-semibold text-gray-700 dark:text-slate-300">CA:</span>
                  <span className="text-black dark:text-slate-100">{char.ac}</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 dark:bg-slate-700 rounded">
                  <span className="font-semibold text-gray-700 dark:text-slate-300">Moedas:</span>
                  <span className="text-black dark:text-slate-100">{char.coins}</span>
                </div>

                {showAttributes && (
                  <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-600">
                    <h4 className="text-sm font-semibold text-gray-600 dark:text-slate-300 mb-1">Atributos:</h4>
                    <div className="grid grid-cols-1 gap-1">
                      {ATTRIBUTE_NAMES.map(attrName => (
                        <AttributeField
                          key={attrName}
                          label={ATTRIBUTE_LABELS[attrName]}
                          score={char.attributes[attrName]}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {showSkills && (
                  <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-600">
                    <h4 className="text-sm font-semibold text-gray-600 dark:text-slate-300 mb-1">Perícias: <span className="text-xs font-normal">(Bônus Prof: {formatModifier(proficiencyBonus)})</span></h4>
                    <div className="text-xs space-y-1 max-h-48 overflow-y-auto pr-1">
                      {ALL_SKILLS.map((skill: SkillDefinition) => {
                        const attributeScore = char.attributes[skill.attribute];
                        const attributeModifier = calculateModifier(attributeScore);
                        const isProficient = char.proficientSkills.includes(skill.key);
                        const skillModifier = attributeModifier + (isProficient ? proficiencyBonus : 0);
                        return (
                          <div key={skill.key} className={`flex justify-between items-center p-1 rounded ${isProficient ? 'bg-sky-100 dark:bg-sky-800 shadow-sm' : 'bg-slate-50 dark:bg-slate-700'}`}>
                            <span className={` ${isProficient ? 'text-sky-700 dark:text-sky-300 font-semibold' : 'text-black dark:text-slate-200'}`}>
                              {isProficient && <span title="Proficiente">● </span>}{skill.label} 
                              <span className="text-gray-500 dark:text-slate-400 text-xs ml-1">({ATTRIBUTE_LABELS[skill.attribute].substring(0,3)})</span>
                            </span>
                            <span className={`px-2 py-0.5 rounded text-xs ${isProficient ? 'text-sky-900 dark:text-sky-100 bg-sky-200 dark:bg-sky-600 font-bold' : 'text-black dark:text-slate-100 bg-slate-200 dark:bg-slate-600'}`}>{formatModifier(skillModifier)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {onDMUpdateCharacter && (
                <div className="mt-4 border-t dark:border-slate-600 pt-4 space-y-3">
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
                    <Button onClick={() => handleDealDamageToPlayer(char)} variant="secondary" className="w-full mt-1 text-xs py-1 bg-orange-500 hover:bg-orange-600 text-white focus:ring-orange-400 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-500">Dar Dano</Button>
                  </div>
                </div>
              )}
               <div className="mt-4 border-t dark:border-slate-600 pt-4">
                  <Button 
                      onClick={() => onDeleteCharacter(char.id)} 
                      variant="secondary" 
                      className="w-full text-xs py-1.5 bg-red-500 hover:bg-red-600 text-white focus:ring-red-400 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-500"
                      title={`Excluir ${char.name}`}
                  >
                      Excluir Personagem
                  </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DMCharacterListView;
