import React, { useState, useEffect } from 'react';
import services from './services/APIservices';
import FindCountry from './components/FindCountry';
import Countries from './components/Countries';

const App = () => {
  const [newFilter, setNewFilter] = useState('chile');
  const [countries, setCountries] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    services.getCountries().then(data => setCountries(data));
  }, []);

  const handleFilterChange = e => {
    setNewFilter(e.target.value);
    if (e.target !== '') {
      setShowAll(false);
    } else if (e.target === '') {
      setShowAll(true);
    }
  };

  const showCountryInfo = countryName => {
    setNewFilter(countryName);
  };

  const totalCountries = countries.length;
  const countriesToShow = showAll
    ? countries
    : countries.filter(country =>
        country.name.toLowerCase().startsWith(newFilter.toLowerCase())
      );

  return (
    <div>
      <h1>Country Finder</h1>
      <FindCountry
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      />
      <Countries
        countries={countriesToShow}
        total={totalCountries}
        showCountryInfo={showCountryInfo}
      />
    </div>
  );
};

export default App;
