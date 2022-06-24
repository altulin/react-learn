import { TResponseActions } from '../../actions/mainActions/mainActionTypes';
import * as constants from '../../actions/mainActions/mainActionsConstants';

export const stateUser = {
  isAuthChecked: false,

  data: null,

  registerUserError: null,
  registerUserRequest: false,

  loginUserError: false,
  loginUserRequest: false,

  getUserError: false,
  getUserRequest: false,

  updateUserError: false,
  updateUserRequest: false,
};

export const userReducer = (state = stateUser, action: TResponseActions) => {
  switch (action.type) {
    case constants.AUTH_CHECKED: {
      return {
        ...state,
        isAuthChecked: true,
      };
    }

    case constants.REGISTER_USER_REQUEST: {
      return {
        ...state,
        registerUserError: false,
        registerUserRequest: true,
      };
    }

    case constants.REGISTER_USER_SUCCESS: {
      return {
        ...state,
        data: { name: action.feed.name, email: action.feed.email },
        registerUserRequest: false,
      };
    }

    case constants.REGISTER_USER_FAILED: {
      return {
        ...state,
        registerUserError: true,
        registerUserRequest: false,
      };
    }

    case constants.LOGIN_USER_REQUEST: {
      return {
        ...state,
        loginUserError: false,
        loginUserRequest: true,
      };
    }

    case constants.LOGIN_USER_SUCCESS: {
      return {
        ...state,
        data: { name: action.feed.name, email: action.feed.email },
        loginUserRequest: false,
      };
    }

    case constants.LOGIN_USER_FAILED: {
      return {
        ...state,
        loginUserError: true,
        loginUserRequest: false,
        data: null,
      };
    }

    case constants.GET_USER_REQUEST: {
      return {
        ...state,
        getUserError: false,
        getUserRequest: true,
      };
    }

    case constants.GET_USER_SUCCESS: {
      return {
        ...state,
        getUserError: false,
        getUserRequest: false,
        data: { name: action.feed.name, email: action.feed.email },
      };
    }

    case constants.GET_USER_FAILED: {
      return {
        ...state,
        getUserError: true,
        getUserRequest: false,
        data: null,
      };
    }

    case constants.UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserError: false,
        updateUserRequest: true,
      };
    }

    case constants.UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateUserError: false,
        updateUserRequest: false,
        data: { name: action.feed.name, email: action.feed.email },
      };
    }

    case constants.UPDATE_USER_FAILED: {
      return {
        ...state,
        updateUserError: true,
        updateUserRequest: false,
        data: null,
      };
    }

    case constants.USER_LOGOUT_SUCCESS: {
      return {
        ...state,
        data: null,
      };
    }

    case constants.USER_LOGOUT_REQUEST: {
      return {
        ...state,
      };
    }

    case constants.USER_LOGOUT_FAILED: {
      return {
        ...state,
      };
    }

    default: {
      return state;
    }
  }
};
