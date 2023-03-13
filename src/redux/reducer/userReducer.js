import { updateObject } from '../../utils/utility';

import {
  LOGOUT_USER,
  SET_ALL_TASK,
  SET_ALLTASK_PAGINATION_PAGE,
  SET_COMPLETEDTASK_PAGINATION_PAGE,
  SET_CHILD_LIST,
  SET_COMPLETE_TASK,
  SET_GUARDIAN_LIST,
  SET_TASK_BY_DATE,
  SET_GUARDIAN_REQUEST,
  SET_RECOMMENDATION_LOADING,
  SET_TASK,
  SET_USER,
  SET_TASK_OPTIONS,
  SET_REWARDS,
  SET_UPDATE_TASK,
  SET_USER_LOADING,
} from '../action/actionTypes';

export const initialState = {
  status: null,
  profile: null,
  kyc: null,
  recommendations: [],
  cogTransactions: null,
  guardianRequest: [],
  completedTasks: {},
  getTaskByDate: null,
  rewards: null,
  allTasks: {},
  updateTasks: {},
  childList: [],
  guardianList: [],
  tasks: [],
  tasksOptions: {},
  loadings: {
    getFamily: false,
    logIn: false,
    getRecommendation: false,
    getTasks: false,
    getKids: false,
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return setUserProfile(state, payload);
    case SET_USER_LOADING:
      return setUserLoading(state, payload);
    case SET_TASK:
      return setTasks(state, payload);
    case LOGOUT_USER:
      return setUserProfile(state, { ...initialState, profile: {} });
    case SET_GUARDIAN_REQUEST:
      return setUserRequest(state, payload);
    case SET_COMPLETE_TASK:
      return setCompleteTask(state, payload);
    case SET_UPDATE_TASK:
      return setUpdateTask(state, payload);
    case SET_ALL_TASK:
      return setAllTask(state, payload);
    case SET_CHILD_LIST:
      return setChildList(state, payload);
    case SET_GUARDIAN_LIST:
      return setGuardianList(state, payload);
    case SET_RECOMMENDATION_LOADING:
      return setGetRecommendationLoader(state, payload);
    case SET_TASK_BY_DATE:
      return setTasksByDate(state, payload);
    case SET_TASK_OPTIONS:
      return setTaskOptions(state, payload);
    case SET_REWARDS:
      return setRewards(state, payload);
    default:
      return state;
  }
};

export default reducer;

const setUserLoading = (initialState, payload) => {
  return updateObject(initialState, {
    loadings: updateObject(initialState.loadings, payload),
  });
};

const updateState = (initialSate, payload) => {
  return updateObject(initialSate, payload);
};
const setUserProfile = (initialSate, data) => {
  return updateState(initialSate, { profile: data.user });
};
const setTasks = (initialSate, data) => {
  return updateState(initialSate, { tasks: data.tasks });
};
const setUserRequest = (initialSate, payload) => {
  return updateState(initialSate, { guardianRequest: payload });
};
const setCompleteTask = (initialSate, payload) => {
  return updateState(initialSate, {
    completedTasks: payload,
  });
};
const setUpdateTask = (initialSate, payload) => {
  return updateState(initialSate, {
    updateTasks: payload,
  });
};
const setAllTask = (initialSate, payload) => {
  return updateState(initialSate, {
    allTasks: payload,
  });
};
const setChildList = (initialSate, payload) => {
  return updateState(initialSate, { childList: payload });
};
const setGuardianList = (initialSate, payload) => {
  return updateState(initialSate, { guardianList: payload });
};

const setGetRecommendationLoader = (initialState, payload) => {
  return updateState(initialState, {
    loadings: {
      ...initialState.loadings,
      getRecommendation: payload,
    },
  });
};

const setTasksByDate = (initialState, payload) => {
  return updateState(initialState, { getTaskByDate: payload.task });
};

const setTaskOptions = (initialState, payload) => {
  return updateState(initialState, { tasksOptions: payload });
};

const setRewards = (initialState, payload) => {
  return updateState(initialState, {
    rewards: payload.rewards,
    totalReward: payload.totalReward,
  });
};
