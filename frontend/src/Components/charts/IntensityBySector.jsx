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

const IntensityBySector = ({ data }) => {
  // Group by sector and calculate average intensity
  const sectorMap = {};

  data.forEach(item => {
    if (!item.sector || item.intensity === 0) return;
    if (!sectorMap[item.sector]) {
      sectorMap[item.sector] = { total: 0, count: 0 };
    }
    sectorMap[item.sector].total += item.intensity;
    sectorMap[item.sector].count += 1;
  });

  // Create array of sector + avg
  const sectorAverages = Object.entries(sectorMap).map(([sector, stats]) => ({
    sector,
    avg: parseFloat((stats.total / stats.count).toFixed(2))
  }));

  // Sort by avg intensity descending and take top 100
  const topSectors = sectorAverages
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 100);

  const chartData = {
    labels: topSectors.map(s => s.sector),
    datasets: [
      {
        label: 'Avg Intensity',
        data: topSectors.map(s => s.avg),
        backgroundColor: '#60a5fa'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded mb-6">
      <h2 className="text-lg font-semibold mb-4">📊 Average Intensity by Sector</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default IntensityBySector;
