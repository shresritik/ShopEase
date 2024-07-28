import { PERMISSION, PrismaClient, ROLE } from "@prisma/client";
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
    product_name: "DDC Milk",
    description: "Refined Cow Milk",
    cost_price: 40,
    selling_price: 50,
    category_id: 1,
    avg_rating: 4,
    total_review: 3.5,
    createdBy: 1,
    stock: 5,
  },
  {
    product_name: "Utsav Bread",
    description: "Refined Bread from utsav",
    cost_price: 40,
    selling_price: 50,
    category_id: 1,
    avg_rating: 4,
    total_review: 3.5,
    createdBy: 1,
    stock: 2,
  },
];
const roleData = [
  { roles: ROLE.SUPER_ADMIN, role_rank: 1 },
  { roles: ROLE.ADMIN, role_rank: 2 },
  { roles: ROLE.USER, role_rank: 3 },
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
  //product

  for (let i = 0; i < categoryData.length; i++) {
    await prisma.category.create({
      data: {
        category_name: categoryData[i],
      },
    });
  }
  for (let i = 0; i < productData.length; i++) {
    await prisma.product.create({
      data: productData[i],
    });
  }
  await prisma.status.createMany({
    data: [
      {
        status: "COMPLETE",
      },
      {
        status: "PENDING",
      },
    ],
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
