import { KeyboardEvent, useRef } from "react";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../hooks/redux.hook";
import { editTodo, toggleFavoriteStatus } from "../store/todoSlice";
import TodoMenu from "./TodoMenu";
import DeleteModal from "./DeleteModal";
import star from "../icons/star.svg";
import arrow from "../icons/arrow.svg";
interface ITodoItem {
  id: string;
  text: string;
  isCompleted: boolean;
  isFavorite: boolean;
}

const TodoItem: React.FC<ITodoItem> = ({
  text,
  id,
  isCompleted,
  isFavorite,
}) => {
  const [editTodoText, setEditTodoText] = useState(false);
  const [textInput, setTextInput] = useState(text);
  const [showMenu, setShowMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const inputElement = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const onSaveTextTodo = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      dispatch(editTodo({ textInput, id }));
    } else return;
    setEditTodoText(false);
  };
  const onEditTodoText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(event.target.value);
  };

  const onToggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const onSetEditTodoText = (value: boolean) => {
    setEditTodoText(value);
  };
  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, [editTodoText]);

  const todoStyles = "todo-row" + (isCompleted ? " complete" : "");
  const iconMenuStyles = "menu-icon" + (showMenu ? " active-icon" : "");
  const iconStarStyles = "star-icon" + (isFavorite ? " active-star" : "");
  return (
    <div className="menu">
      <li className={todoStyles}>
        {editTodoText ? (
          <input
            className="input-todo"
            ref={inputElement}
            value={textInput}
            onChange={onEditTodoText}
            onKeyDown={onSaveTextTodo}
          />
        ) : (
          <span>{text}</span>
        )}
        <div>
          <img
            src={star}
            alt="menu"
            className={iconStarStyles}
            onClick={() => {
              dispatch(toggleFavoriteStatus(id));
            }}
          />

          <img
            src={arrow}
            alt="menu"
            className={iconMenuStyles}
            onClick={onToggleMenu}
          />
        </div>
      </li>
      {showMenu && (
        <TodoMenu
          id={id}
          onSetEditTodoText={onSetEditTodoText}
          setOpenModal={setOpenModal}
        />
      )}
      {openModal && <DeleteModal id={id} setOpenModal={setOpenModal} />}
    </div>
  );
};

export default TodoItem;
