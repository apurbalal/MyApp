import thunk from 'redux-thunk';
import {applyMiddleware, createStore, combineReducers} from 'redux';
import {authReducer} from './reducers/authReducer';
import {todoReducer} from './reducers/todoReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  todo: todoReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
