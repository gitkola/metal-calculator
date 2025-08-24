import React from 'react';
import { Button } from '@/components/ui/button';
import { CalculatorField } from '@/components/calculator/CalculatorField';
import { useMetalCalculations } from '@/hooks/useMetalCalculations';
import { metalTypes } from '@/lib/types';

export const SquareMetalCalculator: React.FC = () => {
  const { state, calculatedValues, updateField, reset } =
    useMetalCalculations(metalTypes);

  const metalOptions = metalTypes.map((metal) => ({
    value: metal.name,
    label: `${metal.name} (${metal.density})`,
  }));

  return (
    <div className="w-full max-w-md mx-auto p-4 flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="text-yellow-300 text-2xl">Квадрат</div>
        <Button
          variant="outline"
          onClick={reset}
          className="text-sm bg-yellow-300 text-blue-600 items-center justify-center"
        >
          Очистити
        </Button>
      </div>
      <div className="space-y-4">
        <CalculatorField
          label="Тип металу (щільність)"
          value={state.metalType}
          onChange={(value) => updateField('metalType', value)}
          type="select"
          options={metalOptions}
          // error={errors.metalType}
        />
        <CalculatorField
          label="Сторона квадрата, мм"
          value={state.side}
          onChange={(value) => updateField('side', value)}
          // error={errors.side}
        />
        <CalculatorField
          label="Довжина одиниці, м"
          value={state.unitLength}
          onChange={(value) => updateField('unitLength', value)}
          // error={errors.unitLength}
        />
        <CalculatorField
          label="Кількість, шт"
          value={state.quantity}
          onChange={(value) => updateField('quantity', value)}
          // error={errors.quantity}
        />
        <CalculatorField
          label="Загальна довжина, м"
          value={state.totalLength}
          onChange={(value) => updateField('totalLength', value)}
          // error={errors.totalLength}
        />
        <CalculatorField
          label="Загальна вага, кг"
          value={state.totalWeight}
          onChange={(value) => updateField('totalWeight', value)}
          // error={errors.totalWeight}
        />
        <CalculatorField
          label="Ціна за кілограм, грн"
          value={state.pricePerKg}
          onChange={(value) => updateField('pricePerKg', value)}
          // error={errors.pricePerKg}
        />
        <CalculatorField
          label="Загальна вартість, грн"
          value={calculatedValues.totalCost}
          // value={formatCurrency(calculations.totalCost)}
          onChange={() => {}} // No-op for readonly
          disabled={true}
        />

        <CalculatorField
          label="Вага одного метру, кг/м"
          // label="Вага за погонний метр"
          value={calculatedValues.weightPerMeter}
          // value={formatNumber(calculations.weightPerMeter)}
          onChange={() => {}} // No-op for readonly
          disabled={true}
        />

        <CalculatorField
          label="Площа перерізу, см²"
          value={calculatedValues.crossSectionArea}
          // value={formatNumber(calculations.crossSectionArea)}
          onChange={() => {}} // No-op for readonly
          disabled={true}
        />

        <CalculatorField
          label="Об'єм матеріалу, м³"
          value={calculatedValues.volume}
          // value={formatNumber(calculations.volume, 6)}
          onChange={() => {}} // No-op for readonly
          disabled={true}
        />
      </div>
    </div>
  );
};

export default SquareMetalCalculator;
