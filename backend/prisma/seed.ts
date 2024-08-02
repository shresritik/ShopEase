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
    description: "Refined Cow Milk 500ml",
    costPrice: 40,
    sellingPrice: 60,
    categoryId: 1,
    createdBy: 1,
    pic: "http://localhost:8000/static/products/ddc-standard-milk.jpg",
    stock: 5,
  },
  {
    productName: "DDC Cow Milk",
    description: "DDC Cow Milk 500ml",
    costPrice: 50,
    sellingPrice: 70,
    categoryId: 1,
    createdBy: 1,
    pic: "http://localhost:8000/static/products/ddc-cow-milk.jpg",
    stock: 5,
  },
  {
    productName: "Nanglo Bread",
    description: "Milk Bread from Nanglo",
    costPrice: 40,
    sellingPrice: 50,
    categoryId: 2,
    pic: "http://localhost:8000/static/products/nanglo-bread.jpg",
    createdBy: 1,
    stock: 2,
  },
  {
    productName: "Lays Blue chips",
    description: "Lays Blue chips, 41gm",
    costPrice: 40,
    sellingPrice: 50,
    pic: "http://localhost:8000/static/products/lays-blue.jpg",
    categoryId: 3,
    createdBy: 1,
    stock: 2,
  },
  {
    productName: "Lays Green chips",
    description: "Lays Green chips, 41gm",
    costPrice: 40,
    sellingPrice: 50,
    pic: "http://localhost:8000/static/products/lays-green.jpg",
    categoryId: 3,
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
  await prisma.discount.create({
    data: {
      code: "shopease",
      percentage: 0.2,
      validFrom: new Date().toISOString(),
      validUntil: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
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
