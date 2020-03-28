import React from 'react';
import Heading from './Heading';

const Person = ({ person, handleDeletion }) => {
  return (
    <p>
      {person.name} - {person.number}{' '}
      <button onClick={handleDeletion}>Delete</button>
    </p>
  );
};

const Persons = ({ personsToShow, handleDeletionOf }) => {
  return (
    <div>
      <Heading type='h2' text='Numbers' />
      <div>
        {personsToShow.map(person => (
          <Person
            key={person.id}
            person={person}
            handleDeletion={() => handleDeletionOf(person.id, person.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default Persons;
