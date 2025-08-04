

const StatCards = ({ data }) => {
  const intensities = data
    .map((d) => d.intensity)
    .filter((val) => typeof val === 'number' && val > 0);

  const max = Math.max(...intensities);
  const min = Math.min(...intensities);
  const avg = (
    intensities.reduce((sum, val) => sum + val, 0) / intensities.length
  ).toFixed(2);

  const cards = [
    { label: '🔺 Max Intensity', value: max },
    { label: '🔻 Min Intensity', value: min },
    { label: '📊 Avg Intensity', value: avg },
  ];

  return (
    <div className="grid grid-rows-1 gap-4 mb-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-[#fff7ed] border border-[#ead5c1] rounded-lg p-4 text-center shadow-sm"
        >
          <h4 className="text-sm text-[#5c4033] font-semibold">{card.label}</h4>
          <p className="text-2xl font-bold text-[#3b2f2f] mt-1">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatCards;
