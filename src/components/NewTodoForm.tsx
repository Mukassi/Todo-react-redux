interface INewTodoForm {
  value: string;
  updateText: (str: string) => void;
  handleAction: () => void;
}

const NewTodoForm: React.FC<INewTodoForm> = ({
  value,
  updateText,
  handleAction,
}) => {
  return (
    <label>
      <input
        placeholder="Добавьте новую задачу"
        value={value}
        onChange={(e) => updateText(e.target.value)}
        className="new-todo-input"
      />
      <button onClick={handleAction}    className="todo-button">Добавить</button>
    </label>
  );
};

export default NewTodoForm;
