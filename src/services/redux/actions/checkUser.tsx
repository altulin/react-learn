import { AppDispatch } from '../../..';
import * as actions from './mainActions/mainActions';

import {
  getCookie,
  refreshCookie,
  accessCookie,
  createNewCookie,
  deleteCookie,
} from '../../utils/cookie';

import {
  urlProfile,
  urlLogin,
  urlToken,
  urlRegister,
  urlLogout,
} from '../../utils/endpoints';
import { checkResponse } from './mainActions/response';

export const getUser = () => {
  return async function (dispatch: AppDispatch) {
    dispatch(actions.getUserRequest());

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
          actions.getUserSuccess({
            email: res.user.email,
            name: res.user.name,
          }),
        );
      }
    } catch {
      dispatch(actions.getUserFailed());
    }
  };
};

export const checkUser = () => {
  return function (dispatch: any) {
    const accessToken = getCookie(accessCookie);

    if (accessToken) {
      dispatch(getUser()).finally(() => {
        dispatch(actions.authChecked());
      });
    } else {
      dispatch(actions.authChecked());
      return accessToken;
    }
  };
};

export const loginUser = (value: { email: string; password: string }) => {
  return async function (dispatch: AppDispatch) {
    dispatch(actions.loginUserRequest());

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
            actions.loginUserSuccess({
              email: res.user.email,
              name: res.user.name,
            }),
          );
          createNewCookie(res);
        }
      })
      .catch(() => dispatch(actions.loginUserFailed()));
  };
};

export const registerUser = (value: {
  email: string;
  password: string;
  name: string;
}) => {
  return async function (dispatch: AppDispatch) {
    dispatch(actions.registerUserRequest());

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
            actions.registerUserSuccess({
              email: res.user.email,
              name: res.user.name,
            }),
          );
          createNewCookie(res);
        }
      })
      .catch(() => dispatch(actions.registerUserFailed()));
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

export const patchNewData = (value: {
  email: string;
  login: string;
  password: string;
}) => {
  return async function (dispatch: AppDispatch) {
    dispatch(actions.updateUserRequest());

    try {
      const res = await requestWidthRefresh(urlProfile, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getCookie(accessCookie),
        },
        body: JSON.stringify({
          email: value.email,
          name: value.login,
          password: value.password,
        }),
      });
      if (res) {
        dispatch(
          actions.updateUserSuccess({
            email: res.user.email,
            name: res.user.name,
          }),
        );
      }
    } catch {
      dispatch(actions.updateUserFailed());
    }
  };
};

export const userLogout = () => {
  return async function (dispatch: AppDispatch) {
    dispatch(actions.userLogoutRequest());
    try {
      await fetch(urlLogout, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: getCookie(refreshCookie) }),
      })
        .then((res) => checkResponse(res))
        .then((res) => {
          if (res && res.success) {
            dispatch(actions.userLogoutSuccess());
            deleteCookie(refreshCookie);
            deleteCookie(accessCookie);
          }
        });
    } catch {
      dispatch(actions.userLogoutFailed());
    }
  };
};
