import { FastifyInstance } from "fastify";
import {
  createTaskHandler,
  deleteTaskHandler,
  getTaskByIdHandler,
  getTasksHandler,
  updateTaskHandler,
} from "./task.controller";

const taskRoutes = async (server: FastifyInstance) => {
  server.post("/", createTaskHandler);
  server.get("/", getTasksHandler);
  server.get("/:id", getTaskByIdHandler);
  server.put("/:id", updateTaskHandler);
  server.delete("/:id", deleteTaskHandler);
};

export default taskRoutes;
