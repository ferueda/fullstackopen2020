import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Heading = props => {
  return <h2>{props.message}</h2>;
};

const Button = props => {
  return <button onClick={props.handleClick}>{props.name}</button>;
};

const Statistic = ({ data }) => {
  const total = data.good + data.neutral + data.bad;
  const average = (data.good - data.bad) / total;
  const positive = (data.good / total) * 100;

  if (total === 0) {
    return <p>No feedback yet</p>;
  }

  return (
    <div>
      <p>Good: {data.good}</p>
      <p>Neutral: {data.neutral}</p>
      <p>Bad: {data.bad}</p>
      <p>Total: {total}</p>
      <p>Average: {average.toFixed(2)}</p>
      <p>Positive: {positive.toFixed(0)}%</p>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const data = {
    good,
    neutral,
    bad
  };

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
      <Statistic data={data} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
