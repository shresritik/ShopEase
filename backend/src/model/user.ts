import { IUser } from "../interface/users";
import prisma from "../utils/prisma";

export const getAllUsers = async (existingId: number) => {
  const users = await prisma.user.findMany({
    where: {
      roleId: {
        gte: existingId,
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      pic: true,
      password: true,
      role: {
        select: {
          roles: true,
          Roles_Permissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });
  if (!users) return;
  // Transform the result to aggregate roles into permissions
  const result = users.map((user) => {
    const permit = user.role?.Roles_Permissions.map(
      (u) => u.permission.permissions
    );
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      permission: permit,
      role: user.role?.roles,
    };
  });
  return result;
};
export const getUserById = async (id: number) => {
  const user = await prisma.user.findFirst({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      pic: true,
      password: true,

      role: {
        select: {
          roles: true,
          Roles_Permissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });
  if (!user) return;
  // Transform the result to aggregate roles into permissions

  const permit = user.role?.Roles_Permissions.map(
    (u) => u.permission.permissions
  );

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    pic: user.pic,
    password: user.password,
    permission: permit,
  };
};
export const getUserByEmail = async (email: string) => {
  return await prisma.user.findFirst({
    where: { email },
    include: {
      role: {
        select: {
          role_rank: true,
        },
      },
    },
  });
};
export const findUserPermission = async (email: string) => {
  const userWithPermissions = await prisma.user.findFirst({
    where: { email },
    include: {
      role: {
        include: {
          Roles_Permissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });
  if (!userWithPermissions) return;
  // Extract permissions
  const permit = userWithPermissions.role?.Roles_Permissions.map(
    (u) => u.permission.permissions
  );

  return permit;
};
export const createUser = async ({
  email,
  password,
  name,
  profile,
  roleId,
}: IUser) => {
  const user = await prisma.user.create({
    include: {
      role: true,
    },
    data: {
      email,
      password,
      name,
      pic: profile,
      roleId: roleId && +roleId,
    },
  });
  return user;
};
export const updateUser = async (
  id: number,
  { email, password, name, profile, roleId }: IUser,
  userId: number
) => {
  const user = await prisma.user.update({
    where: { id },
    include: {
      role: true,
    },
    data: {
      email,
      password,
      name,
      pic: profile,
      roleId,
      updatedBy: userId,
    },
  });
  return user;
};
export const deleteUser = async (id: number) => {
  await prisma.user.delete({ where: { id } });
};
