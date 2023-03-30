import { Icon } from "../../assets/icons/Icon";
import { ColumnCreate, Status, SubTaskType } from "../../types";
import { Checkbox } from "../Checkbox/Checkbox";
import { Dropdown } from "../Dropdown/Dropdown";
import { TextField } from "../TextField/TextField";
import { Typography } from "../Typography/Typography";

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

interface ListColumnsProps {
  columns: ColumnCreate[];
  setColumns: (columns: ColumnCreate[]) => void;
}

const Form: React.FC<FormProps> = ({ children }) => {
  return (
    <form className="flex flex-col justify-center gap-8 m-8">{children}</form>
  );
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

  const EditAddView = subtasks.map((subtask, index) => {
    return (
      <div key={index}>
        <div className="flex flex-row">
          <div className="w-[90%]">
            <TextField
              label={""}
              value={subtask.title}
              onChange={(e) => handleEditSubtaskTitle(index, e.target.value)}
            />
          </div>
          <div
            className="grid ml-auto cursor-pointer place-content-center justify-center mb-5"
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
    edit: EditAddView,
    add: EditAddView,
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

const ListColumns: React.FC<ListColumnsProps> = ({ columns, setColumns }) => {
  //function to change name of column and checks if the name is already taken
  const changeName = (index: number, name: Status) => {
    const columnNames = columns.map((column) => column.name);
    if (columnNames.includes(name)) return;
    const newColumns = [...columns];
    newColumns[index].name = name;
    setColumns(newColumns);
  };

  const deleteName = (index: number) => {
    const newColumns = [...columns];
    newColumns.splice(index, 1);
    setColumns(newColumns);
  };

  return (
    <div>
      {columns.map((column, index) => {
        return (
          <div key={index} className="flex flex-row gap-4">
            <Dropdown.Menu currentValue={column.name} className="my-2">
              <Dropdown.Item
                name="TODO"
                onClick={() => changeName(index, "TODO")}
              />
              <Dropdown.Item
                name="DOING"
                onClick={() => changeName(index, "DOING")}
              />
              <Dropdown.Item
                name="DONE"
                onClick={() => changeName(index, "DONE")}
              />
            </Dropdown.Menu>
            <div
              className="grid ml-auto cursor-pointer place-content-center"
              onClick={() => deleteName(index)}
            >
              <Icon.Cross />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const ModalForm = {
  Form,
  ListSubTasks,
  ListColumns,
};
