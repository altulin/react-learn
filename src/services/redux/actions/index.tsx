export const GET_LIST_INGREDIENTS: 'LIST_INGREDIENTS' = 'LIST_INGREDIENTS';
export const LIST_CURRENT_INGREDIENTS: 'LIST_CURRENT_INGREDIENTS' =
  'LIST_CURRENT_INGREDIENTS';
export const CURRENT_INGREDIENT: 'CURRENT_INGREDIENT' = 'CURRENT_INGREDIENT';
export const CREATED_ORDER: 'CREATED_ORDER' = 'CREATED_ORDER';
export const GET_FEED: 'GET_FEED' = 'GET_FEED';
export const GET_FEED_FAILED: 'GET_FEED_FAILED' = 'GET_FEED_FAILED';

export const AUTH_CHECKED: 'AUTH_CHECKED' = 'AUTH_CHECKED';
export const REGISTER_USER_REQUEST: 'REGISTER_USER_REQUEST' =
  'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS' =
  'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED: 'REGISTER_USER_FAILED' =
  'REGISTER_USER_FAILED';
export const LOGIN_USER_REQUEST: 'LOGIN_USER_REQUEST' = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS' = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED: 'LOGIN_USER_FAILED' = 'LOGIN_USER_FAILED';
export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED';
export const UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST' = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS' = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED: 'UPDATE_USER_FAILED' = 'UPDATE_USER_FAILED';
export const USER_LOGOUT: 'USER_LOGOUT' = 'USER_LOGOUT';

export interface IGetListIngredientsAction {
  readonly type: typeof GET_LIST_INGREDIENTS;
  readonly feed: Array<{}>;
}

export interface IGetFeedAction {
  readonly type: typeof GET_FEED;
}

export interface IGetFeedFailedAction {
  readonly type: typeof GET_FEED_FAILED;
}

export interface ICreatedOrderAction {
  readonly type: typeof CREATED_ORDER;
  readonly feed: Array<{}>;
}

export interface IListCurrentIngredientsAction {
  readonly type: typeof LIST_CURRENT_INGREDIENTS;
  readonly feed: Array<{}>;
}

export interface ICurrentIngredientAction {
  readonly type: typeof CURRENT_INGREDIENT;
  readonly feed: {};
}

export interface IUpdateUserRequestAction {
  readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUserLogoutAction {
  readonly type: typeof USER_LOGOUT;
}

export interface IUpdateUserSuccessAction {
  readonly type: typeof UPDATE_USER_SUCCESS;
}

export interface IUpdateUserFailedAction {
  readonly type: typeof UPDATE_USER_FAILED;
}

export interface IAuthCheckedAction {
  readonly type: typeof AUTH_CHECKED;
}

export interface IRegisterUserRequestAction {
  readonly type: typeof REGISTER_USER_REQUEST;
}

export interface IRegisterUserFailedAction {
  readonly type: typeof REGISTER_USER_FAILED;
}

export interface IRegisterUserSuccessAction {
  readonly type: typeof REGISTER_USER_SUCCESS;
  readonly feed: { email: string; name: string };
}

export interface ILoginUserSuccessAction {
  readonly type: typeof LOGIN_USER_SUCCESS;
  readonly feed: { email: string; name: string };
}

export interface ILoginUserFailedAction {
  readonly type: typeof LOGIN_USER_FAILED;
}

export interface ILoginUserRequestAction {
  readonly type: typeof LOGIN_USER_REQUEST;
}

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  readonly feed: { email: string; name: string };
}

export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
}

export interface IGetUserRequestAction {
  readonly type: typeof GET_USER_REQUEST;
}

export type TResponseActions =
  | IGetListIngredientsAction
  | IGetFeedAction
  | IGetFeedFailedAction
  | ICreatedOrderAction
  | IListCurrentIngredientsAction
  | ICurrentIngredientAction
  | IUpdateUserRequestAction
  | IUserLogoutAction
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
  | IGetUserRequestAction;
