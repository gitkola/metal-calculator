export interface MetalType {
  name: string;
  density: number; // г/см³
}

export const metalTypes: MetalType[] = [
  { name: 'Сталь', density: 7.87 },
  { name: 'Нержавійка', density: 7.95 },
  { name: 'Алюміній', density: 2.7 },
  { name: 'Мідь', density: 8.96 },
  { name: 'Латунь', density: 8.5 },
  { name: 'Титан', density: 4.5 },
];

export interface CalculatorState {
  metalType: string;
  side: number | string;
  unitLength: number | string;
  pricePerKg: number | string;
  totalWeight: number | string;
  totalLength: number | string;
  quantity: number | string;
}

export interface CalculatedValues {
  weightPerMeter: number;
  crossSectionArea: number;
  volume: number;
  totalCost: number;
}

export interface FieldErrors {
  [key: string]: string | null;
}
