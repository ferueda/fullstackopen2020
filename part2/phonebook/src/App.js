import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Heading from './components/Heading';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Numbers from './components/Numbers';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data);
    });
  }, []);

  const handleNameChange = e => {
    setNewName(e.target.value);
  };

  const handlePhoneChange = e => {
    setNewNumber(e.target.value);
  };

  const handleSearchChange = e => {
    setNewSearch(e.target.value);
    setShowAll(false);
  };

  const addPerson = e => {
    e.preventDefault();

    if (
      persons.find(
        person => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    if (newName !== '') {
      const personObject = {
        name: newName,
        id: persons.length + 1,
        number: newNumber
      };

      axios
        .post('http://localhost:3001/persons', personObject)
        .then(response => {
          setPersons(persons.concat(response.data));
          setNewName('');
        });
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
        newPhone={newNumber}
        handlePhoneChange={handlePhoneChange}
        displayBlock={displayBlock}
      />
      <Numbers personsToShow={personsToShow} />
    </div>
  );
};

export default App;
