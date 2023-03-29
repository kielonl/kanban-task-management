import { useFormik } from "formik";
import { BoardCreate, ColumnCreate } from "../../../../types";
import { isEmpty } from "../../../../utils";
import { boardSchema } from "../../../../utils/schemas";
import { Button } from "../../../Button/Button";
import { ModalForm } from "../../../Form/Form";
import { TextField } from "../../../TextField/TextField";

interface BoardModalProps {
  board?: BoardCreate;
  submit: (board: BoardCreate) => void;
}

export const BoardModal: React.FC<BoardModalProps> = ({ submit, ...board }) => {
  //get all column names from board object
  const { values, handleChange, setFieldValue, errors, handleSubmit } =
    useFormik({
      validationSchema: boardSchema,
      initialValues: {
        name: board.board?.name || "",
        columns: board.board?.columns || [],
      },
      onSubmit: () => {
        console.log(values);
        submit(values);
      },
    });

  const handleAddColumn = () => {
    const columns = values.columns;
    if (columns.length >= 3) return;
    let statuses = ["TODO", "DOING", "DONE"] as ColumnCreate["name"][];

    if (columns.length !== 0) {
      statuses = statuses.filter((status) => {
        return !columns.some((column) => column.name === status);
      });
    }

    setFieldValue("columns", [...columns, { name: statuses[0] }]);
  };

  return (
    <ModalForm.Form>
      <TextField
        label={"Board Name"}
        name="name"
        error={errors.name}
        value={values.name}
        onChange={(e) => handleChange(e)}
      />
      <ModalForm.ListColumns
        columns={values.columns}
        setColumns={(value) => setFieldValue("columns", value)}
      />
      <Button
        type="button"
        variant="secondary"
        onClick={() => handleAddColumn()}
      >
        + Add New Column
      </Button>
      <Button type="button" onClick={() => handleSubmit()}>
        {isEmpty(board) ? "Create New Board" : "Save Changes"}
      </Button>
    </ModalForm.Form>
  );
};
