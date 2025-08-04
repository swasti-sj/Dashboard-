import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarGroupChart = ({ title, labels, values, color = 'rgba(75, 192, 192, 0.6)' }) => {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: values,
        backgroundColor: color,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarGroupChart;
