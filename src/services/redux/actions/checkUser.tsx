import { AppDispatch } from '../../..';

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
  TResponseActions,
} from '.';

import {
  getCookie,
  refreshCookie,
  accessCookie,
  createNewCookie,
} from '../../utils/cookie';

import {
  urlProfile,
  urlLogin,
  urlToken,
  urlRegister,
} from '../../utils/endpoints';
import { checkResponse } from './response';
// import { type } from 'os';

export const getUser = () => {
  const getUserSuccess = (feed: {
    email: string;
    name: string;
  }): TResponseActions => ({
    type: GET_USER_SUCCESS,
    feed,
  });

  const getUserRequest = (): TResponseActions => ({
    type: GET_USER_REQUEST,
  });

  const getUserFailed = (): TResponseActions => ({
    type: GET_USER_FAILED,
  });
  return async function (dispatch: AppDispatch) {
    dispatch(getUserRequest());

    try {
      const res = await requestWidthRefresh(urlProfile, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getCookie(accessCookie),
        },
      });
      if (res) {
        dispatch(
          getUserSuccess({ email: res.user.email, name: res.user.name }),
        );
      }
    } catch {
      dispatch(getUserFailed());
    }
  };
};

export const checkUser = () => {
  const authChecked = (): TResponseActions => ({
    type: AUTH_CHECKED,
  });

  return function (dispatch: any) {
    const accessToken = getCookie(accessCookie);

    if (accessToken) {
      dispatch(getUser()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
      return accessToken;
    }
  };
};

export const loginUser = (value: { email: string; password: string }) => {
  const loginUserSuccess = (feed: {
    email: string;
    name: string;
  }): TResponseActions => ({
    type: LOGIN_USER_SUCCESS,
    feed,
  });

  const loginUserRequest = (): TResponseActions => ({
    type: LOGIN_USER_REQUEST,
  });

  const loginUserFailed = (): TResponseActions => ({
    type: LOGIN_USER_FAILED,
  });

  return async function (dispatch: AppDispatch) {
    dispatch(loginUserRequest());

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
          dispatch(
            loginUserSuccess({
              email: res.user.email,
              name: res.user.name,
            }),
          );
          createNewCookie(res);
        }
      })
      .catch(() => dispatch(loginUserFailed()));
  };
};

export const registerUser = (value: {
  email: string;
  password: string;
  name: string;
}) => {
  const registerUserRequest = (): TResponseActions => ({
    type: REGISTER_USER_REQUEST,
  });

  const registerUserFailed = (): TResponseActions => ({
    type: REGISTER_USER_FAILED,
  });

  const registerUserSuccess = (feed: {
    email: string;
    name: string;
  }): TResponseActions => ({
    type: REGISTER_USER_SUCCESS,
    feed,
  });

  return async function (dispatch: AppDispatch) {
    dispatch(registerUserRequest());

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
          dispatch(
            registerUserSuccess({ email: res.user.email, name: res.user.name }),
          );
          createNewCookie(res);
        }
      })
      .catch(() => dispatch(registerUserFailed()));
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

type THeaders = {
  Authorization: string;
  'Content-Type': 'application/json';
};

export const requestWidthRefresh = async (
  url: string,
  options: { headers: THeaders; method: string; body?: any },
) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === 'jwt expired') {
      const refresh = await refreshToken();

      if (!refresh.success) {
        Promise.reject(refresh);
      }

      createNewCookie(refresh);

      options.headers.Authorization = refresh.accessToken;

      const response = await fetch(url, options);

      return await checkResponse(response);
    } else {
      return Promise.reject(err);
    }
  }
};
