import classNames from "classnames";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Column } from "../components/Column/Column";
import { Loader } from "../components/Loader/Loader";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { getBoardById } from "../store/board/boardSlice";
import { useColumnTasks } from "../hooks/useColumnTasks";

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
      className={classNames(
        "main-board",
        !currentBoard.columns.length && "main-board-empty"
      )}
    >
      <DndProvider backend={HTML5Backend}>
        <Column name="TODO" />
        <Column name="DOING" />
        <Column name="DONE" />
      </DndProvider>
    </div>
    // <div
    //   className={classNames(
    //     "main-board",
    //     !currentBoard.columns.length && "main-board-empty"
    //   )}
    // >
    //   {loading.currentBoard || tasks === undefined ? (
    //     <Loader />
    //   ) : (
    //     <DndProvider backend={HTML5Backend}>
    //       {/* {currentBoard.columns.map((column) => {
    //         return (
    //           <Column
    //             tasks={[...column.tasks]}
    //             name={column.name}
    //             key={column.id}
    //           />
    //         );
    //       })} */}
    //       <Column name="DOING" />
    //     </DndProvider>
    //   )}
    // </div>
  );
};
