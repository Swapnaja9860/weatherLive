import React from "react";

const ranges = {
  CO: [0, 4400, 9400, 12400, 15400],
  NO2: [0, 40, 70, 150, 200],
  O3: [0, 60, 100, 140, 180],
  SO2: [0, 20, 80, 250, 350],
  PM2_5: [0, 10, 25, 50, 75],
  PM10: [0, 20, 50, 100, 200],
};

const qualitativeNames = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
const colors = ["#22C55E", "#FACC15", "#F97316", "#EF4444", "#991B1B"];

const getQualityRate = (pollutant, concentration) => {
  const pollutantRanges = ranges[pollutant];
  for (let i = 0; i < pollutantRanges.length; i++) {
    if (concentration < pollutantRanges[i]) {
      return qualitativeNames[i];
    }
  }
  return qualitativeNames[qualitativeNames.length - 1];
};

const getRangeLabel = (pollutantRanges, index) => {
  if (index === 0) {
    return `0-${pollutantRanges[0]}`;
  }
  return `${pollutantRanges[index - 1]}-${pollutantRanges[index]}`;
};

const AirQualityTable = ({ airPollutantData }) => {
  const components = airPollutantData?.[0]?.components || {};
  const currentConcentrations = {
    CO: components["co"] || 0,
    NO2: components["no2"] || 0,
    O3: components["o3"] || 0,
    SO2: components["so2"] || 0,
    PM2_5: components["pm2_5"] || 0,
    PM10: components["pm10"] || 0,
  };

  return (
    <div className="overflow-x-auto w-full h-full">
      <table className="min-w-full h-full divide-y divide-gray-200 shadow-md bg-white rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-5 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Pollutant
            </th>
            <th className="px-4 py-5 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Conc.(μg/m³)
            </th>
            <th className="px-4 py-5 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Quality Rate
            </th>
            {qualitativeNames.map((name) => (
              <th
                key={name}
                className="px-4 py-5 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Object.keys(currentConcentrations).map((pollutant) => (
            <tr key={pollutant}>
              <td className="px-4 py-4 whitespace-nowrap">{pollutant}</td>
              <td className="px-4 py-4 whitespace-nowrap">
                {currentConcentrations[pollutant]}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                {getQualityRate(pollutant, currentConcentrations[pollutant])}
              </td>
              {ranges[pollutant].map((range, index) => (
                <td
                  key={index}
                  className="px-4 py-4 whitespace-nowrap"
                  style={{ backgroundColor: colors[index] }}
                >
                  {getRangeLabel(ranges[pollutant], index)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AirQualityTable;
