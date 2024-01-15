import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const roles = await prisma.role.createMany({
    data: [
      { name: 'ROLE_ADMIN', label: 'Адміністратор' },
      { name: 'ROLE_TEACHER', label: 'Викладач' },
      { name: 'ROLE_STUDENT', label: 'Студент' },
    ],
  });
  const admin = await prisma.user.create({
    data: {
      email: 'admin@admin.com',
      firstname: 'Admin',
      lastname: 'Admin',
      password: 'adminadmin',
      roleId: 1,
    },
  });
  console.log({ roles, admin });
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
