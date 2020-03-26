import React from 'react';

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Parts = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map(part => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

export default Parts;
