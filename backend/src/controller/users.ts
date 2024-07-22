import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "http-status-codes";
import { IRequest } from "../interface/utils";
import loggerWithNameSpace from "../utils/logger";
import {
  createAUser,
  deleteAUser,
  getAllUsers,
  getAUser,
  updateAUser,
} from "../service/user";
import { IUser } from "../interface/users";
import { UnauthorizedError } from "../error";
const logger = loggerWithNameSpace("User Controller");
export async function getUsers(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  try {
    //   const data = await UserService.createUser(user.id, body);
    logger.info("create a user");
    const users = await getAllUsers();
    res.status(HttpStatusCode.OK).json(users);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}
export async function updateUser(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { name, email, password, roleId } = req.body;
    const profile = req.file?.path;
    const user: IUser = {
      name,
      email,
      password,
      profile,
      roleId,
    };
    logger.info("create a user");
    const users = await updateAUser(+id, user);
    res.status(HttpStatusCode.OK).json(users);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}
export async function getUserById(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const users = await getAUser(+id);
    res.status(HttpStatusCode.OK).json(users);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}
export async function deleteUser(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const users = await deleteAUser(+id);
    res.status(HttpStatusCode.OK).json(users);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}
export async function createUser(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  try {
    //   const data = await UserService.createUser(user.id, body);
    const { name, email, password, roleId } = req.body;
    const profile = req.file?.path;
    const user: IUser = {
      name,
      email,
      password,
      profile,
      roleId,
    };
    const existingUser = req.user;
    if (existingUser?.roleId! > roleId)
      throw new UnauthorizedError("Unauthorized");
    logger.info("create a user");
    const users = await createAUser(user);
    res.status(HttpStatusCode.OK).json(users);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}
