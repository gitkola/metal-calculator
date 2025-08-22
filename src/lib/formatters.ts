export const formatNumber = (
  value: number,
  decimals = 2,
  locale = 'uk-UA'
): string => {
  if (isNaN(value) || !isFinite(value)) return '0';

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

export const formatCurrency = (
  value: number,
  currency = 'UAH',
  locale = 'uk-UA'
): string => {
  if (isNaN(value) || !isFinite(value)) return '0 ₴';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
};

export const parseNumberInput = (value: string): number => {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : Math.max(0, parsed);
};

export const parseNumberInputWithPrecision = (value: string): number => {
  // Parse with full precision - don't round here
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : Math.max(0, parsed);
};
