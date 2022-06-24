import * as actions from './mainActionsConstants';

export interface IGetListIngredientsAction {
  readonly type: typeof actions.GET_LIST_INGREDIENTS;
  readonly feed: Array<{}>;
}

export interface IGetFeedAction {
  readonly type: typeof actions.GET_FEED;
}

export interface IGetFeedFailedAction {
  readonly type: typeof actions.GET_FEED_FAILED;
}

export interface ICreatedOrderAction {
  readonly type: typeof actions.CREATED_ORDER;
  readonly feed: Array<{}>;
}

export interface IListCurrentIngredientsAction {
  readonly type: typeof actions.LIST_CURRENT_INGREDIENTS;
  readonly feed: Array<{}>;
}

export interface ICurrentIngredientAction {
  readonly type: typeof actions.CURRENT_INGREDIENT;
  readonly feed: {};
}

export interface IUpdateUserRequestAction {
  readonly type: typeof actions.UPDATE_USER_REQUEST;
}

export interface IUpdateUserSuccessAction {
  readonly type: typeof actions.UPDATE_USER_SUCCESS;
  readonly feed: { email: string; name: string };
}

export interface IUpdateUserFailedAction {
  readonly type: typeof actions.UPDATE_USER_FAILED;
}

export interface IAuthCheckedAction {
  readonly type: typeof actions.AUTH_CHECKED;
}

export interface IRegisterUserRequestAction {
  readonly type: typeof actions.REGISTER_USER_REQUEST;
}

export interface IRegisterUserFailedAction {
  readonly type: typeof actions.REGISTER_USER_FAILED;
}

export interface IRegisterUserSuccessAction {
  readonly type: typeof actions.REGISTER_USER_SUCCESS;
  readonly feed: { email: string; name: string };
}

export interface ILoginUserSuccessAction {
  readonly type: typeof actions.LOGIN_USER_SUCCESS;
  readonly feed: { email: string; name: string };
}

export interface ILoginUserFailedAction {
  readonly type: typeof actions.LOGIN_USER_FAILED;
}

export interface ILoginUserRequestAction {
  readonly type: typeof actions.LOGIN_USER_REQUEST;
}

export interface IGetUserSuccessAction {
  readonly type: typeof actions.GET_USER_SUCCESS;
  readonly feed: { email: string; name: string };
}

export interface IGetUserFailedAction {
  readonly type: typeof actions.GET_USER_FAILED;
}

export interface IGetUserRequestAction {
  readonly type: typeof actions.GET_USER_REQUEST;
}
export interface IUserLogoutRequestAction {
  readonly type: typeof actions.USER_LOGOUT_REQUEST;
}
export interface IUserLogoutSuccessAction {
  readonly type: typeof actions.USER_LOGOUT_SUCCESS;
}
export interface IUserLogoutFailedAction {
  readonly type: typeof actions.USER_LOGOUT_FAILED;
}

export interface ITestAction {
  type: undefined;
}

export type TResponseActions =
  | IGetListIngredientsAction
  | IGetFeedAction
  | IGetFeedFailedAction
  | ICreatedOrderAction
  | IListCurrentIngredientsAction
  | ICurrentIngredientAction
  | IUpdateUserRequestAction
  | IUpdateUserSuccessAction
  | IUpdateUserFailedAction
  | IAuthCheckedAction
  | IRegisterUserRequestAction
  | IRegisterUserFailedAction
  | IRegisterUserSuccessAction
  | ILoginUserSuccessAction
  | ILoginUserRequestAction
  | ILoginUserFailedAction
  | IGetUserSuccessAction
  | IGetUserFailedAction
  | IGetUserRequestAction
  | ITestAction
  | IUserLogoutRequestAction
  | IUserLogoutSuccessAction
  | IUserLogoutFailedAction;
