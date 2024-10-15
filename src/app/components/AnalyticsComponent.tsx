// AnalyticsComponent.tsx
'use client';

import { useEffect, useState } from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

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

  // Function to prepare chart data
  const prepareChartData = (data: AnalyticsData[]) => {
    const labels = data.map((item) => item.label);
    const counts = data.map((item) => item.count);

    // Generate colors dynamically if needed
    const backgroundColors = labels.map((_, index) => {
      const colors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#9CCC65',
        '#FF7043', '#AB47BC', '#26C6DA', '#D4E157',
        '#FFA726', '#8D6E63', '#42A5F5', '#66BB6A',
        // Add more colors if needed
      ];
      return colors[index % colors.length];
    });

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

  const options = {
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
        formatter: (value: number, context: any) => {
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
        align: 'center',
        anchor: 'center',
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
          <Pie data={prepareChartData(dataByDivision)} options={options} />
        </div>
      </div>

      {/* Chart grouped by District */}
      <div>
        <h2 className="text-3xl font-extrabold text-center mt-6 mb-4">
          Honoring Our Fallen Heroes: Sacrifices by District
        </h2>
        <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
          <Pie data={prepareChartData(dataByDistrict)} options={options} />
        </div>
      </div>

      
    </div>
  );
}
