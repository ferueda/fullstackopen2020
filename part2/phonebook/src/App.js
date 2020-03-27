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
  const [persons, setPersons] = useState([
    { name: 'Felipe', phone: '234234324', id: 1 },
    { name: 'Mayra', phone: '93564324', id: 2 }
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [showAll, setShowAll] = useState(true);

  const handleNameChange = e => {
    setNewName(e.target.value);
  };

  const handlePhoneChange = e => {
    setNewPhone(e.target.value);
  };

  const handleSearchChange = e => {
    setNewSearch(e.target.value);
    setShowAll(false);
  };

  const addPerson = e => {
    e.preventDefault();

    if (persons.find(person => person.name.includes(newName))) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    if (newName !== '') {
      const personObject = {
        name: newName,
        id: persons.length + 1,
        phone: newPhone
      };
      setPersons(persons.concat(personObject));
      setNewName('');
    }
  };

  const displayBlock = {
    display: 'block'
  };

  const personsToShow = showAll
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(newSearch.toLowerCase())
      );

  return (
    <div>
      <Heading type='h2' text='Phonebook' />
      <label htmlFor='search'>Filter shown with: </label>
      <input
        type='text'
        name='search'
        value={newSearch}
        onChange={handleSearchChange}
      />
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
      <Heading type='h2' text='Numbers' />
      <div>
        {personsToShow.map(person => (
          <p key={person.id}>
            {person.name} - {person.phone}{' '}
          </p>
        ))}
      </div>
    </div>
  );
};

export default App;
