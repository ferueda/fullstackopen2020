import React, { useState } from 'react';

const Heading = ({ type, text }) => {
  switch (type) {
    case 'h1':
      return <h1>{text}</h1>;
    case 'h2':
      return <h2>{text}</h2>;
    case 'h3':
      return <h3>{text}</h3>;
  }
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');

  const handleNameChange = e => {
    setNewName(e.target.value);
  };

  const addPerson = e => {
    e.preventDefault();
    if (newName !== '') {
      const personObject = {
        name: newName,
        id: persons.length + 1
      };
      setPersons(persons.concat(personObject));
      setNewName('');
    }
  };

  return (
    <div>
      <Heading type='h2' text='Phonebook' />
      <form onSubmit={addPerson}>
        <input
          value={newName}
          onChange={handleNameChange}
          placeholder='Enter name...'
        />
        <button type='submit'>Add</button>
      </form>
      <Heading type='h2' text='Numbers' />
      <div>
        {persons.map(person => (
          <p key={person.id}>{person.name}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
