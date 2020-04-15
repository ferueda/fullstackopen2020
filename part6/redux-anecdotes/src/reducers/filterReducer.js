const initialState = {
  filter: '',
  status: false,
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      if (action.filter === '') {
        return initialState;
      }
      return {
        filter: action.filter,
        status: true,
      };
    default:
      return state;
  }
};

export const filterChange = (filter) => {
  return {
    type: 'SET_FILTER',
    filter,
  };
};

export default filterReducer;
