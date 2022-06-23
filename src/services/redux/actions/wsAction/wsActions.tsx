import * as action from './wsActionConstants';
import { TWsActions } from './wsActionTypes';
import { IOrder } from '../../../../pages/feed/FeedPage';

export const connectionStart = (): TWsActions => ({
  type: action.WS_CONNECTION_START,
});

export const connectionSuccess = (): TWsActions => ({
  type: action.WS_CONNECTION_SUCCESS,
});

export const connectionError = (payload: IOrder | any): TWsActions => ({
  type: action.WS_CONNECTION_ERROR,
  payload,
});

export const connectionClosed = (): TWsActions => ({
  type: action.WS_CONNECTION_CLOSED,
});

export const getMessage = (payload: IOrder | any): TWsActions => ({
  type: action.WS_GET_MESSAGE,
  payload,
});
