import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FetchTodoActionTypes,
  StoreTodoActionTypes,
  TodoActionTypes,
} from './actionTypes';

export const addTodo = (data: string) => ({
  type: TodoActionTypes.add_todo,
  payload: data,
});

export const removeTodo = (index: number) => ({
  type: TodoActionTypes.remove_todo,
  payload: index,
});

export const setTodo = (data: Array<string>) => ({
  type: TodoActionTypes.set_todo,
  payload: data,
});

export const fetchTodo = () => {
  return async (dispatch: any) => {
    try {
      dispatch({type: FetchTodoActionTypes.fetching_todo});
      const data = await AsyncStorage.getItem('@todo').then(response =>
        JSON.parse(response ?? '[]'),
      );
      dispatch(setTodo(data));
      dispatch({type: FetchTodoActionTypes.fetch_todo_sucess});
    } catch (err) {
      dispatch({type: FetchTodoActionTypes.fetch_todo_failed});
      console.log(err);
    }
  };
};

export const storeTodo = () => {
  return async (dispatch: any, getState: any) => {
    const {todo} = getState();
    try {
      dispatch({type: StoreTodoActionTypes.saving_todo});
      await AsyncStorage.setItem('@todo', JSON.stringify(todo?.todo ?? []));
      dispatch({type: StoreTodoActionTypes.save_todo_sucess});
    } catch (err) {
      dispatch({type: StoreTodoActionTypes.save_todo_failed});
      console.log(err);
    }
  };
};
