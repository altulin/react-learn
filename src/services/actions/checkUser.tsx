import { Dispatch } from 'redux';

import {
  AUTH_CHECKED,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
} from '.';

import {
  getCookie,
  refreshCookie,
  accessCookie,
  createNewCookie,
  deleteCookie,
} from '../utils/cookie';

import {
  urlProfile,
  urlLogin,
  urlToken,
  urlRegister,
} from '../utils/endpoints';
import { checkResponse } from './response';

export const getUser = () => {
  return function (dispatch: Dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });

    return requestWidthRefresh(urlProfile, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie(accessCookie),
      },
    })
      .then((res) => {
        if (res) {
          dispatch({
            type: GET_USER_SUCCESS,
            feed: { email: res.user.email, name: res.user.name },
          });
        }
      })
      .catch(() => {
        dispatch({
          type: GET_USER_FAILED,
        });
      });
  };
};

export const checkUser = () => {
  return function (dispatch: any) {
    const accessToken = getCookie(accessCookie);

    if (accessToken) {
      dispatch(getUser()).finally(() => {
        dispatch({ type: AUTH_CHECKED });
      });
    } else {
      dispatch({ type: AUTH_CHECKED });
    }
  };
};

export const loginUser = (value: { email: string; password: string }) => {
  return async function (dispatch: Dispatch) {
    dispatch({
      type: LOGIN_USER_REQUEST,
    });

    await fetch(urlLogin, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    })
      .then((res) => checkResponse(res))
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: LOGIN_USER_SUCCESS,
            feed: { email: res.user.email, name: res.user.name },
          });
          createNewCookie(res);
        }
      })
      .catch(() =>
        dispatch({
          type: LOGIN_USER_FAILED,
        }),
      );
  };
};

export const registerUser = (value: {
  email: string;
  password: string;
  name: string;
}) => {
  return async function (dispatch: Dispatch) {
    console.log(value);
    dispatch({
      type: REGISTER_USER_REQUEST,
    });

    await fetch(urlRegister, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    })
      .then((res) => checkResponse(res))
      .then((res) => {
        if (res && res.success) {
          console.log({ email: res.user.email, name: res.user.name });
          dispatch({
            type: REGISTER_USER_SUCCESS,
            feed: { email: res.user.email, name: res.user.name },
          });
          createNewCookie(res);
        }
      })
      .catch(() =>
        dispatch({
          type: REGISTER_USER_FAILED,
        }),
      );
  };
};

export const refreshToken = async () => {
  return await fetch(urlToken, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: getCookie(refreshCookie) }),
  }).then((res) => checkResponse(res));
};

export const requestWidthRefresh = async (
  url: string,
  options: { headers: any; method: string; body?: any },
) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === 'jwt expired') {
      console.log(err.message);
      await refreshToken().then((r) => {
        if (!r.success) {
          Promise.reject(r);
        }
        deleteCookie(accessCookie);
        deleteCookie(refreshCookie);

        createNewCookie(r);
        options.headers.authorization = getCookie(accessCookie);
      });

      const response = await fetch(url, options);
      return await checkResponse(response);
    } else {
      return Promise.reject(err);
    }
  }
};
