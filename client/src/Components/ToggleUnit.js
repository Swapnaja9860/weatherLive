import React from "react";

const ToggleUnit = ({ units, setUnits, setCurrentWeather }) => {
  return (
    <div className="w-full flex flex-row gap-10">
      <div className={`px-4 py-2 cursor-pointer rounded-md whitespace-nowrap`}>
        <p> Different Weather? </p>
      </div>

      <div className="flex flex-row bg-gray-300 shadow-md rounded-md">
        <span
          className={`px-4 py-2 cursor-pointer rounded-md whitespace-nowrap ${
            units === "metric" ? "bg-white" : "bg-gray-300"
          }`}
          onClick={() => {
            setUnits("metric");
            setCurrentWeather({});
          }}
        >
          Metric C, m/s
        </span>

        <span
          className={`px-4 py-2 cursor-pointer rounded-md whitespace-nowrap ${
            units === "imperial" ? "bg-white" : "bg-gray-300"
          }`}
          onClick={() => {
            setUnits("imperial");
            setCurrentWeather({});
          }}
        >
          Imperial, mph
        </span>
      </div>
    </div>
  );
};

export default ToggleUnit;
