import Fastify from "fastify";
import taskRoutes from "./modules/task/task.route";

const server = Fastify();

server.get("/test", async (request, reply) => {
  return { hello: "world" };
});

const main = async () => {
  server.register(taskRoutes, { prefix: "/task" });

  try {
    await server.listen(3000, "0.0.0.0");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

main();
