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

const IntensityByRegionChart = ({ data }) => {
  const grouped = {};

  data.forEach((d) => {
    if (d.region && d.intensity > 0) {
      grouped[d.region] = (grouped[d.region] || 0) + d.intensity;
    }
  });

  const sorted = Object.entries(grouped)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10);

  const labels = sorted.map(([region]) => region);
const values = sorted.map(([_, value]) => value);


  const chartData = {
    labels,
    datasets: [
      {
        label: 'Intensity by Region',
        data: values,
        backgroundColor: 'rgba(100, 100, 255, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded shadow p-6">
      <h3 className="text-lg font-bold mb-2 text-[#3b2f2f]">🌍 Intensity by Region</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default IntensityByRegionChart;
