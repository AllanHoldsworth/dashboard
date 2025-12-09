export interface ChartPoint {
  time: string;
  value: number;
}

export interface StatRow {
  id: string;
  label: string;
  current: number;
  yesterday: number;
  weekday: number;
  chartData: ChartPoint[];
}