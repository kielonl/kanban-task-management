import Fastify from "fastify";
import cors from "@fastify/cors";
import boardRoutes from "./modules/board/board.route";
import columnRoutes from "./modules/column/column.route";
import subtaskRoutes from "./modules/subtask/subtask.route";
import taskRoutes from "./modules/task/task.route";

const server = Fastify();

const main = async () => {
  await server.register(cors);

  server.get("/", (request, reply) => {
    reply.send({ hello: "world" });
  });

  server.register(boardRoutes, { prefix: "/board" });
  server.register(columnRoutes, { prefix: "/column" });
  server.register(taskRoutes, { prefix: "/task" });
  server.register(subtaskRoutes, { prefix: "/subtask" });

  try {
    await server.listen(3000, "0.0.0.0");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

main();
