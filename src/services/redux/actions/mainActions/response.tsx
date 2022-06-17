import {
  getListIngredients,
  getFeedAction,
  getFeedFailed,
  createdOrder,
} from './mainActions';

import { AppDispatch } from '../../../..';
import { urlOrder, urlIngredients } from '../../../utils/endpoints';

export const checkResponse = (res: Response) => {
  console.log(res);
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

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
