import React, { useState } from "react";

const Dropdown = ({ label, value, onChange, options }) => (
  <div className="mb-2">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 border rounded shadow-sm"
    >
      <option value="">All</option>
      {options.map((opt, i) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const FilterPanel = ({ filters, setFilters, dropdowns }) => {
  const [isOpen, setIsOpen] = useState(true); // expanded by default

  const clearFilters = () => {
    const reset = {};
    Object.keys(filters).forEach((key) => (reset[key] = ""));
    setFilters(reset);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      {/* Toggle Button */}
      <div className="flex justify-between items-center mb-2">
        <button
          className="text-xl font-semibold text-[#3b2f2f]"
          onClick={() => setIsOpen(!isOpen)}
        >
          Filters {isOpen ? "▲" : "▼"}
        </button>
        <button
          onClick={clearFilters}
          className="text-sm text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-600 hover:text-white transition"
        >
          Clear Filters
        </button>
      </div>

      {/* Collapsible Filter Fields */}
      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-300">
          {Object.keys(filters).map((field) => (
            <Dropdown
              key={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              value={filters[field]}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, [field]: value }))
              }
              options={dropdowns[field]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
