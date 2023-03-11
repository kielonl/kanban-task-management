import { FastifyInstance } from "fastify";
import { createTaskHandler } from "./task.controller";

const taskRoutes = async (server: FastifyInstance) => {
  server.post("/", createTaskHandler);
};

export default taskRoutes;
