import { FastifyInstance } from "fastify";
import {
  createTaskHandler,
  deleteTaskHandler,
  getTaskByIdHandler,
  getTaskHandler,
  updateTaskHandler,
} from "./task.controller";

const taskRoutes = async (server: FastifyInstance) => {
  server.post("/", createTaskHandler);
  server.get("/", getTaskHandler);
  server.get("/:id", getTaskByIdHandler);
  server.put("/:id", updateTaskHandler);
  server.delete("/:id", deleteTaskHandler);
};

export default taskRoutes;
