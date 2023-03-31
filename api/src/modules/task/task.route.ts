import { FastifyInstance } from "fastify";
import {
  createTaskHandler,
  deleteTaskHandler,
  getTaskByIdHandler,
  getTasksHandler,
  moveTaskHandler,
  updateTaskHandler,
} from "./task.controller";

const taskRoutes = async (server: FastifyInstance) => {
  server.post("/", createTaskHandler);
  server.get("/", getTasksHandler);
  server.get("/:id", getTaskByIdHandler);
  server.put("/:id", updateTaskHandler);
  server.put("/move/:id", moveTaskHandler);
  server.delete("/:id", deleteTaskHandler);
};

export default taskRoutes;
