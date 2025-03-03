import React from "react";
import ArcGauge from "./Guage";

const ChartCards = ({
  pollutant,
  annotationValue,
  label,
  ranges,
  qualitativeNames,
  colors,
}) => {
  return (
    <div className="bg-white shadow-md shadow-gray-400 rounded-sm flex flex-col w-[330px] h-[310px] p-5">
      <div className="flex flex-row w-full h-[290px] gap-3 items-center justify-center">
        <div className="flex flex-col w-3/5 h-full items-center">
          <div>
            <label className="text-lg">{label} (µg/m³)</label>
          </div>
          <div className="h-3/5">
            <ArcGauge
              idComp={`gauge-chart-${pollutant}`}
              annotationValue={annotationValue}
              ranges={ranges}
              colors={colors}
            />
          </div>
        </div>
        <div className="bg-gray-400 h-5/6 w-0.5"></div>
        <div className="flex flex-col gap-1.5 justify-center text-center text-[16px] text-gray-600 w-full sm:w-2/5 h-full">
          {ranges.slice(1).map((range, index) => (
            <div key={index}>
              <p
                className={`text-sm font-bold`}
                style={{ color: colors[index] }}
              >
                {index === 0 ? `0 - ${range}` : `${ranges[index]} - ${range}`}
              </p>
              <p>{qualitativeNames[index]}</p>
            </div>
          ))}
          <div>
            <p
              className={`text-sm font-semibold`}
              style={{ color: colors[ranges.length - 1] }}
            >
              {ranges[ranges.length - 1]}+
            </p>
            <p>{qualitativeNames[ranges.length - 1]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartCards;
