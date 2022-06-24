import * as types from './mainActionsConstants';
import { authChecked } from './mainActions';

describe('Action creators', () => {
  it('authChecked', () => {
    const expectedAuthChecked = {
      type: types.AUTH_CHECKED,
    };

    expect(authChecked()).toEqual(expectedAuthChecked);
  });
});
