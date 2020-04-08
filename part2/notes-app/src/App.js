import React, { useState, useEffect } from 'react';
import Notes from './components/Notes';
import NoteForm from './components/NoteForm';
import FilterNotes from './components/FilterNotes';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Footer from './components/Footer';
import noteService from './services/notes';
import loginService from './services/login';

const UserInfo = ({ user, handleLogout }) => {
  return (
    <div>
      <span>
        {user.name} {}
      </span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [newFilter, setNewFilter] = useState('');
  const [notification, setNotification] = useState(null);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
    setShowAll(false);
  };

  const displayNotification = (type, message) => {
    setNotification(type);
    setMessage(message);
    setTimeout(() => setNotification(null), 2000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));

      noteService.setToken(user.token);
      setUser(user);

      displayNotification(
        'success',
        `Hello, ${user.username}. Welcome back...`
      );
      setUsername('');
      setPassword('');
    } catch (error) {
      displayNotification('error', 'Wrong credentials');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    setUser(null);
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
        displayNotification(
          'success',
          `Note ${note.id} was updated successfully`
        );
      })
      .catch((error) => {
        displayNotification(
          'error',
          `Note ${note.id} was already removed from server`
        );
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const addNote = (e) => {
    e.preventDefault();

    if (newNote !== '') {
      const noteObject = {
        content: newNote,
      };

      noteService.create(noteObject).then((returnedNote) => {
        setNotes(notes.concat(returnedNote));
        setNewNote('');
        displayNotification('success', 'Note added successfully');
      });
    }
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) =>
        note.content.toLowerCase().includes(newFilter.toLowerCase())
      );

  const loginForm = () => (
    <LoginForm
      handleLogin={handleLogin}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
    />
  );

  const noteForm = () => (
    <NoteForm
      addNote={addNote}
      newNote={newNote}
      handleNoteChange={handleNoteChange}
    />
  );

  const note = () => (
    <Notes notes={notesToShow} toggleImportanceOf={toggleImportanceOf} />
  );

  const filterNotes = () => (
    <FilterNotes
      newFilter={newFilter}
      handleFilterChange={handleFilterChange}
    />
  );

  return (
    <div>
      <h1>Notes</h1>
      <Notification notification={notification} message={message} />

      {user === null && loginForm()}

      {user !== null && <UserInfo user={user} handleLogout={handleLogout} />}
      {user !== null && noteForm()}
      {user !== null && filterNotes()}
      {user !== null && note()}

      <Footer />
    </div>
  );
};

export default App;
