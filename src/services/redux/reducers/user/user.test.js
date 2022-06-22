import { userReducer, stateUser } from './user';
import * as action from '../../actions/mainActions/mainActions';
import {
  registerUser,
  loginUser,
  getUser,
  patchNewData,
  userLogout,
} from '../../actions/checkUser';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

describe('dataReducer', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const value = { email: 'email', password: 'password', name: 'name' };
  const feed = { email: 'email', name: 'name' };

  const jestSuccess = () => {
    return jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        success: true,
        user: value,
      }),
    });
  };

  const jestFail = () => {
    return jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
    });
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('initial state', () => {
    expect(userReducer(undefined, { type: undefined })).toEqual(stateUser);
  });

  it('authChecked', () => {
    const expectedState = {
      ...stateUser,
      isAuthChecked: true,
    };

    expect(userReducer(stateUser, action.authChecked())).toEqual(expectedState);
  });

  it('register success', async () => {
    const store = mockStore(stateUser);

    const expectedActions = [
      action.registerUserRequest(),
      action.registerUserSuccess(feed),
    ];

    jestSuccess();

    return store.dispatch(registerUser(value)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('register fail', async () => {
    const expectedActions = [
      action.registerUserRequest(),
      action.registerUserFailed(),
    ];
    const store = mockStore(stateUser);

    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
    });

    return store.dispatch(registerUser(value)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('login success', async () => {
    const store = mockStore(stateUser);

    const expectedActions = [
      action.loginUserRequest(),
      action.loginUserSuccess(feed),
    ];

    jestSuccess();

    return store.dispatch(loginUser(value)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('login fail', async () => {
    const store = mockStore(stateUser);
    const expectedActions = [
      action.loginUserRequest(),
      action.loginUserFailed(),
    ];

    jestFail();

    return store.dispatch(loginUser(value)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('getUser success', async () => {
    const store = mockStore(stateUser);

    const expectedActions = [
      action.getUserRequest(),
      action.getUserSuccess(feed),
    ];

    jestSuccess();

    return store.dispatch(getUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('getUser fail', async () => {
    const store = mockStore(stateUser);
    const expectedActions = [action.getUserRequest(), action.getUserFailed()];

    jestFail();

    return store.dispatch(getUser(value)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('updateUser success', async () => {
    const store = mockStore(stateUser);

    const expectedActions = [
      action.updateUserRequest(),
      action.updateUserSuccess(feed),
    ];

    jestSuccess();

    return store.dispatch(patchNewData(value)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  it('updateUser fail', async () => {
    const store = mockStore(stateUser);
    const expectedActions = [
      action.updateUserRequest(),
      action.updateUserFailed(),
    ];

    jestFail();

    return store.dispatch(patchNewData(value)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('logoutUser success', async () => {
    const store = mockStore(stateUser);
    const expectedActions = [
      action.userLogoutRequest(),
      action.userLogoutSuccess(),
    ];

    jestSuccess();

    return store.dispatch(userLogout()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('logoutUser fail', async () => {
    const store = mockStore(stateUser);
    const expectedActions = [
      action.userLogoutRequest(),
      action.userLogoutFailed(),
    ];

    jestFail();

    return store.dispatch(userLogout()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
