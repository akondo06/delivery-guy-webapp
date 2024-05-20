import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ComposedChart,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
  Line
} from 'recharts';

import {
  StatsMonthly,
  StatsOccupancyChartItem,
  StatsRevenueChartItem
} from 'types/stats';

import {
  formatMonth,
  formatMonthYear,
  formatShortMonth
} from 'utils/date';

import {
  formatMoney
} from 'utils/money';

import Text from 'components/Text';
import Spinner from 'components/Spinner';

import styles from './Chart.module.scss';

interface ChartContainerProps {
  data?: any[];
  isLoading?: boolean;
  error?: { message?: string; } | null;

  children: ReactNode;
}

function ChartContainer(props: ChartContainerProps) {
  const { t } = useTranslation();

  return (
    <div
      className={[
        styles.base,
        props.isLoading ? styles.loading : null
      ].filter(Boolean).join(' ')}
    >
        {props.isLoading ? (
          <Spinner size="xl" />
        ) : null}
        {props.error && !props.isLoading ? (
          <Text>
            An error has occurred: {props.error.message}
          </Text>
        ) : null}
        {props.data ? props.children : null}
      </div>
  );
}

interface ChartOccupancyProps {
  data?: StatsMonthly[];
  isLoading?: boolean;
  error?: { message?: string; } | null;
}

export function ChartOccupancy(props: ChartOccupancyProps) {
  const { t } = useTranslation();

  const chartData = props.data?.reduce<StatsOccupancyChartItem[]>((acc, raw) => {
    const currentYear = `${(new Date()).getFullYear()}`;

    const [year, month, day] = raw.date.split('-');
    const id = `${currentYear}-${month}-${day}`;

    const existingItem = acc.find((item) => item.id === id);

    if (existingItem && currentYear !== year) {
      existingItem.lastYear = raw.value;
      return acc;
    }

    if (existingItem && currentYear === year) {
      existingItem.thisYear = raw.value;
      return acc;
    }

    const item: StatsOccupancyChartItem = {
      id,
      label: formatShortMonth(raw.date) || 'unknown',
      lastYear: raw.value,
      thisYear: raw.value
    };

    acc.push(item);

    return acc;
  }, []);

  return (
    <ChartContainer
      data={props.data}
      isLoading={props.isLoading}
      error={props.error}
    >
      {props.data ? (
        <ResponsiveContainer>
          <AreaChart
            data={chartData}
          >
            <defs>
              <linearGradient id="colorLastYear" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9E9E9E" stopOpacity={0.1}/>
                <stop offset="75%" stopColor="#9E9E9E" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorThisYear" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9E9E9E" stopOpacity={0.1}/>
                <stop offset="75%" stopColor="#9E9E9E" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid
              className={styles.grid}
              strokeDasharray="3 3"
            />
            <XAxis
              className={styles.xAxis}
              dataKey="id"
              tickFormatter={(value) => formatShortMonth(value) || 'unknown'}
              height={20}
            />
            <YAxis
              className={styles.yAxis}
              domain={[0, 100]}
              tickCount={5}
              interval="preserveStart"
              width={24}
            />
            <Tooltip
              labelFormatter={(value) => formatMonth(value) || 'unknown'}
              formatter={(value, name, props) => [`${value}%`, name === 'thisYear' ? t('dates.this_year') : name === 'lastYear' ? t('dates.last_year') : name]}
            />
            <Area
              type="monotone"
              dataKey="lastYear"
              label={t('dates.last_year')}
              stroke="#9E9E9E"
              fillOpacity={1}
              fill="url(#colorLastYear)"
            />
            <Area
              type="monotone"
              dataKey="thisYear"
              label={t('dates.this_year')}
              stroke="#9E9E9E"
              fillOpacity={1}
              fill="url(#colorThisYear)"
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : null}
    </ChartContainer>
  );
}

interface ChartRevenueProps {
  data?: StatsMonthly[];
  isLoading?: boolean;
  error?: { message?: string; } | null;
}

export function ChartRevenue(props: ChartRevenueProps) {
  const { t } = useTranslation();

  const chartData = props.data?.reduce<StatsRevenueChartItem[]>((acc, raw) => {
    const currentYear = `${(new Date()).getFullYear()}`;

    const [year, month, day] = raw.date.split('-');
    const id = `${currentYear}-${month}-${day}`;

    if (currentYear !== year) {
      return acc;
    }

    const item: StatsRevenueChartItem = {
      id,
      label: formatShortMonth(raw.date) || 'unknown',
      value: (raw.income || 0) - (raw.expenses || 0),
      income: raw.income || 0,
      expenses: raw.expenses || 0
    };

    acc.push(item);

    return acc;
  }, []);

  return (
    <ChartContainer
      data={props.data}
      isLoading={props.isLoading}
      error={props.error}
    >
      {props.data ? (
        <ResponsiveContainer>
          <BarChart
            data={chartData}
          >
            <CartesianGrid
              className={styles.grid}
              strokeDasharray="3 3"
            />
            <XAxis
              className={styles.xAxis}
              dataKey="id"
              tickFormatter={(value) => formatShortMonth(value) || 'unknown'}
              height={20}
            />
            <Tooltip
              labelFormatter={(value) => formatMonthYear(value) || 'unknown'}
              formatter={(value, name, props) => [formatMoney(`${value}`), name === 'income' ? t('titles.income') : name === 'expenses' ? t('titles.expenses') : name === 'value' ? t('titles.revenue') : name]}
            />
            <Bar dataKey="income" fill="#82ca9d" />
            <Bar dataKey="expenses" fill="#ff7b1b" />
          </BarChart>
        </ResponsiveContainer>
      ) : null}
    </ChartContainer>
  );
}
