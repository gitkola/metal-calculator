import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { Button } from '../ui/button';

interface CalculatorFieldProps {
  label: string;
  value: number | string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  precision?: number;
}

const isValid = (input: string): boolean =>
  input === '' || !isNaN(parseFloat(input));

const formatDisabledFieldValue = (
  value: string | number,
  precision: number
): string => {
  const displayValue = parseFloat(String(value));
  if (isNaN(displayValue)) return '';
  if (displayValue === 0) return '';
  return String(displayValue.toFixed(precision));
};

const formatEnabledFieldValue = (value: string | number): string => {
  const displayValue = parseFloat(String(value));
  if (isNaN(displayValue)) return '';
  return String(displayValue);
};

const formatValueToDisplay = (
  value: string | number,
  precision: number,
  disabled: boolean
): string => {
  if (disabled) {
    return formatDisabledFieldValue(value, precision);
  }
  return formatEnabledFieldValue(value);
};

export const CalculatorDecimalField: React.FC<CalculatorFieldProps> = ({
  label,
  value,
  onChange,
  disabled = false,
  placeholder,
  precision = 2,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (isValid(inputValue)) {
      onChange(inputValue);
    }
  };
  const displayValue = formatValueToDisplay(value, precision, disabled);
  return (
    <div className="flex gap-4 font-light">
      <div className="flex flex-1 items-center justify-start">
        <Label
          htmlFor={`field-${label}`}
          className="block text-sm font-light text-yellow-300"
        >
          {label}
        </Label>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="relative flex items-center">
          <Input
            id={`field-${label}`}
            type="text"
            value={displayValue}
            onChange={handleInputChange}
            className={cn(
              'px-3',
              'text-yellow-300',
              'border-[0.1rem]',
              'dark:border-[0.1rem]',
              'focus-visible:border-transparent',
              'dark:focus-visible:border-transparent',
              'border-yellow-300/50',
              'dark:border-yellow-300/50',
              'text-ellipsis',
              'focus-visible:ring-3',
              'focus-visible:ring-yellow-300/70',
              'dark:focus-visible:ring-3',
              'dark:focus-visible:ring-yellow-300/70',
              'selection:bg-blue-800',
              'selection:text-yellow-300',
              'disabled:opacity-100',
              'bg-blue-900/20',
              disabled && 'bg-blue-200/20 border-none',
              !disabled && 'inset-shadow-2xs inset-shadow-blue-900/50',
              disabled && 'shadow-2xs shadow-blue-900/50',
              !disabled && 'pr-9'
            )}
            disabled={disabled}
            placeholder={placeholder}
            inputMode="decimal"
          />
          {!disabled && value !== '' && (
            <Button
              variant="ghost"
              onClick={() => onChange('')}
              className={cn(
                'absolute',
                'right-1',
                'top-1/2',
                'transform',
                '-translate-y-1/2',
                'active:opacity-50',
                'rounded',
                'size-7',
                'ring-offset-0',
                'bg-blue-300/20',
                'dark:bg-blue-300/20',
                'active:bg-blue-300/20',
                'hover:bg-blue-300/20',
                'focus-visible:bg-blue-300/20',
                'focus-visible:ring-3',
                'focus-visible:ring-blue-300/70',
                'dark:focus-visible:ring-3',
                'dark:focus-visible:ring-yellow-300/70',
                'dark:hover:bg-blue-300/20',
                'dark:hover:ring-yellow-300/20',
                'border-none',
                'dark:border-none'
              )}
            >
              <X
                absoluteStrokeWidth={true}
                strokeWidth={1}
                className="text-gray-200"
                size={24}
              />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
