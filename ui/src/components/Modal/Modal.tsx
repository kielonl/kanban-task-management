import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/hooks";
import {
  addSubtask,
  deleteSubtask,
  setTask,
  updateSubtask,
  updateTask,
} from "../../store/board/taskSlice";
import { RootState } from "../../store/store";
import { SubTaskType, TaskType } from "../../types";
import { Button } from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";
import { TaskForm } from "../Form/Form";
import { TextArea } from "../TextArea/TextArea";
import { TextField } from "../TextField/TextField";
import { Typography } from "../Typography/Typography";
import "./Modal.scss";

interface WindowProps {
  isShown: boolean;
  hide: () => void;

  title: string;
  content?: JSX.Element;
  submit?: JSX.Element;
}

interface CheckoutProps {
  task: TaskType;
}

interface EditProps extends CheckoutProps {
  submit?: (obj: any) => void;
}

export const Window: React.FC<WindowProps> = ({
  isShown,
  hide,
  title,
  content,
}) => {
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") hide();
  }, []);

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

export const Checkout: React.FC<CheckoutProps> = ({ task }) => {
  return (
    <TaskForm.Form>
      <Typography variant="BodyL">{task.description}</Typography>
      <TaskForm.ListSubTasks type="checkout" subtasks={task.subtasks} />
      <Dropdown.Menu currentValue={task.status}></Dropdown.Menu>
    </TaskForm.Form>
  );
};

export const Edit: React.FC<EditProps> = ({ task, submit }) => {
  //add some error handling here
  const tempTask = useSelector((state: RootState) => state.task.task);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTask({ ...task }));
  }, []);

  const handleSetTask = () => {
    if (!submit) return;
    submit(tempTask);
  };

  return (
    <TaskForm.Form>
      <TextField
        type={"text"}
        label={"title"}
        value={tempTask.title}
        onChange={(e) =>
          dispatch(updateTask({ field: "title", value: e.target.value }))
        }
      />
      <TextArea
        label={"description"}
        value={tempTask.description}
        onChange={(e) =>
          dispatch(updateTask({ field: "description", value: e.target.value }))
        }
      />
      <TaskForm.ListSubTasks
        type="edit"
        subtasks={tempTask.subtasks}
        updateSubtask={(index: number, field: keyof SubTaskType, value: any) =>
          dispatch(updateSubtask({ index, field, value }))
        }
        deleteSubtask={(index: number) => dispatch(deleteSubtask({ index }))}
      />
      <Button
        type="button"
        variant="secondary"
        onClick={() => dispatch(addSubtask())}
      >
        Add subtask
      </Button>
      <Dropdown.Menu currentValue={tempTask.status}>
        <Dropdown.Item
          name={"Todo"}
          onClick={() =>
            dispatch(updateTask({ field: "status", value: "TODO" }))
          }
        />
        <Dropdown.Item
          name={"Doing"}
          onClick={() =>
            dispatch(updateTask({ field: "status", value: "DOING" }))
          }
        />
        <Dropdown.Item
          name={"Done"}
          onClick={() =>
            dispatch(updateTask({ field: "status", value: "DONE" }))
          }
        />
      </Dropdown.Menu>
      <Button type="button" onClick={() => handleSetTask()}>
        Save changes
      </Button>
    </TaskForm.Form>
  );
};

export const Modal = {
  Window,
  View: {
    Checkout,
    Edit,
  },
};
