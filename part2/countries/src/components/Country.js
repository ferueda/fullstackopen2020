import React from 'react';

const Country = ({ country }) => {
  const displayBlock = {
    display: 'block'
  };

  return (
    <div>
      <h3>{country.name}</h3>
      <div>
        <span style={displayBlock}>Capital: {country.capital}</span>
        <span style={displayBlock}>Population: {country.population}</span>
      </div>
      <h3>Languages</h3>
      <ul>
        {country.languages.map(language => (
          <li key={language.iso639_1}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} height='70' width='100' />
    </div>
  );
};

export default Country;
