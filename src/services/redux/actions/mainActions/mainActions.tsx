import * as constants from './mainActionsConstants';
import { TResponseActions } from './mainActionTypes';

export const getListIngredients = (data: Array<{}>): TResponseActions => ({
  type: constants.GET_LIST_INGREDIENTS,
  feed: data,
});

export const getFeedAction = (): TResponseActions => ({
  type: constants.GET_FEED,
});

export const getFeedFailed = (): TResponseActions => ({
  type: constants.GET_FEED_FAILED,
});

export const createdOrder = (data: Array<{}>): TResponseActions => ({
  type: constants.CREATED_ORDER,
  feed: data,
});

export const listCurrentIngredients = (feed: Array<{}>): TResponseActions => ({
  type: constants.LIST_CURRENT_INGREDIENTS,
  feed,
});

export const currentIngredient = (feed: {}): TResponseActions => ({
  type: constants.CURRENT_INGREDIENT,
  feed,
});

export const authChecked = (): TResponseActions => ({
  type: constants.AUTH_CHECKED,
});

export const registerUserRequest = (): TResponseActions => ({
  type: constants.REGISTER_USER_REQUEST,
});

export const registerUserFailed = (): TResponseActions => ({
  type: constants.REGISTER_USER_FAILED,
});

export const registerUserSuccess = (feed: {
  email: string;
  name: string;
}): TResponseActions => ({
  type: constants.REGISTER_USER_SUCCESS,
  feed,
});

export const loginUserSuccess = (feed: {
  email: string;
  name: string;
}): TResponseActions => ({
  type: constants.LOGIN_USER_SUCCESS,
  feed,
});

export const loginUserRequest = (): TResponseActions => ({
  type: constants.LOGIN_USER_REQUEST,
});

export const loginUserFailed = (): TResponseActions => ({
  type: constants.LOGIN_USER_FAILED,
});

export const getUserSuccess = (feed: {
  email: string;
  name: string;
}): TResponseActions => ({
  type: constants.GET_USER_SUCCESS,
  feed,
});

export const getUserRequest = (): TResponseActions => ({
  type: constants.GET_USER_REQUEST,
});

export const getUserFailed = (): TResponseActions => ({
  type: constants.GET_USER_FAILED,
});

export const updateUserRequest = (): TResponseActions => ({
  type: constants.UPDATE_USER_REQUEST,
});

export const updateUserSuccess = (feed: {
  email: string;
  name: string;
}): TResponseActions => ({
  type: constants.UPDATE_USER_SUCCESS,
  feed,
});

export const updateUserFailed = (): TResponseActions => ({
  type: constants.UPDATE_USER_FAILED,
});

export const userLogoutSuccess = (): TResponseActions => ({
  type: constants.USER_LOGOUT_SUCCESS,
});

export const userLogoutFailed = (): TResponseActions => ({
  type: constants.USER_LOGOUT_FAILED,
});

export const userLogoutRequest = (): TResponseActions => ({
  type: constants.USER_LOGOUT_REQUEST,
});
