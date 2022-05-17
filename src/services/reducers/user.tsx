import {
  AUTH_CHECKED,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  USER_LOGOUT,
} from '../actions';

const stateUser = {
  isAuthChecked: false,

  data: null,

  registerUserError: null,
  registerUserRequest: false,

  loginUserError: null,
  loginUserRequest: false,

  getUserError: null,
  getUserRequest: false,

  updateUserError: null,
  updateUserRequest: false,
};

export const userReducer = (
  state = stateUser,
  action: { type: string; feed: any },
) => {
  switch (action.type) {
    case AUTH_CHECKED: {
      return {
        ...state,
        isAuthChecked: true,
      };
    }

    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        registerUserError: null,
        registerUserRequest: true,
      };
    }

    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        data: { name: action.feed.name, email: action.feed.email },
        registerUserRequest: false,
      };
    }

    case REGISTER_USER_FAILED: {
      return {
        ...state,
        registerUserError: true,
        registerUserRequest: false,
      };
    }

    case LOGIN_USER_REQUEST: {
      return {
        ...state,
        loginUserError: null,
        loginUserRequest: true,
      };
    }

    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        data: { name: action.feed.name, email: action.feed.email },
        loginUserRequest: false,
      };
    }

    case LOGIN_USER_FAILED: {
      return {
        ...state,
        loginUserError: true,
        loginUserRequest: false,
        data: null,
      };
    }

    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserError: null,
        getUserRequest: true,
      };
    }

    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUserError: null,
        getUserRequest: false,
        data: { name: action.feed.name, email: action.feed.email },
      };
    }

    case GET_USER_FAILED: {
      return {
        ...state,
        getUserError: true,
        getUserRequest: false,
        data: null,
      };
    }

    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserError: null,
        updateUserRequest: true,
      };
    }

    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateUserError: null,
        updateUserRequest: false,
        data: { name: action.feed.name, email: action.feed.email },
      };
    }

    case UPDATE_USER_FAILED: {
      return {
        ...state,
        updateUserError: true,
        updateUserRequest: false,
        data: null,
      };
    }

    case USER_LOGOUT: {
      return {
        ...state,
        data: null,
      };
    }

    default: {
      return state;
    }
  }
};
