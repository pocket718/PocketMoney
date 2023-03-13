import { updateObject } from '../../utils/utility';
import * as actionTypes from '../action/actionTypes';

const initialState = {
  error: '',
  notify: '',
  successMessage: '',
  errorMessage: '',
  notifications: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ENQUEUE_SNACKBAR:
      return updateNotification(state, action);

    case actionTypes.CLOSE_SNACKBAR:
      return updateObject(state, {
        notifications: state.notifications.map(notification =>
          action.dismissAll || notification.key === action.key
            ? { ...notification, dismissed: true }
            : { ...notification },
        ),
      });

    case actionTypes.REMOVE_SNACKBAR:
      return updateObject(state, {
        notifications: state.notifications.filter(
          notification => notification.key !== action.key,
        ),
      });

    default:
      return state;
  }
};

const updateNotification = (state, action) => {
  let match = state.notifications.filter(data => {
    return data.message == action.notification?.message;
  });
  if (match.length == 0) {
    return updateObject(state, {
      notifications: [
        ...state.notifications,
        {
          key: action.key,
          ...action.notification,
        },
      ],
    });
  } else {
    return state;
  }
};
