import {AuthActionTypes} from './actionTypes';

export const authenticated = (value: boolean) => ({
  type: AuthActionTypes.set_authenticated,
  payload: value,
});
