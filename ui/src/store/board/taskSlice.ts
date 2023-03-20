import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status, SubTaskType } from "../../types";

interface TaskSliceType {
  id: string;
  title: string;
  description: string;
  status: Status;
  column_id: string;
  subtasks: SubTaskType[];
}

interface TaskState {
  task: TaskSliceType;
  loading: boolean;
}

const initialState: TaskState = {
  task: {
    id: "",
    title: "",
    description: "",
    status: "TODO",
    column_id: "",
    subtasks: [],
  },
  loading: false,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTask: (state, action: PayloadAction<TaskSliceType>) => {
      state.task = action.payload;
    },

    updateTask: (
      state,
      action: PayloadAction<{ field: keyof TaskSliceType; value: any }>
    ) => {
      const { field, value } = action.payload;
      state.task[field] = value;
    },

    updateSubtask: (
      state,
      action: PayloadAction<{
        index: number;
        field: keyof SubTaskType;
        value: any;
      }>
    ) => {
      const { index, field, value } = action.payload;

      //if the field is isCompleted, then we need to convert the value to a boolean
      if (field === "isCompleted") {
        state.task.subtasks[index][field] = value === "true";
      } else {
        state.task.subtasks[index][field] = value;
      }
    },
    deleteSubtask: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      state.task.subtasks.splice(index, 1);
    },

    addSubtask: (state) => {
      state.task.subtasks.push({
        title: "",
        isCompleted: false,
        task_id: state.task.id,
      });
    },
  },
});

export default taskSlice.reducer;

export const { setTask, updateTask, updateSubtask, deleteSubtask, addSubtask } =
  taskSlice.actions;
