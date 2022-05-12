import { Dispatch } from 'redux';
import {
  getCookie,
  refreshCookie,
  // accessCookie,
  createNewCookie,
} from './cookie';
import { USER_LOGIN } from '../actions';
import { urlProfile, urlToken } from './endpoints';
import { makeGetRequest, makePostRequest } from '../actions/responseAuth';

export const checkUser = () => {
  return function (dispatch: Dispatch) {
    // const accessToken = getCookie(accessCookie);
    const refreshToken = getCookie(refreshCookie);

    if (refreshToken) {
      makePostRequest(urlToken, {
        token: getCookie(refreshCookie),
      }).then((res) => {
        console.log(res);
        createNewCookie(res);
        makeGetRequest(urlProfile).then((res) => {
          dispatch({
            type: USER_LOGIN,
            feed: res.user,
          });
        });
      });
    }

    // if (accessToken && refreshToken) {
    //   makeGetRequest(urlProfile).then((res) => {
    //     if (res === 403) {
    //       makePostRequest(urlToken, {
    //         token: getCookie(refreshCookie),
    //       }).then((res) => {
    //         createNewCookie(res);
    //       });
    //       console.log(res);
    //     } else {
    //       dispatch({
    //         type: USER_LOGIN,
    //         feed: res.user,
    //       });
    //     }
    //   });
    // }
  };
};
