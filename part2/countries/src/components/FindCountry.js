import React from 'react';

const FindCountry = ({ newSearch, handleSearchChange }) => {
  return (
    <div>
      <input
        type='text'
        placeholder='Find country...'
        value={newSearch}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default FindCountry;
