export type Status = "todo" | "doing" | "done";

export interface TaskProps {
  id: string;
  title: string;
  description: string;
  status: Status;
  subtasks: {
    title: string;
    isCompleted: boolean;
  }[];
}
