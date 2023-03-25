import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Column } from "../components/Column/Column";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { getBoardById } from "../store/board/boardSlice";
import { Loader } from "../components/Loader/Loader";

export const Board = () => {
  const { currentBoard, loading } = useAppSelector((state) => state.board);

  const { boardId } = useParams<{ boardId: string }>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!boardId) return;
    dispatch(getBoardById(boardId));
  }, [boardId]);

  if (!loading.currentBoard && !currentBoard.columns.length)
    return <div className="main-board-empty">No tasks yet</div>;

  if (loading.currentBoard) return <Loader />;
  return (
    <div className="main-board">
      <DndProvider backend={HTML5Backend}>
        <Column name="TODO" />
        <Column name="DOING" />
        <Column name="DONE" />
      </DndProvider>
    </div>
  );
};
