export type Status = "TODO" | "DOING" | "DONE";

export interface Core {
  id: string;
}

export interface SubTaskType {
  title: string;
  isCompleted: boolean;
}

export interface TaskType extends Core {
  title: string;
  description: string;
  status: Status;
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
