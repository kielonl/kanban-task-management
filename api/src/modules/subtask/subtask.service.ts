import prisma from "../../utils/prisma";
import { SubtaskSchema } from "./subtask.schema";

export const createSubtask = async (input: SubtaskSchema) => {
  const subtask = await prisma.subtask.create({
    data: {
      ...input,
    },
  });
  return subtask;
};

export const getSubtasks = async () => {
  const subtask = await prisma.subtask.findMany();
  return subtask;
};

export const getSubtaskById = async (id: string) => {
  const subtask = await prisma.subtask.findUnique({
    where: {
      id,
    },
  });
  return subtask;
};

export const updateSubtask = async (id: string, input: SubtaskSchema[]) => {
  const updatedSubtasks = await Promise.all(
    input.map(async (subtask) => {
      const updatedSubtask = await prisma.subtask.update({
        where: {
          id: subtask.id,
        },
        data: {
          ...subtask,
        },
      });
      return updatedSubtask;
    })
  );

  return updatedSubtasks;
};

export const deleteSubtask = async (id: string) => {
  const subtask = await prisma.subtask.delete({
    where: {
      id,
    },
  });
  return subtask;
};
