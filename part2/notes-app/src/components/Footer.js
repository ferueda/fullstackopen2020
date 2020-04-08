import React from 'react';

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: '16px',
    padding: 10,
    textAlign: 'center',
  };

  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki 2020
      </em>
    </div>
  );
};

export default Footer;
