const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return [...state, action.data];

    case 'TOGGLE_IMPORTANCE':
      const noteToChange = state.find((note) => note.id === action.data.id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };
      return state.map((note) =>
        note.id !== changedNote.id ? note : changedNote
      );

    case 'INIT_NOTES':
      return action.data;

    default:
      return state;
  }
};

export const initializeNotes = (notes) => {
  return {
    type: 'INIT_NOTES',
    data: notes,
  };
};

export const createNote = (data) => {
  return {
    type: 'NEW_NOTE',
    data,
  };
};

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: {
      id,
    },
  };
};

export default noteReducer;
