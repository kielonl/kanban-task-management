import { useRef } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { Status, TaskType } from "../types";

interface DragItem {
  id: string;
  from: Status;
  index: number;
}

export function useTaskDragAndDrop<T extends HTMLElement>(
  { task, index }: { task: TaskType; index: number },
  handleDropHover: (i: number, j: number) => void
) {
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

  const [_, drop] = useDrop<DragItem, void, unknown>({
    accept: "task",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }

      const draggedItemIndex = item.index;
      const hoveredItemIndex = index;

      if (draggedItemIndex === hoveredItemIndex) {
        return;
      }

      const isDraggedItemAboveHovered = draggedItemIndex < hoveredItemIndex;
      const isDraggedItemBelowHovered = !isDraggedItemAboveHovered;

      const { x: mouseX, y: mouseY } = monitor.getClientOffset() as XYCoord;

      const hoveredBoundingRect = ref.current.getBoundingClientRect();

      const hoveredMiddleHeight =
        (hoveredBoundingRect.bottom - hoveredBoundingRect.top) / 2;

      const mouseYRelativeToHovered = mouseY - hoveredBoundingRect.top;
      const isMouseYAboveHoveredMiddleHeight =
        mouseYRelativeToHovered < hoveredMiddleHeight;
      const isMouseYBelowHoveredMiddleHeight =
        mouseYRelativeToHovered > hoveredMiddleHeight;

      if (isDraggedItemAboveHovered && isMouseYAboveHoveredMiddleHeight) {
        return;
      }

      if (isDraggedItemBelowHovered && isMouseYBelowHoveredMiddleHeight) {
        return;
      }

      handleDropHover(draggedItemIndex, hoveredItemIndex);

      item.index = hoveredItemIndex;
    },
  });

  drag(drop(ref));

  return { ref, isDragging };
}
