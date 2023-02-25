import { useAppSelector, useAppDispatch } from "./hooks/redux.hook";
import { useState, useEffect } from "react";
import { fetchTodos, addNewTodo } from "./store/todoSlice";
import NewTodoForm from "./components/NewTodoForm";
import TodoList from "./components/TodoList";
import TodoFilters from "./components/TodoFilters";
import { Spinner } from "./components/Spinner/Spinner";

import "./App.css";

function App() {
  const [text, setText] = useState("");
  const { loading, error } = useAppSelector((state) => state.todos);

  const dispatch = useAppDispatch();

  const onCreateNewTodo = () => {
    if (text.trim().length) {
      dispatch(addNewTodo(text));
      setText("");
    }
  };



  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="App">
      <h1>Список задач</h1>
      <NewTodoForm
        value={text}
        updateText={setText}
        onCreateNewTodo={onCreateNewTodo}
      />
      <TodoFilters />
      {loading && <Spinner/>}
      {error && <h2>An error occured: {error}</h2>}
      <TodoList />
    </div>
  );
}

export default App;
