import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
  createSelector,
} from "@reduxjs/toolkit";
import type { RootState } from ".";
import { useHttp } from "../hooks/http.hook";
type Todo = {
  id: string;
  text: string;
  isCompleted: boolean;
  isFavorite: boolean;
};

type TodosState = {
  todos: Todo[];
  loading: boolean;
  error: string | null;
};
type EditTodo = {
  id: string,
  textInput: string
}

export const fetchTodos = createAsyncThunk<
  Todo[],
  undefined,
  { rejectValue: string }
>("todos/fetchTodos", () => {
  const { request } = useHttp();
  return request("https://63f608519daf59d1ad8071a2.mockapi.io/todos");
});

export const addNewTodo = createAsyncThunk<Todo, string>(
  "todos/addNewTodo",
  (text) => {
    const todo = {
      text: text,
      isCompleted: false,
      isFavorite: false,
    };
    const { request } = useHttp();
    return request(
      "https://63f608519daf59d1ad8071a2.mockapi.io/todos",
      "POST",
      JSON.stringify(todo)
    );
  }
);

export const toggleCompleteStatus = createAsyncThunk<
  any,
  string,
  { state: { todos: TodosState } }
>("todos/toggleCompleteStatus", (id, { getState }) => {
  const todo = getState().todos.todos.find((todo) => todo.id === id);
  if (todo) {
    const { request } = useHttp();
    return request(
      `https://63f608519daf59d1ad8071a2.mockapi.io/todos/${id}`,
      "PUT",
      JSON.stringify({
        isCompleted: !todo.isCompleted,
      })
    );
  }
});

export const toggleFavoriteStatus = createAsyncThunk<
  any,
  string,
  { state: { todos: TodosState } }
>("todos/toggleFavoriteStatus", (id, { getState }) => {
  const todo = getState().todos.todos.find((todo) => todo.id === id);
  if (todo) {
    const { request } = useHttp();
    return request(
      `https://63f608519daf59d1ad8071a2.mockapi.io/todos/${id}`,
      "PUT",
      JSON.stringify({
        isFavorite: !todo.isFavorite,
      })
    );
  }
});

export const editTodo = createAsyncThunk<
  any,
  EditTodo ,
  { state: { todos: TodosState } }
>("todos/edit", ({id, textInput}, { getState }) => {
  const todo = getState().todos.todos.find((todo) => todo.id === id);
  if (todo) {
    const { request } = useHttp();
    return request(
      `https://63f608519daf59d1ad8071a2.mockapi.io/todos/${id}`,
      "PUT",
      JSON.stringify({
        text: textInput,
      })
    );
  }
});


export const deleteTodo = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("todos/deleteTodo", (id) => {
  const { request } = useHttp();
  request(`https://63f608519daf59d1ad8071a2.mockapi.io/todos/${id}`, "DELETE");
  return id;
});

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
};
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(addNewTodo.pending, (state) => {
        state.error = null;
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(toggleCompleteStatus.fulfilled, (state, action) => {
        const toggledTodo = state.todos.find(
          (todo) => todo.id === action.payload.id
        );
        if (toggledTodo) {
          toggledTodo.isCompleted = !toggledTodo.isCompleted;
        }
      })
      .addCase(toggleFavoriteStatus.fulfilled, (state, action) => {
        const toggledTodo = state.todos.find(
          (todo) => todo.id === action.payload.id
        );
        if (toggledTodo) {
          toggledTodo.isFavorite = !toggledTodo.isFavorite;
        }
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        const editTodo = state.todos.find(
          (todo) => todo.id === action.payload.id
        );
        if (editTodo) {
          editTodo.text = action.payload.text;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default todoSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}

export const filtredTodos = createSelector(
  (state: RootState) => state.filter.activeFilter,
  (state: RootState) => state.todos.todos,
  (filter, todos) => {
    if (filter === "All") {
      return todos;
    }
    if (filter === "Completed") {
      return todos.filter((item) => item.isCompleted);
    }
    if (filter === "Favorite") {
      return todos.filter((item) => item.isFavorite);
    }
  }
);
