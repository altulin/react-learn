import * as actions from './wsActionConstants';

export interface IConnectionStartAction {
  readonly type: typeof actions.WS_CONNECTION_START;
}
export interface IConnectionSuccessAction {
  readonly type: typeof actions.WS_CONNECTION_SUCCESS;
  // error: undefined;
  // wsConnected: boolean;
}

export interface IConnectionErrorAction {
  readonly type: typeof actions.WS_CONNECTION_ERROR;
  // readonly error: {playload: {}};
  // readonly error: { playload: {} };
}

export interface IConnectionClosedAction {
  readonly type: typeof actions.WS_CONNECTION_CLOSED;
}

export interface IGetMessageAction {
  readonly type: typeof actions.WS_GET_MESSAGE;
  // readonly payload: {};
}

export interface ISendMessageAction {
  readonly type: typeof actions.WS_SEND_MESSAGE;
}

export type TWsActions =
  | IConnectionStartAction
  | IConnectionSuccessAction
  | IConnectionErrorAction
  | IConnectionClosedAction
  | IGetMessageAction
  | ISendMessageAction;
