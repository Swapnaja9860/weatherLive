import React from "react";
import GaugeChart from "react-gauge-chart";

const ranges = {
  SO2: [20, 80, 250, 350],
  NO2: [40, 70, 150, 200],
  PM10: [20, 50, 100, 200],
  PM2_5: [10, 25, 50, 75],
  O3: [60, 100, 140, 180],
  CO: [4400, 9400, 12400, 15400],
};

const currentConcentrations = {
  CO: 250.34,
  NO2: 3.94,
  O3: 36.84,
  SO2: 5.13,
  PM2_5: 3.41,
  PM10: 4.69,
};

const PollutantGauge = ({ pollutant, ranges, currentConcentration }) => {
  const maxRange = Math.max(...ranges);
  const percentage = currentConcentration / maxRange;

  return (
    <div>
      <h3>{pollutant}</h3>
      <GaugeChart
        id={`gauge-chart-${pollutant}`}
        nrOfLevels={ranges.length + 1}
        colors={["#00FF00", "#FFFF00", "#FFA500", "#FF0000", "#8B0000"]}
        arcWidth={0.3}
        percent={percentage}
        textColor="#000000"
      />
      <p>Current Concentration: {currentConcentration}</p>
    </div>
  );
};

const PollutantGauges = () => {
  return (
    <div>
      {Object.keys(ranges).map((pollutant) => (
        <PollutantGauge
          key={pollutant}
          pollutant={pollutant}
          ranges={ranges[pollutant]}
          currentConcentration={currentConcentrations[pollutant]}
        />
      ))}
    </div>
  );
};

export default PollutantGauges;
