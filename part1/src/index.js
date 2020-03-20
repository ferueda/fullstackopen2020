import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = props => <h1>{props.course}</h1>;

const Part = props => (
  <p>
    {props.part} {props.exercises}
  </p>
);

const Content = props => {
  return (
    <React.Fragment>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
    </React.Fragment>
  );
};

const Total = props => {
  return (
    <p>
      Number of exercises{' '}
      {props.parts[0].exercises +
        props.parts[1].exercises +
        props.parts[2].exercises}
    </p>
  );
};

const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age;

  return (
    <div>
      <p>
        Hello {name}, you're {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  );
};

const Display = ({ counter }) => <div>{counter}</div>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const History = props => {
  if (props.history.length === 0) {
    return <p>The app is used by pressing the buttons...</p>;
  }

  return <p>{props.history}</p>;
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  const [counter, setCounter] = useState(0);
  const name = 'Felipe';
  const age = 29;

  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'));
    setLeft(left + 1);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    setRight(right + 1);
  };

  const plusOne = () => setCounter(counter + 1);
  const minusOne = () => setCounter(counter - 1);
  const reset = () => setCounter(0);

  return (
    <React.Fragment>
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
      <div>
        <Hello name={name} age={age} />
      </div>
      <Display counter={counter} />
      <Button handleClick={plusOne} text='Plus' />
      <Button handleClick={minusOne} text='Minus' />
      <Button handleClick={reset} text='Reset' />
      <div>
        {left}
        <Button handleClick={handleLeftClick} text='Left' />
        <Button handleClick={handleRightClick} text='Right' />
        {right}
        <History history={allClicks.join(' ')} />
      </div>
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
