import React from 'react';

interface AttributeFieldProps {
  label: string;
  score: number;
}

export const calculateModifier = (score: number): number => {
  return Math.floor((score - 10) / 2);
};

export const formatModifier = (modifier: number): string => {
  return modifier >= 0 ? `+${modifier}` : `${modifier}`;
};

const AttributeField: React.FC<AttributeFieldProps> = ({ label, score }) => {
  const modifier = calculateModifier(score);
  return (
    <div className="flex justify-between items-center p-2 bg-slate-50 rounded mb-1">
      <span className="font-medium text-black">{label}:</span>
      <span className="text-black">{score} ({formatModifier(modifier)})</span>
    </div>
  );
};

export default AttributeField;