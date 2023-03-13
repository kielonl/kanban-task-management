import { FastifyInstance } from "fastify";
import {
  createSubtaskHandler,
  getSubtasksHandler,
  getSubtaskByIdHandler,
  updateSubtaskHandler,
  deleteSubtaskHandler,
} from "./subtask.controller";

const subtaskRoutes = async (server: FastifyInstance) => {
  server.post("/", createSubtaskHandler);
  server.get("/", getSubtasksHandler);
  server.get("/:id", getSubtaskByIdHandler);
  server.put("/:id", updateSubtaskHandler);
  server.delete("/:id", deleteSubtaskHandler);
};

export default subtaskRoutes;
