import { FastifyInstance } from "fastify";
import {
  createBoardHandler,
  getBoardsHandler,
  getBoardsNamesHandler,
  getBoardByIdHandler,
  updateBoardHandler,
  deleteBoardHandler,
} from "./board.controller";

const boardRoutes = async (server: FastifyInstance) => {
  server.post("/", createBoardHandler);
  server.get("/", getBoardsHandler);
  server.get("/names", getBoardsNamesHandler);
  server.get("/:id", getBoardByIdHandler);
  server.put("/:id", updateBoardHandler);
  server.delete("/:id", deleteBoardHandler);
};
export default boardRoutes;
