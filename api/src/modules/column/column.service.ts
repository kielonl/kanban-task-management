import prisma from "../../utils/prisma";
import { ColumnSchema } from "./column.schema";

export const createColumn = async (input: ColumnSchema) => {
  const columnExists = await prisma.column.findFirst({
    where: {
      name: input.name,
      board_id: input.board_id,
    },
  });

  if (columnExists) throw new Error("Column already exists");

  const column = await prisma.column.create({
    data: {
      ...input,
    },
  });
  return column;
};

export const getColumns = async () => {
  const column = await prisma.column.findMany({
    include: {
      tasks: {
        include: {
          subtasks: true,
        },
      },
    },
  });
  return column;
};

export const getColumnById = async (id: string) => {
  const column = await prisma.column.findUnique({
    where: {
      id,
    },
    include: {
      tasks: {
        include: {
          subtasks: true,
        },
      },
    },
  });
  return column;
};

export const updateColumn = async (id: string, input: ColumnSchema) => {
  const column = await prisma.column.update({
    where: {
      id,
    },
    data: {
      ...input,
    },
  });
  return column;
};

export const deleteColumn = async (id: string) => {
  const column = await prisma.column.delete({
    where: {
      id,
    },
  });
  return column;
};
