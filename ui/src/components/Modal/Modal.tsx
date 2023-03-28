import classNames from "classnames";
import React, { useState } from "react";
import { Icon } from "../../assets/icons/Icon";
import { TaskCreate } from "../../services";
import { SubTaskType, TaskType } from "../../types";
import { Button } from "../Button/Button";
import { Dropdown } from "../Dropdown/Dropdown";
import { TaskForm } from "../Form/Form";
import { TextArea } from "../TextArea/TextArea";
import { TextField } from "../TextField/TextField";
import { Typography } from "../Typography/Typography";
import "./Modal.scss";

import * as Dialog from "@radix-ui/react-dialog";
import * as Popover from "@radix-ui/react-popover";

type ModalContentType = "checkout" | "edit" | "delete";

interface WindowProps {
  isShown: boolean;
  hide?: () => void;
  initialModal?: () => void;
  title?: string;
  content?: JSX.Element;
  children: JSX.Element;
}

interface CheckoutProps {
  task: TaskType;
  changeTo: (content: ModalContentType) => void;
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
  cancel: any;
}

const Window: React.FC<WindowProps> = ({
  hide,
  isShown,
  title,
  content,
  children,
}) => {
  return (
    <Dialog.Root open={isShown} onOpenChange={() => hide && hide()}>
      {children}
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <Dialog.Title>{title}</Dialog.Title>
          {content}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export const Backdrop: React.FC<{ className?: string }> = ({ className }) => {
  return <div className={classNames("modal-backdrop", className)}></div>;
};

export const Checkout: React.FC<CheckoutProps> = ({ task, changeTo }) => {
  return (
    <TaskForm.Form>
      <Typography variant="L">{task.title}</Typography>
      {/* move this to another component later */}
      <Popover.Root>
        <Popover.Trigger className="popover-trigger">
          <Icon.Ellipsis />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className="popover-content">
            <Typography variant="BodyL" onClick={() => changeTo("edit")}>
              Edit Task
            </Typography>
            <Typography variant="BodyL" onClick={() => changeTo("delete")}>
              Delete Task
            </Typography>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

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
  const [tempTask, setTempTask] = useState<Omit<TaskType, "id" | "column_id">>({
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

export const Delete: React.FC<DeleteProps> = ({ item, submit, cancel }) => {
  const handleDelete = () => {
    if (!submit) return;
    submit();
  };

  const handleCancel = () => {
    cancel();
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
