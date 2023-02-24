import { useAppDispatch } from "../hooks/redux.hook";
import {
  toggleCompleteStatus,
  toggleFavoriteStatus,
} from "../store/todoSlice";

interface ITodoMenu {
  id: string;
  onSetEditTodoText: (value: boolean) => void;
  setOpenModal: (value: boolean) => void;
}

const TodoMenu: React.FC<ITodoMenu> = ({
  id,
  onSetEditTodoText,
  setOpenModal,
}) => {
  const dispatch = useAppDispatch();
  return (
    <div className="menu-bar">
      <button onClick={() => setOpenModal(true)}>Удалить</button>
      <button onClick={() => dispatch(toggleFavoriteStatus(id))}>
        В избранное
      </button>
      <button onClick={() => dispatch(toggleCompleteStatus(id))}>
        Выполнено
      </button>
      <button onClick={() => onSetEditTodoText(true)}>Редактировать</button>
    </div>
  );
};

export default TodoMenu;
