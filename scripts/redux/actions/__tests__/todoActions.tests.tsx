import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  addTodo,
  fetchTodo,
  removeTodo,
  setTodo,
  storeTodo,
} from '../todoActions';
import {
  TodoActionTypes,
  FetchTodoActionTypes,
  StoreTodoActionTypes,
} from '../actionTypes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

it('add todo ', () => {
  const expectedAction = {
    type: TodoActionTypes.add_todo,
    payload: 'Hello world',
  };
  expect(addTodo('Hello world')).toEqual(expectedAction);
});

it('remove todo', () => {
  const expectedAction = {
    type: TodoActionTypes.remove_todo,
    payload: 0,
  };
  expect(removeTodo(0)).toEqual(expectedAction);
});

it('set todo', () => {
  const expectedAction = {
    type: TodoActionTypes.set_todo,
    payload: ['Hello world'],
  };
  expect(setTodo(['Hello world'])).toEqual(expectedAction);
});

it('fetch todos', () => {
  const store = mockStore([]);
  store.dispatch(fetchTodo() as any).then(() => {
    const actions = store.getActions();
    const expected = [
      {type: FetchTodoActionTypes.fetching_todo},
      {type: TodoActionTypes.set_todo, payload: []},
      {type: FetchTodoActionTypes.fetch_todo_sucess},
    ];

    expect(actions).toEqual(expected);
  });
});

it('save todos', () => {
  const store = mockStore([]);
  store.dispatch(storeTodo() as any).then(() => {
    const actions = store.getActions();
    const expected = [
      {type: StoreTodoActionTypes.saving_todo},
      {type: StoreTodoActionTypes.save_todo_sucess},
    ];

    expect(actions).toEqual(expected);
  });
});
