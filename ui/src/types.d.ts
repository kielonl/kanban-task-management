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

export interface TaskCreate {
  title: string;
  description: string;
  status: string;
  subtasks: SubTaskType[];
}

export interface ColumnCreate {
  name: Status;
  board_id?: string;
}

export interface BoardCreate {
  name: string;
  columns: ColumnCreate[];
}

export interface ModalProps {
  title?: string;
  content: JSX.Element[] | JSX.Element;
}
