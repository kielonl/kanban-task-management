import { useState } from "react";
import { TaskProps, Tasks } from "../../types";
import { Checkbox } from "../Checkbox/Checkbox";
import Dropdown from "../Dropdown/Dropdown";
import { Modal } from "../Modal/Modal";
import { Typography } from "../Typography/Typography";
import "./Task.scss";

export const Task: React.FC<TaskProps> = ({ setTask, ...data }) => {
  const { title, description, status, subtasks } = data;
  const [showModal, setShowModal] = useState<boolean>(false);
  const theme = "dark";

  const doneSubtasks: number = subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;

  const updateTask = (field: keyof Tasks, value: any) => {
    setTask((prev: Tasks[]) => {
      return prev.map((task) => {
        if (task.id === data.id) {
          return { ...task, [field]: value };
        }
        return task;
      });
    });
  };

  const setChecked = (index: number) => {
    const newSubtasks = [...subtasks];
    newSubtasks[index].isCompleted = !newSubtasks[index].isCompleted;
    updateTask("subtasks", newSubtasks);
  };

  return (
    <>
      {/* not sure about it, might delete later */}
      <Modal isShown={showModal} hide={() => setShowModal(false)}>
        <div className="task-modal-container">
          <Typography variant="L">{title}</Typography>
          <Typography variant="BodyL" className="task-modal-description">
            {description}
          </Typography>
          <Typography variant="BodyM" className="task-modal-subtasks-done">
            Subtasks ({doneSubtasks} of {subtasks.length})
          </Typography>
          {subtasks.map((subtask, index) => (
            <Checkbox
              label={subtask.title}
              isChecked={subtask.isCompleted}
              setChecked={() => setChecked(index)}
              id={String(index)}
              key={index}
            />
          ))}
          <Dropdown.Menu currentValue={status}>
            <Dropdown.Item
              name={"Todo"}
              onClick={() => updateTask("status", "todo")}
            />
            <Dropdown.Item
              name={"Doing"}
              onClick={() => updateTask("status", "doing")}
            />
            <Dropdown.Item
              name={"Done"}
              onClick={() => updateTask("status", "done")}
            />
          </Dropdown.Menu>
        </div>
      </Modal>

      <div
        className={`task-wrapper task-${theme}`}
        onClick={() => setShowModal(true)}
      >
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
