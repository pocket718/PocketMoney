import { updateObject } from '../../utils/utility';

import {
  SET_ALLTASK_PAGINATION_PAGE,
  SET_COMPLETEDTASK_PAGINATION_PAGE,
  SET_UPDATETASK_PAGINATION_PAGE,
} from '../action/actionTypes';

export const initialState = {
  paginationCompleteTask: { limit: 6, skip: 0, total: null, filter: {} },
  paginationAllTask: { limit: 6, skip: 0, total: null, filter: {} },
  paginationUpdateTask: { limit: 6, skip: 0, total: null, filter: {} },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ALLTASK_PAGINATION_PAGE:
      return setAllTaskPaginationPage(state, payload);
    case SET_COMPLETEDTASK_PAGINATION_PAGE:
      return setCompletedTaskPaginationPage(state, payload);
    case SET_UPDATETASK_PAGINATION_PAGE:
      return setUpdateTaskPaginationPage(state, payload);
    default:
      return state;
  }
};

export default reducer;

const setAllTaskPaginationPage = (initialSate, payload) => {
  return updateObject(initialSate, {
    paginationAllTask: { ...initialSate.paginationAllTask, ...payload },
  });
};
const setCompletedTaskPaginationPage = (initialSate, payload) => {
  return updateObject(initialSate, {
    paginationCompleteTask: {
      ...initialSate.paginationCompleteTask,
      ...payload,
    },
  });
};
const setUpdateTaskPaginationPage = (initialSate, payload) => {
  return updateObject(initialSate, {
    paginationUpdateTask: {
      ...initialSate.paginationUpdateTask,
      ...payload,
    },
  });
};
