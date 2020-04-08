import React, { useState, useEffect } from 'react';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';
import blogServices from './services/blogs';
import loginServices from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('test');
  const [password, setPassword] = useState('test');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogServices.getAll().then((data) => setBlogs(data));
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('blogappLoggedUser');

    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginServices.login({ username, password });
      setUser(user);
      window.localStorage.setItem('blogappLoggedUser', JSON.stringify(user));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('blogappLoggedUser');
    setUser(null);
  };

  const loggedOut = () => {
    return (
      <LoginForm
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    );
  };

  const loggedIn = () => {
    return (
      <React.Fragment>
        <Profile username={user.name} handleLogout={handleLogout} />
        <Blogs blogs={blogs} />
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      {user === null && loggedOut()}
      {user !== null && loggedIn()}
    </React.Fragment>
  );
};

export default App;
