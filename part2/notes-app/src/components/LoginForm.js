import React, { useState } from 'react';

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('test');
  const [password, setPassword] = useState('test');

  const login = (e) => {
    e.preventDefault();

    handleLogin({ username, password });

    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={login}>
      <div>
        <input
          type='text'
          placeholder='Enter username'
          name='Username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <input
          type='password'
          placeholder='Enter password'
          name='Password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>Login</button>
    </form>
  );
};

export default LoginForm;
