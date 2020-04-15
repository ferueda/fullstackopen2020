import React from 'react';
import { filterChange } from '../reducers/filterReducer';
import { useDispatch } from 'react-redux';

const FilterNotes = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <form>
        <input
          type='radio'
          name='filter'
          onChange={() => dispatch(filterChange('ALL'))}
        />
        All
        <input
          type='radio'
          name='filter'
          onChange={() => dispatch(filterChange('IMPORTANT'))}
        />
        Important
        <input
          type='radio'
          name='filter'
          onChange={() => dispatch(filterChange('NON-IMPORTANT'))}
        />
        Non-important
      </form>
    </div>
  );
};

export default FilterNotes;
