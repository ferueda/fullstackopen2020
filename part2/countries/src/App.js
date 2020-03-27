import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FindCountry from './components/FindCountry';
import CountryList from './components/CountryList';

const App = () => {
  const [newSearch, setNewSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data);
    });
  }, []);

  const handleSearchChange = e => {
    setNewSearch(e.target.value);
    if (e.target.value !== '') {
      setShowAll(false);
    } else {
      setShowAll(true);
    }
  };

  const handleShowClick = e => {
    setNewSearch(e.target.dataset.country);
  };

  const countriesToShow = showAll
    ? countries
    : countries.filter(country =>
        country.name.toLowerCase().startsWith(newSearch.toLowerCase())
      );

  return (
    <div>
      <h1>Country Finder</h1>
      <FindCountry
        newSearch={newSearch}
        handleSearchChange={handleSearchChange}
      />
      <h2>Country List</h2>
      <CountryList
        countries={countriesToShow}
        showAll={showAll}
        handleShowClick={handleShowClick}
      />
    </div>
  );
};

export default App;
