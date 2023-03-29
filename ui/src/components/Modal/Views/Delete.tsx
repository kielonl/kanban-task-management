import { Button } from "../../Button/Button";
import { ModalForm } from "../../Form/Form";
import { Typography } from "../../Typography/Typography";

interface DeleteProps {
  item: { name: string; type: "board" | "column" | "task" };
  submit: () => void;
  cancel?: () => void;
}

export const Delete: React.FC<DeleteProps> = ({ item, submit, cancel }) => {
  const handleDelete = () => {
    if (!submit) return;
    submit();
  };

  const handleCancel = () => {
    if (!cancel) return;
    cancel();
  };

  const text = {
    board:
      "Are you sure you want to delete the '{item.name}' board? This action will remove all columns and tasks and cannot be reversed.",
    column:
      "Are you sure you want to delete the '{item.name}' column? This action will remove all tasks and cannot be reversed.",
    task: "Are you sure you want to delete the '{item.name}' task? This action cannot be reversed.",
  };

  return (
    <ModalForm.Form>
      <Typography variant="L">Delete this {item.type}</Typography>
      <Typography variant="BodyL">
        {text[item.type].replace("{item.name}", item.name)}
      </Typography>
      <div className="flex flex-row justify-between gap-8">
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
    </ModalForm.Form>
  );
};
