export type Status = "TODO" | "DOING" | "DONE";

export interface Core {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface SubTaskType extends Core {
  title: string;
  isCompleted: boolean;
  task_id: string;
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
