import {
  FetchTodoActionTypes,
  StoreTodoActionTypes,
  TodoActionTypes,
} from '../actions/actionTypes';

const initialState: any = {
  todo: [],
  loading: false,
  savingTodo: false,
};

export const todoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case TodoActionTypes.add_todo:
      return {...state, todo: [...state.todo, action.payload]};
    case TodoActionTypes.remove_todo: {
      const newArray = Array.from(state.todo);
      newArray.splice(action.payload, 1);
      return {...state, todo: newArray};
    }
    case TodoActionTypes.set_todo:
      return {...state, todo: action.payload};

    case FetchTodoActionTypes.fetch_todo_sucess:
      return {...state, loading: false};
    case FetchTodoActionTypes.fetch_todo_failed:
      return {...state, loading: false};
    case FetchTodoActionTypes.fetching_todo:
      return {...state, loading: true};

    case StoreTodoActionTypes.saving_todo:
      return {...state, savingTodo: true};
    case StoreTodoActionTypes.save_todo_sucess:
      return {...state, savingTodo: false};

    default:
      return state;
  }
};
