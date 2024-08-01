import { BadRequest, NotFound } from "../error";
import { IUser } from "../interface/users";
import { getUserByEmail } from "./user";
import bcrypt from "bcryptjs";
import * as UserModel from "../model/user";
import { PERMISSION } from "@prisma/client";
import { signUser } from "../utils/auth";
import crypto from "crypto";
import config from "../config";
import loggerWithNameSpace from "../utils/logger";
const logger = loggerWithNameSpace("AuthService");
export const login = async (user: IUser) => {
  const existingUser = await getUserByEmail(user.email, { email: user.email });
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
  const payload: Omit<IUser, "password"> = {
    id: existingUser.id,
    email: existingUser.email,
    name: existingUser.name,
    permissions: permissionOfUser,
    roleId: +existingUser.role?.roleRank!,
  };
  logger.info("sign user");
  const { accessToken, refreshToken } = signUser(payload);
  return { accessToken, refreshToken };
};
export const createSignature = (message: string) => {
  const secret = config.esewaSecret!; //different in production
  // Create an HMAC-SHA256 hash
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(message);

  // Get the digest in base64 format

  const hashInBase64 = hmac.digest("base64");
  logger.info("base64 digested");
  return hashInBase64;
};
