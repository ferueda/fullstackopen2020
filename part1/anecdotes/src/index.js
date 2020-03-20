import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

const Heading = ({ message }) => {
  return <h2>{message}</h2>;
};

const Button = ({ handleClick, text, className }) => {
  return (
    <button className={className} onClick={handleClick}>
      {text}
    </button>
  );
};

const Anecdote = ({ selected }) => {
  return <p>{selected}</p>;
};

const Points = ({ value }) => {
  return <p>Votes: {value || 0}</p>;
};

const Voted = ({ value }) => {
  if (value === undefined) {
    return <p>No votes yet</p>;
  }
  return <p>{anecdotes[value]}</p>;
};

const App = props => {
  const [selected, setSelected] = useState(
    Math.floor(Math.random() * props.anecdotes.length)
  );
  const [points, setPoints] = useState({});

  const [mostVoted, setMostVoted] = useState(undefined);

  const getAnecdote = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length));
  };

  const vote = () => {
    const copy = { ...points };
    copy[selected] ? copy[selected]++ : (copy[selected] = 1);
    setPoints(copy);
    setMostVoted(Object.keys(copy).sort((a, b) => copy[b] - copy[a])[0]);
  };

  return (
    <div>
      <h1>Anecdotes</h1>
      <Anecdote selected={anecdotes[selected]} />
      <Points value={points[selected]} />
      <Button
        handleClick={getAnecdote}
        text='Get Anecdote'
        className='getAnecdote'
      />
      <Button handleClick={vote} text='Vote' className='vote' />
      <Heading message='Most voted anecdote' />
      <Voted value={mostVoted} />
    </div>
  );
};

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
