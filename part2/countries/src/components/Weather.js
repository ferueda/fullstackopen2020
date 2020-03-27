import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`
      )
      .then(res => {
        setWeather(res.data);
        console.log(res.data);
      });
  }, []);

  const isObj = Object.keys(weather).length > 0;

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>
        <strong>Temperature:</strong> {isObj ? weather.current.temperature : ''}
        °C
      </p>
      {isObj ? <img src={weather.current.weather_icons[0]} /> : ''}
      <p>
        <strong>Wind:</strong>{' '}
        {isObj
          ? `${weather.current.wind_speed} mph direction ${weather.current.wind_dir}`
          : ''}
      </p>
    </div>
  );
};

export default Weather;
