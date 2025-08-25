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
        {type === 'select' && options ? (
          <Select
            value={String(value)}
            onValueChange={onChange}
            disabled={disabled}
          >
            <SelectTrigger
              iconColor="text-yellow-300"
              className={cn(
                'border-yellow-300',
                'focus-visible:ring-2',
                'focus-visible:ring-yellow-300/50',
                'dark:border-yellow-300',
                'dark:focus-visible:ring-2',
                'dark:focus-visible:ring-yellow-300/50'
              )}
            >
              <SelectValue className="text-yellow-300" />
            </SelectTrigger>
            <SelectContent position="popper">
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
                !disabled && 'pr-9',
                'text-yellow-300',
                'border-yellow-300',
                'text-ellipsis',
                'focus-visible:ring-yellow-300/50',
                'selection:bg-blue-900',
                'selection:text-yellow-300',
                'disabled:opacity-100',
                disabled && 'bg-gray-300/10 border-none'
              )}
              disabled={disabled}
              placeholder={placeholder}
              inputMode="decimal"
            />
            {!disabled && value !== '' && (
              <button
                onClick={() => onChange('')}
                className={cn(
                  'absolute',
                  'right-1',
                  'top-1/2',
                  'transform',
                  '-translate-y-1/2',
                  'active:opacity-50',
                  'bg-gray-300/20',
                  'rounded-full',
                  'p-1'
                )}
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
  );
};
