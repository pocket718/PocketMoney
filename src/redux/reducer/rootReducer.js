import { combineReducers } from 'redux';
import auth from './authReducer';
import user from './userReducer';
import pagination from './paginationReducer';
import notify from './notifyReducer';

const rootReducer = combineReducers({
  authReducer: auth,
  userReducer: user,
  notifyReducer: notify,
  paginationReducer: pagination,
});

export default rootReducer;
