import { FastifyReply, FastifyRequest } from "fastify";
import { TaskSchema } from "./task.schema";
import {
  createTask,
  deleteTask,
  getTask,
  getTaskById,
  updateTask,
} from "./task.service";

export const createTaskHandler = async (
  request: FastifyRequest<{
    Body: TaskSchema;
  }>,
  reply: FastifyReply
) => {
  const body = request.body;

  try {
    const task = await createTask(body);

    reply.code(201).send({ task });
  } catch (error) {
    console.log(error);
    reply.code(500).send({ error: "Incorrect value was provided" });
  }
};

export const getTaskHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const task = await getTask();

    reply.code(200).send({ tasks: task });
  } catch (error) {
    console.log(error);
    reply.code(500).send({ error: "Internal server error" });
  }
};

export const getTaskByIdHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const task = await getTaskById(id);

    reply.code(200).send({ tasks: task });
  } catch (error) {
    console.log(error);
    reply.code(500).send({ error: "Internal server error" });
  }
};

export const updateTaskHandler = async (
  request: FastifyRequest<{ Body: TaskSchema; Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const body = request.body;

    const task = await updateTask(id, body);

    reply.code(200).send({ task });
  } catch (error) {
    console.log(error);
    reply.code(500).send({ error: "Internal server error" });
  }
};

export const deleteTaskHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;

    const task = await deleteTask(id);

    reply.code(200).send({ task });
  } catch (error) {
    console.log(error);
    reply.code(500).send({ error: "Internal server error" });
  }
};
