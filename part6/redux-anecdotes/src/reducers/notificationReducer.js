const initialState = {
  message: '',
  visibility: false,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        ...action.data,
        visibility: true,
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export const setNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      ...notification,
    },
  };
};

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
  };
};

export default notificationReducer;
