import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./TodoSlice";
import userReducer from "./userSlice";
import productsReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    users: userReducer, 
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
