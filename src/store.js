import { configureStore, createSlice } from "@reduxjs/toolkit";

// 1. createSlice로 리듀서와 액션 생성
const todoSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.push({ id: Date.now(), text: action.payload, done: false });
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find((item) => item.id === action.payload);
      if (todo) {
        todo.done = !todo.done; // done 상태 토글
      }
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

// 액션 추출
export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;

// 스토어 생성
export const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
  },
});