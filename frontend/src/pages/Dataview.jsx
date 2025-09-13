import { useEffect, useState } from 'react';
import axios from 'axios';
import FilterPanel from '../Components/FilterPanel';
import Fuse from 'fuse.js';

const DataView = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // for showing results
  const [searchTerm, setSearchTerm] = useState("");
  const [fuse, setFuse] = useState(null);

  const [filters, setFilters] = useState({
    topic: '', sector: '', region: '', end_year: '',
    pestle: '', source: '', swot: '', country: '', city: ''
  });

  const [dropdowns, setDropdowns] = useState({
    topic: [], sector: [], region: [], end_year: [],
    pestle: [], source: [], swot: [], country: [], city: []
  });

  // Fetch dropdown options
  useEffect(() => {
    const fields = Object.keys(filters);
    fields.forEach(field => {
      axios.get(`http://dashboard-1-yhcn.onrender.com/api/options/${field}`)
        .then(res => setDropdowns(prev => ({ ...prev, [field]: res.data })))
        .catch(err => console.error(`Error loading ${field} options`, err));
    });
  }, []);

  // Fetch filtered data from backend
  useEffect(() => {
    axios.get('http://dashboard-1-yhcn.onrender.com/api/data', { params: filters })
      .then(res => {
        setData(res.data);
        setFilteredData(res.data); // Initially show all
        const fuseInstance = new Fuse(res.data, {
          keys: ['topic', 'region', 'country', 'sector', 'pestle'],
          threshold: 0.4
        });
        setFuse(fuseInstance);
      })
      .catch(err => console.error("Error fetching filtered data", err));
  }, [filters]);

  // Handle search on Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && fuse) {
      if (!searchTerm.trim()) {
        setFilteredData(data); // Empty search → show all
        return;
      }
      const results = fuse.search(searchTerm);
      setFilteredData(results.map(r => r.item)); // Show only matching cards
    }
  };

  return (
    <div className="p-6 bg-[#120458] flex min-h-screen">
      <div className="flex-1 px-8 space-y-16">
        {/* Header with search bar */}
        <header className="mb-6 border-b border-slate-300 pb-6 pt-1 flex flex-col md:flex-row md:items-center md:justify-between">
          <h4 className="text-4xl font-bold text-[#f5f5dc] tracking-wide flex items-center gap-3">
            🔍 Filtered Data View
          </h4>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search (press Enter)..."
            className="mt-4 md:mt-0 px-4 py-2 text-white rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </header>

        {/* Filters */}
        <div className="bg-[#fcfcf5] shadow-lg rounded-2xl p-6 border border-slate-200">
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            dropdowns={dropdowns}
          />
        </div>

        {/* Data Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white shadow-lg rounded-2xl p-6 border border-slate-200">
          {filteredData.slice(0, 1000).map((item, index) => (
            <div
              key={index}
              className="bg-[#fcfcf5] text-[#3b2f2f] shadow-md rounded p-4"
            >
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
