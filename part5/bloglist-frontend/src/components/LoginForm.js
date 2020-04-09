import React, { useState } from 'react';

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('test');
  const [password, setPassword] = useState('test');

  const handleLogin = (e) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <form onSubmit={handleLogin}>
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
          name='Password'
          placeholder='Enter password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>Log in</button>
    </form>
  );
};

export default LoginForm;
