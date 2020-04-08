import React, { useState, useEffect } from 'react';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import blogServices from './services/blogs';
import loginServices from './services/login';

const Profile = ({ username }) => {
  return (
    <div>
      <p>{username} logged in</p>
    </div>
  );
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('test');
  const [password, setPassword] = useState('test');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogServices.getAll().then((data) => setBlogs(data));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = await loginServices.login({ username, password });
    setUser(user);
  };

  const loginForm = () => {
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

  const profile = () => {
    return <Profile username={user.username} />;
  };

  return (
    <React.Fragment>
      {user === null && loginForm()}
      {user !== null && profile()}
      {user !== null && <Blogs blogs={blogs} />}
    </React.Fragment>
  );
};

export default App;
