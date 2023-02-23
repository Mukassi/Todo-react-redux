import { useAppDispatch } from "../hooks/redux.hook";
import {
  toggleCompleteStatus,
  toggleFavoriteStatus,
  deleteTodo,
} from "../store/todoSlice";

interface ITodoItem {
  id: string;
  text: string;
  isCompleted: boolean;
  isFavorite: boolean;
}

const TodoItem: React.FC<ITodoItem> = ({
  id,
  text,
  isCompleted,
  isFavorite,
}) => {
  const dispatch = useAppDispatch();

  return (
    <li>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => dispatch(toggleCompleteStatus(id))}
      />
      <span>{text}</span>
      <span onClick={() => dispatch(deleteTodo(id))}>&times;</span>
      <input
        type="checkbox"
        checked={isFavorite}
        onChange={() => dispatch(toggleFavoriteStatus(id))}
      />
    </li>
  );
};

export default TodoItem;
