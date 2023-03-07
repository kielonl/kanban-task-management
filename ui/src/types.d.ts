export type Status = "todo" | "doing" | "done";

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
