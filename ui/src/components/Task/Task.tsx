import { useState } from "react";
import { Status, TaskProps, Tasks } from "../../types";
import { Checkbox } from "../Checkbox/Checkbox";
import { Dropdown } from "../Dropdown/Dropdown";
import { DropdownItem } from "../Dropdown/DropdownItem";
import { Modal } from "../Modal/Modal";
import { Typography } from "../Typography/Typography";
import "./Task.scss";

export const Task: React.FC<TaskProps> = ({ setTask, ...data }) => {
  const { title, description, status, subtasks } = data;
  const [showModal, setShowModal] = useState<boolean>(false);

  const doneSubtasks: number = subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;

  const setChecked = (index: number) => {
    const newSubtasks = [...subtasks];
    newSubtasks[index].isCompleted = !newSubtasks[index].isCompleted;
    setTask((prev: Tasks[]) => {
      return prev.map((task) => {
        if (task.id === data.id) {
          return { ...task, subtasks: newSubtasks };
        }
        return task;
      });
    });
  };

  const setStatus = (newStatus: Status) => {
    setTask((prev: Tasks[]) => {
      return prev.map((task) => {
        if (task.id === data.id) {
          return { ...task, status: newStatus };
        }
        return task;
      });
    });
  };

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
              key={index}
              setChecked={() => setChecked(index)}
            />
          ))}
          <Dropdown currentValue={status} setValue={setStatus}>
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
