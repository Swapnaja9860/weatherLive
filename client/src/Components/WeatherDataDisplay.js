import React from "react";

function formatDate(unixTimestamp) {
  const milliseconds = unixTimestamp * 1000;

  // Create a new Date object
  const dateObject = new Date(milliseconds);
  const formattedDate = dateObject.toLocaleString("en-US", {
    // weekday: 'long',
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    // second: 'numeric',
    hour12: true,
  });

  return formattedDate;
}

const WeatherDataDisplay = ({ city, units, currentWeather }) => {
  // const dt = 1720120025;
  const formattedDate = formatDate(currentWeather?.["datetime"]);

  return (
    <div className="text-md md:text-lg">
      <div className="flex flex-col">
        <h4 className="text-orange-400 text-lg">{formattedDate}</h4>
        <h4 className="font-bold text-2xl text-gray-800">{city}</h4>
      </div>
      <div className="flex flex-row items-center">
        <img
          className="w-20 h-20 mr-2"
          src={`http://openweathermap.org/img/w/${currentWeather?.weather?.icon}.png`}
          alt="Weather Icon"
        />
        <h3 className="text-2xl font-bold">
          {currentWeather?.temperature} °{units === "metric" ? "C" : "F"}
        </h3>
      </div>
      <h4 className="text-lg text-gray-600">
        Feels like {currentWeather?.feels_like} °
        {units === "metric" ? "C" : "F"}, {currentWeather?.weather?.description}
      </h4>
      <p className="text-gray-700">Humidity: {currentWeather?.humidity}%</p>
      <p className="text-gray-700">
        Wind Speed: {currentWeather?.wind_speed} mph
      </p>
    </div>
  );
};

export default WeatherDataDisplay;
