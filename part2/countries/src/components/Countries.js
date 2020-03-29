import React, { useState, useEffect } from 'react';
import services from './../services/APIservices';
import Weather from './Weather';

const Country = ({ country, showCountryInfo }) => {
  return (
    <div>
      {country.name} <button onClick={showCountryInfo}>Show</button>
    </div>
  );
};

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    services.getWeather(country.capital).then(data => setWeather(data.current));
  }, []);

  const formatNumber = num => {
    return String(num).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,');
  };

  return (
    <div>
      <h2>{country.name}</h2>
      <div>Capital: {country.capital}</div>
      <div>Population: {formatNumber(country.population)}</div>
      <h3>Languages</h3>
      <ul>
        {country.languages.map(language => (
          <li key={language.iso639_1}>{language.name}</li>
        ))}
      </ul>
      <img
        src={country.flag}
        alt={`${country.name} flag`}
        height='80'
        width='120'
      />
      <Weather capital={country.capital} weather={weather} />
    </div>
  );
};

const Countries = ({ countries, total, showCountryInfo }) => {
  const len = countries.length;

  if (len === total) {
    return <p>Please enter a country</p>;
  }

  if (len === 0) {
    return <p>There is no such country</p>;
  }

  if (len > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (len === 1) {
    return <CountryInfo country={countries[0]} />;
  }

  return (
    <div>
      <h2>Country List</h2>
      {countries.map(country => {
        return (
          <Country
            key={country.alpha2Code}
            country={country}
            showCountryInfo={() => showCountryInfo(country.name)}
          />
        );
      })}
    </div>
  );
};

export default Countries;
