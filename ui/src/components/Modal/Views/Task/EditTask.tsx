import { TaskType, SubTaskType } from "../../../../types";
import { Button } from "../../../Button/Button";
import { Dropdown } from "../../../Dropdown/Dropdown";
import { ModalForm } from "../../../Form/Form";
import { TextArea } from "../../../TextArea/TextArea";
import { TextField } from "../../../TextField/TextField";
import { useFormik } from "formik";
import { isEmpty } from "../../../../utils";
import { taskSchema } from "../../../../utils/schemas";

interface EditProps {
  task: TaskType;
  submit: (task: TaskType) => void;
}

export const EditTask: React.FC<EditProps> = ({ task, submit }) => {
  const { values, handleChange, setFieldValue, errors, handleSubmit } =
    useFormik({
      validationSchema: taskSchema,
      initialValues: {
        ...task,
      },
      onSubmit: () => {
        submit(values);
      },
    });

  const handleDeleteSubtask = (index: number) => {
    const newSubtasks = values.subtasks.filter((_, i) => i !== index);
    setFieldValue("subtasks", newSubtasks);
  };

  const handleUpdateSubtask = (
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
      <TextField
        label={"title"}
        name="title"
        value={values.title}
        error={errors.title}
        onChange={(e) => handleChange(e)}
      />
      <TextArea
        label={"description"}
        name="description"
        value={values.description}
        error={errors.description}
        onChange={(e) => handleChange(e)}
      />
      <ModalForm.ListSubTasks
        type="edit"
        subtasks={values.subtasks}
        updateSubtask={(index: number, field: keyof SubTaskType, value: any) =>
          handleUpdateSubtask(index, field, value)
        }
        deleteSubtask={(index: number) => handleDeleteSubtask(index)}
      />
      <Button
        type="button"
        variant="secondary"
        onClick={() =>
          setFieldValue("subtasks", [
            ...values.subtasks,
            { isCompleted: false, title: "" },
          ])
        }
      >
        Add subtask
      </Button>

      <Dropdown.Menu currentValue={values.status}>
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
      <Button type="button" onClick={() => handleSubmit()}>
        Save change
      </Button>
    </ModalForm.Form>
  );
};
