import React, { useState, useEffect } from 'react';
import Heading from './components/Heading';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';
import personServices from './services/persons';

const Notification = ({ notification, message }) => {
  const notificationStyle = {
    backgroundColor: 'lightgrey',
    padding: 10,
    fontSize: 20,
    border: '2px solid',
    marginTop: 20
  };

  const successStyle = {
    color: 'green'
  };

  const errorStyle = {
    color: 'red'
  };

  if (notification === 'success') {
    return (
      <div style={{ ...notificationStyle, ...successStyle }}>{message}</div>
    );
  } else if (notification === 'error') {
    return <div style={{ ...notificationStyle, ...errorStyle }}>{message}</div>;
  } else {
    return null;
  }
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [notification, setNotification] = useState(null);
  const [message, setMessage] = useState('');

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

      setNotification('success');
      setMessage(`${personName} was successfully deleted from phonebook`);
      setTimeout(() => setNotification(null), 2000);
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
            setNotification('success');
            setMessage(`${personObject.name} number was successfully updated`);
            setTimeout(() => setNotification(null), 2000);
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
          setNotification('success');
          setMessage(
            `${personObject.name} was successfully added to phonebook`
          );
          setTimeout(() => setNotification(null), 2000);
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
      <Notification notification={notification} message={message} />
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
