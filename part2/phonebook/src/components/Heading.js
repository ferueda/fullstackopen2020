import React from 'react';

const Heading = ({ type, text }) => {
  switch (type) {
    case 'h1':
      return <h1>{text}</h1>;
    case 'h2':
      return <h2>{text}</h2>;
    case 'h3':
      return <h3>{text}</h3>;
  }
};

export default Heading;
