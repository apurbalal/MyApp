import {todoReducer} from '../todoReducer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {addTodo, fetchTodo, removeTodo, setTodo} from '../../actions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('account reducer', () => {
  it('should return the initial state', () => {
    expect(todoReducer(undefined, {})).toEqual({
      todo: [],
      loading: false,
      savingTodo: false,
    });
  });

  const initialState = {
    todo: ['Hello world'],
    savingTodo: false,
    loading: false,
  };

  it('should handle add_todo', () => {
    expect(todoReducer(initialState, addTodo('Hello world 2'))).toEqual({
      todo: ['Hello world', 'Hello world 2'],
      savingTodo: false,
      loading: false,
    });
  });

  it('should handle remove_todo', () => {
    expect(todoReducer(initialState, removeTodo(0))).toEqual({
      todo: [],
      savingTodo: false,
      loading: false,
    });
  });

  it('should handle set_todo', () => {
    expect(todoReducer(initialState, setTodo(['Todo 3']))).toEqual({
      todo: ['Todo 3'],
      savingTodo: false,
      loading: false,
    });
  });

  it('should fetch todos', () => {
    const store = mockStore(initialState);
    store.dispatch(fetchTodo() as any).then(() => {
      const state = store.getState();
      expect(state).toEqual({todo: [], savingTodo: false, loading: false});
    });
  });

  it('should store todos state remain same', () => {
    const store = mockStore(initialState);
    store.dispatch(fetchTodo() as any).then(() => {
      const state = store.getState();
      expect(state).toEqual(initialState);
    });
  });
});
