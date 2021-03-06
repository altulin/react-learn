import * as actions from './wsActionConstants';
import { IOrder } from '../../../../pages/feed/FeedPage';

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
  readonly payload: IOrder;
}

export interface IConnectionClosedAction {
  readonly type: typeof actions.WS_CONNECTION_CLOSED;
}

export interface IGetMessageAction {
  readonly type: typeof actions.WS_GET_MESSAGE;
  readonly payload: IOrder;
}

export interface ISendMessageAction {
  readonly type: typeof actions.WS_SEND_MESSAGE;
}

export interface ITestAction {
  type: undefined;
}

export type TWsActions =
  | IConnectionStartAction
  | IConnectionSuccessAction
  | IConnectionErrorAction
  | IConnectionClosedAction
  | IGetMessageAction
  | ISendMessageAction
  | ITestAction;
