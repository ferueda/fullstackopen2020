import React from 'react';
import Heading from './Heading';

const Person = ({ person }) => {
  return (
    <p>
      {person.name} - {person.number}
    </p>
  );
};

const Numbers = ({ personsToShow }) => {
  return (
    <div>
      <Heading type='h2' text='Numbers' />
      <div>
        {personsToShow.map(person => (
          <Person key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
};

export default Numbers;
