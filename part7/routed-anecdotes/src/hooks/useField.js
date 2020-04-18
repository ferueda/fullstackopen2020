import { useState } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    handleChange,
  };
};
