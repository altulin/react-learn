import { wsReducer, initialState } from './wsAllReducer';
import * as actions from '../../actions/wsAction/wsActions';

describe('wsReducer', () => {
  // const middlewares = [thunk];
  // const mockStore = configureMockStore(middlewares);

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('initial state', () => {
    expect(wsReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('connection Success', () => {
    const expectedState = {
      ...initialState,
      error: undefined,
      wsConnected: true,
    };

    expect(wsReducer(initialState, actions.connectionSuccess())).toEqual(
      expectedState,
    );
  });

  it('connection Error', () => {
    const expectedState = {
      ...initialState,
      error: {},
      wsConnected: false,
    };
    expect(wsReducer(initialState, actions.connectionError({}))).toEqual(
      expectedState,
    );
  });

  it('connection Closed', () => {
    const expectedState = {
      ...initialState,
      error: undefined,
      wsConnected: false,
      messages: { success: false },
    };

    expect(wsReducer(initialState, actions.connectionClosed())).toEqual(
      expectedState,
    );
  });
});
