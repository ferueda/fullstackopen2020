import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const show = { display: visible ? 'none' : '' };
  const hide = { display: visible ? '' : 'none' };

  const toggleVisible = () => {
    setVisible(!visible);
  };

  Togglable.propTypes = {
    btnLabel: PropTypes.string.isRequired,
  };

  Togglable.displayName = 'Togglable';

  return (
    <div>
      <div style={show}>
        <button onClick={toggleVisible}>{props.btnLabel}</button>
      </div>
      <div style={hide}>
        {props.children}
        <button onClick={toggleVisible}>Cancel</button>
      </div>
    </div>
  );
};

export default Togglable;
