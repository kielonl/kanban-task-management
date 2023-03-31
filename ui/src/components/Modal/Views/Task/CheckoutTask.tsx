import { useFormik } from "formik";
import { useAppDispatch } from "../../../../hooks/hooks";
import { updateSubtaskApi } from "../../../../store/board/boardSlice";
import { SubTaskType, TaskType } from "../../../../types";
import { checkoutSchema } from "../../../../utils/schemas";
import { Button } from "../../../Button/Button";
import { Dropdown } from "../../../Dropdown/Dropdown";
import { ModalForm } from "../../../Form/Form";
import { SmallDropdown } from "../../../SmallDropdown/SmallDropdown";
import { Typography } from "../../../Typography/Typography";

interface CheckoutProps {
  task: TaskType;
  changeTo?: (type: "edit" | "delete") => void;
}

export const CheckoutTask: React.FC<CheckoutProps> = ({ task, changeTo }) => {
  const dispatch = useAppDispatch();

  const { values, dirty, setFieldValue, initialValues, handleSubmit } =
    useFormik({
      validationSchema: checkoutSchema,
      initialValues: {
        subtasks: task.subtasks,
        status: task.status,
      },
      onSubmit: (values) => {
        dispatch(updateSubtaskApi({ id: task.id, subtasks: values.subtasks }));
      },
    });
  const updateSubtask = (
    index: number,
    field: keyof SubTaskType,
    value: any
  ) => {
    const newSubtasks = values.subtasks.map((subtask, i) => {
      if (i === index) {
        return { ...subtask, [field]: value };
      }
      return subtask;
    });
    setFieldValue("subtasks", newSubtasks);
  };

  return (
    <ModalForm.Form>
      <Typography variant="L">{task.title}</Typography>

      {changeTo && (
        <SmallDropdown className="top-12 right-4 fixed flex justify-center items-center">
          <Typography variant="BodyL" onClick={() => changeTo("edit")}>
            Edit Task
          </Typography>
          <Typography
            variant="BodyL"
            className="text-red dark:text-red"
            onClick={() => changeTo("delete")}
          >
            Delete Task
          </Typography>
        </SmallDropdown>
      )}

      <Typography variant="BodyL">{task.description}</Typography>
      <ModalForm.ListSubTasks
        type="checkout"
        subtasks={values.subtasks}
        updateSubtask={(id: number, field: keyof SubTaskType, value: any) =>
          updateSubtask(id, field, value)
        }
      />
      <Dropdown.Menu currentValue={values.status} label={"Current Status"}>
        <Dropdown.Item
          name={"Todo"}
          onClick={() => setFieldValue("status", "TODO")}
        />
        <Dropdown.Item
          name={"Doing"}
          onClick={() => setFieldValue("status", "DOING")}
        />
        <Dropdown.Item
          name={"Done"}
          onClick={() => setFieldValue("status", "DONE")}
        />
      </Dropdown.Menu>
      <Button type="button" disabled={!dirty} onClick={() => handleSubmit()}>
        Save changes
      </Button>
    </ModalForm.Form>
  );
};
