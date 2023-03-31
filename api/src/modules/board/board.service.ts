import prisma from "../../utils/prisma";
import { BoardSchema } from "./board.schema";

export const createBoard = async (input: BoardSchema) => {
  const { columns, ...board } = input;
  const createBoard = await prisma.board.create({
    data: {
      ...board,
    },
  });

  const createColumns = await prisma.column.createMany({
    data: columns.map((column) => ({
      ...column,
      board_id: createBoard.id,
    })),
  });

  return board;
};

export const getBoards = async () => {
  const board = await prisma.board.findMany({
    include: {
      columns: {
        include: {
          tasks: {
            include: {
              subtasks: true,
            },
          },
        },
      },
    },
  });
  return board;
};

export const getBoardsNames = async () => {
  //sort by created_at desc
  const board = await prisma.board.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  return board;
};

export const getBoardById = async (id: string) => {
  const board = await prisma.board.findUnique({
    where: {
      id,
    },
    include: {
      columns: {
        include: {
          tasks: {
            include: {
              subtasks: true,
            },
          },
        },
      },
    },
  });
  return board;
};

export const updateBoard = async (id: string, input: BoardSchema) => {
  console.log("input", input);
  const { columns, ...board } = input;
  const updateBoard = await prisma.board.update({
    where: {
      id,
    },
    data: {
      ...board,
    },
  });

  const currentColumns = await prisma.column.findMany({
    where: {
      board_id: id,
    },
  });

  const newColumns = columns.map((column) => column.name);

  const columnsToDelete = currentColumns.filter(
    (column) => !newColumns.includes(column.name)
  );

  const columnsToCreate = columns.filter(
    (column) =>
      !currentColumns.map((column) => column.name).includes(column.name)
  );

  const tasksToDelete = await prisma.task.findMany({
    where: {
      column_id: {
        in: columnsToDelete.map((column) => column.id),
      },
    },
    include: {
      subtasks: true,
    },
  });

  const deleteSubtasks = await prisma.subtask.deleteMany({
    where: {
      id: {
        in: tasksToDelete
          .map((task) => task.subtasks)
          .flat()
          .map((subtask) => subtask.id),
      },
    },
  });

  const deleteTasks = await prisma.task.deleteMany({
    where: {
      id: {
        in: tasksToDelete.map((task) => task.id),
      },
    },
  });

  const deleteColumns = await prisma.column.deleteMany({
    where: {
      id: {
        in: columnsToDelete.map((column) => column.id),
      },
    },
  });

  const createColumns = await prisma.column.createMany({
    data: columnsToCreate.map((column) => ({
      ...column,
      board_id: id,
    })),
  });

  return board;
};

export const deleteBoard = async (id: string) => {
  const columns = await prisma.column.findMany({
    where: {
      board_id: id,
    },
  });

  const tasks = await prisma.task.findMany({
    where: {
      column_id: {
        in: columns.map((column) => column.id),
      },
    },
  });

  const subtasks = await prisma.subtask.findMany({
    where: {
      task_id: {
        in: tasks.map((task) => task.id),
      },
    },
  });

  const deleteSubtasks = await prisma.subtask.deleteMany({
    where: {
      id: {
        in: subtasks.map((subtask) => subtask.id),
      },
    },
  });

  const deleteTasks = await prisma.task.deleteMany({
    where: {
      id: {
        in: tasks.map((task) => task.id),
      },
    },
  });

  const deleteColumns = await prisma.column.deleteMany({
    where: {
      id: {
        in: columns.map((column) => column.id),
      },
    },
  });

  const board = await prisma.board.delete({
    where: {
      id,
    },
  });

  return board;
};
