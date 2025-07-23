import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import axios from "axios";

export interface Todo {
  userId?: number;
  id: number;
  title: string;
  completed: boolean;
  tag?: string;
}

interface TodosState {
  items: Todo[];
  isLoading: boolean;
  isError: boolean;
  searchQuery: string;
}

const initialState: TodosState = {
  items: [],
  isLoading: false,
  isError: false,
  searchQuery: "",
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    deleteTodo: (state, action: PayloadAction<Todo>) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload.id);
    },
    updateTodoTitle: (state, action: PayloadAction<Todo>) => {
      const todo = state.items.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
        todo.tag = action.payload.tag || "";
      }
    },
    searchTodo: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncAddTodo.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(asyncAddTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.isLoading = false;
        if (state.items.some((todo) => todo.title === action.payload.title)) {
          state.isError = true;
        } else {
          state.items.unshift({
            id: Date.now(),
            title: action.payload.title,
            completed: false,
            tag: action.payload.tag,
          });
        }
      });
    builder.addCase(
      asyncFetchTodos.fulfilled,
      (state, action: PayloadAction<Todo[]>) => {
        const newTodos = action.payload.filter(
          (todo) => !state.items.some((item) => item.id === todo.id),
        );
        state.items = [...newTodos, ...state.items];
      },
    );
  },
});

export const asyncAddTodo = createAsyncThunk(
  "notes/asyncAddTodo",
  async ({
    id,
    title,
    completed,
    tag,
  }: {
    id: number;
    title: string;
    completed: boolean;
    tag: string;
  }) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { id, title, completed, tag };
  },
);

export const asyncFetchTodos = createAsyncThunk(
  "notes/asyncFetchTodos",
  async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos",
    );
    return response.data;
  },
);

export const { deleteTodo, updateTodoTitle, searchTodo } = todosSlice.actions;

export default todosSlice.reducer;
