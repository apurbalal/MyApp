import {authenticated} from '../../actions';
import {authReducer} from '../authReducer';

describe('auth reducer', () => {
  const initialState = {
    authenticated: false,
  };

  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle authenticated', () => {
    expect(authReducer(initialState, authenticated(true))).toEqual({
      authenticated: true,
    });
  });
});
