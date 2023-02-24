import { useAppDispatch } from "../hooks/redux.hook";
import { createPortal } from "react-dom";
import { deleteTodo } from "../store/todoSlice";

interface IDeleteModal {
  id: string;
  setOpenModal: (value: boolean) => void;
}

const DeleteModal: React.FC<IDeleteModal> = ({ id, setOpenModal }) => {
  const dispatch = useAppDispatch();
  const modalRoot = document.getElementById("portal") as HTMLElement;
  return createPortal(
    <div className="delete-modal-wrap">
      <div className="delete-modal">
        <button className="modal-close" onClick={() => setOpenModal(false)}>
          &times;
        </button>
        <h1>Вы уверены, что хотите удалить данную задачу?</h1>
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
