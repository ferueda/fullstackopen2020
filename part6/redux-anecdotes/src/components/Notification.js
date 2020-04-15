import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const message = useSelector((state) => state.notification.message);
  const visibility = useSelector((state) => state.notification.visibility);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  if (!visibility) {
    return null;
  }

  return <div style={style}>{message}</div>;
};

export default Notification;
