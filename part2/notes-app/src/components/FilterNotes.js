import React from 'react';

const FilterNotes = ({ newFilter, handleFilterChange }) => {
  return (
    <input
      type='text'
      placeholder='Filter notes...'
      value={newFilter}
      onChange={handleFilterChange}
    />
  );
};

export default FilterNotes;
