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
import { X } from 'lucide-react';

interface CalculatorFieldProps {
  label: string;
  value: number | string;
  onChange: (value: string) => void;
  error?: string | null;
  type?: 'number' | 'select';
  options?: Array<{ value: string; label: string }>;
  disabled?: boolean;
  placeholder?: string;
}

const isValid = (input: string): boolean =>
  input === '' || !isNaN(parseFloat(input));

export const CalculatorField: React.FC<CalculatorFieldProps> = ({
  label,
  value,
  onChange,
  error,
  type = 'number',
  options,
  disabled = false,
  placeholder,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (isValid(inputValue)) {
      onChange(inputValue);
    }
  };

  return (
    <div>
      <div className="flex">
        <div className="flex flex-6 items-center justify-start">
          <Label
            htmlFor={`field-${label}`}
            className="block text-sm font-medium text-yellow-300"
          >
            {label}
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
            <div className="relative flex items-center">
              <Input
                id={`field-${label}`}
                type="text"
                value={value}
                onChange={handleInputChange}
                className={cn(
                  'pr-10',
                  'text-yellow-300',
                  error && 'border-red-400 text-red-400'
                )}
                disabled={disabled}
                placeholder={placeholder}
              />
              {!disabled && (
                <button
                  onClick={() => onChange('')}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 active:opacity-50 bg-gray-500/30 rounded-full p-1"
                >
                  <X
                    absoluteStrokeWidth={true}
                    strokeWidth={1}
                    className="text-white"
                    size={20}
                  />
                </button>
              )}
            </div>
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
