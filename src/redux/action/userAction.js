import moment from 'moment';
import callApi, { API, callApiPocketmoney } from '../../utils/api';
import { getWithExpiry } from '../../utils/utility';
import { constant } from '../../utils/constant';
import * as actionTypes from './actionTypes';
import { isLogIn, isLogInAsync, setLoading, setStatus } from './authAction';
import { notify } from './notifyAction';

export const logoutUser = data => {
  return {
    type: actionTypes.LOGOUT_USER,
  };
};

const setUserLoading = data => {
  return {
    type: actionTypes.SET_USER_LOADING,
    payload: data,
  };
};

export const setUser = data => {
  return {
    type: actionTypes.SET_USER,
    payload: data,
  };
};

export const setGuardianRequest = data => {
  return {
    type: actionTypes.SET_GUARDIAN_REQUEST,
    payload: data,
  };
};
export const setUserTask = data => {
  return {
    type: actionTypes.SET_TASK,
    payload: data,
  };
};

export const setTaskOptions = data => {
  return {
    type: actionTypes.SET_TASK_OPTIONS,
    payload: data,
  };
};

export const setRewards = data => {
  return {
    type: actionTypes.SET_REWARDS,
    payload: data,
  };
};

export const setUserTaskByDate = data => {
  return {
    type: actionTypes.SET_TASK_BY_DATE,
    payload: data,
  };
};
export const setGetRecommendation = data => {
  return {
    type: actionTypes.SET_RECOMMENDATION_LOADING,
    payload: data,
  };
};

export const setCompleteTask = data => {
  return {
    type: actionTypes.SET_COMPLETE_TASK,
    payload: data,
  };
};

export const setUpdateTask = data => {
  return {
    type: actionTypes.SET_UPDATE_TASK,
    payload: data,
  };
};

export const setAllTask = data => {
  return {
    type: actionTypes.SET_ALL_TASK,
    payload: data,
  };
};

export const setChildList = data => {
  return {
    type: actionTypes.SET_CHILD_LIST,
    payload: data,
  };
};

export const setGuardianList = data => {
  return {
    type: actionTypes.SET_GUARDIAN_LIST,
    payload: data,
  };
};

export const createTaskAction = data => {
  return (dispatch, getState) => {
    dispatch(setLoading());

    const reqBody = {
      childId: data.childId || '',
      taskType: data.taskType || '',
      taskTitle: data.taskTitle || '',
      taskDescription: data.taskDescription || '',
      taskTypeId: data.taskTypeId,
      reward: data.reward || 0,
      category: data.category || null,
      media: data.media || [],
      status: '',
      deadline: data.deadline || null,
      frequency: data.frequency || '',
      duration: data.duration || null,
      startDate: data.startDate || null,
      endDate: data.endDate || null,
      taskTimeStamp: data.taskTimeStamp || null,
      deadline: data.deadline || null,
    };

    callApiPocketmoney('createTask', 'POST', reqBody)
      .then(res => {
        const { status, successMessage, errorMessage, error } = res;
        dispatch(
          setStatus({
            error: error,
            successMessage: successMessage,
            errorMessage: errorMessage,
          }),
        );
        if (status) {
          dispatch(notify(successMessage || 'Task created!', 'success'));
          if (
            data?.alternateCallBack &&
            typeof data.alternateCallBack == 'function'
          ) {
            data.alternateCallBack();
          } else {
            let state = getState();
            dispatch(
              setAllTaskPaginationPage({
                total:
                  state.paginationReducer?.paginationAllTask?.total +
                  (data.taskTimeStamp?.length || 1) *
                    (data.childId?.length || 1),
              }),
            );
          }
        } else {
          dispatch(notify(errorMessage || 'Failed to create!', 'error'));
        }
      })
      .catch(err => {
        dispatch(
          setStatus({
            error: err?.response?.data || err,
            errorMessage:
              err?.response?.data?.errorMessage ||
              'Please try again by refresh..!',
          }),
        );
      });
  };
};

export const updateTaskAction = (data, callBack) => {
  return (dispatch, getState) => {
    dispatch(setLoading());

    const reqBody = {
      id: data.id,
      update_request: {
        status: data.status || '',
        media: data.media || [],
      },
    };

    callApiPocketmoney('updateTask', 'POST', reqBody)
      .then(res => {
        const { status, successMessage, errorMessage, data, error } = res;
        dispatch(
          setStatus({
            error: error,
            successMessage: successMessage,
            errorMessage: errorMessage,
          }),
        );
        if (status) {
          dispatch(
            notify(successMessage || 'Status update successfull', 'success'),
          );
          if (!callBack) {
            let state = getState();
            let filter = {
              sort: {
                updated_at: -1,
              },
            };
            filter = {
              ...filter,
              limit: state.paginationReducer.paginationCompleteTask.limit,
              skip:
                state.paginationReducer.paginationCompleteTask.skip *
                state.paginationReducer.paginationCompleteTask.limit,
            };
            dispatch(
              getTaskList({
                ...filter,
                status: constant.parentApprovedStatus,
              }),
            );
            filter.skip = 0;
            dispatch(
              getTaskList({
                ...filter,
                status: constant.childApprovedStatus,
              }),
            );
          } else {
            typeof callBack == 'function' && callBack();
          }
        }
      })
      .catch(err => {
        dispatch(
          setStatus({
            error: err?.response?.data || err,
            errorMessage:
              err?.response?.data?.errorMessage ||
              'Please try again by refresh..!',
          }),
        );
      });
  };
};

export const deleteTaskAction = data => {
  return (dispatch, getState) => {
    dispatch(setLoading());

    const reqBody = {
      id: data.id,
    };

    callApiPocketmoney('deleteTask', 'POST', reqBody)
      .then(res => {
        const { status, successMessage, errorMessage, data, error } = res;
        dispatch(
          setStatus({
            error: error,
            successMessage: successMessage,
            errorMessage: errorMessage,
          }),
        );
      })
      .catch(err => {
        dispatch(
          setStatus({
            error: err?.response?.data || err,
            errorMessage:
              err?.response?.data?.errorMessage ||
              'Please try again by refresh..!',
          }),
        );
      });
  };
};

export const getChildrenRequest = () => {
  return (dispatch, getState) => {
    dispatch(setLoading());
    const reqBody = {};

    callApiPocketmoney('getChildRequest', 'POST', reqBody)
      .then(res => {
        const { status, successMessage, errorMessage, child, error } = res;
        dispatch(
          setStatus({
            error: error,
            successMessage: successMessage,
            errorMessage: errorMessage,
          }),
        );
        dispatch(setGuardianRequest(child));
      })
      .catch(err => {
        dispatch(
          setStatus({
            error: err?.response?.data || err,
            errorMessage:
              err?.response?.data?.errorMessage || 'Failed to fetch request!',
          }),
        );
      });
  };
};

export const getGuardianRequest = () => {
  return (dispatch, getState) => {
    dispatch(setLoading());
    const reqBody = {};

    callApiPocketmoney('getGuardianRequest', 'POST', reqBody)
      .then(res => {
        const { status, successMessage, errorMessage, guardian, error } = res;
        dispatch(
          setStatus({
            error: error,
            successMessage: successMessage,
            errorMessage: errorMessage,
          }),
        );
        dispatch(setGuardianRequest(guardian));
      })
      .catch(err => {
        dispatch(
          setStatus({
            error: err?.response?.data || err,
            errorMessage:
              err?.response?.data?.errorMessage || 'Failed to fetch request!',
          }),
        );
      });
  };
};

export const getTaskList = reqData => {
  return (dispatch, getState) => {
    dispatch(setUserLoading({ getTasks: true }));
    const reqBody = {
      ...reqData,
    };

    callApiPocketmoney('getTask', 'POST', reqBody)
      .then(res => {
        const { status, successMessage, errorMessage, data, error } = res;
        dispatch(setUserLoading({ getTasks: false }));
        dispatch(
          setStatus({
            error: error,
            successMessage: successMessage,
            errorMessage: errorMessage,
          }),
        );
        if (status) {
          let state = getState();
          let paginationData = state.paginationReducer;
          if (reqData?.status == constant.parentApprovedStatus) {
            dispatch(setCompleteTask(data));
            if (
              paginationData?.paginationCompleteTask?.total != data?.totalCount
            ) {
              dispatch(
                setCompletedTaskPaginationPage({ total: data?.totalCount }),
              );
            }
          } else if (reqData?.status == constant.childApprovedStatus) {
            dispatch(setUpdateTask(data));
            if (
              paginationData?.paginationUpdateTask?.total != data?.totalCount
            ) {
              dispatch(
                setUpdateTaskPaginationPage({ total: data?.totalCount }),
              );
            }
          } else {
            dispatch(setAllTask(data));
            if (paginationData?.paginationAllTask?.total != data?.totalCount) {
              dispatch(setAllTaskPaginationPage({ total: data?.totalCount }));
            }
          }
        }
      })
      .catch(err => {
        dispatch(setUserLoading({ getTasks: false }));
        dispatch(
          setStatus({
            error: err?.response?.data || err,
            errorMessage:
              err?.response?.data?.errorMessage || 'Failed to fetch request!',
          }),
        );
      });
  };
};
export const getKidsTaskList = reqData => {
  return (dispatch, getState) => {
    dispatch(setLoading());
    const reqBody = {
      ...reqData,
    };

    callApiPocketmoney('getTask', 'POST', reqBody)
      .then(res => {
        const { status, successMessage, errorMessage, data, error } = res;
        dispatch(
          setStatus({
            error: error,
            successMessage: successMessage,
            errorMessage: errorMessage,
          }),
        );
        if (status) {
          let state = getState();
          let paginationData = state.paginationReducer;
          if (reqData?.status == constant.parentApprovedStatus) {
            dispatch(setCompleteTask(data));
            if (
              paginationData?.paginationCompleteTask?.total != data?.totalCount
            ) {
              dispatch(
                setCompletedTaskPaginationPage({ total: data?.totalCount }),
              );
            }
          } else if (reqData?.status == constant.createdStatus) {
            dispatch(setUpdateTask(data));
            if (
              paginationData?.paginationUpdateTask?.total != data?.totalCount
            ) {
              dispatch(
                setUpdateTaskPaginationPage({ total: data?.totalCount }),
              );
            }
          } else {
            dispatch(setAllTask(data));
            if (paginationData?.paginationAllTask?.total != data?.totalCount) {
              dispatch(setAllTaskPaginationPage({ total: data?.totalCount }));
            }
          }
        }
      })
      .catch(err => {
        dispatch(
          setStatus({
            error: err?.response?.data || err,
            errorMessage:
              err?.response?.data?.errorMessage || 'Failed to fetch request!',
          }),
        );
      });
  };
};

export const getChildList = data => {
  return (dispatch, getState) => {
    dispatch(setUserLoading({ getKids: true }));
    const reqBody = {
      childId: data?.childId,
    };
    //console.log("req",reqBody)
    callApiPocketmoney('getChildrenList', 'POST', reqBody)
      .then(res => {
        const { status, successMessage, errorMessage, child, error } = res;
        //console.log("response",res)
        dispatch(setUserLoading({ getKids: false }));

        dispatch(
          setStatus({
            error: error,
            successMessage: successMessage,
            errorMessage: errorMessage,
          }),
        );
        dispatch(setChildList(child));
      })
      .catch(err => {
        dispatch(setUserLoading({ getKids: false }));
        dispatch(
          setStatus({
            error: err?.response?.data || err,
            errorMessage:
              err?.response?.data?.errorMessage || 'Failed to fetch request!',
          }),
        );
      });
  };
};

export const getGuardianList = data => {
  return (dispatch, getState) => {
    dispatch(setLoading());
    const reqBody = {
      parentId: data?.parentId,
    };

    callApiPocketmoney('getGuardianList', 'POST', reqBody)
      .then(res => {
        const { status, successMessage, errorMessage, guardian, error } = res;
        dispatch(
          setStatus({
            error: error,
            successMessage: successMessage,
            errorMessage: errorMessage,
          }),
        );
        dispatch(setGuardianList(guardian));
      })
      .catch(err => {
        dispatch(
          setStatus({
            error: err?.response?.data || err,
            errorMessage:
              err?.response?.data?.errorMessage || 'Failed to fetch request!',
          }),
        );
      });
  };
};

export const updateChildRequest = data => {
  return (dispatch, getState) => {
    dispatch(setLoading());
    const reqBody = {
      ...data,
    };

    callApi('UpdateFamilyStatus', 'POST', reqBody)
      .then(res => {
        const { status, successMessage, errorMessage, error } = res;
        dispatch(
          setStatus({
            error: error,
            successMessage: successMessage,
            errorMessage: errorMessage,
          }),
        );
        if (status) {
          if (data?.isMinor) {
            dispatch(getGuardianList());
            dispatch(getGuardianRequest());
            dispatch(isLogInAsync());
          } else {
            dispatch(getChildList());
            dispatch(getChildrenRequest());
          }
          dispatch(notify('Request update successfull', 'success'));
        } else {
          dispatch(notify('Request update failed', 'error'));
        }
      })
      .catch(err => {
        dispatch(
          setStatus({
            error: err?.response?.data || err,
            errorMessage:
              err?.response?.data?.errorMessage || 'Failed to update request!',
          }),
        );
      });
  };
};

export const getTaskBy_Date = data => {
  return async (dispatch, getState) => {
    const reqBody = {
      id: data.id,
      fromDate: data.fromDate || null,
      toDate: data.toDate || null,
    };
    dispatch(
      setUserLoading({
        getTasks: true,
      }),
    );
    callApiPocketmoney('getTask', 'POST', reqBody)
      .then(res => {
        const { status, successMessage, errorMessage, data, error } = res;
        dispatch(
          setUserLoading({
            getTasks: false,
          }),
        );
        dispatch(setUserTaskByDate(data || null));
        dispatch(
          setStatus({
            error: error,
            successMessage: successMessage,
            errorMessage: errorMessage,
          }),
        );
      })
      .catch(err => {
        dispatch(
          setUserLoading({
            getTasks: false,
          }),
        );
        dispatch(
          setStatus({
            error: err?.response?.data || err,
            errorMessage:
              err?.response?.data?.errorMessage ||
              'Please try again by refresh..!',
          }),
        );
      });
  };
};

export const getRecommendsApi = reqBody =>
  callApi('getRecommends', 'POST', reqBody)
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });

export const updateChildData = request => {
  return new Promise((res, rej) => {
    let reqBody = request;
    callApi('UpdateUser', 'POST', reqBody)
      .then(response => {
        res(response);
      })
      .catch(err => {
        rej(err);
      });
  });
};

export const uploadDoc = ({ file, key }) => {
  return new Promise((res, rej) => {
    let storedToken = getWithExpiry('token');
    let data = new FormData();
    data.append('file', file);
    data.append('path', key);
    data.append('token', storedToken);

    API.post('/UploadDocs', data, {
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        res(response?.data);
      })
      .catch(err => {
        rej(err);
      });
  });
};

export const removeRelation = data => {
  return (dispatch, getState) => {
    dispatch(setLoading());
    const reqBody = {
      fromId: data.fromId,
      toId: data.toId,
    };
    callApi('RemoveFamilyRelation', 'POST', reqBody)
      .then(res => {
        const { status, successMessage, errorMessage, child, error } = res;
        dispatch(
          setStatus({
            error: error,
            successMessage: successMessage,
            errorMessage: errorMessage,
          }),
        );
        if (status) {
          dispatch(
            notify(successMessage || 'Child removed successfully', 'success'),
          );
          let state = getState();
          let filter = {
            sort: {
              updated_at: -1,
            },
          };
          filter = {
            ...filter,
            limit: state.paginationReducer.paginationAllTask.limit,
            skip:
              state.paginationReducer.paginationAllTask.skip *
              state.paginationReducer.paginationAllTask.limit,
          };
          dispatch(
            getTaskList({
              ...filter,
              filter: {
                $and: [
                  { status: { $ne: constant.parentApprovedStatus } },
                  { status: { $ne: constant.childApprovedStatus } },
                ],
              },
            }),
          );
          dispatch(
            getTaskList({
              ...filter,
              status: constant.parentApprovedStatus,
            }),
          );
          dispatch(getChildList());
        } else {
          dispatch(notify(errorMessage, 'error'));
        }
      })
      .catch(err => {
        dispatch(
          notify(
            err?.response?.data?.errorMessage || err?.response?.data,
            'error',
          ),
        );
        dispatch(
          setStatus({
            error: err?.response?.data || err,
            errorMessage:
              err?.response?.data?.errorMessage || 'Failed to delete relation!',
          }),
        );
      });
  };
};

export const setAllTaskPaginationPage = data => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_ALLTASK_PAGINATION_PAGE,
      payload: data,
    });
  };
};

export const setCompletedTaskPaginationPage = data => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_COMPLETEDTASK_PAGINATION_PAGE,
      payload: data,
    });
  };
};

export const setUpdateTaskPaginationPage = data => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_UPDATETASK_PAGINATION_PAGE,
      payload: data,
    });
  };
};

export const uploadProfilePic = (key, file) => {
  return new Promise((resolve, reject) => {
    let storedToken = getWithExpiry('token');
    let data = new FormData();
    data.append('file', file);
    data.append('path', key);
    data.append('token', storedToken);

    API.post('/UploadDocs', data, {
      'Content-Type': 'multipart/form-data',
    })
      .then(res => {
        const { status, successMessage, errorMessage, data, error } = res.data;
        if (status) {
          resolve(data);
        } else {
          reject();
          notify(errorMessage, 'error');
        }
      })
      .catch(err => {
        reject();
        let errorMessage =
          err?.response?.data?.error?.errorMessage ||
          err?.response?.data?.error;
        notify(
          typeof errorMessage == 'string'
            ? errorMessage
            : 'Error while uploading file!!!',
          'error',
        );
      });
  });
};

export const getTaskOptions = data => {
  return (dispatch, getState) => {
    dispatch(setLoading());

    const reqBody = {
      id: data.id,
      frequency: data.frequency,
      category: data.category,
    };

    callApiPocketmoney('getTaskOptions', 'POST', reqBody)
      .then(res => {
        const { status, successMessage, errorMessage, data, error } = res;

        dispatch(
          setTaskOptions({
            value: data?.options || [],
            frequency: reqBody.frequency,
            category: reqBody.category,
          }),
        );
        dispatch(
          setStatus({
            error: error,
            successMessage: successMessage,
            errorMessage: errorMessage,
          }),
        );
      })
      .catch(err => {
        dispatch(
          setStatus({
            error: err?.response?.data || err,
            errorMessage:
              err?.response?.data?.errorMessage ||
              'Please try again by refresh..!',
          }),
        );
      });
  };
};

export const getRewardsParent = data => {
  return (dispatch, getState) => {
    dispatch(setLoading());
    const reqBody = {
      childId: data?.childId,
      month: data?.month,
      year: data?.year,
    };

    callApiPocketmoney('getRewardsParent', 'POST', reqBody)
      .then(res => {
        const {
          status,
          successMessage,
          errorMessage,
          data,
          error,
          totalReward,
        } = res;
        dispatch(setRewards({ rewards: data, totalReward: totalReward || 0 }));
        dispatch(
          setStatus({
            error: error,
            successMessage: successMessage,
            errorMessage: errorMessage,
          }),
        );
      })
      .catch(err => {
        dispatch(
          setStatus({
            error: err?.response?.data || err,
            errorMessage:
              err?.response?.data?.errorMessage ||
              'Please try again by refresh..!',
          }),
        );
        dispatch(notify('Failed to fetch rewards.', 'error'));
      });
  };
};

export const getRewardsKid = data => {
  return (dispatch, getState) => {
    dispatch(setLoading());
    const reqBody = {
      month: data?.month,
      year: data?.year,
    };

    callApiPocketmoney('getRewardsKid', 'POST', reqBody)
      .then(res => {
        const {
          status,
          successMessage,
          errorMessage,
          data,
          error,
          totalReward,
        } = res;

        dispatch(setRewards({ rewards: data, totalReward: totalReward || 0 }));
        dispatch(
          setStatus({
            error: error,
            successMessage: successMessage,
            errorMessage: errorMessage,
          }),
        );
      })
      .catch(err => {
        dispatch(
          setStatus({
            error: err?.response?.data || err,
            errorMessage:
              err?.response?.data?.errorMessage ||
              'Please try again by refresh..!',
          }),
        );
        dispatch(notify('Failed to fetch rewards.', 'error'));
      });
  };
};

export const addChildRequest = data => {
  //console.log(0, data);
  return (dispatch, getState) => {
    dispatch(setLoading());
    const reqBody = {
      relation: data.relation,
      childId: data.childId,
      role: data.role,
    };
    //console.log(3, reqBody);
    callApiPocketmoney('addChildRequest', 'POST', reqBody)
      .then(res => {
        const { status, successMessage, errorMessage, data, error } = res;
        if (status) {
          dispatch(notify(successMessage, 'success'));
          dispatch(getProfile());
        } else {
          dispatch(notify(errorMessage, 'error'));
        }
        dispatch(
          setStatus({
            error: error,
            successMessage: successMessage,
            errorMessage: errorMessage,
          }),
        );
      })
      .catch(err => {
        dispatch(
          setStatus({
            error: err?.response?.data || err,
            errorMessage:
              err?.response?.data?.errorMessage ||
              'Please try again by refresh..!',
          }),
        );
        dispatch(notify('Failed to send a child request.', 'error'));
      });
  };
};

export const getProfile = () => {
  //# HERE WE CREATE DYNMAIC ACTION DISPATCHER FOR ALL CASE'S

  return async (dispatch, getState) => {
    //# HERE MAKE ASYNC CALLS.
    let storedToken = getWithExpiry('token');
    // dispatch(
    //   setUserLoading({
    //     getProfile: true,
    //   })
    // );
    callApi('GetProfile', 'POST')
      .then(res => {
        const { status, successMessage, errorMessage, user, error } = res;
        dispatch(
          setUser({
            user: user,
          }),
        );
        // dispatch(
        //   setUserLoading({
        //     getProfile: false,
        //   }),
        // );
        if (error) {
          dispatch(
            setStatus({
              error: error,
            }),
          );
        }
      })
      .catch(err => {
        // dispatch(
        //   setUserLoading({
        //     getProfile: false,
        //   }),
        // );
        dispatch(
          setStatus({
            error: err?.response?.data.error || err,
          }),
        );
        dispatch(
          notify(
            err?.response?.data?.errorMessage ||
              'Please try again by refresh..!',
            'error',
          ),
        );
      });
  };
};

export const updateRewards = () => {
  //# HERE WE CREATE DYNMAIC ACTION DISPATCHER FOR ALL CASE'S

  return async (dispatch, getState) => {
    //# HERE MAKE ASYNC CALLS.
    let storedToken = getWithExpiry('token');
    callApiPocketmoney('updateRewards', 'POST')
      .then(res => {
        const { status, successMessage, errorMessage, user, error } = res;
      })
      .catch(err => {});
  };
};
