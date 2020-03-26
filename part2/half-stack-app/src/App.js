import React from 'react';
import Course from './components/Course';

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Course
          key={part.id}
          courseName={part.name}
          exercises={part.exercises}
        />
      ))}
    </div>
  );
};

const ExercisesTotal = ({ parts }) => {
  const total = parts.reduce((total, part) => total + part.exercises, 0);
  return (
    <p>
      <strong>Total of {total} exercises</strong>
    </p>
  );
};

const App = ({ course }) => {
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <ExercisesTotal parts={course.parts} />
    </div>
  );
};

export default App;
