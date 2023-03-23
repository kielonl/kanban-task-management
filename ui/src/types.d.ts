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
  column_id: string;
  subtasks: SubTaskType[];
}

export interface TaskProps extends TaskType {
  index: number;
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
