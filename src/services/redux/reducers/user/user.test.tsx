import { userReducer, stateUser } from './user';
// import { listCurrentIngredients } from '../../actions/mainActions/mainActions';
import {} from '../../actions/mainActions/response';
import {
  authChecked,
  registerUserSuccess,
  registerUserRequest,
  registerUserFailed,
} from '../../actions/mainActions/mainActions';
import registerUser from '../../actions/registerUser';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import { jest } from '@jest/globals';
// fetchMock.mock('https://norma.nomoreparties.space/api/auth/register', 200);

describe('dataReducer', () => {
  // fetchMock.mock('https://norma.nomoreparties.space/api/auth/register', 200);

  // console.log(registerUser);
  // const feed: Array<{}> = [];
  // jest.mock('registerUser');
  // let response;

  // beforeEach(() => {
  //   // jest.spyOn(global, 'fetch').mockResolvedValue('default');
  //   const test = jest
  //     .spyOn(global, 'fetch')<() => Promise<number>>()
  //     .mockResolvedValue(43);

  //   await test();
  // });

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

    expect(userReducer(stateUser, authChecked())).toEqual(expectedState);
  });

  it('register', async () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);

    const feed = { email: 'email', name: 'name' };

    const expectedActions = [
      { type: 'REGISTER_USER_FAILED' },
      { type: 'REGISTER_USER_REQUEST' },
      {
        type: 'REGISTER_USER_SUCCESS',
        feed: feed,
      },
    ];

    jest.mock('node-fetch');
    fetchMock.getOnce('https://norma.nomoreparties.space/api/auth/register', {
      hello: 'world',
    });

    // fetchMock.get('http://google.com/', 200);

    // fetchMock.get('https://norma.nomoreparties.space/api/auth/register', {
    //   hello: 'world',
    // });

    // fetchMock.getOnce('registerUser', {
    // body: { todos: ['do something'] },
    // headers: { 'content-type': 'application/json' }
    // });

    // fetchMock.getOnce('registerUser', {
    //   body: { todos: ['do something'] },
    //   headers: { 'content-type': 'application/json' },
    // });

    const store: any = mockStore(stateUser);

    // registerUser.getMo; // const store: any = mockStore(stateUser);
    const value = { email: 'email', password: 'password', name: 'name' };

    return store.dispatch(registerUser(value)).then(() => {
      // console.log(store);
      // expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
