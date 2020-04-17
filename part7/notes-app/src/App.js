import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import noteService from './services/notes';
import Notes, { Note } from './components/Notes';

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const Login = (props) => {
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    props.onLogin(e.target.username.value);
    history.push('/');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <input name='username' type='text' placeholder='Enter username' />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

const Users = () => (
  <div>
    <h2>Users</h2>
  </div>
);

const App = () => {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService.getAll().then((data) => setNotes(data));
  }, []);

  const match = useRouteMatch('/notes/:id');
  const note = match
    ? notes.find((note) => note.id === Number(match.params.id))
    : null;

  const login = (user) => {
    setUser(user);
  };

  const padding = { padding: 5 };

  return (
    <div>
      <div>
        <Link style={padding} to='/'>
          Home
        </Link>
        <Link style={padding} to='/notes'>
          Notes
        </Link>
        <Link style={padding} to='/users'>
          Users
        </Link>
        {user ? (
          <em>{user} logged in</em>
        ) : (
          <Link style={padding} to='/login'>
            Login
          </Link>
        )}
      </div>

      <Switch>
        <Route path='/notes/:id'>
          <Note note={note} />
        </Route>
        <Route path='/notes/'>
          <Notes notes={notes} />
        </Route>
        <Route
          path='/users'
          render={() => (user ? <Users /> : <Redirect to='/login' />)}
        />
        <Route path='/login'>
          <Login onLogin={login} />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
      <div>
        <br />
        <em>Note app, developed by Felipe Rueda.</em>
      </div>
    </div>
  );
};

export default App;
