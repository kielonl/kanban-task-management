import { configureStore } from "@reduxjs/toolkit";
import { boardSlice } from "./board/boardSlice";
import { taskSlice } from "./board/taskSlice";

export const rootStore = configureStore({
  reducer: {
    board: boardSlice.reducer,
    task: taskSlice.reducer,
  },
});

export type RootState = ReturnType<typeof rootStore.getState>;

export type AppDispatch = typeof rootStore.dispatch;
