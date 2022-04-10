import {AuthActionTypes} from './actionTypes';

export const authenticated = (value: boolean) => ({
  type: AuthActionTypes.authenticated,
  payload: value,
});
