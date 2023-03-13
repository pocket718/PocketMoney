import * as actionTypes from './actionTypes';

const enqueueSnackbar = notification => {
  const key = notification.options && notification.options.key;

  return {
    type: actionTypes.ENQUEUE_SNACKBAR,
    notification: {
      ...notification,
      key: key || new Date().getTime() + Math.random(),
    },
  };
};

export const closeSnackbar = key => ({
  type: actionTypes.CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key,
});

export const notify = (message, varient) => {
  return async (dispatch, getState) => {
    dispatch(
      enqueueSnackbar({
        message: message,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: varient,
        },
      }),
    );
  };
};

export const removeSnackbar = key => ({
  type: actionTypes.REMOVE_SNACKBAR,
  key,
});
