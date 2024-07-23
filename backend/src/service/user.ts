import { BadRequest, NotFound } from "../error";
import { IUser } from "../interface/users";
import * as UserModel from "../model/user";
import loggerWithNameSpace from "../utils/logger";
import bcrypt from "bcryptjs";
const logger = loggerWithNameSpace("UserService");
export const getAllUsers = async () => {
  const users = await UserModel.getAllUsers();
  if (!users || users.length == 0) {
    logger.info("User Data is empty");
    return { message: "User Data is empty" };
  }
  logger.info("Get user data");
  return users;
};

export const createAUser = async (body: IUser) => {
  const userId = await UserModel.getUserByEmail(body.email);
  if (userId) {
    throw new BadRequest("User with email already exist");
  }
  const hashedPassword = await bcrypt.hash(body.password, 10);
  const users = await UserModel.createUser({
    ...body,
    profile: `http:localhost:8000/static/profile/` + body.profile,
    password: hashedPassword,
  });
  logger.info("Get user data");
  return users;
};

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
      profile: `http:localhost:8000/static/profile/` + body.profile,
      password: hashedPassword,
    },
    userId
  );
  logger.info("Update user by id " + id);
  return users;
};
export const getAUser = async (id: number) => {
  const user = await UserModel.getUserById(id);
  if (!user) {
    throw new NotFound("No user found with the id " + id);
  }
  logger.info("Get user by id " + id);
  return user;
};
export const deleteAUser = async (id: number) => {
  const user = await UserModel.getUserById(id);
  if (!user) throw new NotFound("No user found with the id " + id);
  logger.info("Delete user by id " + id);
  await UserModel.deleteUser(id);
  return { message: "User deleted" };
};
