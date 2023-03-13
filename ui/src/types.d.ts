export type Status = "TODO" | "DOING" | "DONE";

export interface Tasks {
  //change name to Task later
  id: string;
  title: string;
  description: string;
  status: Status;
  subtasks: {
    title: string;
    isCompleted: boolean;
  }[];
}

export interface TaskProps extends Tasks {
  setTask: Dispatch<SetStateAction<Tasks[]>>;
}

export interface Core {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface SubTaskType extends Core {
  title: string;
  isCompleted: boolean;
}

export interface TaskType extends Core {
  title: string;
  description: string;
  status: Status;
  column_id: string;
  subtasks: SubTaskType[];
}

export interface ColumnType extends Core {
  name: Status;
  board_id: string;
  tasks: TaskType[];
}

export interface BoardType extends Core {
  name: string;
  columns: ColumnType[];
}
