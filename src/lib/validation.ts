import { z } from 'zod';

export const calculatorSchema = z.object({
  side: z
    .number()
    .min(0.1, 'Сторона повинна бути більше 0.1 мм')
    .max(1000, 'Занадто велике значення для сторони'),
  unitLength: z
    .number()
    .min(0, "Довжина не може бути від'ємною")
    .max(50, 'Занадто велика довжина одиниці'),
  pricePerKg: z
    .number()
    .min(0, "Ціна не може бути від'ємною")
    .max(1000000, 'Занадто велика ціна'),
  totalWeight: z
    .number()
    .min(0, "Вага не може бути від'ємною")
    .max(100000, 'Занадто велика вага'),
  totalLength: z
    .number()
    .min(0, "Довжина не може бути від'ємною")
    .max(10000, 'Занадто велика загальна довжина'),
  quantity: z
    .number()
    .min(0, "Кількість не може бути від'ємною")
    .max(100000, 'Занадто велика кількість'),
});

export type CalculatorData = z.infer<typeof calculatorSchema>;

export const validateField = (
  field: keyof CalculatorData,
  value: number
): string | null => {
  try {
    const schema = calculatorSchema.pick({ [field]: true } as any);
    schema.parse({ [field]: value });
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors[0]?.message || 'Некоректне значення';
    }
    return 'Некоректне значення';
  }
};
