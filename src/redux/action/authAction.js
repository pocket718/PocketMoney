import callApi, { callApiPocketmoney } from '../../utils/api';
import {
  AsyncStorageKeys,
  getAsyncStorage,
  setAsyncStorage,
  getAsyncStorageWithoutExpiry,
  setAsyncStorageWithExpiry,
  removeValue,
  deleteAsyncStorage,
} from '../../utils/helpers';
import * as actionTypes from './actionTypes';
import { notify } from './notifyAction';
import { setUser } from './userAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

export const setStatus = data => {
  return {
    type: actionTypes.SET_STATUS,
    payload: data,
  };
};

export const childOtpVerified = data => {
  return {
    type: actionTypes.CHILD_OTP_VERIFIED,
    payload: data,
  };
};

export const setLoading = () => {
  return {
    type: actionTypes.SET_LOADING,
  };
};

export const setParentReset = data => {
  return {
    type: actionTypes.PARENT_RESET,
    payload: { ...data },
  };
};

export const createChildrenAction = data => {
  return {
    type: actionTypes.CREATE_CHILDREN_ACCOUNT,
    payload: data,
  };
};

export const parentLogin = data => {
  return {
    type: actionTypes.PARENT_LOGIN_STATUS,
    payload: data,
  };
};

export const childrenLogin = data => {
  return {
    type: actionTypes.CHILDREN_LOGIN_STATUS,
    payload: data,
  };
};

export const isLogIn = data => {
  return {
    type: actionTypes.IS_LOGGED_IN,
    payload: data,
  };
};

export const sendSignupOtp = (data, callBack) => {
  return (dispatch, getState) => {
    const requestBody = {
      email: data.email,
      ref: data.ref,
    };
    callApi('SignUp', 'POST', requestBody)
      .then(res => {
        const { status, successMessage, errorMessage, error } = res;
        callBack &&
          typeof callBack == 'function' &&
          callBack({
            otpSent: status,
            errorMessage,
          });
        if (status) {
          dispatch(notify(`OTP sent to ${requestBody.email}`, 'success'));
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
        dispatch(notify(err?.response?.data?.errorMessage, 'error'));
        dispatch(
          setStatus({
            error: err?.response?.data?.error || err,
            errorMessage:
              err?.response?.data?.errorMessage ||
              'Please try again by refresh..!',
            successMessage: err?.response?.data?.successMessage || '',
          }),
        );
      });
  };
};

export const confirmOTP = ({ email, otp }, callBack) => {
  //# HERE WE CREATE DYNMAIC ACTION DISPATCHER FOR ALL CASE'S
  return (dispatch, getState) => {
    //# HERE MAKE ASYNC CALLS.
    dispatch(setLoading());
    const reqBody = {
      email: email,
      otp: otp,
    };

    callApi('Confirm', 'POST', reqBody)
      .then(res => {
        const {
          status,
          successMessage,
          errorMessage,
          user,
          registered,
          error,
          token,
        } = res;

        callBack &&
          typeof callBack == 'function' &&
          callBack({
            user: user,
            registered: registered,
            otpVerified: status,
          });

        if (status) {
          let keysToRemove = ['email', 'timer'];
          keysToRemove.forEach(k => AsyncStorage.removeItem(k));

          setWithExpiry(
            'childAccountToken',
            {
              user: user,
              registered: registered,
            },
            0.5 * 7, // 30min
          );
          AsyncStorage.setItem('childToken', JSON.stringify(token));
          dispatch(notify('OTP Verified!', 'success'));
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

        // successMessage && dispatch(notify(successMessage, "success"));
        // AsyncStorage.removeItem("email");
      })
      .catch(err => {
        dispatch(
          setStatus({
            error: err?.response?.data?.error || err,
            errorMessage:
              err?.response?.data?.errorMessage ||
              'Please try again by refresh..!',
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

export const createChildrenAccount = (data, callBack) => {
  return (dispatch, getState) => {
    dispatch(setLoading());
    const reqBody = data.user;

    callApi(
      'Register',
      'POST',
      reqBody,
      'application/json',
      false,
      'childToken',
    )
      .then(res => {
        const { status, successMessage, errorMessage, error } = res;
        if (typeof callBack == 'function') callBack({ status: status });
        if (status) {
          dispatch(notify(successMessage, 'success'));
        } else {
          dispatch(notify(errorMessage, 'error'));
        }
        dispatch(setLoading());
        dispatch(
          createChildrenAction({
            registered: status,
          }),
        );
        dispatch(
          setStatus({
            registered: status,
            error: error,
            successMessage: successMessage,
            errorMessage: errorMessage,
          }),
        );
      })
      .catch(err => {
        let error =
          err?.response?.data || err || err?.response?.data?.errorMessage;
        dispatch(notify(error, 'error'));
        dispatch(
          setStatus({
            error: err?.response?.data?.error || err,
            errorMessage:
              err?.response?.data?.errorMessage ||
              'Please try again by refresh..!',
            successMessage: err?.response?.data?.successMessage || '',
          }),
        );
        dispatch(setLoading());
      });
  };
};

export const parentLoginAction = user => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      //# HERE MAKE ASYNC CALLS.
      dispatch(setLoading());
      const reqBody = user;
      //console.log("reqbody",reqBody)

      callApi('Login', 'POST', reqBody)
        .then(async res => {
          const { status, successMessage, errorMessage, token, user, error } =
            res;
          if (status) {
            await setAsyncStorageWithExpiry(AsyncStorageKeys.AUTH_TOKEN, token);
            //setWithExpiry('token', token, 1);
            dispatch(
              setUser({
                user: user,
              }),
            );
            resolve(res);
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
          dispatch(
            parentLogin({
              status: status,
            }),
          );
        })
        .catch(err => {
          dispatch(
            notify(
              err?.response?.data?.errorMessage || err?.response?.data || err,
              'error',
            ),
          );
          dispatch(
            setStatus({
              error: err?.response?.data || err,
              errorMessage:
                err?.response?.data?.errorMessage ||
                'Please try again by refresh..!',
            }),
          );
          reject(err);
        })
        .finally(() => dispatch(setLoading()));
    });
  };
};

export const childrenLoginAction = user => {
  return (dispatch, getState) => {
    //# HERE MAKE ASYNC CALLS.
    dispatch(setLoading());
    const reqBody = user;

    callApiPocketmoney('childrenLogin', 'POST', reqBody)
      .then(res => {
        const { status, successMessage, errorMessage, token, user, error } =
          res;
        if (status) {
          setWithExpiry('token', token, 1);
          dispatch(
            setUser({
              user: user,
            }),
          );
        } else {
          dispatch(notify(errorMessage, 'error'));
        }
        dispatch(
          childrenLogin({
            status: status,
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
          notify(
            err?.response?.data?.errorMessage || err?.response?.data || err,
            'error',
          ),
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

export const isLogInAsync = () => {
  //# HERE WE CREATE DYNMAIC ACTION DISPATCHER FOR ALL CASE'S
  return async (dispatch, getState) => {
    //# HERE MAKE ASYNC CALLS.
    let storedToken = await getAsyncStorage(AsyncStorageKeys.AUTH_TOKEN);
    const reqBody = {
      token: storedToken,
    };
    callApi('IsLoggedIn', 'POST', reqBody)
      .then(res => {
        const { status, message, error, user } = res;
        if (status) {
          // console.log('status', status);
          dispatch(isLogIn({ status: status, user: user }));

          dispatch(
            setUser({
              user: user,
            }),
          );
        } else {
          dispatch(
            setUser({
              user: false,
            }),
          );
        }
      })
      .catch(err => {
        dispatch(isLogIn({ status: false }));
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

export const forgotPassword = email => {
  //# HERE WE CREATE DYNMAIC ACTION DISPATCHER FOR ALL CASE'S

  return (dispatch, getState) => {
    //# HERE MAKE ASYNC CALLS.
    dispatch(setLoading());
    const reqBody = {
      email: email,
    };
    callApi('ForgotPassword', 'POST', reqBody)
      .then(res => {
        const { status, successMessage, errorMessage, error, token } = res;
        //console.log(res)
        if (!status) {
          dispatch(notify(errorMessage, 'error'));
        }
        dispatch(
          setStatus({
            error: error,
            successMessage: successMessage,
            errorMessage: errorMessage,
            verificationMailSent: !!status || !!token,
          }),
        );
      })
      .catch(err => {
        let error =
          err?.response?.data || err || err?.response?.data?.errorMessage;
        dispatch(notify(error, 'error'));
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

export const confirmForgotPasswordOTP = ({ email, otp }) => {
  //# HERE WE CREATE DYNMAIC ACTION DISPATCHER FOR ALL CASE'S
  return (dispatch, getState) => {
    //# HERE MAKE ASYNC CALLS.
    dispatch(setLoading());
    const reqBody = {
      email: email,
      otp: otp,
    };

    callApi('confirmForgotPasswordOtp', 'POST', reqBody)
      .then(res => {
        const { status, successMessage, errorMessage, error, token } = res;

        if (status) {
          AsyncStorage.setItem('otp_token', token);
        } else {
          dispatch(notify(errorMessage, 'error'));
        }
        dispatch(
          setStatus({
            error: error,
            successMessage: successMessage,
            errorMessage: errorMessage,
            otpVerified: !!status,
          }),
        );
      })
      .catch(err => {
        let error =
          err?.response?.data || err || err?.response?.data?.errorMessage;
        dispatch(notify(error, 'error'));
        dispatch(
          setStatus({
            error: err?.response?.data?.error || err,
            errorMessage:
              err?.response?.data?.errorMessage ||
              'Please try again by refresh..!',
          }),
        );
        // AsyncStorage.removeItem("email");
      });
  };
};

export const resetPassword = ({ token, password }) => {
  //# HERE WE CREATE DYNMAIC ACTION DISPATCHER FOR ALL CASE'S

  return (dispatch, getState) => {
    //# HERE MAKE ASYNC CALLS.
    dispatch(setLoading());
    const reqBody = {
      token: token,
      password: password,
    };
    callApi('ResetPassword', 'POST', reqBody)
      .then(res => {
        const { status, successMessage, errorMessage, error } = res;
        if (status) {
          dispatch(notify(successMessage, 'success'));
        } else {
          dispatch(notify(errorMessage, 'error'));
        }
        dispatch(
          setStatus({
            error: error,
            successMessage: successMessage,
            errorMessage: errorMessage,
            isPasswordReset: true,
            verificationMailSent: false,
            otpVerified: false,
          }),
        );
      })
      .catch(err => {
        let error =
          err?.response?.data || err || err?.response?.data?.errorMessage;
        dispatch(notify(error, 'error'));
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

export const refreshToken = () => {
  callApi('RefreshToken', 'POST', {})
    .then(res => {
      const { status, successMessage, errorMessage, error, token } = res;
      if (status) {
        setWithExpiry('token', token, 1);
      }
    })
    .catch(err => notify(err?.response?.data?.errorMessage, 'error'));
};

const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const OnLogout = () => {
  return async (dispatch, getState) => {
    await getAsyncStorageWithoutExpiry(AsyncStorageKeys.AUTH_TOKEN).then(
      res => {
        console.log(res);
      },
    );
    //await logoutActivity();
    dispatch(setLoading());
    await AsyncStorage.removeItem(AsyncStorageKeys.AUTH_TOKEN);
    //await AsyncStorage.clear()
    //await AsyncStorage.removeItem(AsyncStorageKeys.FIRST_LOGIN);
    dispatch(logout());
    dispatch(
      parentLogin({
        status: false,
      }),
      childrenLogin({
        status: false,
      }),
    );
  };
};
