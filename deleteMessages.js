const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function deleteMessages() {
  await prisma.message.deleteMany({});
  console.log("Mensajes eliminados");
}

deleteMessages()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
