export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('ru-RU').format(num);
}

export const calculateDiff = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return Math.round(((current - previous) / previous) * 100);
}