const GenericStatCards = ({
  data,
  valueField = "intensity",
  title = "Stats",
  countMode = false,
}) => {
  if (!data || !data.length) return null;

  let cards = [];

  if (countMode) {
    // Count frequency of unique values
    const freqMap = {};
    data.forEach((item) => {
      const key = item[valueField];
      if (!key) return;
      freqMap[key] = (freqMap[key] || 0) + 1;
    });

    const entries = Object.entries(freqMap);
    if (!entries.length) return null;

    const sorted = entries.sort((a, b) => b[1] - a[1]);
    const totalUnique = entries.length;

    cards = [
      { label: "🔝 Most Frequent", value: `${sorted[0][0]} (${sorted[0][1]})` },
      { label: "🔽 Least Frequent", value: `${sorted.at(-1)[0]} (${sorted.at(-1)[1]})` },
      { label: "🔢 Unique Count", value: totalUnique },
    ];
  } else {
    // Regular numeric mode
    const values = data
      .map((item) => parseFloat(item[valueField]))
      .filter((val) => !isNaN(val) && val > 0);

    if (!values.length) return null;

    const max = Math.max(...values);
    const min = Math.min(...values);
    const avg = (values.reduce((sum, val) => sum + val, 0) / values.length).toFixed(2);

    cards = [
      { label: "🔺 Max", value: max },
      { label: "🔻 Min", value: min },
      { label: "📊 Avg", value: avg },
    ];
  }

  return (
    <div className="bg-white p-4 shadow-md rounded-lg w-100%">
      <h3 className="text-md font-semibold text-[#3b2f2f] mb-3">{title}</h3>
      <div className="grid grid-rows-3 gap-2 text-center">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-[#fff7ed] border border-[#ead5c1] rounded p-3"
          >
            <div className="text-sm font-medium text-[#5c4033]">{card.label}</div>
            <div className="text-xl font-bold text-[#3b2f2f] mt-1 break-words">{card.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenericStatCards;
