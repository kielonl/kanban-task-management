import prisma from "../../utils/prisma";
import { CreateTaskSchema } from "./task.schema";

const createTask = async (input: CreateTaskSchema) => {
  const task = await prisma.task.create({
    data: {
      ...input,
    },
  });
  return task;
};

export default createTask;
