import { useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { useTaskDragAndDrop } from "../../hooks/useTaskDragAndDrop";
import { deleteTaskApi, updateTaskApi } from "../../store/board/boardSlice";
import { TaskProps } from "../../types";
import { Modal } from "../Modal/Modal";
import { Typography } from "../Typography/Typography";

import "./Task.scss";

type ModalContentType = "checkout" | "edit" | "delete";

export const Task: React.FC<TaskProps> = ({ index, ...task }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, setModalContent] =
    useState<ModalContentType>("checkout");
  const { title, subtasks } = task;

  const dispatch = useAppDispatch();

  const doneSubtasks: number = subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;

  const handleHide = () => {
    setModalContent("checkout");
    setShowModal(false);
  };

  const modalContents = {
    checkout: (
      <Modal.View.Checkout
        task={{ ...task }}
        changeTo={(content: ModalContentType) => setModalContent(content)}
      />
    ),
    edit: (
      <Modal.View.Edit
        task={{ ...task }}
        submit={(obj) => dispatch(updateTaskApi(obj))}
      />
    ),
    delete: (
      <Modal.View.Delete
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
      <Modal.Window
        content={modalContents[modalContent]}
        isShown={showModal}
        hide={() => handleHide()}
      >
        <div
          className="task-wrapper"
          onClick={() => setShowModal(true)}
          ref={ref}
          style={{
            opacity: isDragging ? 0.5 : 1,
          }}
        >
          <Typography variant="M" className="task-title">
            {title}
          </Typography>
          <Typography variant="BodyM" className="task-subtasks">
            {doneSubtasks} out of {subtasks.length}
          </Typography>
        </div>
      </Modal.Window>
    </>
  );
};
