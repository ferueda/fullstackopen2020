import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Heading from './components/Heading';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';
import personServices from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    personServices.getAll().then(initialData => {
      setPersons(initialData);
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

  const handleDeletionOf = (personId, personName) => {
    if (window.confirm(`Are you sure you want to delete ${personName}?`)) {
      personServices
        .deletePerson(personId)
        .then(() => personServices.getAll())
        .then(updatedPersons => setPersons(updatedPersons));
    }
  };

  const addPerson = e => {
    e.preventDefault();

    if (
      persons.find(
        person => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      const person = persons.find(
        person => person.name.toLowerCase() === newName.toLowerCase()
      );

      if (
        window.confirm(
          `${newName} is already added to the phonebook. Want to replace the old number with the new one? ${newNumber}`
        )
      ) {
        const personObject = {
          ...person,
          number: newNumber
        };

        personServices
          .updatePerson(person.id, personObject)
          .then(modifiedPerson => {
            setPersons(
              persons.map(person =>
                person.id !== modifiedPerson.id ? person : modifiedPerson
              )
            );
            setNewName('');
            setNewNumber('');
          });
      }
    } else {
      if (newName !== '') {
        const personObject = {
          name: newName,
          id: persons.length + 1,
          number: newNumber
        };

        personServices.createPerson(personObject).then(personResponse => {
          setPersons(persons.concat(personResponse));
          setNewName('');
          setNewNumber('');
        });
      }
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
      <Persons
        personsToShow={personsToShow}
        handleDeletionOf={handleDeletionOf}
      />
    </div>
  );
};

export default App;
