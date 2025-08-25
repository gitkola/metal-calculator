import React from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Checkbox } from '../ui/checkbox';

interface CalculatorCheckboxFieldProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export const CalculatorCheckboxField: React.FC<
  CalculatorCheckboxFieldProps
> = ({ label, value, onChange }) => {
  return (
    <div className="flex flex-1 items-center gap-2">
      <Checkbox
        checked={value}
        onCheckedChange={onChange}
        className={cn(
          'dark:data-[state=checked]:border-yellow-300',
          'dark:data-[state=unchecked]:border-yellow-300',
          'dark:data-[state=checked]:bg-yellow-300',
          'dark:data-[state=checked]:text-blue-600',
          'dark:data-[state=unchecked]:bg-transparent',
          'dark:data-[state=unchecked]:border-2',
          'dark:data-[state=checked]:border-none',
          'dark:data-[state=checked]:focus-visible:ring-yellow-300/70',
          'dark:data-[state=unchecked]:focus-visible:ring-yellow-300/70',

          'data-[state=checked]:border-yellow-300',
          'data-[state=unchecked]:border-yellow-300',
          'data-[state=checked]:bg-yellow-300',
          'data-[state=checked]:text-blue-600',
          'data-[state=unchecked]:bg-transparent',
          'data-[state=unchecked]:border-2',
          'data-[state=checked]:border-none',
          'data-[state=checked]:focus-visible:ring-yellow-300/50',
          'data-[state=unchecked]:focus-visible:ring-yellow-300/50',

          'shadow-xs shadow-blue-900/50',
          'dark:shadow-xs dark:shadow-blue-900/50',
          'data-[state=unchecked]:inset-shadow-xs data-[state=unchecked]:inset-shadow-blue-900/50',
          'dark:data-[state=unchecked]:inset-shadow-xs dark:data-[state=unchecked]:inset-shadow-blue-900/50'
        )}
        id="byLength"
      />
      <Label className="font-light" htmlFor="byLength">
        {label}
      </Label>
    </div>
  );
};
