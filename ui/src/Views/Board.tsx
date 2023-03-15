import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../components/Loader/Loader";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { getBoardById } from "../store/board/boardSlice";

export const Board = () => {
  const { currentBoard, loading } = useAppSelector((state) => state.board);

  let { boardId } = useParams<{ boardId: string }>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!boardId) return;
    dispatch(getBoardById(boardId));
  }, [boardId]);

  return (
    <div className="main-board">{loading ? <Loader /> : currentBoard.name}</div>
  );
};
