import React from "react";
import ChartCards from "./ChartCard";

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

const PollutantGauges = ({ airPollutantData }) => {
  const components = airPollutantData?.[0]["components"];
  const currentConcentrations = {
    CO: components["co"],
    NO2: components["no2"],
    O3: components["o3"],
    SO2: components["so2"],
    PM2_5: components["pm2_5"],
    PM10: components["pm10"],
  };
  return (
    <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grids-col-3 xl:grid-cols-3 gap-10">
      {Object.keys(ranges).map((pollutant) => (
        <ChartCards
          key={pollutant}
          pollutant={pollutant}
          annotationValue={currentConcentrations[pollutant]}
          label={pollutant}
          ranges={ranges[pollutant]}
          qualitativeNames={qualitativeNames}
          colors={colors}
        />
      ))}
    </div>
  );
};

export default PollutantGauges;
