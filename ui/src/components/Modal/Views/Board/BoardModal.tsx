import { useState } from "react";
import { BoardCreate, ColumnCreate } from "../../../../types";
import { isEmpty } from "../../../../utils";
import { Button } from "../../../Button/Button";
import { ModalForm } from "../../../Form/Form";
import { TextField } from "../../../TextField/TextField";

interface BoardModalProps {
  board?: BoardCreate;
  submit: (board: BoardCreate) => void;
}

export const BoardModal: React.FC<BoardModalProps> = ({ submit, ...board }) => {
  //get all column names from board object
  const [tempBoard, setTempBoard] = useState<BoardCreate>(
    board.board || { name: "", columns: [] }
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
      <Button type="button" onClick={() => submit(tempBoard)}>
        {isEmpty(board) ? "Create New Board" : "Save Changes"}
      </Button>
    </ModalForm.Form>
  );
};
