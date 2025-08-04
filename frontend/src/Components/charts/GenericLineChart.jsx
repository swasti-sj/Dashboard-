import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const GenericLineChart = ({ data, groupBy, valueField, title }) => {
  const grouped = {};

data.forEach((item) => {
  let key = item[groupBy];
  const value = item[valueField];

  // Skip if value is not a number
  if (typeof value !== 'number' || isNaN(value)) return;

  // Handle year fields: convert string to number
  if (["start_year", "end_year"].includes(groupBy)) {
    if (!key || isNaN(parseInt(key))) return;
    key = parseInt(key); // treat years as numbers for sorting
  }

  if (!key && key !== 0) return;

  if (!grouped[key]) {
    grouped[key] = { total: 0, count: 0 };
  }

  grouped[key].total += value;
  grouped[key].count += 1;
});



  const entries = Object.entries(grouped)
    .map(([key, val]) => ({
      label: key,
      avg: parseFloat((val.total / val.count).toFixed(2)),
    }))
    .sort((a, b) => parseInt(a.label) - parseInt(b.label)); // sort by year

  const chartData = {
    labels: entries.map((e) => e.label),
    datasets: [
      {
        label: `Avg ${valueField}`,
        data: entries.map((e) => e.avg),
        fill: false,
        borderColor: '#6366f1',
        backgroundColor: '#6366f1',
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        title: { display: true, text: groupBy },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: valueField },
      },
    },
  };

  return (
    <div className="bg-white p-4 shadow-md rounded mb-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default GenericLineChart;
