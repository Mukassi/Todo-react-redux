import ErrorValidation from "./ErrorValidation";
import { validateText } from "../utils/validateText";
interface INewTodoForm {
  value: string;
  updateText: (str: string) => void;
  onCreateNewTodo: () => void;
}

const NewTodoForm: React.FC<INewTodoForm> = ({
  value,
  updateText,
  onCreateNewTodo,
}) => {
  const {isValid, exceededNum} = validateText(value)
 
  const onChangeInputText= (event:React.ChangeEvent<HTMLInputElement>) => {
    updateText(event.target.value)
    validateText(event.target.value)
  }
  return (
    <div>
      <label>
        <input
          placeholder="Добавьте новую задачу"
          value={value}
          onChange={onChangeInputText}
          className="new-todo-input"
        />
        <button onClick={onCreateNewTodo} className="todo-button" disabled={!isValid}>
          Добавить
        </button>
      </label>
      {!isValid && <ErrorValidation value={exceededNum} />}
    </div>
  );
};

export default NewTodoForm;
