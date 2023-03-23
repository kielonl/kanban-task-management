import { useRef } from "react";
import { useDrag } from "react-dnd";
import { Status, TaskType } from "../types";

interface DragItem {
  id: string;
  from: Status;
  index: number;
}

export function useTaskDragAndDrop<T extends HTMLElement>({
  task,
  index,
}: {
  task: TaskType;
  index: number;
}) {
  const ref = useRef<T>(null);

  const [{ isDragging }, drag] = useDrag<
    DragItem,
    void,
    { isDragging: boolean }
  >({
    type: "task",
    item: {
      from: task.status,
      id: task.id,
      index,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(ref);

  return { ref, isDragging };
}
