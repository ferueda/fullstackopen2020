import React from 'react';

const Notification = ({ notification, message }) => {
  if (notification === null) {
    return null;
  } else if (notification === 'success') {
    return <div className='success'>{message}</div>;
  } else if (notification === 'error') {
    return <div className='error'>{message}</div>;
  }
};

export default Notification;
