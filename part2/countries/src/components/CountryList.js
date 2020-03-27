import React from 'react';
import Country from './Country';

const CountryList = ({ countries, showAll, handleShowClick }) => {
  if (showAll) {
    return <p>Please type a country in the input</p>;
  }

  let toShow;
  const length = countries.length;

  if (length > 10) {
    toShow = <p>Too many matches, specify another filter</p>;
  } else if (length === 1) {
    toShow = <Country country={countries[0]} />;
  } else if (length === 0) {
    toShow = <p>There are no countries with those characters</p>;
  } else {
    toShow = countries.map(country => (
      <div key={country.alpha2Code}>
        <span>{country.name}</span>
        <button data-country={country.name} onClick={handleShowClick}>
          Show
        </button>
      </div>
    ));
  }

  return <div>{toShow}</div>;
};

export default CountryList;
