import React from 'react';

const Notification = ({ notification, message }) => {
  const error = {
    color: 'red',
    fontWeight: 'bold',
  };

  const success = {
    color: 'green',
    fontWeight: 'bold',
  };

  if (notification) {
    return (
      <div>
        <p style={notification === 'error' ? error : success}>{message}</p>
      </div>
    );
  } else {
    return null;
  }
};

export default Notification;
