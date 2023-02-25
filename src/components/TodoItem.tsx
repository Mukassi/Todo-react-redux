import { KeyboardEvent, useRef } from "react";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../hooks/redux.hook";
import { editTodo, toggleFavoriteStatus } from "../store/todoSlice";
import TodoMenu from "./TodoMenu";
import ErrorValidation from "./ErrorValidation";
import { validateText } from "../utils/validateText";
import DeleteModal from "./DeleteModal";
import star from "../icons/star.svg";
import arrow from "../icons/arrow.svg";

interface ITodoItem {
  id: string;
  text: string;
  isCompleted: boolean;
  isFavorite: boolean;
  Date: number;
}

const TodoItem: React.FC<ITodoItem> = ({
  text,
  id,
  isCompleted,
  isFavorite,
  Date,
}) => {
  const [editTodoText, setEditTodoText] = useState(false);
  const [textInput, setTextInput] = useState(text);
  const [showMenu, setShowMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isValidTextInput, setIsValidTextInput] = useState(true);
  const [exceededInput, setExceededInput] = useState(0);
  
  const inputElement = useRef<HTMLInputElement>(null);
  const menuBarRef = useRef<HTMLImageElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const closeShowMenu = (e: MouseEvent) => {
      if (e.target !== menuBarRef.current) {
        setShowMenu(false);
      }
    };
    window.addEventListener("click", closeShowMenu);
    return () => window.removeEventListener("click", closeShowMenu);
  }, []);

  const onSaveTextTodo = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && isValidTextInput) {
      dispatch(editTodo({ textInput, id }));
    } else return;
    setEditTodoText(false);
  };

  const onEditTodoText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(event.target.value);
    const { isValid, exceededNum } = validateText(event.target.value);
    setIsValidTextInput(isValid);
    setExceededInput(exceededNum);
  };

  const onToggleMenu = () => {
    setShowMenu(!showMenu);
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
          <div>
            <input
              className="input-todo"
              ref={inputElement}
              value={textInput}
              onChange={onEditTodoText}
              onKeyDown={onSaveTextTodo}
            />
            <div>
              {!isValidTextInput && <ErrorValidation value={exceededInput} />}
            </div>
          </div>
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
            ref={menuBarRef}
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
          isCompleted={isCompleted}
          isFavorite={isFavorite}
          setEditTodoText={setEditTodoText}
          setOpenModal={setOpenModal}
        />
      )}
      {openModal && (
        <DeleteModal id={id} setOpenModal={setOpenModal} date={Date} text={text} />
      )}
    </div>
  );
};

export default TodoItem;
