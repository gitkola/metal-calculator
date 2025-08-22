import React from 'react';
import { Input } from '@/components/ui/input';
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
  onChange: (value: string) => void;
  error?: string | null;
  unit?: string;
  type?: 'number' | 'select';
  options?: Array<{ value: string; label: string }>;
  step?: string;
  min?: string;
  disabled?: boolean;
  placeholder?: string;
}

export const CalculatorField: React.FC<CalculatorFieldProps> = ({
  label,
  value,
  onChange,
  error,
  unit,
  type = 'number',
  options,
  step = '0.01', // Keep for backward compatibility but unused in text mode
  min = '0', // Keep for backward compatibility but unused in text mode
  disabled = false,
  placeholder,
}) => {
  const getRoundedDisplayValue = () => {
    if (type === 'number') {
      // If value is empty string, keep it empty
      if (value === '' || value === null || value === undefined) return '';

      // For editable fields, if value is exactly 0 but we want it empty, make it empty
      if (!disabled && (value === 0 || value === '0')) return '';

      const numValue = typeof value === 'string' ? parseFloat(value) : value;
      if (isNaN(numValue)) return '';

      // If disabled (readonly/calculated), always show 2 decimal places
      if (disabled) {
        return numValue.toFixed(2);
      }

      // For editable fields, show the value as-is (user input) but validate it's properly formatted
      return String(value);
    }
    return value;
  };

  const displayValue = getRoundedDisplayValue();
  const labelWithUnit = unit ? `${label}, ${unit}` : label;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Allow empty string
    if (inputValue === '') {
      onChange('');
      return;
    }

    // Validate decimal format and limit to 2 decimal places
    if (isValidDecimalInput(inputValue)) {
      // Check if it has more than 2 decimal places
      const decimalIndex = inputValue.indexOf('.');
      if (decimalIndex !== -1 && inputValue.length - decimalIndex - 1 > 2) {
        // Truncate to 2 decimal places
        const truncated = inputValue.substring(0, decimalIndex + 3);
        onChange(truncated);
      } else {
        onChange(inputValue);
      }
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Select all text when focusing on a field with initial "0"
    if (e.target.value === '0') {
      e.target.select();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow control keys
    if (
      e.key === 'Backspace' ||
      e.key === 'Delete' ||
      e.key === 'Tab' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight' ||
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown' ||
      e.key === 'Home' ||
      e.key === 'End' ||
      e.ctrlKey ||
      e.metaKey
    ) {
      return;
    }

    const currentValue = String(displayValue);

    // Allow digits
    if (/\d/.test(e.key)) {
      return;
    }

    // Allow decimal point only if none exists
    if (e.key === '.' && !currentValue.includes('.')) {
      return;
    }

    // Block all other keys
    e.preventDefault();
  };

  const isValidDecimalInput = (input: string): boolean => {
    // Allow empty string
    if (input === '') return true;

    // Must be a valid decimal number
    const decimalRegex = /^(\d+\.?\d*|\.\d+)$/;

    if (!decimalRegex.test(input)) {
      return false;
    }

    // Don't allow multiple leading zeros (like "00", "01")
    if (input.length > 1 && input[0] === '0' && input[1] !== '.') {
      return false;
    }

    // Don't allow just a decimal point
    if (input === '.') {
      return false;
    }

    return true;
  };

  return (
    <div>
      <div className="flex">
        <div className="flex flex-6 items-center justify-start">
          <Label
            htmlFor={`field-${label}`}
            className="block text-sm font-medium text-yellow-300"
          >
            {labelWithUnit}
          </Label>
        </div>
        <div className="flex flex-4 items-center justify-center">
          {type === 'select' && options ? (
            <Select
              value={String(value)}
              onValueChange={onChange}
              disabled={disabled}
            >
              <SelectTrigger
                className={cn(
                  'text-yellow-300',
                  error && 'border-red-400 text-red-400'
                )}
              >
                <SelectValue
                  placeholder={placeholder || 'Оберіть значення'}
                  className="text-yellow-300"
                />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              id={`field-${label}`}
              type="text"
              value={displayValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              className={cn(
                'text-yellow-300',
                error && 'border-red-400 text-red-400'
              )}
              disabled={disabled}
              placeholder={placeholder}
            />
          )}
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-400 mt-1 bg-transparent py-1 rounded">
          {error}
        </p>
      )}
    </div>
  );
};
