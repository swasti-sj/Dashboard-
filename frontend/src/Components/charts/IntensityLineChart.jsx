import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const IntensityLineChart = ({ data }) => {
  // Group by end_year and sum intensity
  const grouped = {};

  data.forEach((item) => {
    const year = item.end_year || 'Unknown';
    const intensity = item.intensity || 0;
    if (year !== 'Unknown' && intensity > 0) {
      grouped[year] = (grouped[year] || 0) + intensity;
    }
  });

  const labels = Object.keys(grouped).sort();
  const values = labels.map((year) => grouped[year]);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Total Intensity',
        data: values,
        fill: false,
        borderColor: 'rgba(91, 44, 44, 0.8)', // Brown tone
        backgroundColor: 'rgba(91, 44, 44, 0.4)',
        tension: 0.3,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="bg-white rounded shadow p-6">
      <h3 className="text-lg font-bold mb-4 text-[#3b2f2f]">📈 Intensity Over Years</h3>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default IntensityLineChart;
