import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const GenericBarChart = ({ data, groupBy, valueField, title, countOnly = false }) => {
  const map = {};

  data.forEach(item => {
    let key = item[groupBy];
    let value = item[valueField];

    // Convert year fields to numbers
    if (["start_year", "end_year"].includes(groupBy)) {
      key = parseInt(key);
      if (isNaN(key)) return;
    }

    // If counting entries only, no need for value
    if (countOnly) {
      if (!key) return;
      if (!map[key]) map[key] = { count: 0 };
      map[key].count += 1;
    } else {
      if (!key || typeof value !== 'number' || isNaN(value)) return;
      if (!map[key]) map[key] = { total: 0, count: 0 };
      map[key].total += value;
      map[key].count += 1;
    }
  });

  const entries = Object.entries(map)
    .map(([key, val]) => ({
      label: key,
      value: countOnly
        ? val.count
        : parseFloat((val.total / val.count).toFixed(2))
    }))
    .sort((a, b) => (typeof a.label === 'number' ? a.label - b.label : a.label.localeCompare(b.label)))
    .slice(0, 50);

  const chartData = {
    labels: entries.map(e => e.label),
    datasets: [
      {
        label: countOnly ? `Count by ${groupBy}` : `Avg ${valueField}`,
        data: entries.map(e => e.value),
        backgroundColor: '#60a5fa',
      }
    ]
  };

  return (
    <div className="bg-white p-4 shadow-md rounded mb-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <Bar data={chartData} options={{ responsive: true }} />
    </div>
  );
};

export default GenericBarChart;
