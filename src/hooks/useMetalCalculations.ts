import { useState } from 'react';
import type { CalculatorState, MetalType } from '@/lib/types';

const getNumValue = (val: string | number): number =>
  typeof val === 'string' ? parseFloat(val) || 0 : val;

export const useMetalCalculations = (metalTypes: MetalType[]) => {
  const [state, setState] = useState<CalculatorState>({
    metalType: metalTypes[0].name,
    side: '',
    unitLength: '',
    pricePerKg: '',
    totalWeight: '',
    totalLength: '',
    quantity: '',
    weightPerMeter: '',
    crossSectionArea: '',
    volume: '',
    totalCost: '',
  });

  // Recalculation logic
  const recalculate = (
    activeField: keyof CalculatorState,
    newState: CalculatorState
  ) => {
    const sideNum = getNumValue(newState.side);
    const unitLengthNum = getNumValue(newState.unitLength);
    const quantityNum = getNumValue(newState.quantity);
    const totalLengthNum = getNumValue(newState.totalLength);
    const totalWeightNum = getNumValue(newState.totalWeight);
    const density = metalTypes.find((m) => m.name === state.metalType).density;
    const pricePerKgNum = getNumValue(state.pricePerKg);
    const weightPerMeter = sideNum * sideNum * density * 0.001; // кг/м
    const crossSectionArea = Math.pow(sideNum / 10, 2); // см²

    // Apply calculation logic based on active field
    switch (activeField) {
      case 'side':
      case 'metalType':
        newState.totalWeight = totalLengthNum * weightPerMeter;
        break;

      case 'unitLength':
        newState.totalLength = unitLengthNum * quantityNum;
        newState.totalWeight = newState.totalLength * weightPerMeter;
        break;

      case 'quantity':
        newState.totalLength = unitLengthNum * quantityNum;
        newState.totalWeight = newState.totalLength * weightPerMeter;
        newState.unitLength = totalLengthNum / quantityNum;
        break;

      case 'totalLength':
        if (weightPerMeter > 0) {
          newState.totalWeight = totalLengthNum * weightPerMeter;
        }
        if (unitLengthNum > 0) {
          newState.quantity = totalLengthNum / unitLengthNum;
        }
        break;

      case 'totalWeight':
        if (weightPerMeter > 0) {
          newState.totalLength = totalWeightNum / weightPerMeter;
        }
        if (unitLengthNum > 0) {
          newState.quantity = getNumValue(newState.totalLength) / unitLengthNum;
        }
        break;
    }
    const volume =
      (crossSectionArea * getNumValue(newState.totalLength)) / 10000; // м³
    const totalCost = getNumValue(newState.totalWeight) * pricePerKgNum;
    newState.volume = volume;
    newState.totalCost = totalCost;
    newState.weightPerMeter = weightPerMeter;
    newState.crossSectionArea = crossSectionArea;
    return newState;
  };

  // Update field with validation and debounced recalculation
  const updateField = (
    field: keyof CalculatorState,
    value: string | number
  ) => {
    const stringValue = typeof value === 'string' ? value : String(value);

    // For empty string, keep it as empty string in state for UI display
    let stateValue: string | number;
    if (field === 'metalType') {
      stateValue = stringValue;
    } else {
      stateValue = stringValue === '' ? '' : getNumValue(stringValue);
    }

    // Immediate state update for UI responsiveness
    setState((prevState) => ({
      ...prevState,
      [field]: stateValue,
    }));

    if (stringValue !== '') {
      setState((prevState) => {
        const numValue = getNumValue(stringValue);
        const newState = {
          ...prevState,
          [field]: field === 'metalType' ? stringValue : numValue,
        };
        return recalculate(field, newState);
      });
    }
  };

  // Reset function
  const reset = () => {
    setState({
      metalType: metalTypes[0].name,
      side: '',
      unitLength: '',
      pricePerKg: '',
      totalWeight: '',
      totalLength: '',
      quantity: '',
      weightPerMeter: '',
      crossSectionArea: '',
      volume: '',
      totalCost: '',
    });
  };

  return {
    state,
    // calculatedValues: calculatedValues(),
    updateField,
    reset,
  };
};
