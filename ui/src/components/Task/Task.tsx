import { useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { deleteTaskApi, updateTaskApi } from "../../store/board/boardSlice";
import { TaskType } from "../../types";
import { Modal } from "../Modal/Modal";
import { Typography } from "../Typography/Typography";

import "./Task.scss";

type ModalContentType = "checkout" | "edit" | "delete";

export const Task: React.FC<TaskType> = ({ ...data }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, setModalContent] =
    useState<ModalContentType>("checkout");
  const { title, subtasks } = data;

  const doneSubtasks: number = subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;

  const dispatch = useAppDispatch();

  const handleHide = () => {
    setShowModal(false);
    setModalContent("checkout");
  };

  const modalContents = {
    checkout: (
      <Modal.View.Checkout
        task={{ ...data }}
        changeModalContent={(content: ModalContentType) =>
          setModalContent(content)
        }
      />
    ),
    edit: (
      <Modal.View.Edit
        task={{ ...data }}
        submit={(obj) => dispatch(updateTaskApi(obj))}
      />
    ),
    delete: (
      <Modal.View.Delete
        item={{ name: title, type: "task" }}
        submit={() => dispatch(deleteTaskApi(data.id))}
      />
    ),
  };

  return (
    <>
      <Modal.Window
        content={modalContents[modalContent]}
        isShown={showModal}
        hide={() => handleHide()}
      />

      <div className="task-wrapper" onClick={() => setShowModal(true)}>
        <Typography variant="M" className="task-title">
          {title}
        </Typography>
        <Typography variant="BodyM" className="task-subtasks">
          {doneSubtasks} out of {subtasks.length}
        </Typography>
      </div>
    </>
  );
};
