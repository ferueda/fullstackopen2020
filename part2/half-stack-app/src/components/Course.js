import React from 'react';
import Parts from './Parts';

const Header = ({ type, text }) => {
  switch (type) {
    case 'h1':
      return <h1>{text}</h1>;
      break;
    case 'h2':
      return <h2>{text}</h2>;
      break;
    case 'h3':
      return <h3>{text}</h3>;
      break;
  }
};

const ExercisesTotal = ({ parts }) => {
  const total = parts.reduce((total, part) => total + part.exercises, 0);
  return (
    <p>
      <strong>Total of {total} exercises</strong>
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header type='h2' text={course.name} />
      <Parts courseParts={course.parts} />
      <ExercisesTotal parts={course.parts} />
    </div>
  );
};

export default Course;
