import {AuthActionTypes} from '../actions';

const initialState = {
  authenticated: false,
};

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case AuthActionTypes.authenticated:
      return {...state, authenticated: action.payload};
    default:
      return state;
  }
};
