import { useMemo } from 'react';
import Highcharts from 'highcharts';
import { Chart } from '@highcharts/react';
import type { ChartPoint } from '../types/stats';


interface StatsChartProps {
  data: ChartPoint[];
}

const StatsChart = ({ data }: StatsChartProps) => {
  const options: Highcharts.Options = useMemo(() => ({
    chart: {
      type: 'spline',
      height: 280,
      backgroundColor: 'transparent',
      spacingTop: 30,
      spacingBottom: 10,
      style: { fontFamily: 'inherit' }
    },
    title: { text: undefined },
    credits: { enabled: false },
    legend: { enabled: false },

    xAxis: {
      categories: data.map(d => d.time),
      lineColor: '#E5E7EB',
      lineWidth: 1,
      tickColor: 'transparent',
      labels: { style: { color: '#9CA3AF', fontSize: '12px' } },
    },

    yAxis: {
      title: { text: undefined },
      gridLineColor: '#F3F4F6',
      gridLineDashStyle: 'Dash',
      labels: { enabled: false },
    },

    tooltip: {
      shared: true,
      backgroundColor: '#FFFFFF',
      borderColor: '#E5E7EB',
      borderRadius: 8,
      padding: 12,
      shadow: {
        color: 'rgba(0,0,0,0.05)',
        offsetX: 0,
        offsetY: 4,
        width: 12,
      },
      headerFormat:
        '<span style="font-size: 12px; color: #6B7280">{point.key}</span><br/>',
      style: { color: '#374151' },
      valueSuffix: ' ₽',
    },

    plotOptions: {
      spline: {
        lineWidth: 3,
        states: { hover: { lineWidth: 4 } },
        marker: {
          enabled: true,
          radius: 4,
          symbol: 'circle',
          fillColor: '#FFFFFF',
          lineColor: '#10B981',
          lineWidth: 2,
        },
      },
    },

    series: [
      {
        type: 'spline',
        name: 'Значение',
        data: data.map(d => d.value),
        color: '#10B981',
      },
    ],
  }), [data]);

  return (
    <Chart highcharts={Highcharts} options={options} />
  );
};

export default StatsChart;
