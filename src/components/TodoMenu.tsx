import { useAppDispatch } from "../hooks/redux.hook";
import { toggleCompleteStatus, toggleFavoriteStatus } from "../store/todoSlice";
import star from "../icons/star.svg";
import done from "../icons/done.svg";
import edit from "../icons/edit.svg";

export interface ITodoMenu {
  id: string;
  isCompleted: boolean;
  isFavorite: boolean;
  setEditTodoText: (value: boolean) => void;
  setOpenModal: (value: boolean) => void;
}

const TodoMenu: React.FC<ITodoMenu> = ({
  id,
  isFavorite,
  isCompleted,
  setEditTodoText,
  setOpenModal,
}) => {
  const dispatch = useAppDispatch();
  return (
    <div className="menu-bar">
      <button onClick={() => dispatch(toggleFavoriteStatus(id))}>
        {isFavorite ? "Убрать из избранного" : "В избранное"}{" "}
        <img src={star} alt="menu" className="icon" />
      </button>
      <button onClick={() => dispatch(toggleCompleteStatus(id))}>
        {isCompleted ? "Вернуть в работу" : "Выполнено"}
        <img src={done} alt="menu" className="icon" />
      </button>
      <button onClick={() => setEditTodoText(true)}>
        Редактировать <img src={edit} alt="edit" className="icon" />
      </button>
      <button onClick={() => setOpenModal(true)}>
        Удалить <span className="close"> &times;</span>
      </button>
    </div>
  );
};

export default TodoMenu;
