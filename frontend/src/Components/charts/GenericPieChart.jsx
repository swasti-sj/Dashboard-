import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const generateColors = (count) => {
  const base = [
    '#60a5fa', '#34d399', '#facc15', '#f87171',
    '#a78bfa', '#fbbf24', '#f472b6', '#2dd4bf',
    '#fb7185', '#818cf8', '#38bdf8', '#fcd34d'
  ];
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(base[i % base.length]);
  }
  return colors;
};

const GenericPieChart = ({ data, groupBy, valueField = null, title, limit = 15 }) => {
  const grouped = {};

  data.forEach((item) => {
    const key = item[groupBy];
    if (!key) return;

    if (!grouped[key]) grouped[key] = 0;

    if (valueField && typeof item[valueField] === 'number') {
      grouped[key] += item[valueField];
    } else if (!valueField) {
      grouped[key] += 1;
    }
  });

  const entries = Object.entries(grouped)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);

  const chartData = {
    labels: entries.map((e) => e.label),
    datasets: [
      {
        data: entries.map((e) => e.value),
        backgroundColor: generateColors(entries.length),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.formattedValue}`,
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 shadow-md rounded mb-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default GenericPieChart;
