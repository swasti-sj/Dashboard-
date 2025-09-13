import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Components/Sidebar';
import FilterPanel from '../Components/FilterPanel';
import IntensityBySector from '../Components/charts/IntensityBySector';
import IntensityByRegionChart from '../Components/charts/IntensityByRegionChart';
import StatCards from '../Components/charts/StatCards';
import IntensityLineChart from '../Components/charts/IntensityLineChart';
import GenericBarChart from '../Components/charts/GenericBarChart';
import GenericLineChart from '../Components/charts/GenericLineChart';
import GenericMiniTable from '../Components/charts/GenericMiniTable';
import GenericPieChart from '../Components/charts/GenericPieChart';
import GenericStatCards from '../Components/charts/GenericStatCards';

const Dashboard = () => {
  const [filters, setFilters] = useState({
    topic: '', sector: '', region: '', end_year: '',
    pestle: '', source: '', swot: '', country: '', city: ''
  });

  const [dropdowns, setDropdowns] = useState({
    topic: [], sector: [], region: [], end_year: [],
    pestle: [], source: [], swot: [], country: [], city: []
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    const fields = Object.keys(filters);
    fields.forEach(field => {
      axios.get(`http://dashboard-1-yhcn.onrender.com/api/options/${field}`)
        .then(res => setDropdowns(prev => ({ ...prev, [field]: res.data })))
        .catch(err => console.error(`Error loading ${field} options`, err));
    });
  }, []);

  useEffect(() => {
    axios.get('http://dashboard-1-yhcn.onrender.com/api/data', { params: filters })
      .then(res => setData(res.data))
      .catch(err => console.error("Error fetching filtered data", err));
  }, [filters]);

  return (
    <div className=" min-h-screen flex font-sans bg-[#120458]">
<aside className="sticky top-0 h-screen overflow-y-auto">
  <Sidebar />
</aside>

      <main className="flex-1 px-8 py-6 space-y-16">
        <header className="mb-6 border-b border-slate-300 pb-4">
          <h1 className="text-4xl font-bold text-[#f5f5dc] tracking-wide flex items-center gap-3">
            <span className="text-5xl">📊</span> Dashboard Overview
          </h1>
        </header>

        <div className="bg-white shadow-lg rounded-2xl p-6 border border-slate-200">
          <FilterPanel filters={filters} setFilters={setFilters} dropdowns={dropdowns} />
        </div>

        {[
          {
            id: 'intensity',
            title: '📊 Intensity Insights',
            content: (
              <>
                <IntensityBySector data={data} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <IntensityByRegionChart data={data} />
                  <StatCards data={data} />
                </div>
                <IntensityLineChart data={data} />
              </>
            )
          },
          {
            id: 'likelihood',
            title: '⚡ Likelihood Insights',
            content: (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <GenericBarChart data={data} groupBy="sector" valueField="likelihood" title="Avg Likelihood by Sector" />
                  <GenericLineChart data={data} groupBy="end_year" valueField="likelihood" title="Likelihood Trend by End Year" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <GenericMiniTable data={data} groupBy="country" valueField="likelihood" title="Top Countries by Likelihood" />
                  <GenericStatCards data={data} valueField="likelihood" title="Likelihood Summary" />
                </div>
              </>
            )
          },
          {
            id: 'relevance',
            title: '🎯 Relevance Insights',
            content: (
              <>
                <GenericBarChart data={data} groupBy="topic" valueField="relevance" title="Avg Relevance by Topic" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <GenericMiniTable data={data} groupBy="pestle" valueField="relevance" title="Top PESTLE Tags by Relevance" />
                  <GenericMiniTable data={data} groupBy="source" valueField="relevance" title="Most Influential Sources" />
                  <GenericStatCards data={data} valueField="relevance" title="Relevance Summary" />
                </div>
              </>
            )
          },
          {
            id: 'year',
            title: '📆 Year-Based Insights',
            content: (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <GenericLineChart data={data} groupBy="end_year" valueField="intensity" title="Avg Intensity by End Year" />
                  <GenericLineChart data={data} groupBy="end_year" valueField="relevance" title="Avg Relevance by End Year" />
                  <GenericStatCards data={data} valueField="end_year" title="End Year Summary" />
                  <GenericMiniTable data={data} groupBy="sector" valueField="end_year" title="Sectors by Projected End Year" />
                </div>
                <GenericBarChart data={data} groupBy="end_year" valueField={null} title="Number of Insights by End Year" countOnly={true} />
              </>
            )
          },
          {
            id: 'country',
            title: '🌍 Country-Based Insights',
            content: (
              <>
                <GenericBarChart data={data} groupBy="country" valueField="intensity" title="🔥 Avg Intensity by Country" />
                <GenericLineChart data={data} groupBy="country" valueField="likelihood" title="⚡ Likelihood Trends by Country" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <GenericMiniTable data={data} groupBy="country" valueField="relevance" title="🎯 Top Countries by Avg Relevance" />
                  <GenericStatCards data={data} valueField="country" title="Country Coverage Summary" countMode={true} />
                </div>
              </>
            )
          },
          {
            id: 'topic',
            title: '🔖 Topic Insights',
            content: (
              <>
                <GenericBarChart data={data} groupBy="topic" valueField="intensity" title="🔥 Top Topics by Avg Intensity" />
                <GenericLineChart data={data} groupBy="topic" valueField="relevance" title="📈 Topic Relevancy" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <GenericStatCards data={data} valueField="topic" title="Topic Summary" countMode={true} />
                  <GenericMiniTable data={data} groupBy="topic" valueField="relevance" title="🎯 Most Relevant Topics" />
                </div>
              </>
            )
          }
        ].map(section => (
          <section key={section.id} id={section.id} className="space-y-6 bg-white rounded-2xl p-6 shadow-md border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-700">{section.title}</h2>
            {section.content}
          </section>
        ))}
      </main>
    </div>
  );
};

export default Dashboard;
