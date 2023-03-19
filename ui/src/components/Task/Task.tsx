import { useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { updateTaskApi } from "../../store/board/boardSlice";
import { TaskType } from "../../types";
import { Modal } from "../Modal/Modal";
import { Typography } from "../Typography/Typography";

import "./Task.scss";

export const Task: React.FC<TaskType> = ({ ...data }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { title, subtasks } = data;

  const doneSubtasks: number = subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;

  const dispatch = useAppDispatch();
  return (
    <>
      <Modal.Window
        title={"edit task"}
        content={
          <Modal.View.Edit
            task={{ ...data }}
            submit={(obj) => dispatch(updateTaskApi(obj))}
          />
        }
        isShown={showModal}
        hide={() => setShowModal(false)}
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
