import { PERMISSION, PrismaClient, ROLE } from "@prisma/client";
import config from "../src/config";
const prisma = new PrismaClient();
const userData = {
  name: "shyam",
  email: "shyam@dsa.com",
  password: config.password!,
};
const roleData = [
  { role: ROLE.SUPER_ADMIN },
  { role: ROLE.ADMIN },
  { role: ROLE.USER },
];

const permissionData = [
  { permission: PERMISSION.SUPER_ADMIN_GET },
  { permission: PERMISSION.SUPER_ADMIN_PUT },
  { permission: PERMISSION.SUPER_ADMIN_POST },
  { permission: PERMISSION.SUPER_ADMIN_DELETE },
  { permission: PERMISSION.ADMIN_GET },
  { permission: PERMISSION.ADMIN_PUT },
  { permission: PERMISSION.ADMIN_POST },
  { permission: PERMISSION.ADMIN_DELETE },
  { permission: PERMISSION.USER_GET },
  { permission: PERMISSION.USER_PUT },
  { permission: PERMISSION.USER_POST },
  { permission: PERMISSION.USER_DELETE },
  { permission: PERMISSION.PRODUCT_GET },
  { permission: PERMISSION.PRODUCT_PUT },
  { permission: PERMISSION.PRODUCT_POST },
  { permission: PERMISSION.PRODUCT_DELETE },
  { permission: PERMISSION.REPORT_GET },
];
async function main() {
  for (let i = 0; i < permissionData.length; i++)
    await prisma.permission.upsert({
      where: { id: i + 1 },
      update: {
        id: i + 1,
        permissions: permissionData[i].permission,
      },
      create: {
        id: i + 1,
        permissions: permissionData[i].permission,
      },
    });

  for (let i = 0; i < roleData.length; i++)
    await prisma.role.upsert({
      where: { id: i + 1 },
      update: {
        id: i + 1,
        roles: roleData[i].role,
      },
      create: {
        id: i + 1,
        roles: roleData[i].role,
      },
    });
  await prisma.user.create({
    data: {
      ...userData,
      roleId: 1,
    },
  });
  //superadmin
  for (let i = 1; i <= 17; i++)
    await prisma.roles_Permissions.create({
      data: {
        roleId: 1,
        permissionId: i,
      },
    });
  //admin
  for (let i = 5; i <= 16; i++)
    await prisma.roles_Permissions.create({
      data: {
        roleId: 2,
        permissionId: i,
      },
    });
  //user
  for (let i = 9; i <= 12; i++)
    await prisma.roles_Permissions.create({
      data: {
        roleId: 3,
        permissionId: i,
      },
    });
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
