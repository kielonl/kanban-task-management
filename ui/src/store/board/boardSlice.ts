import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAll, create, remove, update } from "../../services";
import { BoardType } from "../../types";
import { ENDPOINT } from "../../utils/constants";

interface BorderState {
  boards: BoardType[];
  currentBoard: { name: string; id: string };
  loading: boolean;
}

//change later
interface BoardCreate {
  name: string;
}

const initialState: BorderState = {
  boards: [],
  currentBoard: { name: "", id: "" },
  loading: true,
};

export const getBoards = createAsyncThunk("boards/getBoards", async () => {
  return getAll(ENDPOINT.BOARDS);
});

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
  reducers: {
    setCurrentBoard: (
      state,
      action: PayloadAction<{ name: string; id: string }>
    ) => {
      state.currentBoard = { ...action.payload };
    },
  },
  extraReducers: {
    [getBoards.pending.type]: (state) => {
      state.loading = true;
    },
    [getBoards.fulfilled.type]: (state, action) => {
      state.boards = [...action.payload];
      state.currentBoard = { ...(action.payload[0] || { name: "", id: "" }) };
      state.loading = false;
    },
    [getBoards.rejected.type]: (state) => {
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

export const { setCurrentBoard } = boardSlice.actions;

export default boardSlice.reducer;
