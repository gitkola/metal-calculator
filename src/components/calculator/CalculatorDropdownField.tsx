import React from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface CalculatorFieldProps {
  label: string;
  value: number | string;
  options?: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}

export const CalculatorDropdownField: React.FC<CalculatorFieldProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  return (
    <div className="flex gap-4 font-light">
      <div className="flex flex-1 items-center justify-start">
        <Label className="text-sm font-light text-yellow-300">{label}</Label>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <Select value={String(value)} onValueChange={onChange}>
          <SelectTrigger
            iconColor="text-yellow-300/80"
            className={cn(
              'focus-visible:ring-3',
              'focus-visible:ring-yellow-300/70',
              'dark:focus-visible:ring-3',
              'dark:focus-visible:ring-yellow-300/70',
              'shadow-2xs shadow-blue-900/50',
              'dark:shadow-2xs dark:shadow-blue-900/50',
              'bg-blue-200/20',
              'border-none',
              'dark:border-none'
            )}
          >
            <SelectValue className="text-yellow-300" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
