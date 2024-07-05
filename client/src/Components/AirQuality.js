import React, { useState } from "react";
import AirQualityTable from "./AirQualityTable";
import PollutantGauges from "./PollutantGuages";
import DropDown from "./DropDown";
import PollutantChart from "./lineChart";

const AirQuality = ({ airPollutantData, forecastAirPollutantData }) => {
  const qualitativeNames = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
  const colors = ["#22C55E", "#FACC15", "#F97316", "#EF4444", "#991B1B"];

  let colorIndex = airPollutantData?.[0]?.main?.aqi - 1;
  if (colorIndex < 0) {
    colorIndex = 0;
  } else if (colorIndex >= colors.length) {
    colorIndex = colors.length - 1;
  }
  const color = colors[colorIndex];

  const [view, setView] = useState("Chart");
  const [pollutant, setPollutant] = useState("co");

  const optionListPollutant = ["co", "no2", "o3", "so2", "pm2_5", "pm10"];

  return (
    <div className="w-full">
      <div className="flex flex-col items-start justify-between gap-20 py-10">
        <div className="flex flex-col w-full gap-10">
          <div className="flex flex-row items-center">
            <div>
              <h1 className="text-2xl">Pollutant Concentration</h1>
            </div>
            <div className="flex flex-row items-center gap-10 mt-4">
              <p className="text-lg text-gray-700">Air Quality Index : </p>
              <p className={`text-xl font-bold`} style={{ color }}>
                {qualitativeNames[colorIndex]}
              </p>

              {/* <div> */}
              <DropDown
                optionList={["Chart", "Table"]}
                selectedOption={view}
                setSelectedOption={setView}
                label={"View as : "}
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row w-full justify-between">
            <div className="w-3/5">
              <PollutantGauges airPollutantData={airPollutantData} />
            </div>
            <div className="w-2/5">
              <AirQualityTable airPollutantData={airPollutantData} />
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-row items-center gap-10 mb-4">
            <h1 className="text-2xl">Forecasted Air Pollutants</h1>
            <div>
              <DropDown
                optionList={optionListPollutant}
                selectedOption={pollutant}
                setSelectedOption={setPollutant}
                label={"Pollutant : "}
              />
            </div>
          </div>
          <div>
            <PollutantChart
              data={forecastAirPollutantData}
              pollutant={pollutant}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirQuality;
