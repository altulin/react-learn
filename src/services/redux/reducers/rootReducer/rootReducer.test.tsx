import { dataReducer, initialState } from './rootReducer';
import {
  listCurrentIngredients,
  currentIngredient,
  getFeedAction,
  getListIngredients,
  getFeedFailed,
  createdOrder,
} from '../../actions/mainActions/mainActions';
import {} from '../../actions/mainActions/response';

describe('dataReducer', () => {
  const feed: Array<{}> = [];

  it('initial state', () => {
    expect(dataReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('getListIngredients', () => {
    const expectedState = {
      ...initialState,
      feed: false,
      listIngredients: feed,
    };

    expect(dataReducer(initialState, getListIngredients(feed))).toEqual(
      expectedState,
    );
  });

  it('getFeedAction', () => {
    const expectedState = {
      ...initialState,
      feed: true,
    };

    expect(dataReducer(initialState, getFeedAction())).toEqual(expectedState);
  });

  it('getFeedFailed', () => {
    const expectedState = {
      ...initialState,
      feed: false,
      feedError: true,
    };

    expect(dataReducer(initialState, getFeedFailed())).toEqual(expectedState);
  });

  it('listCurrentIngredients', () => {
    const expectedState = {
      ...initialState,
      listConstructor: feed,
    };

    expect(dataReducer(initialState, listCurrentIngredients(feed))).toEqual(
      expectedState,
    );
  });

  it('currentIngredient', () => {
    const expectedState = {
      ...initialState,
      currentIngredient: feed,
      orderNumber: null,
    };

    expect(dataReducer(initialState, currentIngredient(feed))).toEqual(
      expectedState,
    );
  });

  it('createdOrder', () => {
    const expectedState = {
      ...initialState,
      orderNumber: feed,
    };

    expect(dataReducer(initialState, createdOrder(feed))).toEqual(
      expectedState,
    );
  });
});
