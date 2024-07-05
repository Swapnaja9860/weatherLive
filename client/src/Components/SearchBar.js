import React, { useState } from "react";
import { apiGet } from "../Api";
import {
  AirPollutantURL,
  CurrentWeatherURL,
  ForecastAirPollutantURL,
} from "../const";

const SearchBar = ({
  city,
  setCity,
  setCurrentWeather,
  units,
  setAirPollutantData,
  setForecastAirPollutantData,
}) => {
  // const [city, setCity] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setCity(value);
    if (value.length > 0) {
      setResults(["Pune, IN", "Mumbai, IN", "New York, US"]); // Example results
      setShowDropdown(true);
    } else {
      setResults([]);
      setShowDropdown(false);
    }
    setCurrentWeather({});
    setAirPollutantData({});
    setForecastAirPollutantData({});
  };

  const handleItemClick = (item) => {
    setCity(item);
    setShowDropdown(false);
  };

  const handleSearch = async () => {
    await apiGet(CurrentWeatherURL, setCurrentWeather, { city, units });
    apiGet(AirPollutantURL, setAirPollutantData, { city });
    apiGet(ForecastAirPollutantURL, setForecastAirPollutantData, { city });
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search City"
        value={city}
        onChange={handleInputChange}
        className="py-3 px-4 border border-gray-300 text-md rounded-lg focus:outline-none focus:border-blue-500 w-1/2 md:w-1/3"
      />
      {showDropdown && (
        <ul className="absolute mt-1 w-1/2 md:w-1/3 bg-white shadow-lg rounded-lg overflow-hidden">
          {results.map((item, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleItemClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      <button
        className=" absolute bg-gray-400 py-3 px-5 rounded-lg text-white font-bold"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
