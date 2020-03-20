import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Heading = props => <h2>{props.message}</h2>;

const Button = props => (
  <button className={props.className} onClick={props.handleClick}>
    {props.name}
  </button>
);

const Statistic = ({ name, value }) => (
  <tr>
    <td>{name}:</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ data }) => {
  const total = data.good + data.neutral + data.bad;
  const average = (data.good - data.bad) / total;
  const positive = (data.good / total) * 100;

  if (total === 0) {
    return <p>No feedback yet</p>;
  }

  return (
    <table>
      <tbody>
        <Statistic name='Good' value={data.good} />
        <Statistic name='Neutral' value={data.neutral} />
        <Statistic name='Bad' value={data.bad} />
        <Statistic name='Total' value={total} />
        <Statistic name='Average' value={average.toFixed(2)} />
        <Statistic name='Positive' value={`${positive.toFixed(0)}%`} />
      </tbody>
    </table>
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
      <Button className='good' handleClick={goodFeedback} name='Good' />
      <Button handleClick={neutralFeedback} name='Neutral' />
      <Button className='bad' handleClick={badFeedback} name='Bad' />
      <Heading message='Statistics' />
      <Statistics data={data} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
