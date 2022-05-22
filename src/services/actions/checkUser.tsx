import { Dispatch } from 'redux';

import {
  AUTH_CHECKED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
} from '.';

import {
  getCookie,
  refreshCookie,
  accessCookie,
  createNewCookie,
} from '../utils/cookie';

import { urlProfile, urlToken } from '../utils/endpoints';
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

          // dispatch({ type: AUTH_CHECKED });
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

// export const loginUser = (value: { email: string; password: string }) => {
//   return async function (dispatch: Dispatch) {
//     dispatch({
//       type: LOGIN_USER_REQUEST,
//     });

//     await fetch(urlLogin, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(value),
//     })
//       .then((res) => checkResponse(res))
//       .then((res) => {
//         if (res && res.success) {
//           dispatch({
//             type: LOGIN_USER_SUCCESS,
//             feed: { email: res.user.email, name: res.user.name },
//           });
//           createNewCookie(res);
//         }
//       })
//       .catch(() =>
//         dispatch({
//           type: LOGIN_USER_FAILED,
//         }),
//       );
//   };
// };
/*
export const registerUser = (value: {
  email: string;
  password: string;
  name: string;
}) => {
  return async function (dispatch: Dispatch) {
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
*/

interface TRequestOptions {
  type: string | boolean;
  method: string;
  body: {
    email: string;
    name?: string;
    password?: string;
  } | null;
  isSaveCookie: boolean;
  authorization: null | string;
}

export const request: (url: string, options: TRequestOptions) => void = (
  url,
  options,
) => {
  return async function (dispatch: Dispatch) {
    const { type, method, body, isSaveCookie, authorization } = options;
    console.log(options);

    dispatch({
      type: `${type}_USER_REQUEST}`,
    });

    await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization ? authorization : '',
      },
      body: JSON.stringify(body),
    })
      .then((res) => checkResponse(res))
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: `${type}_USER_SUCCESS`,
            feed: { email: res.user.email, name: res.user.name },
          });

          isSaveCookie && createNewCookie(res);
        }
      })
      .catch(() =>
        dispatch({
          type: `${type}_USER_FAILED`,
        }),
      );
  };
};

export const requestAndRefresh: (
  url: string,
  options: TRequestOptions,
) => void = (url, options) => {
  // try {
  // console.log(options);
  // request(url, options);

  return async function (dispatch: Dispatch) {
    // dispatch({
    //   type: `${options.type}_USER_REQUEST}`,
    // });
  };

  // } catch (err: any) {
  // if (err.message === 'jwt expired') {
  // refreshToken().then((res) => {
  // options.isSaveCookie = true;
  // options.authorization = res.accessToken;
  // request(url, options);
  // });
  // }
  // }
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
