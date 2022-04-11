import {AuthActionTypes} from '../actionTypes';
import {authenticated} from '../authActions';

it('user authenticated', () => {
  const expectedAction = {
    type: AuthActionTypes.set_authenticated,
    payload: true,
  };
  expect(authenticated(true)).toEqual(expectedAction);
});
