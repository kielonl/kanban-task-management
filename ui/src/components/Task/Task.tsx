import { useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { useTaskDragAndDrop } from "../../hooks/useTaskDragAndDrop";
import { deleteTaskApi, updateTaskApi } from "../../store/board/boardSlice";
import { TaskProps } from "../../types";
import { Modal } from "../Modal/Modal";
import { Typography } from "../Typography/Typography";

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
    setShowModal(false);
    setModalContent(modalContent);
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
          className="flex flex-col bg-white p-6 rounded-lg w-[15em] drop-shadow-lg "
          onClick={() => setShowModal(true)}
          ref={ref}
          style={{
            opacity: isDragging ? 0.5 : 1,
          }}
        >
          <Typography variant="M">{title}</Typography>
          <Typography variant="BodyM" className="text-gray-600 mt-4">
            {doneSubtasks} out of {subtasks.length}
          </Typography>
        </div>
      </Modal.Window>
    </>
  );
};
