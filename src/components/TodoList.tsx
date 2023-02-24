import { useAppSelector } from "../hooks/redux.hook";
import TodoItem from "./TodoItem";
import { filtredTodos } from "../store/todoSlice";

const TodoList: React.FC = () => {
  const todos = useAppSelector(filtredTodos);

  return (
    <ul>
      {todos && todos.map((todo) => <TodoItem key={todo.id} {...todo} />)}
    </ul>
  );
};

export default TodoList;
