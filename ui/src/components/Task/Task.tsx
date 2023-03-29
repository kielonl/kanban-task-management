import { useContext, useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { useTaskDragAndDrop } from "../../hooks/useTaskDragAndDrop";
import { deleteTaskApi, updateTaskApi } from "../../store/board/boardSlice";
import { TaskProps, TaskType } from "../../types";
import { CheckoutTask } from "../Modal/Views/Task/CheckoutTask";
import { EditTask } from "../Modal/Views/Task/EditTask";
import { Delete } from "../Modal/Views/Delete";
import { Typography } from "../Typography/Typography";
import { ModalContext } from "../../contexts/ModalContext";

type ModalContentType = "checkout" | "edit" | "delete";

export const Task: React.FC<TaskProps> = ({ index, ...task }) => {
  const [openModal, closeModal] = useContext(ModalContext);
  const [modalContent, setModalContent] = useState<ModalContentType>("edit");
  const { title, subtasks } = task;

  const dispatch = useAppDispatch();

  const doneSubtasks: number = subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;

  const handleHide = () => {
    closeModal();
    setModalContent(modalContent);
  };

  const modals = {
    checkout: (
      <CheckoutTask
        task={{ ...task }}
        changeTo={(modal: "edit" | "delete") => setModalContent(modal)}
      />
    ),
    edit: (
      <EditTask
        task={{ ...task }}
        submit={(obj: TaskType) => dispatch(updateTaskApi(obj))}
      />
    ),
    delete: (
      <Delete
        item={{ name: title, type: "task" }}
        submit={() => dispatch(deleteTaskApi(task.id))}
        cancel={() => handleHide()}
      />
    ),
  };

  const { ref, isDragging } = useTaskDragAndDrop<HTMLDivElement>({
    task,
    index,
  });

  return (
    <>
      <div
        ref={ref}
        className="flex flex-col z-0 bg-white p-6 rounded-lg w-[15em] drop-shadow-lg dark:bg-dark-grey dark:text-white"
        style={{
          opacity: isDragging ? 0.5 : 1,
        }}
        onClick={() => {
          openModal({
            content: modals[modalContent],
          });
        }}
      >
        <Typography variant="M">{title}</Typography>
        <Typography variant="BodyM" className="text-medium-grey text-bold mt-4">
          {doneSubtasks} out of {subtasks.length}
        </Typography>
      </div>
    </>
  );
};
