import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Column } from "../components/Column/Column";
import { Loader } from "../components/Loader/Loader";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { getBoardById } from "../store/board/boardSlice";
import { setTask } from "../store/board/taskSlice";

export const Board = () => {
  const { currentBoard, loading } = useAppSelector((state) => state.board);

  const { boardId } = useParams<{ boardId: string }>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!boardId) return;
    dispatch(getBoardById(boardId));
  }, [boardId]);

  return (
    <div
      className={`main-board ${
        !currentBoard.columns.length && "main-board-empty"
      }`}
    >
      {loading ? (
        <Loader />
      ) : (
        currentBoard.columns.map((column) => {
          return (
            <Column
              tasks={[...column.tasks]}
              name={column.name}
              key={column.id}
            />
          );
        })
      )}
    </div>
  );
};
