import { Status } from "@prisma/client";
import prisma from "../../utils/prisma";
import { TaskSchema } from "./task.schema";

export const createTask = async (input: TaskSchema) => {
  const { subtasks, board_id, ...task } = input;

  const column = await prisma.column.findFirst({
    where: {
      board_id: board_id,
      name: task.status,
    },
  });

  if (!column) throw new Error("Column not found");

  const createTask = await prisma.task.create({
    data: {
      ...task,
      column_id: column.id,
    },
  });

  const createSubtasks = await prisma.subtask.createMany({
    data: subtasks.map((subtask) => ({
      ...subtask,
      task_id: createTask.id,
    })),
  });
  return createTask;
};

export const getTasks = async () => {
  //return current status of task as well

  const task = await prisma.task.findMany({
    include: {
      subtasks: true,
    },
  });

  const tasks = await Promise.all(
    task.map(async (task) => {
      const column = await prisma.column.findUnique({
        where: {
          id: task.column_id,
        },
        select: {
          name: true,
        },
      });

      return [{ ...task, status: column?.name as Status }];
    })
  );

  return tasks;
};

export const getTaskById = async (id: string) => {
  //return current status of task as well

  const task = await prisma.task.findUnique({
    where: {
      id,
    },
    include: {
      subtasks: true,
    },
  });

  if (!task) throw new Error("Task not found");

  const column = await prisma.column.findUnique({
    where: {
      id: task.column_id,
    },
    select: {
      name: true,
    },
  });

  return [{ ...task, status: column?.name as Status }];
};

export const updateTask = async (id: string, input: TaskSchema) => {
  const { subtasks, ...task } = input;
  const updateTask = await prisma.task.update({
    where: {
      id,
    },
    data: {
      ...task,
    },
  });
  const deleteSubtasks = await prisma.subtask.deleteMany({
    where: {
      task_id: id,
    },
  });
  const createSubtasks = await prisma.subtask.createMany({
    data: subtasks.map((subtask) => ({
      ...subtask,
      task_id: id,
    })),
  });

  return { updateTask, deleteSubtasks, createSubtasks };
};

export const moveTask = async (
  taskId: string,
  boardId: string,
  oldColumnName: Status,
  newColumnName: Status
) => {
  const board = await prisma.board.findUnique({
    where: {
      id: boardId,
    },
  });

  if (!board) throw new Error("Board not found");

  const oldColumn = await prisma.column.findFirst({
    where: {
      board_id: boardId,
      name: oldColumnName,
    },
  });

  const newColumn = await prisma.column.findFirst({
    where: {
      board_id: boardId,
      name: newColumnName,
    },
  });

  if (!oldColumn || !newColumn) throw new Error("Column not found");

  const task = await prisma.task.updateMany({
    where: {
      id: taskId,
      column_id: oldColumn?.id,
    },
    data: {
      column_id: newColumn?.id,
      status: newColumnName,
    },
  });

  return { task, board, oldColumn, newColumn };
};

export const deleteTask = async (id: string) => {
  const subtasks = await prisma.subtask.deleteMany({
    where: {
      task_id: id,
    },
  });
  const task = await prisma.task.delete({
    where: {
      id,
    },
  });
  return task;
};
