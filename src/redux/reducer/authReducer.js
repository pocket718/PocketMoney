import { updateObject } from '../../utils/utility';
import {
  CHILDREN_LOGIN_STATUS,
  CREATE_CHILDREN_ACCOUNT,
  IS_LOGGED_IN,
  PARENT_LOGIN_STATUS,
  PARENT_RESET,
  SET_LOADING,
  SET_STATUS,
} from '../action/actionTypes';
import { parentLogin } from '../action/authAction';

const initialState = {
  loading: false,
  error: null,
  isParentLoggedIn: false,
  isChildrenLoggedIn: false,
  isParentReset: false,
  verificationMailSent: false,
  otpVerified: false,
  isPasswordReset: false,
  registered: false,
  checking: true,
  successMessage: '',
  errorMessage: '',
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_STATUS:
      return updateState(state, payload);
    case SET_LOADING:
      return updateState(state, { loading: !state.loading });
    case CREATE_CHILDREN_ACCOUNT:
      return updateState(state, payload);
    case PARENT_LOGIN_STATUS:
      return parentLoginFunc(state, payload);
    case CHILDREN_LOGIN_STATUS:
      return childrenLoginFunc(state, payload);
    case PARENT_RESET:
      return updateState(state, payload);
    case IS_LOGGED_IN:
      return isLoggedIn(state, payload);
    default:
      return state;
  }
};

export default reducer;

const updateState = (initialSate, updateState) => {
  return updateObject(initialSate, updateState);
};

const parentLoginFunc = (initialState, data) => {
  return updateState(initialState, {
    isParentLoggedIn: !!data.status,
    isChildrenLoggedIn: false,
  });
};

const childrenLoginFunc = (initialState, data) => {
  return updateState(initialState, {
    isChildrenLoggedIn: !!data.status,
    isParentLoggedIn: false,
  });
};

const isLoggedIn = (initialState, data) => {
  return updateState(initialState, {
    isChildrenLoggedIn: !!(data?.user?.isMinor && data.status),
    isParentLoggedIn: !!(!data?.user?.isMinor && data.status),
  });
};
