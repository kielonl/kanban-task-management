import prisma from "../../utils/prisma";
import { BoardSchema } from "./board.schema";

export const createBoard = async (input: BoardSchema) => {
  const board = await prisma.board.create({
    data: {
      ...input,
    },
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
  const board = await prisma.board.update({
    where: {
      id,
    },
    data: {
      ...input,
    },
  });
  return board;
};

export const deleteBoard = async (id: string) => {
  const board = await prisma.board.delete({
    where: {
      id,
    },
  });
  return board;
};
