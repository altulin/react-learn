import {
  GET_LIST_INGREDIENTS,
  GET_FEED,
  GET_FEED_FAILED,
  CREATED_ORDER,
} from '.';
import { Dispatch } from 'redux';

const baseUrl = 'https://norma.nomoreparties.space/api/';
const URL = `${baseUrl}ingredients`;
const URL_ORDERS = `${baseUrl}orders`;

export const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getFeed = () => {
  return async function (dispatch: Dispatch) {
    dispatch({
      type: GET_FEED,
    });

    await fetch(URL)
      .then(checkResponse)
      .then((data) => {
        dispatch({
          type: GET_LIST_INGREDIENTS,
          feed: data.data,
        });
      })

      .catch(() => {
        dispatch({
          type: GET_FEED_FAILED,
        });
      });
  };
};

export const getFeedConstructor = (list: []) => {
  return function (dispatch: Dispatch) {
    fetch(URL_ORDERS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients: list,
      }),
    })
      .then(checkResponse)
      .then((data) => {
        dispatch({
          type: CREATED_ORDER,
          feed: data.order.number,
        });
      })
      .catch((e) => console.log(e));
  };
};
