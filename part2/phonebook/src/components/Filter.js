import React from 'react';

const Filter = ({ newSearch, handleSearchChange }) => {
  return (
    <div>
      <label htmlFor='search'>Filter shown with: </label>
      <input
        type='text'
        name='search'
        value={newSearch}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default Filter;
