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

export const setNotification = (notification, waitTime) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        ...notification,
      },
    });

    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
      });
    }, waitTime * 1000);
  };
};

export default notificationReducer;
