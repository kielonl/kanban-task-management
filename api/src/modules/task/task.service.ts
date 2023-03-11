import prisma from "../../utils/prisma";
import { CreateTaskSchema } from "./task.schema";

export const createTask = async (input: CreateTaskSchema) => {
  const task = await prisma.task.create({
    data: {
      ...input,
    },
  });
  return task;
};

export const getTask = async () => {
  const task = await prisma.task.findMany();
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

export const updateTask = async (id: string, input: CreateTaskSchema) => {
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
