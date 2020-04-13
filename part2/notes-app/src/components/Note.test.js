import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import { Note } from './Notes';
import Togglable from './Togglable';
import NoteForm from './NoteForm';

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  };

  const mockHandler = jest.fn();

  const component = render(<Note note={note} toggleImportance={mockHandler} />);

  const button = component.getByText('make not important');

  fireEvent.click(button);

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  );
  expect(mockHandler.mock.calls).toHaveLength(1);
});

describe('<Togglable />', () => {
  let component;

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel='show...'>
        <div className='testDiv' />
      </Togglable>
    );
  });

  test('renders its children', () => {
    expect(component.container.querySelector('.testDiv')).toBeDefined();
  });

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent');

    expect(div).toHaveStyle('display: none');
  });

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('show...');
    fireEvent.click(button);

    const div = component.container.querySelector('.togglableContent');
    expect(div).not.toHaveStyle('display: none');
  });

  test('toggled content can be closed', () => {
    const button = component.container.querySelector('button');
    fireEvent.click(button);

    const closeButton = component.getByText('Cancel');
    fireEvent.click(closeButton);

    const div = component.container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');
  });
});

describe('<NoteForm />', () => {
  test('Updates parent state and calls onSubmit', () => {
    const createNote = jest.fn();

    const component = render(<NoteForm createNote={createNote} />);

    const input = component.container.querySelector('input');
    const form = component.container.querySelector('form');

    fireEvent.change(input, {
      target: {
        value: 'testing of forms could be easier',
      },
    });
    fireEvent.submit(form);

    expect(createNote.mock.calls).toHaveLength(1);
    expect(createNote.mock.calls[0][0].content).toBe(
      'testing of forms could be easier'
    );
  });
});
