import React, { useState } from 'react';

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const Notes = () => (
  <div>
    <h2>Notes</h2>
  </div>
);

const Users = () => (
  <div>
    <h2>Users</h2>
  </div>
);

const App = () => {
  const [page, setPage] = useState('home');

  const toPage = (page) => {
    return (e) => {
      e.preventDefault();
      setPage(page);
    };
  };

  const content = () => {
    if (page === 'home') {
      return <Home />;
    } else if (page === 'notes') {
      return <Notes />;
    } else if (page === 'users') {
      return <Users />;
    }
  };

  return (
    <div>
      <div>
        <a href='' onClick={toPage('home')}>
          Home
        </a>
        <a href='' onClick={toPage('notes')}>
          Notes
        </a>
        <a href='' onClick={toPage('users')}>
          Users
        </a>
      </div>
      {content()}
    </div>
  );
};

export default App;
