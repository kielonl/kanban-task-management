import { Icon } from "../../assets/icons/Icon";
import { SubTaskType } from "../../types";
import { Checkbox } from "../Checkbox/Checkbox";
import { TextField } from "../TextField/TextField";
import { Typography } from "../Typography/Typography";
import "./Form.scss";

interface FormProps
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  children: React.ReactNode;

  submit: React.ReactNode;
}

interface ListSubTasksProps {
  type: "add" | "edit" | "checkout";
  subtasks: SubTaskType[];
  setChecked: (index: string) => void;
  deleteSubtask?: (index: string) => void;
}

const Form: React.FC<FormProps> = ({ children, submit }) => {
  return (
    <form className="form-container">
      {children}
      {submit}
    </form>
  );
};

const ListSubTasks: React.FC<ListSubTasksProps> = ({
  subtasks,
  setChecked,
  deleteSubtask,
  type,
}) => {
  const handleDeleteSubtask = (id: string) => {
    if (!deleteSubtask) return;
    deleteSubtask(id);
  };

  const checkoutView = subtasks.map((subtask) => {
    return (
      <Checkbox
        label={subtask.title}
        isChecked={subtask.isCompleted}
        setChecked={() => {
          console.log(subtask.id);
          setChecked(subtask.id);
        }}
        id={String(subtask.id)}
        key={subtask.id}
      />
    );
  });

  const EditAddtView = subtasks.map((subtask) => {
    return (
      <>
        <div className="edit-subtask-container">
          <div className="form-subtask-input">
            <TextField
              label={""}
              value={type === "edit" ? subtask.title : ""}
              key={subtask.id}
            />
          </div>
          <div
            className="form-subtask-delete"
            onClick={() => handleDeleteSubtask(subtask.id)}
          >
            <Icon.Cross />
          </div>
        </div>
      </>
    );
  });

  const view = {
    checkout: checkoutView,
    edit: EditAddtView,
    add: EditAddtView,
  };

  return (
    <div>
      <Typography variant="BodyM">Subtasks</Typography>
      {view[type]}
    </div>
  );
};

export const TaskForm = {
  Form,
  ListSubTasks,
};
