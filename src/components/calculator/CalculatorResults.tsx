import React from 'react';
import { CalculatorField } from '@/components/calculator/CalculatorField';
import type { CalculatedValues } from '@/lib/types';
import { formatNumber, formatCurrency } from '@/lib/formatters';

interface CalculatorResultsProps {
  calculations: CalculatedValues;
}

export const CalculatorResults: React.FC<CalculatorResultsProps> = ({
  calculations,
}) => {
  return (
    <>
      <CalculatorField
        label="Загальна вартість"
        value={calculations.totalCost}
        // value={formatCurrency(calculations.totalCost)}
        onChange={() => {}} // No-op for readonly
        unit="грн"
        disabled={true}
      />

      <CalculatorField
        label="Вага одного метру"
        // label="Вага за погонний метр"
        value={calculations.weightPerMeter}
        // value={formatNumber(calculations.weightPerMeter)}
        onChange={() => {}} // No-op for readonly
        unit="кг/м"
        disabled={true}
      />

      <CalculatorField
        label="Площа перерізу"
        value={calculations.crossSectionArea}
        // value={formatNumber(calculations.crossSectionArea)}
        onChange={() => {}} // No-op for readonly
        unit="см²"
        disabled={true}
      />

      <CalculatorField
        label="Об'єм матеріалу"
        value={calculations.volume}
        // value={formatNumber(calculations.volume, 6)}
        onChange={() => {}} // No-op for readonly
        unit="м³"
        disabled={true}
      />
    </>
  );
};
