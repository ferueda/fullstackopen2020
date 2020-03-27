import React from 'react';
import Heading from './Heading';

const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newPhone,
  handlePhoneChange,
  displayBlock
}) => {
  return (
    <div>
      <Heading type='h2' text='Add new' />
      <form onSubmit={addPerson}>
        <input
          type='text'
          value={newName}
          onChange={handleNameChange}
          placeholder='Enter name...'
        />
        <input
          type='text'
          value={newPhone}
          onChange={handlePhoneChange}
          style={displayBlock}
          placeholder='Enter phone number'
        />
        <button style={displayBlock} type='submit'>
          Add
        </button>
      </form>
    </div>
  );
};

export default PersonForm;
