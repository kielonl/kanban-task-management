import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "../../assets/icons/Icon";
import { useAppSelector } from "../../hooks/hooks";
import { TaskCreate } from "../../services";
import { SubTaskType, TaskType } from "../../types";
import { Button } from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";
import { TaskForm } from "../Form/Form";
import { TextArea } from "../TextArea/TextArea";
import { TextField } from "../TextField/TextField";
import { Typography } from "../Typography/Typography";
import "./Modal.scss";

type ModalContentType = "checkout" | "edit" | "delete";

interface WindowProps {
  isShown: boolean;
  hide: () => void;

  title?: string;
  content?: JSX.Element;
  submit?: JSX.Element;
}

interface CheckoutProps {
  task: TaskType;
  changeModalContent: (content: ModalContentType) => void;
}

interface EditProps {
  task: TaskType;
  submit?: (obj: any) => void;
}

interface AddProps {
  submit?: (obj: TaskCreate) => void;
  board_id: string;
}

interface DeleteProps {
  item: {
    name: string;
    type: string;
  };
  submit?: () => void;
}

export const Window: React.FC<WindowProps> = ({
  isShown,
  hide,
  title,
  content,
}) => {
  const { loading } = useAppSelector((state) => state.board);
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") hide();
  }, []);

  if (loading.currentBoard) hide();

  useEffect(() => {
    if (isShown) {
      document.addEventListener("keydown", handleKeyPress);
      return () => {
        document.removeEventListener("keydown", handleKeyPress);
      };
    }
  }, [handleKeyPress, isShown]);
  return (
    <>
      {isShown && (
        <>
          <div className="modal-backdrop"></div>
          <div className="modal-wrapper">
            <Typography variant="L" className="modal-title">
              {title}
            </Typography>
            <div className="modal-content">{content}</div>
          </div>
        </>
      )}
    </>
  );
};

export const Checkout: React.FC<CheckoutProps> = ({
  task,
  changeModalContent,
}) => {
  const handleChange = (content: ModalContentType) => {
    changeModalContent(content);
  };

  return (
    <TaskForm.Form>
      <Typography variant="L" className="modal-checkout-title">
        {task.title}
      </Typography>
      <Dropdown.Menu
        className="modal-checkout-dropdown"
        icon={<Icon.Ellipsis />}
      >
        <Dropdown.Item name={"Edit"} onClick={() => handleChange("edit")} />
        <Dropdown.Item name={"Delete"} onClick={() => handleChange("delete")} />
      </Dropdown.Menu>
      <Typography variant="BodyL">{task.description}</Typography>
      <TaskForm.ListSubTasks type="checkout" subtasks={task.subtasks} />
      <Dropdown.Menu currentValue={task.status}>
        <Dropdown.Item name={"Todo"} onClick={() => ""} />
        <Dropdown.Item name={"Doing"} onClick={() => ""} />
        <Dropdown.Item name={"Done"} onClick={() => ""} />
      </Dropdown.Menu>
    </TaskForm.Form>
  );
};

export const Edit: React.FC<EditProps> = ({ task, submit }) => {
  const [tempTask, setTempTask] = useState<Omit<TaskType, "id">>({ ...task });

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
    <TaskForm.Form>
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
      <TaskForm.ListSubTasks
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
    </TaskForm.Form>
  );
};

const Add: React.FC<AddProps> = ({ board_id, submit }) => {
  const [tempTask, setTempTask] = useState<Omit<TaskType, "id">>({
    title: "",
    description: "",
    status: "TODO",
    subtasks: [],
  });

  const handleCreateTask = () => {
    if (!submit) return;
    submit({ ...tempTask, board_id });
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
    <TaskForm.Form>
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
      <TaskForm.ListSubTasks
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
    </TaskForm.Form>
  );
};

export const Delete: React.FC<DeleteProps> = ({ item, submit }) => {
  const handleDelete = () => {
    if (!submit) return;
    submit();
  };

  const handleCancel = () => {
    //implement cancel
    console.log("cancel");
  };

  return (
    <TaskForm.Form>
      <Typography variant="L">Delete this {item.type}</Typography>
      <Typography variant="BodyL">
        Are you sure you want to delete the '{item.name}' board? This action
        will remove all columns and tasks and cannot be reversed.
      </Typography>
      <div className="delete-buttons">
        <Button
          type="button"
          variant="destructive"
          onClick={() => handleDelete()}
        >
          Delete
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => handleCancel()}
        >
          Cancel
        </Button>
      </div>
    </TaskForm.Form>
  );
};

export const Modal = {
  Window,
  View: {
    Checkout,
    Edit,
    Add,
    Delete,
  },
};
