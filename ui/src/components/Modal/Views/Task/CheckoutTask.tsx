import { TaskType } from "../../../../types";
import { Dropdown } from "../../../Dropdown/Dropdown";
import { ModalForm } from "../../../Form/Form";
import { SmallDropdown } from "../../../SmallDropdown/SmallDropdown";
import { Typography } from "../../../Typography/Typography";

interface CheckoutProps {
  task: TaskType;
  changeTo?: (type: "edit" | "delete") => void;
}

export const CheckoutTask: React.FC<CheckoutProps> = ({ task, changeTo }) => {
  return (
    <ModalForm.Form>
      <Typography variant="L">{task.title}</Typography>

      {changeTo && (
        <SmallDropdown
          className="top-12 right-4 fixed flex justify-center items-center"
          size={8}
        >
          <Typography variant="BodyL" onClick={() => changeTo("edit")}>
            Edit Task
          </Typography>
          <Typography
            variant="BodyL"
            className="text-red"
            onClick={() => changeTo("delete")}
          >
            Delete Task
          </Typography>
        </SmallDropdown>
      )}

      <Typography variant="BodyL">{task.description}</Typography>
      <ModalForm.ListSubTasks type="checkout" subtasks={task.subtasks} />
      <Dropdown.Menu currentValue={task.status}>
        <Dropdown.Item name={"Todo"} onClick={() => ""} />
        <Dropdown.Item name={"Doing"} onClick={() => ""} />
        <Dropdown.Item name={"Done"} onClick={() => ""} />
      </Dropdown.Menu>
    </ModalForm.Form>
  );
};
