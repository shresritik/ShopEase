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
import { verify } from "jsonwebtoken";
const logger = loggerWithNameSpace("AuthService");
/**
 * login the user if email or password exists and generate the tokens
 * @param body email|password
 * @returns {access token, refresh token}
 */
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
  const secret = config.esewaSecret!;
  // Create an HMAC-SHA256 hash
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(message);
  // Get the digest in base64 format
  const hashInBase64 = hmac.digest("base64");
  logger.info("base64 digested");
  return hashInBase64;
};
/**
 *generate new tokens from the previous refresh token
 * @param token refresh token
 * @returns {access token, refresh token}
 */
export async function refresh(token: string) {
  try {
    const { id, email, name, roleId, permissions } = verify(
      token,
      config.jwt.secret!
    ) as IUser;
    const payload = {
      id,
      email,
      name,
      roleId,
      permissions,
    };
    logger.info("refresh token");
    const { accessToken } = signUser(payload);
    return { accessToken };
  } catch (error: unknown) {
    if (error instanceof Error) throw new BadRequest(error.message);
    else {
      throw new BadRequest("Something went wrong");
    }
  }
}
