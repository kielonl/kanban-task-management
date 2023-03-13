import { FastifyInstance } from "fastify";
import {
  createColumnHandler,
  getColumnsHandler,
  getColumnByIdHandler,
  updateColumnHandler,
  deleteColumnHandler,
} from "./column.controller";

const columnRoutes = async (server: FastifyInstance) => {
  server.post("/", createColumnHandler);
  server.get("/", getColumnsHandler);
  server.get("/:id", getColumnByIdHandler);
  server.put("/:id", updateColumnHandler);
  server.delete("/:id", deleteColumnHandler);
};

export default columnRoutes;
