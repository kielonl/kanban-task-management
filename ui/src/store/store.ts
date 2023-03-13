import { configureStore } from "@reduxjs/toolkit";
import { boardSlice } from "./board/boardSlice";

export const rootStore = configureStore({
  reducer: {
    board: boardSlice.reducer,
  },
});

export type RootState = ReturnType<typeof rootStore.getState>;

export type AppDispatch = typeof rootStore.dispatch;
