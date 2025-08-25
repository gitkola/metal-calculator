import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useMetalCalculations } from '@/hooks/useMetalCalculations';
import { metalTypes } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';
import { CalculatorDropdownField } from './calculator/CalculatorDropdownField';
import { CalculatorDecimalField } from './calculator/CalculatorDecimalField';
import { CalculatorCheckboxField } from './calculator/CalculatorCheckboxField';

export const SquareMetalCalculator: React.FC = () => {
  const [isByLength, setIsByLength] = useState(true);
  const { state, updateField, reset } = useMetalCalculations(metalTypes);
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
        <div className="flex flex-1 py-4 gap-4">
          <CalculatorCheckboxField
            label="По довжині"
            value={isByLength}
            onChange={setIsByLength}
          />
          <CalculatorCheckboxField
            label="За вагою"
            value={!isByLength}
            onChange={() => setIsByLength(false)}
          />
        </div>

        <CalculatorDropdownField
          label="Тип металу (щільність)"
          value={state.metalType}
          onChange={(value) => updateField('metalType', value)}
          options={metalOptions}
        />

        <CalculatorDecimalField
          label="Сторона квадрата, мм"
          value={state.side}
          onChange={(value) => updateField('side', value)}
        />
        <CalculatorDecimalField
          label="Довжина одиниці, м"
          value={state.unitLength}
          onChange={(value) => updateField('unitLength', value)}
        />
        <CalculatorDecimalField
          label="Кількість, шт"
          value={state.quantity}
          onChange={(value) => updateField('quantity', value)}
        />
        <CalculatorDecimalField
          label="Загальна довжина, м"
          value={state.totalLength}
          onChange={(value) => updateField('totalLength', value)}
          disabled={!isByLength}
        />
        <CalculatorDecimalField
          label="Загальна вага, кг"
          value={state.totalWeight}
          onChange={(value) => updateField('totalWeight', value)}
          disabled={isByLength}
        />
        <CalculatorDecimalField
          label="Ціна за кілограм, грн"
          value={state.pricePerKg}
          onChange={(value) => updateField('pricePerKg', value)}
        />
        <CalculatorDecimalField
          label="Загальна вартість, грн"
          value={state.totalCost}
          onChange={() => {}} // No-op for readonly
          disabled={true}
        />

        <CalculatorDecimalField
          label="Вага одного метру, кг/м"
          value={state.weightPerMeter}
          onChange={() => {}} // No-op for readonly
          disabled={true}
        />

        <CalculatorDecimalField
          label="Площа перерізу, см²"
          value={state.crossSectionArea}
          onChange={() => {}} // No-op for readonly
          disabled={true}
        />

        <CalculatorDecimalField
          label="Об'єм матеріалу, м³"
          value={state.volume}
          onChange={() => {}} // No-op for readonly
          disabled={true}
          precision={4}
        />
      </div>
    </div>
  );
};

export default SquareMetalCalculator;
