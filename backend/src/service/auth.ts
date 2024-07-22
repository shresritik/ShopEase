import { BadRequest, NotFound } from "../error";
import { IUser } from "../interface/users";
import { getUserByEmail } from "./user";
import bcrypt from "bcryptjs";
import * as UserModel from "../model/user";
import { PERMISSION } from "@prisma/client";
import { signUser } from "../utils/auth";
export const login = async (user: IUser) => {
  const existingUser = await getUserByEmail(user.email);
  if (!existingUser) {
    throw new BadRequest("Invalid email or password");
  }
  const existingPassword = await bcrypt.compare(
    user.password,
    existingUser.password
  );
  if (!existingPassword) throw new BadRequest("Invalid email or password");
  const permissionOfUser = (await UserModel.findUserPermission(
    user.email
  )) as PERMISSION[];
  console.log("a", permissionOfUser);
  const payload: Omit<IUser, "password"> = {
    id: existingUser.id,
    email: existingUser.email,
    name: existingUser.name,
    permissions: permissionOfUser,
    roleId: +existingUser.roleId!,
  };
  //   console.log(permissionOfUser);
  // //   logger.info("sign user");
  const { accessToken, refreshToken } = signUser(payload);
  return { accessToken, refreshToken };
};
