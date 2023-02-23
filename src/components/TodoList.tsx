import { useAppSelector } from "../hooks/redux.hook";
import TodoItem from "./TodoItem";
import { filtredTodos } from "../store/todoSlice";
import "./components.css";

const TodoList: React.FC = () => {
  const todos = useAppSelector(filtredTodos);

  return (
    <ul className="wrapper">
      {todos && todos.map((todo) => <TodoItem key={todo.id} {...todo} />)}
    </ul>
  );
};

export default TodoList;
