import { useState, useMemo, useCallback, useRef } from 'react';
import type {
  CalculatorState,
  CalculatedValues,
  MetalType,
  FieldErrors,
} from '@/lib/types';
import { validateField } from '@/lib/validation';
import { parseNumberInputWithPrecision } from '@/lib/formatters';

export const useMetalCalculations = (metalTypes: MetalType[]) => {
  const [state, setState] = useState<CalculatorState>({
    metalType: metalTypes[0]?.name || 'Сталь',
    side: '',
    unitLength: '',
    pricePerKg: '',
    totalWeight: '',
    totalLength: '',
    quantity: '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const isCalculatingRef = useRef(false);

  // Debounce helper
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const debounce = useCallback((fn: () => void, delay: number) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(fn, delay);
  }, []);

  // Calculate weight per meter
  const weightPerMeter = useMemo(() => {
    const sideNum =
      typeof state.side === 'string' ? parseFloat(state.side) || 0 : state.side;
    if (sideNum <= 0) return 0;
    const metal = metalTypes.find((m) => m.name === state.metalType);
    if (!metal) return 0;
    const sideInCm = sideNum / 10;
    return sideInCm * sideInCm * metal.density * 0.1; // кг/м
  }, [state.side, state.metalType, metalTypes]);

  // Calculate derived values
  const calculatedValues = useMemo((): CalculatedValues => {
    const sideNum =
      typeof state.side === 'string' ? parseFloat(state.side) || 0 : state.side;
    const totalLengthNum =
      typeof state.totalLength === 'string'
        ? parseFloat(state.totalLength) || 0
        : state.totalLength;
    const totalWeightNum =
      typeof state.totalWeight === 'string'
        ? parseFloat(state.totalWeight) || 0
        : state.totalWeight;
    const pricePerKgNum =
      typeof state.pricePerKg === 'string'
        ? parseFloat(state.pricePerKg) || 0
        : state.pricePerKg;

    const crossSectionArea = sideNum > 0 ? Math.pow(sideNum / 10, 2) : 0;
    const volume =
      totalLengthNum > 0 && crossSectionArea > 0
        ? (crossSectionArea * totalLengthNum) / 10000
        : 0;
    const totalCost = totalWeightNum * pricePerKgNum;

    return {
      weightPerMeter,
      crossSectionArea,
      volume,
      totalCost,
    };
  }, [
    state.side,
    state.totalLength,
    state.totalWeight,
    state.pricePerKg,
    weightPerMeter,
  ]);

  // Recalculation logic
  const recalculate = useCallback(
    (activeField: keyof CalculatorState, newState: CalculatorState) => {
      if (isCalculatingRef.current) return newState;
      isCalculatingRef.current = true;

      // Convert string values to numbers for calculations
      const getNumValue = (val: string | number): number => {
        return typeof val === 'string' ? parseFloat(val) || 0 : val;
      };

      const sideNum = getNumValue(newState.side);
      const unitLengthNum = getNumValue(newState.unitLength);
      const quantityNum = getNumValue(newState.quantity);
      const totalLengthNum = getNumValue(newState.totalLength);
      const totalWeightNum = getNumValue(newState.totalWeight);

      let currentWeightPerMeter = weightPerMeter;

      // Recalculate weight per meter if needed
      if (activeField === 'side' || activeField === 'metalType') {
        if (activeField === 'side' && sideNum <= 0) {
          currentWeightPerMeter = 0;
        } else if (activeField === 'side' || activeField === 'metalType') {
          const metal = metalTypes.find((m) => m.name === newState.metalType);
          if (metal && sideNum > 0) {
            const sideInCm = sideNum / 10;
            currentWeightPerMeter = sideInCm * sideInCm * metal.density * 0.1;
          }
        }
      }

      // Apply calculation logic based on active field
      switch (activeField) {
        case 'side':
        case 'metalType':
          if (totalLengthNum > 0 && currentWeightPerMeter > 0) {
            newState.totalWeight = totalLengthNum * currentWeightPerMeter;
          } else if (currentWeightPerMeter <= 0) {
            newState.totalWeight = 0;
          }
          break;

        case 'unitLength':
          if (quantityNum > 0) {
            newState.totalLength = unitLengthNum * quantityNum;
            if (currentWeightPerMeter > 0) {
              newState.totalWeight =
                getNumValue(newState.totalLength) * currentWeightPerMeter;
            }
          }
          break;

        case 'quantity':
          if (unitLengthNum > 0) {
            newState.totalLength = unitLengthNum * quantityNum;
            if (currentWeightPerMeter > 0) {
              newState.totalWeight =
                getNumValue(newState.totalLength) * currentWeightPerMeter;
            }
          } else if (totalLengthNum > 0 && quantityNum > 0) {
            newState.unitLength = totalLengthNum / quantityNum;
          }
          break;

        case 'totalLength':
          if (currentWeightPerMeter > 0) {
            newState.totalWeight = totalLengthNum * currentWeightPerMeter;
          }
          if (unitLengthNum > 0) {
            newState.quantity = totalLengthNum / unitLengthNum;
          }
          break;

        case 'totalWeight':
          if (currentWeightPerMeter > 0) {
            newState.totalLength = totalWeightNum / currentWeightPerMeter;
          }
          if (unitLengthNum > 0) {
            newState.quantity =
              getNumValue(newState.totalLength) / unitLengthNum;
          }
          break;
      }

      isCalculatingRef.current = false;
      return newState;
    },
    [weightPerMeter, metalTypes]
  );

  // Update field with validation and debounced recalculation
  const updateField = useCallback(
    (field: keyof CalculatorState, value: string | number) => {
      const stringValue = typeof value === 'string' ? value : String(value);

      // For empty string, keep it as empty string in state for UI display
      let stateValue: string | number;
      if (field === 'metalType') {
        stateValue = stringValue;
      } else {
        stateValue =
          stringValue === '' ? '' : parseNumberInputWithPrecision(stringValue);
      }

      // Immediate state update for UI responsiveness
      setState((prevState) => ({
        ...prevState,
        [field]: stateValue,
      }));

      // Mark field as touched when user interacts with it
      if (stringValue !== '') {
        setTouchedFields((prev) => new Set([...prev, field]));
      }

      // Clear previous error for this field
      setErrors((prev) => ({ ...prev, [field]: null }));

      // Validate if it's a numeric field
      if (field !== 'metalType') {
        const numValue =
          stringValue === '' ? 0 : parseNumberInputWithPrecision(stringValue);
        const error = validateField(field as any, numValue);
        if (error) {
          setErrors((prev) => ({ ...prev, [field]: error }));
          return;
        }
      }

      // Debounced recalculation (only if value is not empty)
      if (stringValue !== '') {
        debounce(() => {
          setState((prevState) => {
            const numValue = parseNumberInputWithPrecision(stringValue);
            const newState = {
              ...prevState,
              [field]: field === 'metalType' ? stringValue : numValue,
            };
            return recalculate(field, newState);
          });
        }, 300);
      }
    },
    [debounce, recalculate]
  );

  // Reset function
  const reset = useCallback(() => {
    setState({
      metalType: metalTypes[0]?.name || 'Сталь',
      side: '',
      unitLength: '',
      pricePerKg: '',
      totalWeight: '',
      totalLength: '',
      quantity: '',
    });
    setErrors({});
    setTouchedFields(new Set());
  }, [metalTypes]);

  return {
    state,
    errors,
    calculatedValues,
    updateField,
    reset,
    touchedFields,
  };
};
