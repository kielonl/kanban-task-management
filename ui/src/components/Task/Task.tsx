import { useState } from "react";
import { TaskProps } from "../../types";
import { Checkbox } from "../Checkbox/Checkbox";
import { Dropdown } from "../Dropdown/Dropdown";
import { DropdownItem } from "../Dropdown/DropdownItem";
import { Modal } from "../Modal/Modal";
import { Typography } from "../Typography/Typography";
import "./Task.scss";

export const Task: React.FC<TaskProps> = ({ ...data }) => {
  const { title, description, status, subtasks } = data;
  const [showModal, setShowModal] = useState<boolean>(false);

  const doneSubtasks: number = subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;

  return (
    <>
      {/* not sure about it, might delete later */}
      <Modal isShown={showModal} hide={() => setShowModal(false)}>
        <div className="task-modal-container">
          <Typography variant="L" className="task-modal-title">
            {title}
          </Typography>
          <Typography variant="BodyL" className="task-modal-description">
            {description}
          </Typography>
          <Typography variant="BodyM" className="task-modal-substasks-done">
            Subtasks ({doneSubtasks} of {subtasks.length})
          </Typography>
          {subtasks.map((subtask, index) => (
            <Checkbox
              label={subtask.title}
              id={String(index)}
              isChecked={subtask.isCompleted}
            />
          ))}
          <Dropdown>
            <DropdownItem name="todo" />
            <DropdownItem name="doing" />
            <DropdownItem name="done" />
          </Dropdown>
        </div>
      </Modal>
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
