import prisma from "../../utils/prisma";
import { TaskSchema } from "./task.schema";

export const createTask = async (input: TaskSchema) => {
  const task = await prisma.task.create({
    data: {
      ...input,
    },
  });
  return task;
};

export const getTasks = async () => {
  const task = await prisma.task.findMany({
    include: {
      subtasks: true,
    },
  });
  return task;
};

export const getTaskById = async (id: string) => {
  const task = await prisma.task.findUnique({
    where: {
      id,
    },
  });
  return task;
};

export const updateTask = async (id: string, input: TaskSchema) => {
  const task = await prisma.task.update({
    where: {
      id,
    },
    data: {
      ...input,
    },
  });
  return task;
};

export const deleteTask = async (id: string) => {
  const task = await prisma.task.delete({
    where: {
      id,
    },
  });
  return task;
};
