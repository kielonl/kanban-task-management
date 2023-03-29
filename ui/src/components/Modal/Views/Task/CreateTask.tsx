import { useState } from "react";
import { TaskType, SubTaskType, TaskCreate } from "../../../../types";
import { Button } from "../../../Button/Button";
import { Dropdown } from "../../../Dropdown/Dropdown";
import { ModalForm } from "../../../Form/Form";
import { TextArea } from "../../../TextArea/TextArea";
import { TextField } from "../../../TextField/TextField";

interface CreateProps {
  submit: (task: Omit<TaskCreate, "board_id">) => void;
}

export const CreateTask: React.FC<CreateProps> = ({ submit }) => {
  const [tempTask, setTempTask] = useState<Omit<TaskType, "id" | "column_id">>({
    title: "",
    description: "",
    status: "TODO",
    subtasks: [],
  });

  const handleCreateTask = () => {
    if (!submit) return;
    submit({
      ...tempTask,
    });
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
        label={"Title"}
        onChange={(e) => setTempTask({ ...tempTask, title: e.target.value })}
      />
      <TextArea
        label={"Description"}
        onChange={(e) =>
          setTempTask({ ...tempTask, description: e.target.value })
        }
      />
      <ModalForm.ListSubTasks
        type={"add"}
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
        + Add New Subtask
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
      <Button type="button" onClick={() => handleCreateTask()}>
        Create Task
      </Button>
    </ModalForm.Form>
  );
};
