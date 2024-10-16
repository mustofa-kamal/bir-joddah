// AnalyticsComponent.tsx
'use client';

import { useEffect, useState } from 'react';
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import ChartDataLabels, { Context } from 'chartjs-plugin-datalabels';
import randomColor from 'randomcolor';

Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  ChartDataLabels,
  CategoryScale,
  LinearScale,
  BarElement
);

interface AnalyticsData {
  label: string;
  count: number;
}

export default function AnalyticsComponent() {
  const [dataByDistrict, setDataByDistrict] = useState<AnalyticsData[]>([]);
  const [dataByDivision, setDataByDivision] = useState<AnalyticsData[]>([]);
  const [dataByProfession, setDataByProfession] = useState<AnalyticsData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/analytics');
      const json = await res.json();
      setDataByDistrict(json.dataByDistrict);
      setDataByDivision(json.dataByDivision);
      setDataByProfession(json.dataByProfession);
    };
    fetchData();
  }, []);

  const prepareChartData = (data: AnalyticsData[], topN?: number) => {
    let labels: string[];
    let counts: number[];

    if (topN) {
      // Group data if topN is specified
      const sortedData = [...data].sort((a, b) => b.count - a.count);
      const topData = sortedData.slice(0, topN);
      const otherData = sortedData.slice(topN);

      labels = topData.map((item) => item.label);
      counts = topData.map((item) => item.count);

      if (otherData.length > 0) {
        const otherCount = otherData.reduce((acc, curr) => acc + curr.count, 0);
        labels.push('Others');
        counts.push(otherCount);
      }
    } else {
      labels = data.map((item) => item.label);
      counts = data.map((item) => item.count);
    }

    const backgroundColors = labels.map(() => randomColor({ luminosity: 'bright' }));

    return {
      labels: labels,
      datasets: [
        {
          data: counts,
          backgroundColor: backgroundColors,
          hoverBackgroundColor: backgroundColors,
        },
      ],
    };
  };

  const pieOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: {
            size: 12,
          },
        },
      },
      datalabels: {
        formatter: (value: number, context: Context) => {
          const dataArray = context.chart.data.datasets[0].data as number[];
          const total = dataArray.reduce((acc, curr) => acc + curr, 0);
          const percentage = ((value / total) * 100).toFixed(1) + '%';
          return percentage;
        },
        color: '#fff',
        font: {
          weight: 'bold',
          size: 14,
        },
        align: 'center' as const,
        anchor: 'center' as const,
      },
    },
  };

  const barOptions: ChartOptions<'bar'> = {
    responsive: true,
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: { display: false },
      datalabels: {
        anchor: 'end' as const,
        align: 'right' as const,
        formatter: (value: number) => value.toString(),
        color: '#000',
      },
    },
  };

  return (
    <div className="p-4 space-y-12">
      {/* Chart grouped by Division */}
      <div>
        <h2 className="text-3xl font-extrabold text-center mt-6 mb-4">
          Honoring Our Fallen Heroes: Sacrifices by Division
        </h2>
        <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
          <Pie data={prepareChartData(dataByDivision)} options={pieOptions} />
        </div>
      </div>

      {/* Chart grouped by District */}
      <div>
        <h2 className="text-3xl font-extrabold text-center mt-6 mb-4">
          Honoring Our Fallen Heroes: Sacrifices by District
        </h2>
        <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
          <Pie data={prepareChartData(dataByDistrict)} options={pieOptions} />
        </div>
      </div>

      {/* Chart grouped by Profession */}
      <div>
        <h2 className="text-3xl font-extrabold text-center mt-6 mb-4">
          Honoring Our Fallen Heroes: Sacrifices by Profession
        </h2>
        <div style={{ width: '100%', maxWidth: '700px', margin: '0 auto' }}>
          <Bar data={prepareChartData(dataByProfession, 10)} options={barOptions} />
        </div>
      </div>
    </div>
  );
}
