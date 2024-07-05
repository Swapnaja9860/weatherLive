import React, { useState, useEffect } from "react";
import "./App.css";
import AirQuality from "./Components/AirQuality";
import SearchBar from "./Components/SearchBar";
import ToggleUnit from "./Components/ToggleUnit";
import WeatherDataDisplay from "./Components/WeatherDataDisplay";
import { apiGet } from "./Api";
import { CurrentWeatherURL } from "./const";

function App() {
  const [city, setCity] = useState("");
  const [currentWeather, setCurrentWeather] = useState({});
  const [airPollutantData, setAirPollutantData] = useState({});
  const [forecastAirPollutantData, setForecastAirPollutantData] = useState({});
  const [units, setUnits] = useState("metric");

  useEffect(() => {
    if (city !== "" && units !== "") {
      apiGet(CurrentWeatherURL, setCurrentWeather, { city, units });
    }
  }, [units]);

  return (
    <div className="w-full h-full flex flex-col">
      <header className="w-full flex flex-col lg:flex-row h-130 lg:h-60 bg-green-300 justify-between items-center">
        <div className="lg:px-40 py-10">
          <h1 className="text-4xl text-green-700 mb-4">Weather Live</h1>
          <h2 className="text-2xl text-white">Weather forecasts, nowcasts</h2>
          <h2 className="text-2xl text-white">
            and history in a fast and elegant way
          </h2>
        </div>
        <div className="flex items-center lg:px-40">
          {currentWeather && Object.keys(currentWeather).length > 0 && (
            <WeatherDataDisplay
              city={city}
              units={units}
              currentWeather={currentWeather}
            />
          )}
        </div>
      </header>
      <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between h-40 bg-gray-200 lg:px-40 mt-30 ">
        <div className="w-full">
          <SearchBar
            city={city}
            setCity={setCity}
            units={units}
            setCurrentWeather={setCurrentWeather}
            setAirPollutantData={setAirPollutantData}
            setForecastAirPollutantData={setForecastAirPollutantData}
          />
        </div>
        <div>
          <ToggleUnit
            units={units}
            setUnits={setUnits}
            setCurrentWeather={setCurrentWeather}
          />
        </div>
      </div>
      <div className="lg:px-20">
        {airPollutantData &&
          Object.keys(airPollutantData).length > 0 &&
          forecastAirPollutantData &&
          Object.keys(forecastAirPollutantData).length > 0 && (
            <AirQuality
              airPollutantData={airPollutantData}
              forecastAirPollutantData={forecastAirPollutantData}
            />
          )}
      </div>
    </div>
  );
}

export default App;
