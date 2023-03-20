import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAll,
  create,
  remove,
  update,
  getOne,
  TaskCreate,
} from "../../services";
import { BoardType, TaskType } from "../../types";
import { ENDPOINT } from "../../utils/constants";

interface BoardState {
  boards: Omit<BoardType[], "created_at" | "updated_at" | "columns">;
  currentBoard: BoardType;
  loading: boolean;
}

//change later
interface BoardCreate {
  name: string;
}

const initialState: BoardState = {
  boards: [],
  currentBoard: {
    name: "",
    id: "",
    columns: [],
  },
  loading: true,
};

export const getBoards = createAsyncThunk("boards/getBoards", async () => {
  return getAll(ENDPOINT.BOARDS);
});

export const getBoardsNames = createAsyncThunk(
  "boards/getBoardsNames",
  async () => {
    return getAll(ENDPOINT.BOARDS_NAMES);
  }
);

export const getBoardById = createAsyncThunk(
  "boards/getBoardById",
  async (id: string) => {
    return getOne(ENDPOINT.BOARDS, id);
  }
);

export const addBoard = createAsyncThunk(
  "boards/createBoard",
  async (newBoard: BoardCreate) => {
    await create(ENDPOINT.BOARDS, newBoard);
    return getAll(ENDPOINT.BOARDS);
  }
);

export const deleteBoard = createAsyncThunk(
  "boards/deleteBoard",
  async (id: string) => {
    await remove(ENDPOINT.BOARDS, id);
    return getAll(ENDPOINT.BOARDS);
  }
);

export const updateBoard = createAsyncThunk(
  "boards/updateBoard",
  async (updatedBoard: BoardType) => {
    await update(ENDPOINT.BOARDS, updatedBoard.id, updatedBoard);
    return getAll(ENDPOINT.BOARDS);
  }
);

export const updateTaskApi = createAsyncThunk(
  "task/updateTask",
  async (task: TaskType) => {
    await update(ENDPOINT.TASKS, task.id, task);
  }
);

export const createTaskApi = createAsyncThunk(
  "task/createTask",
  async (task: TaskCreate) => {
    //move this to some better place
    if (
      Object.values(task).some((value) => value === "") ||
      Object.values(task).some((value) => value === null)
    ) {
      return;
    }
    await create(ENDPOINT.TASKS, task);
  }
);

export const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBoardById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBoardById.fulfilled, (state, action) => {
      state.currentBoard = { ...action.payload.board };
      state.loading = false;
    });
    builder.addCase(getBoardById.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getBoardsNames.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBoardsNames.fulfilled, (state, action) => {
      state.boards = [...action.payload];
      state.loading = false;
    });
    builder.addCase(getBoardsNames.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(addBoard.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addBoard.fulfilled, (state, action) => {
      state.boards = [...action.payload];
      state.loading = false;
    });

    builder.addCase(addBoard.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(deleteBoard.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteBoard.fulfilled, (state, action) => {
      state.boards = [...action.payload];
      state.loading = false;
    });
    builder.addCase(deleteBoard.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateBoard.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateBoard.fulfilled, (state, action) => {
      state.boards = [...action.payload];
      state.loading = false;
    });
    builder.addCase(updateBoard.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateTaskApi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTaskApi.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateTaskApi.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(createTaskApi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTaskApi.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createTaskApi.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const {} = boardSlice.actions;

export default boardSlice.reducer;
