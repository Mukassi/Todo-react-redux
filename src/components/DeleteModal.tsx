import { useAppDispatch } from "../hooks/redux.hook";
import { createPortal } from "react-dom";
import { deleteTodo } from "../store/todoSlice";

interface IDeleteModal {
  id: string;
  date: number;
  setOpenModal: (value: boolean) => void;
  text: string;
}

const DeleteModal: React.FC<IDeleteModal> = ({
  id,
  setOpenModal,
  text,
  date,
}) => {
  const dateItem = new Date(date);
  const stringDate = dateItem.toLocaleString();
  const dispatch = useAppDispatch();
  const modalRoot = document.getElementById("portal") as HTMLElement;
  return createPortal(
    <div className="delete-modal-wrap">
      <div className="delete-modal">
        <button className="modal-close" onClick={() => setOpenModal(false)}>
          &times;
        </button>
        <h1>Вы действительно хотите удалить задачу?</h1>
        <div className="delete-descr">
          <div>{text}</div>
          <div>{stringDate}</div>
        </div>
        <div>
          <button className="delete-button" onClick={() => setOpenModal(false)}>
            Отмена
          </button>
          <button
            className="delete-button"
            onClick={() => dispatch(deleteTodo(id))}
          >
            Да, удалить задачу
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default DeleteModal;
