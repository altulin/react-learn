import * as action from './wsActionConstants';
import { TWsActions } from './wsActionTypes';

export const connectionStart = (): TWsActions => ({
  type: action.WS_CONNECTION_START,
});

export const connectionSuccess = (): TWsActions => ({
  type: action.WS_CONNECTION_SUCCESS,
  // error: undefined,
  // wsConnected: true,
});

export const connectionError = (): TWsActions => ({
  type: action.WS_CONNECTION_ERROR,
  // error: playload,
});

export const connectionClosed = (): TWsActions => ({
  type: action.WS_CONNECTION_CLOSED,
});

export const getMessage = (): TWsActions => ({
  type: action.WS_GET_MESSAGE,
});
