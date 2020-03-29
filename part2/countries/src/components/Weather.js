import React from 'react';

const Weather = ({ weather, capital }) => {
  if (weather) {
    return (
      <div>
        <h3>Weather in {capital}</h3>
        <img src={weather.weather_icons[0]} alt={`${capital} weather icon`} />
        <div>Temperature: {weather.temperature}°C</div>
        <div>
          Wind: {weather.wind_speed} mph direction {weather.wind_dir}
        </div>
      </div>
    );
  } else {
    return <p>No weather data for {capital}</p>;
  }
};

export default Weather;
