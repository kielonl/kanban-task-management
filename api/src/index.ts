import Fastify from "fastify";
import boardRoutes from "./modules/board/board.route";
import columnRoutes from "./modules/column/column.route";
import subtaskRoutes from "./modules/subtask/subtask.route";
import taskRoutes from "./modules/task/task.route";

const server = Fastify();

const main = async () => {
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
