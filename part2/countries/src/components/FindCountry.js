import React from 'react';

const FindCountry = ({ newFilter, handleFilterChange }) => {
  return (
    <input
      type='text'
      placeholder='Enter a country...'
      value={newFilter}
      onChange={handleFilterChange}
    />
  );
};

export default FindCountry;
