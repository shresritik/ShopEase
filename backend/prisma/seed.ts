import {
  PERMISSION,
  Prisma,
  PrismaClient,
  Product,
  ROLE,
} from "@prisma/client";
import config from "../src/config";
import { IProduct } from "../src/interface/product";
import { IUser } from "../src/interface/users";
const prisma = new PrismaClient();
const userData: IUser = {
  name: "shyam",
  email: "shyam@dsa.com",
  password: config.password!,
};
const categoryData = ["Dairy", "Bakery", "Packaged Food"];
const productData: IProduct[] = [
  {
    productName: "DDC Milk",
    description: "Refined Cow Milk",
    costPrice: 40,
    sellingPrice: 60,
    categoryId: 1,
    createdBy: 1,
    stock: 5,
  },
  {
    productName: "Utsav Bread",
    description: "Refined Bread from utsav",
    costPrice: 40,
    sellingPrice: 50,
    categoryId: 2,
    createdBy: 1,
    stock: 2,
  },
];
const roleData = [
  { roles: ROLE.SUPER_ADMIN, roleRank: 1 },
  { roles: ROLE.ADMIN, roleRank: 2 },
  { roles: ROLE.USER, roleRank: 3 },
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
      update: roleData[i],
      create: roleData[i],
    });
  await prisma.user.create({
    data: {
      ...userData,
      roleId: 1,
    },
  });
  //superadmin
  for (let i = 1; i <= 13; i++)
    await prisma.rolesPermissions.create({
      data: {
        roleId: 1,
        permissionId: i,
      },
    });
  //admin
  for (let i = 5; i <= 12; i++)
    await prisma.rolesPermissions.create({
      data: {
        roleId: 2,
        permissionId: i,
      },
    });
  //user
  for (let i = 9; i <= 12; i++)
    await prisma.rolesPermissions.create({
      data: {
        roleId: 3,
        permissionId: i,
      },
    });
  //product
  for (let i = 0; i < categoryData.length; i++) {
    await prisma.category.create({
      data: {
        categoryName: categoryData[i],
      },
    });
  }
  for (let i = 0; i < productData.length; i++) {
    await prisma.product.create({
      data: productData[i],
    });
  }
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
