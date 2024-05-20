export interface StatsMonthly {
  id: string;
  date: string;
  value: number;

  income: number;
  expenses: number;
}

export interface StatsOccupancyChartItem {
  id: string;
  label: string;
  lastYear: number;
  thisYear: number;
}

export interface StatsRevenueChartItem {
  id: string;
  label: string;
  value: number;

  income: number;
  expenses: number;
}
