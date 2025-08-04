const GenericMiniTable = ({
  data,
  groupBy = "country",
  valueField = "intensity",
  title = "Top Items",
  limit = 10,
}) => {
  const grouped = {};

  data.forEach((item) => {
  const key = item[groupBy];
  let value = item[valueField];

  // Convert string years like "2025" → 2025
  if (["start_year", "end_year"].includes(valueField)) {
    value = parseInt(value);
  }

  // Guard conditions
  if (!key || typeof value !== "number" || isNaN(value) || value <= 0) return;

  if (!grouped[key]) grouped[key] = { total: 0, count: 0 };
  grouped[key].total += value;
  grouped[key].count += 1;
});

  const entries = Object.entries(grouped)
    .map(([key, stats]) => ({
      label: key,
      avg: parseFloat((stats.total / stats.count).toFixed(2)),
    }))
    .sort((a, b) => b.avg - a.avg)
    .slice(0, limit);

  return (
    <div className="bg-white p-4 shadow-md rounded-lg  w-full">
      <h3 className="text-md font-semibold text-[#3b2f2f] mb-3">{title}</h3>
      <div className="max-h-80 overflow-y-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b pb-2">
              <th className="pb-1 capitalize">{groupBy}</th>
              <th className="pb-1 text-right capitalize">Avg {valueField}</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((item, idx) => (
              <tr key={idx} className="border-b last:border-0 hover:bg-gray-50">
                <td className="py-2">{item.label}</td>
                <td className="py-2 text-right font-semibold text-[#1e3a8a]">{item.avg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GenericMiniTable;
