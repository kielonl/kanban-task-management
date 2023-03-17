import { useState } from "react";
import { useDispatch } from "react-redux";
import { SubTaskType, TaskProps, Tasks, TaskType } from "../../types";
import { Button } from "../Button/Button";
import { Checkbox } from "../Checkbox/Checkbox";
import Dropdown from "../Dropdown/Dropdown";
import { TaskForm } from "../Form/Form";
import { Modal } from "../Modal/Modal";
import { TextArea } from "../TextArea/TextArea";
import { TextField } from "../TextField/TextField";
import { Typography } from "../Typography/Typography";
import "./Task.scss";

export const Task: React.FC<TaskProps> = ({ setTask, ...data }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [tempTask, setTempTask] = useState<Tasks>({ ...data });

  const { title, description, status, subtasks } = tempTask;
  const doneSubtasks: number = subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;

  const dispatch = useDispatch();

  const updateTask = (field: keyof Tasks, value: any) => {
    setTempTask((prev: Tasks) => {
      return { ...prev, [field]: value };
    });
  };

  const setChecked = (id: string) => {
    const newSubtasks = subtasks.map((subtask) => {
      if (subtask.id === id) {
        return { ...subtask, isCompleted: !subtask.isCompleted };
      }
      return subtask;
    });
    updateTask("subtasks", newSubtasks);
  };

  const deleteSubtask = (id: string) => {
    const newSubtasks = subtasks.filter((subtask) => subtask.id !== id);
    updateTask("subtasks", newSubtasks);
  };

  const addEmptySubtask = () => {
    updateTask("subtasks", [...subtasks, { title: "", isCompleted: false }]);
  };

  const handleEditTask = () => {
    //call to api should be here
    console.log(tempTask);
    setShowModal(false);
  };

  return (
    <>
      <Modal
        title={"Edit Task"}
        content={
          <TaskForm.Form
            submit={
              <Button type="button" onClick={() => handleEditTask()}>
                Edit Task
              </Button>
            }
          >
            <TextField
              type={"text"}
              label={"title"}
              onChange={(e) =>
                setTempTask((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <TextArea
              label={"description"}
              onChange={(e) =>
                setTempTask((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
            <TaskForm.ListSubTasks
              type="edit"
              //change types later
              subtasks={subtasks}
              setChecked={setChecked}
              deleteSubtask={deleteSubtask}
            />
            <Button
              type="button"
              variant="secondary"
              onClick={() => addEmptySubtask()}
            >
              Add subtask
            </Button>
            <Dropdown.Menu currentValue={status}>
              <Dropdown.Item
                name={"Todo"}
                onClick={() => updateTask("status", "TODO")}
              />
              <Dropdown.Item
                name={"Doing"}
                onClick={() => updateTask("status", "DOING")}
              />
              <Dropdown.Item
                name={"Done"}
                onClick={() => updateTask("status", "DONE")}
              />
            </Dropdown.Menu>
          </TaskForm.Form>
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
