import React from 'react';
import { Button } from '@/components/ui/button';
import { CalculatorField } from '@/components/calculator/CalculatorField';
import { CalculatorResults } from '@/components/calculator/CalculatorResults';
import { useMetalCalculations } from '@/hooks/useMetalCalculations';
import { metalTypes } from '@/lib/types';

export const SquareMetalCalculator: React.FC = () => {
  const { state, errors, calculatedValues, updateField, reset } =
    useMetalCalculations(metalTypes);

  const metalOptions = metalTypes.map((metal) => ({
    value: metal.name,
    label: `${metal.name} (${metal.density})`,
  }));

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-blue-600 border-none">
        <div className="flex flex-row items-center justify-between p-3">
          <div className="text-yellow-300 text-2xl">Квадрат</div>
          <Button
            variant="outline"
            onClick={reset}
            className="text-sm bg-yellow-300 text-blue-600"
          >
            Очистити
          </Button>
        </div>
        <div className="p-3 space-y-4">
          <CalculatorField
            label="Тип металу (щільність)"
            value={state.metalType}
            onChange={(value) => updateField('metalType', value)}
            type="select"
            options={metalOptions}
            error={errors.metalType}
          />
          <CalculatorField
            label="Сторона квадрата"
            value={state.side}
            onChange={(value) => updateField('side', value)}
            unit="мм"
            step="0.1"
            error={errors.side}
          />
          <CalculatorField
            label="Довжина одиниці"
            value={state.unitLength}
            onChange={(value) => updateField('unitLength', value)}
            unit="м"
            step="0.01"
            error={errors.unitLength}
          />
          <CalculatorField
            label="Кількість"
            value={state.quantity}
            onChange={(value) => updateField('quantity', value)}
            unit="шт"
            step="0.001"
            error={errors.quantity}
          />
          <CalculatorField
            label="Загальна довжина"
            value={state.totalLength}
            onChange={(value) => updateField('totalLength', value)}
            unit="м"
            step="0.01"
            error={errors.totalLength}
          />
          <CalculatorField
            label="Загальна вага"
            value={state.totalWeight}
            onChange={(value) => updateField('totalWeight', value)}
            unit="кг"
            step="0.01"
            error={errors.totalWeight}
          />
          <CalculatorField
            label="Ціна за кілограм"
            value={state.pricePerKg}
            onChange={(value) => updateField('pricePerKg', value)}
            unit="грн"
            step="0.01"
            error={errors.pricePerKg}
          />
          <CalculatorResults calculations={calculatedValues} />
        </div>
      </div>
    </div>
  );
};

export default SquareMetalCalculator;
