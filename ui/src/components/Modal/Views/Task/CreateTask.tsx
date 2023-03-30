import { SubTaskType, TaskCreate } from "../../../../types";
import { Button } from "../../../Button/Button";
import { Dropdown } from "../../../Dropdown/Dropdown";
import { ModalForm } from "../../../Form/Form";
import { TextArea } from "../../../TextArea/TextArea";
import { TextField } from "../../../TextField/TextField";
import { useFormik } from "formik";
import { taskSchema } from "../../../../utils/schemas";

interface CreateProps {
  submit: (task: Omit<TaskCreate, "board_id">) => void;
}

export const CreateTask: React.FC<CreateProps> = ({ submit }) => {
  const {
    values,
    handleChange,
    setFieldValue,
    errors,
    handleSubmit,
    handleBlur,
  } = useFormik({
    validationSchema: taskSchema,
    initialValues: {
      title: "",
      description: "",
      status: "TODO",
      subtasks: [],
    },
    onSubmit: () => {
      submit(values);
    },
    validateOnBlur: true,
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
    const newSubtasks = values.subtasks.map(
      (subtask: TaskCreate["subtasks"], i) => {
        if (i === index) {
          return { ...subtask, [field]: value };
        }
        return subtask;
      }
    );
    setFieldValue("subtasks", newSubtasks);
  };
  console.log(errors.subtasks);
  return (
    <ModalForm.Form>
      <TextField
        label={"Title"}
        name="title"
        error={errors.title}
        onBlur={(e) => handleBlur(e)}
        onChange={(e) => handleChange(e)}
      />
      <TextArea
        label={"Description"}
        name="description"
        error={errors.description}
        onChange={(e) => handleChange(e)}
      />
      <ModalForm.ListSubTasks
        type={"add"}
        subtasks={values.subtasks}
        updateSubtask={(index: number, field: keyof SubTaskType, value: any) =>
          handleUpdateSubtask(index, field, value)
        }
        deleteSubtask={(index: number) => handleDeleteSubtask(index)}
      />
      <Button
        type="button"
        variant="secondary"
        onClick={() => {
          if (values.subtasks.length >= 3) return;
          setFieldValue("subtasks", [
            ...values.subtasks,
            { isCompleted: false, title: "" },
          ]);
        }}
      >
        + Add New Subtask
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
        Create Task
      </Button>
    </ModalForm.Form>
  );
};
