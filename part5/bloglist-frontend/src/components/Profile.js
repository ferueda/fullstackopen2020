import React from 'react';

const Profile = ({ username, handleLogout }) => {
  const looggedInStyle = {
    color: 'green',
    fontWeight: 'bold',
  };
  return (
    <div>
      <span>
        {username} <span style={looggedInStyle}>logged in </span>
      </span>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default Profile;
