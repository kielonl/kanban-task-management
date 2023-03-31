import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAll, create, remove, update, getOne, move } from "../../services";
import {
  BoardCreate,
  BoardType,
  ColumnCreate,
  ColumnType,
  SubtaskCreate,
  SubTaskType,
  TaskCreate,
  TaskType,
} from "../../types";
import { ENDPOINT } from "../../utils/constants";

interface BoardState {
  boards: Omit<BoardType[], "created_at" | "updated_at" | "columns">;
  currentBoard: { name: string; id: string; columns: ColumnType[] };
  loading: {
    boards: boolean;
    currentBoard: boolean;
  };
}

const initialState: BoardState = {
  boards: [],
  currentBoard: {
    name: "",
    id: "",
    columns: [],
  },
  loading: {
    boards: false,
    currentBoard: false,
  },
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

export const createBoard = createAsyncThunk(
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
  async (updatedBoard: BoardCreate, { getState }) => {
    const state = getState() as { board: BoardState };
    const boardId = state.board.currentBoard.id;
    await update(ENDPOINT.BOARDS, boardId, updatedBoard);
    return getAll(ENDPOINT.BOARDS);
  }
);

export const updateTaskApi = createAsyncThunk(
  "task/updateTask",
  async (task: TaskType, { getState }) => {
    const state = getState() as { board: BoardState };
    const boardId = state.board.currentBoard.id;
    if (
      Object.values(task).some((value) => value === "") ||
      Object.values(task).some((value) => value === null)
    ) {
      return;
    }
    await update(ENDPOINT.TASKS, task.id, task);
    return getOne(ENDPOINT.BOARDS, boardId);
  }
);

export const createTaskApi = createAsyncThunk(
  "task/createTask",
  async (task: TaskCreate, { getState }) => {
    const state = getState() as { board: BoardState };
    const boardId = state.board.currentBoard.id;
    //move this to some better place
    if (
      Object.values(task).some((value) => value === "") ||
      Object.values(task).some((value) => value === null)
    ) {
      return;
    }
    await create(ENDPOINT.TASKS, task);
    return getOne(ENDPOINT.BOARDS, boardId);
  }
);

export const deleteTaskApi = createAsyncThunk(
  "task/deleteTask",
  async (taskId: string, { getState }) => {
    const state = getState() as { board: BoardState };
    const boardId = state.board.currentBoard.id;
    await remove(ENDPOINT.TASKS, taskId);
    return getOne(ENDPOINT.BOARDS, boardId);
  }
);

export const moveTaskApi = createAsyncThunk(
  "task/moveTask",
  async (
    {
      id,
      oldColumn,
      newColumn,
    }: {
      id: string;
      oldColumn: string;
      newColumn: string;
    },
    { getState }
  ) => {
    const state = getState() as { board: BoardState };
    const boardId = state.board.currentBoard.id;
    await move(ENDPOINT.MOVE, id, { boardId, oldColumn, newColumn });
    return getOne(ENDPOINT.BOARDS, boardId);
  }
);

export const createColumnApi = createAsyncThunk(
  "column/createColumn",
  async (column: ColumnCreate, { getState }) => {
    const state = getState() as { board: BoardState };
    const board_id = state.board.currentBoard.id;
    await create(ENDPOINT.COLUMNS, { ...column, board_id });
    return getOne(ENDPOINT.BOARDS, board_id);
  }
);

export const updateSubtaskApi = createAsyncThunk(
  "subtask/updateSubtask",
  async (
    subtask: {
      id: string;
      subtasks: SubTaskType[];
    },
    { getState }
  ) => {
    const state = getState() as { board: BoardState };
    const boardId = state.board.currentBoard.id;
    if (
      Object.values(subtask).some((value) => value === "") ||
      Object.values(subtask).some((value) => value === null)
    ) {
      return;
    }
    console.log(subtask);
    await update(ENDPOINT.SUBTASKS, subtask.id, subtask.subtasks);
    return getOne(ENDPOINT.BOARDS, boardId);
  }
);

export const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBoardById.pending, (state) => {
      state.loading.currentBoard = true;
    });
    builder.addCase(getBoardById.fulfilled, (state, action) => {
      state.currentBoard = { ...action.payload.board };

      state.loading.currentBoard = false;
    });
    builder.addCase(getBoardById.rejected, (state) => {
      state.loading.currentBoard = false;
    });

    builder.addCase(getBoardsNames.pending, (state) => {
      state.loading.boards = true;
    });
    builder.addCase(getBoardsNames.fulfilled, (state, action) => {
      state.boards = [...action.payload];
      state.loading.boards = false;
    });
    builder.addCase(getBoardsNames.rejected, (state) => {
      state.loading.boards = false;
    });

    builder.addCase(createBoard.pending, (state) => {
      state.loading.currentBoard = true;
    });
    builder.addCase(createBoard.fulfilled, (state, action) => {
      state.boards = [...action.payload];
      state.loading.currentBoard = false;
    });

    builder.addCase(createBoard.rejected, (state) => {
      state.loading.currentBoard = false;
    });

    builder.addCase(deleteBoard.pending, (state) => {
      state.loading.currentBoard = true;
    });
    builder.addCase(deleteBoard.fulfilled, (state, action) => {
      state.boards = [...action.payload];
      state.loading.currentBoard = false;
    });
    builder.addCase(deleteBoard.rejected, (state) => {
      state.loading.currentBoard = false;
    });

    builder.addCase(updateBoard.pending, (state) => {
      state.loading.currentBoard = true;
    });
    builder.addCase(updateBoard.fulfilled, (state, action) => {
      state.boards = [...action.payload];
      state.loading.currentBoard = false;
    });
    builder.addCase(updateBoard.rejected, (state) => {
      state.loading.currentBoard = false;
    });

    builder.addCase(updateTaskApi.pending, (state) => {
      state.loading.currentBoard = true;
    });
    builder.addCase(updateTaskApi.fulfilled, (state, action) => {
      state.currentBoard = { ...action.payload.board };
      state.loading.currentBoard = false;
    });
    builder.addCase(updateTaskApi.rejected, (state) => {
      state.loading.currentBoard = false;
    });

    builder.addCase(createTaskApi.pending, (state) => {
      state.loading.currentBoard = true;
    });
    builder.addCase(createTaskApi.fulfilled, (state, action) => {
      state.currentBoard = { ...action.payload.board };
      state.loading.currentBoard = false;
    });
    builder.addCase(createTaskApi.rejected, (state) => {
      state.loading.currentBoard = false;
    });

    builder.addCase(deleteTaskApi.pending, (state) => {
      state.loading.currentBoard = true;
    });
    builder.addCase(deleteTaskApi.fulfilled, (state, action) => {
      state.currentBoard = { ...action.payload.board };
      state.loading.currentBoard = false;
    });
    builder.addCase(deleteTaskApi.rejected, (state) => {
      state.loading.currentBoard = false;
    });

    builder.addCase(moveTaskApi.pending, (state) => {
      state.loading.currentBoard = true;
    });
    builder.addCase(moveTaskApi.fulfilled, (state, action) => {
      state.currentBoard = { ...action.payload.board };
      state.loading.currentBoard = false;
    });
    builder.addCase(moveTaskApi.rejected, (state) => {
      state.loading.currentBoard = false;
    });

    builder.addCase(createColumnApi.pending, (state) => {
      state.loading.currentBoard = true;
    });
    builder.addCase(createColumnApi.fulfilled, (state, action) => {
      state.currentBoard = { ...action.payload.board };
      state.loading.currentBoard = false;
    });
    builder.addCase(createColumnApi.rejected, (state) => {
      state.loading.currentBoard = false;
    });

    builder.addCase(updateSubtaskApi.pending, (state) => {
      state.loading.currentBoard = true;
    });

    builder.addCase(updateSubtaskApi.fulfilled, (state, action) => {
      state.currentBoard = { ...action.payload.board };
      state.loading.currentBoard = false;
    });

    builder.addCase(updateSubtaskApi.rejected, (state) => {
      state.loading.currentBoard = false;
    });
  },
});

export const {} = boardSlice.actions;

export default boardSlice.reducer;
