import React from 'react';

const Course = ({ courseName, exercises }) => {
  return (
    <p>
      {courseName} {exercises}
    </p>
  );
};

export default Course;
