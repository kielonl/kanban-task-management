import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Column } from "../components/Column/Column";
import { Loader } from "../components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getBoardById } from "../store/board/boardSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import NoColumns from "../components/NoColumns/NoColumns";
import AddColumn from "../components/AddColumnButton/AddColumn";
import { Status } from "../types";

export const Board = () => {
  const { currentBoard, loading } = useAppSelector((state) => state.board);
  const { columns } = currentBoard;
  const { boardId } = useParams<{ boardId: string }>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!boardId) return;
    dispatch(getBoardById(boardId));
  }, [boardId]);

  if (!loading.currentBoard && !columns?.length) return <NoColumns />;

  const columnsNames = columns.map((column) => column.name);
  const availableColumns = ["TODO", "DOING", "DONE"] as Status[];

  const columnsToAdd = availableColumns.filter(
    (column) => !columnsNames.includes(column)
  );

  return (
    <>
      <div className="h-full overflow-x-scroll p-8 text-gray-600 flex flex-row gap-8 bg-light-grey dark:bg-very-dark-grey">
        {loading.currentBoard && <Loader />}
        <DndProvider backend={HTML5Backend}>
          {columns?.map((column) => (
            <Column key={column.id} name={column.name} />
          ))}
          {columns.length > 0 && columns.length < 3 && (
            <AddColumn name={columnsToAdd[0]} />
          )}
        </DndProvider>
      </div>
    </>
  );
};
