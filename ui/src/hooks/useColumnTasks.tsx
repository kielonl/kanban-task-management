import { useCallback, useEffect, useState } from "react";
import { moveTaskApi } from "../store/board/boardSlice";
import { Status, TaskType } from "../types";
import { useAppDispatch, useAppSelector } from "./hooks";

export const useColumnTasks = (column: Status) => {
  const { currentBoard, loading } = useAppSelector((state) => state.board);
  const [tasks, setTasks] = useState<
    { [key in Status]: TaskType[] } | undefined
  >(undefined);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loading.currentBoard) return;
    if (!currentBoard.columns.length) return;
    //set all tasks to an object with status as key and array of tasks as value
    const tasks = currentBoard.columns.reduce(
      (acc, column) => ({
        ...acc,
        [column.name]: column.tasks,
      }),
      {} as { [key in Status]: TaskType[] }
    );
    if (!tasks) return;
    setTasks(tasks);
  }, [loading.currentBoard]);

  useEffect(() => {
    if (!tasks) return;
  }, [tasks]);

  const columnTasks = tasks ? tasks[column] : undefined;

  const dropTaskFrom = useCallback(
    (from: Status, id: TaskType["id"]) => {
      setTasks((allTasks) => {
        if (!allTasks) return allTasks;
        const fromColumnTasks = allTasks[from];
        const toColumnTasks = allTasks[column];
        const movingTask = fromColumnTasks.find((task) => task.id === id);

        if (!movingTask) return allTasks;

        dispatch(
          moveTaskApi({
            id,
            oldColumn: from,
            newColumn: column,
          })
        );
        return {
          ...allTasks,
          [from]: fromColumnTasks.filter((task) => task.id !== id),
          [column]: [...toColumnTasks, movingTask],
        };
      });
    },
    [column, setTasks]
  );

  return { tasks: columnTasks, dropTaskFrom };
};
