import {
  addTodo,
  fetchTodo,
  removeTodo,
  storeTodo,
  updateTodo,
} from '../redux/actions';
import {connect} from 'react-redux';
import Todo from '../pages/Todo';

const mapStateToProps = (state: any) => ({
  todo: state.todo.todo,
  autoSaving: state.todo.savingTodo,
  loading: state.todo.loading,
});

const mapDispatchToProps = (dispatch: any) => ({
  addTodo: (data: string) => {
    dispatch(addTodo(data));
  },
  removeTodo: (id: number) => {
    dispatch(removeTodo(id));
  },
  fetchTodo: () => dispatch(fetchTodo()),
  storeTodo: () => dispatch(storeTodo()),
  updateTodo: (data: string, index: number) =>
    dispatch(updateTodo(data, index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
