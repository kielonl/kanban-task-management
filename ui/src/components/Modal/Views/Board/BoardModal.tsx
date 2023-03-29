import { useState } from "react";
import { BoardCreate, ColumnCreate, Status } from "../../../../types";
import { Button } from "../../../Button/Button";
import { Dropdown } from "../../../Dropdown/Dropdown";
import { ModalForm } from "../../../Form/Form";
import { TextArea } from "../../../TextArea/TextArea";
import { TextField } from "../../../TextField/TextField";

interface BoardModalProps {
  board: BoardCreate;
  submit: (board: BoardCreate) => void;
}

export const BoardModal: React.FC<BoardModalProps> = ({ submit, ...board }) => {
  //get all column names from board object
  const [tempBoard, setTempBoard] = useState<BoardCreate>(
    board.board || { name: "", columns: [] }
  );

  const [tempColumns, setTempColumns] = useState<ColumnCreate[]>(
    board.board.columns || []
  );

  const handleAddColumn = () => {
    const columns = tempBoard.columns;
    if (columns.length >= 3) return;
    let statuses = ["TODO", "DOING", "DONE"] as ColumnCreate["name"][];

    if (columns.length !== 0) {
      statuses = statuses.filter((status) => {
        return !columns.some((column) => column.name === status);
      });
    }

    setTempBoard({
      ...tempBoard,
      columns: [...columns, { name: statuses[0] }],
    });
  };

  const setColumns = (columns: ColumnCreate[]) => {
    setTempBoard({ ...tempBoard, columns });
  };

  const cos = () => {
    console.log(tempBoard);
    submit(tempBoard);
  };

  return (
    <ModalForm.Form>
      <TextField
        label={"Board Name"}
        value={tempBoard.name}
        onChange={(e) => setTempBoard({ ...tempBoard, name: e.target.value })}
      />
      <ModalForm.ListColumns
        columns={tempBoard.columns}
        setColumns={setColumns}
      />
      <Button
        type="button"
        variant="secondary"
        onClick={() => handleAddColumn()}
      >
        + Add New Column
      </Button>
      <Button type="button" onClick={() => cos()}>
        {board ? "Save Changes" : "Create New Board"}
      </Button>
    </ModalForm.Form>
  );
};
