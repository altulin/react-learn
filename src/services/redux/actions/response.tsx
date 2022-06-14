import {
  GET_LIST_INGREDIENTS,
  GET_FEED,
  GET_FEED_FAILED,
  CREATED_ORDER,
  TResponseActions,
} from '.';

import { AppDispatch } from '../../..';
import { urlOrder, urlIngredients } from '../../utils/endpoints';

export const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const getListIngredients = (data: Array<{}>): TResponseActions => ({
  type: GET_LIST_INGREDIENTS,
  feed: data,
});

const getFeedAction = (): TResponseActions => ({
  type: GET_FEED,
});

const getFeedFailed = (): TResponseActions => ({
  type: GET_FEED_FAILED,
});

const createdOrder = (data: Array<{}>): TResponseActions => ({
  type: CREATED_ORDER,
  feed: data,
});

export const getFeed = () => {
  return async function (dispatch: AppDispatch) {
    dispatch(getFeedAction());

    await fetch(urlIngredients)
      .then(checkResponse)
      .then((data) => {
        dispatch(getListIngredients(data.data));
      })

      .catch(() => {
        dispatch(getFeedFailed());
      });
  };
};

export const getFeedConstructor = (list: Array<string>) => {
  return function (dispatch: AppDispatch) {
    fetch(urlOrder, {
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
        dispatch(createdOrder(data.order.number));
      })
      .catch((e) => console.log(e));
  };
};
