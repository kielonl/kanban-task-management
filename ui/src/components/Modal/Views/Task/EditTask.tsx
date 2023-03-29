import { useState } from "react";
import { TaskType, SubTaskType } from "../../../../types";
import { Button } from "../../../Button/Button";
import { Dropdown } from "../../../Dropdown/Dropdown";
import { ModalForm } from "../../../Form/Form";
import { TextArea } from "../../../TextArea/TextArea";
import { TextField } from "../../../TextField/TextField";

interface EditProps {
  task: TaskType;
  submit: (task: TaskType) => void;
}

export const EditTask: React.FC<EditProps> = ({ task, submit }) => {
  const [tempTask, setTempTask] = useState<TaskType>({ ...task });

  const handleSetTask = () => {
    if (!submit) return;
    submit(tempTask);
  };

  const handleDeleteSubtask = (index: number) => {
    const newSubtasks = tempTask.subtasks.filter((_, i) => i !== index);
    setTempTask({ ...tempTask, subtasks: newSubtasks });
  };

  const handleUpdateSubtask = (
    index: number,
    field: keyof SubTaskType,
    value: any
  ) => {
    const newSubtasks = tempTask.subtasks.map((subtask, i) => {
      if (i === index) {
        return { ...subtask, [field]: value };
      }
      return subtask;
    });
    setTempTask({ ...tempTask, subtasks: newSubtasks });
  };

  return (
    <ModalForm.Form>
      <TextField
        type={"text"}
        label={"title"}
        value={tempTask.title}
        onChange={(e) => setTempTask({ ...tempTask, title: e.target.value })}
      />
      <TextArea
        label={"description"}
        value={tempTask.description}
        onChange={(e) =>
          setTempTask({ ...tempTask, description: e.target.value })
        }
      />
      <ModalForm.ListSubTasks
        type="edit"
        subtasks={tempTask.subtasks}
        updateSubtask={(index: number, field: keyof SubTaskType, value: any) =>
          handleUpdateSubtask(index, field, value)
        }
        deleteSubtask={(index: number) => handleDeleteSubtask(index)}
      />
      <Button
        type="button"
        variant="secondary"
        onClick={() =>
          setTempTask({
            ...tempTask,
            subtasks: [...tempTask.subtasks, { isCompleted: false, title: "" }],
          })
        }
      >
        Add subtask
      </Button>
      <Dropdown.Menu currentValue={tempTask.status}>
        <Dropdown.Item
          name={"Todo"}
          onClick={() => setTempTask({ ...tempTask, status: "TODO" })}
        />
        <Dropdown.Item
          name={"Doing"}
          onClick={() => setTempTask({ ...tempTask, status: "DOING" })}
        />
        <Dropdown.Item
          name={"Done"}
          onClick={() => setTempTask({ ...tempTask, status: "DONE" })}
        />
      </Dropdown.Menu>
      <Button type="button" onClick={() => handleSetTask()}>
        Save changes
      </Button>
    </ModalForm.Form>
  );
};
