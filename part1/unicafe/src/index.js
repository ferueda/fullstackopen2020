import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Heading = props => {
  return <h2>{props.message}</h2>;
};

const Button = props => {
  return <button onClick={props.handleClick}>{props.name}</button>;
};

const Statistic = props => {
  return (
    <p>
      {props.name}: {props.data}
    </p>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodFeedback = () => {
    setGood(good + 1);
  };

  const neutralFeedback = () => {
    setNeutral(neutral + 1);
  };

  const badFeedback = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Heading message='Please leave your feedback' />
      <Button handleClick={goodFeedback} name='Good' />
      <Button handleClick={neutralFeedback} name='Neutral' />
      <Button handleClick={badFeedback} name='Bad' />
      <Heading message='Statistics' />
      <Statistic name='Good' data={good} />
      <Statistic name='Neutral' data={neutral} />
      <Statistic name='Bad' data={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
