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
}

interface ListSubTasksProps {
  type: "add" | "edit" | "checkout";
  subtasks: SubTaskType[];
  updateSubtask?: (id: number, field: keyof SubTaskType, value: any) => void;
  deleteSubtask?: (index: number) => void;
}

const Form: React.FC<FormProps> = ({ children }) => {
  return <form className="form-container">{children}</form>;
};

const ListSubTasks: React.FC<ListSubTasksProps> = ({
  subtasks,
  updateSubtask,
  deleteSubtask,
  type,
}) => {
  const handleEditSubtaskTitle = (index: number, title: string) => {
    if (!updateSubtask) return;
    updateSubtask(index, "title", title);
  };

  const handleEditSubtaskCompletion = (index: number) => {
    if (!updateSubtask) return;
    updateSubtask(index, "isCompleted", true);
  };

  const handleDeleteSubtask = (index: number) => {
    if (!deleteSubtask) return;
    deleteSubtask(index);
  };

  const subtasksAmount = subtasks.length;

  const doneSubtasks: number = subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;

  const checkoutView = subtasks.map((subtask, index) => {
    return (
      <Checkbox
        label={subtask.title}
        isChecked={subtask.isCompleted}
        setChecked={() => handleEditSubtaskCompletion(index)}
        id={String(index)}
        key={index}
      />
    );
  });

  const EditAddtView = subtasks.map((subtask, index) => {
    return (
      <div key={index}>
        <div className="edit-subtask-container">
          <div className="form-subtask-input">
            <TextField
              label={""}
              value={type === "edit" ? subtask.title : ""}
              onChange={(e) => handleEditSubtaskTitle(index, e.target.value)}
              onClick={() => console.log(subtask)}
            />
          </div>
          <div
            className="form-subtask-delete"
            onClick={() => handleDeleteSubtask(index)}
          >
            <Icon.Cross />
          </div>
        </div>
      </div>
    );
  });

  const view = {
    checkout: checkoutView,
    edit: EditAddtView,
    add: EditAddtView,
  };

  return (
    <div>
      <Typography variant="BodyM">
        Subtasks ({doneSubtasks} of {subtasksAmount})
      </Typography>
      {view[type]}
    </div>
  );
};

export const TaskForm = {
  Form,
  ListSubTasks,
};
