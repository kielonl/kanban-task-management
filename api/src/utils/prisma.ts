import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const allTasks = await prisma.task.findMany();
  console.log(allTasks);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

export default prisma;
