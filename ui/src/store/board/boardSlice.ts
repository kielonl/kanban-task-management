import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAll, create, remove, update, getOne } from "../../services";
import { BoardType } from "../../types";
import { ENDPOINT } from "../../utils/constants";

interface BorderState {
  boards: Omit<BoardType[], "created_at" | "updated_at" | "columns">;
  currentBoard: BoardType;
  loading: boolean;
}

//change later
interface BoardCreate {
  name: string;
}

const initialState: BorderState = {
  boards: [],
  currentBoard: {
    name: "",
    id: "",
    created_at: "",
    updated_at: "",
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

export const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: {
    [getBoardById.pending.type]: (state) => {
      state.loading = true;
    },
    [getBoardById.fulfilled.type]: (state, action) => {
      state.currentBoard = { ...action.payload.board };
      state.loading = false;
    },
    [getBoardById.rejected.type]: (state) => {
      state.loading = false;
    },

    [getBoardsNames.pending.type]: (state) => {
      state.loading = true;
    },
    [getBoardsNames.fulfilled.type]: (state, action) => {
      state.boards = [...action.payload];
      state.loading = false;
    },
    [getBoardsNames.rejected.type]: (state) => {
      state.loading = false;
    },

    [addBoard.pending.type]: (state) => {
      state.loading = true;
    },
    [addBoard.fulfilled.type]: (state, action) => {
      state.boards = [...action.payload];
      state.loading = false;
    },
    [addBoard.rejected.type]: (state) => {
      state.loading = false;
    },

    [deleteBoard.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteBoard.fulfilled.type]: (state, action) => {
      state.boards = [...action.payload];
      state.loading = false;
    },
    [deleteBoard.rejected.type]: (state) => {
      state.loading = false;
    },

    [updateBoard.pending.type]: (state) => {
      state.loading = true;
    },
    [updateBoard.fulfilled.type]: (state, action) => {
      state.boards = [...action.payload];
      state.loading = false;
    },
    [updateBoard.rejected.type]: (state) => {
      state.loading = false;
    },
  },
});

export const {} = boardSlice.actions;

export default boardSlice.reducer;
