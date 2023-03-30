import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Column } from "../components/Column/Column";
import { Loader } from "../components/Loader/Loader";
import { Button } from "../components/Button/Button";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { createColumnApi, getBoardById } from "../store/board/boardSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const Board = () => {
  const { currentBoard, loading } = useAppSelector((state) => state.board);
  const { columns } = currentBoard;
  const { boardId } = useParams<{ boardId: string }>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!boardId) return;
    dispatch(getBoardById(boardId));
  }, [boardId]);

  if (!loading.currentBoard && !columns?.length)
    return (
      <div className="h-full flex items-center justify-center flex-col text-gray-600 bg-light-grey dark:bg-very-dark-grey">
        no columns added yet
        <Button
          className="w-40"
          onClick={() => dispatch(createColumnApi({ name: "TODO" }))}
        >
          Add Column
        </Button>
      </div>
    );
  if (loading.currentBoard) return <Loader />;

  return (
    <div className="h-full overflow-x-scroll p-8 text-gray-600 flex flex-row gap-8 bg-light-grey dark:bg-very-dark-grey">
      <DndProvider backend={HTML5Backend}>
        {columns?.map((column) => (
          <Column key={column.id} name={column.name} />
        ))}
      </DndProvider>
    </div>
  );
};
