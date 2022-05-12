import { TOKEN_CHACKED, USER_LOGIN } from '../actions';

const stateUser = {
  isAuthChecked: true,
  data: null,
};

export const userReducer = (
  state = stateUser,
  action: { type: string; feed: any },
) => {
  switch (action.type) {
    case TOKEN_CHACKED: {
      return {
        ...state,
        isAuthChecked: true,
      };
    }

    case USER_LOGIN: {
      return {
        ...state,
        data: { name: action.feed.name, email: action.feed.email },
      };
    }

    default: {
      return state;
    }
  }
};
