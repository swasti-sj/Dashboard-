import { useEffect, useState } from 'react';
import axios from 'axios';
import FilterPanel from '../Components/FilterPanel'; // adjust the path as needed

const DataView = () => {
  const [data, setData] = useState([]);

  const [filters, setFilters] = useState({
    topic: '', sector: '', region: '', end_year: '',
    pestle: '', source: '', swot: '', country: '', city: ''
  });

  const [dropdowns, setDropdowns] = useState({
    topic: [], sector: [], region: [], end_year: [],
    pestle: [], source: [], swot: [], country: [], city: []
  });

  useEffect(() => {
    const fields = Object.keys(filters);
    fields.forEach(field => {
      axios.get(`http://localhost:5000/api/options/${field}`)
        .then(res => setDropdowns(prev => ({ ...prev, [field]: res.data })))
        .catch(err => console.error(`Error loading ${field} options`, err));
    });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/api/data', { params: filters })
      .then(res => setData(res.data))
      .catch(err => console.error("Error fetching filtered data", err));
  }, [filters]);

  return (
    <div className="p-6 bg-[#120458] flex min-h-screen">
      <div className="flex-1 px-8 space-y-16">
           <header className="mb-6 border-b border-slate-300 pb-6 pt-1">
          <h4 className="text-4xl font-bold text-[#f5f5dc] tracking-wide flex items-center gap-3">
            <span className="text-4xl"> 🔍 Filtered Data View</span>
          </h4>
        </header>
        <div className="bg-[#fcfcf5] shadow-lg rounded-2xl p-6 border border-slate-200">

        {/* ✅ Use FilterPanel here */}
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          dropdowns={dropdowns}
        />
</div>
        {/* Data Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white shadow-lg rounded-2xl p-6 border border-slate-200">
          {data.slice(0, 1000).map((item, index) => (
            <div key={index} className="bg-[#fcfcf5] text-[#3b2f2f] shadow-md rounded p-4">
              <h2 className="font-semibold text-lg">{item.topic || "No Topic"}</h2>
              <p className="text-sm text-gray-600">{item.region}, {item.country}</p>
              <p className="mt-2">Intensity: <span className="font-bold">{item.intensity}</span></p>
              <p>Likelihood: <span className="font-bold">{item.likelihood}</span></p>
              <p>Relevance: <span className="font-bold">{item.relevance}</span></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataView;
