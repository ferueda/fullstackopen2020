import React, { useState, useEffect } from 'react';
import Notes from './components/Notes';
import NoteForm from './components/NoteForm';
import FilterNotes from './components/FilterNotes';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
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
  const [showAll, setShowAll] = useState(true);
  const [newFilter, setNewFilter] = useState('');
  const [notification, setNotification] = useState(null);
  const [message, setMessage] = useState('');
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

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
    setShowAll(false);
  };

  const displayNotification = (type, message) => {
    setNotification(type);
    setMessage(message);
    setTimeout(() => setNotification(null), 2000);
  };

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));

      noteService.setToken(user.token);
      setUser(user);

      displayNotification(
        'success',
        `Hello, ${user.username}. Welcome back...`
      );
    } catch (error) {
      displayNotification('error', 'Wrong credentials');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    setUser(null);
  };

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility();
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      displayNotification('success', 'Note added successfully');
    });
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

  const notesToShow = showAll
    ? notes
    : notes.filter((note) =>
        note.content.toLowerCase().includes(newFilter.toLowerCase())
      );

  const loginForm = () => {
    return (
      <Togglable buttonLabel='Login'>
        <LoginForm handleLogin={handleLogin} />
      </Togglable>
    );
  };

  const noteFormRef = React.createRef();

  const noteForm = () => (
    <Togglable buttonLabel='New note' ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
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
