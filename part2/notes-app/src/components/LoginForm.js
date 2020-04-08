import React from 'react';

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => {
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
