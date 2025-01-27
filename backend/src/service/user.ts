import config from "../config";
import { BadRequest, NotFound } from "../error";
import { IUser } from "../interface/users";
import * as UserModel from "../model/user";
import loggerWithNameSpace from "../utils/logger";
import bcrypt from "bcryptjs";
const logger = loggerWithNameSpace("UserService");
//get all users based on the existing id
export const getAllUsers = async (existingId: number) => {
  const users = await UserModel.getAllUsers(existingId);
  if (!users || users.length == 0) {
    logger.info("User Data is empty");
    return { message: "User Data is empty" };
  }
  logger.info("Get user data");
  return users;
};
//create user and store the default image
export const createAUser = async (body: IUser) => {
  const userId = await UserModel.getUserByEmail(body.email);
  if (userId) {
    throw new BadRequest("User with email already exist");
  }
  const hashedPassword = await bcrypt.hash(body.password, 10);
  const users = await UserModel.createUser({
    ...body,
    profile: body.profile
      ? `http://localhost:${config.port}/static/profile/` + body.profile
      : `http://localhost:${config.port}/static/profile/default.png`,
    password: hashedPassword,
  });
  logger.info("Get user data");
  return users;
};
// get user info by email
export async function getUserByEmail(
  userEmail: string,
  user: Omit<IUser, "password" | "name">
) {
  if (userEmail != user.email) throw new NotFound("User Mismatched");

  const result = await UserModel.getUserByEmail(userEmail);
  if (!result) throw new NotFound("No user found");
  logger.info("Get user by email");
  return result;
}
// get users email
export async function getUsersEmail(userEmail: string) {
  const result = await UserModel.getUsersEmail(userEmail);
  if (!result) throw new NotFound("No user found");
  logger.info("Get user by email");
  return result;
}
// update user based on the user id
export const updateAUser = async (id: number, body: IUser, userId: number) => {
  const user = await UserModel.getUserById(id);
  if (!user) throw new NotFound("No user found with the id " + id);
  let hashedPassword = user.password;
  if (body.password) {
    hashedPassword = await bcrypt.hash(body.password, 10);
  }

  const users = await UserModel.updateUser(
    id,
    {
      ...body,
      profile: body.profile
        ? `http://localhost:${config.port}/static/profile/` + body.profile
        : `http://localhost:${config.port}/static/profile/default.png`,
      password: hashedPassword,
    },
    userId
  );
  logger.info("Update user by id " + id);
  return users;
};
// get user by id
export const getAUser = async (id: number) => {
  const user = await UserModel.getUserById(id);
  if (!user) {
    throw new NotFound("No user found with the id " + id);
  }
  logger.info("Get user by id " + id);
  return user;
};
// delete user by id
export const deleteAUser = async (id: number) => {
  const user = await UserModel.getUserById(id);
  if (!user) throw new NotFound("No user found with the id " + id);
  logger.info("Delete user by id " + id);
  await UserModel.deleteUser(id);
  return { message: "User deleted" };
};
