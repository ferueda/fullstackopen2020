import React, { useState } from 'react';
import Heading from './components/Heading';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Numbers from './components/Numbers';

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
      <Heading type='h1' text='Phonebook' />
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
        displayBlock={displayBlock}
      />
      <Numbers personsToShow={personsToShow} />
    </div>
  );
};

export default App;
