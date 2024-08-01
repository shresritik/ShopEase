import { NextFunction, Response } from "express";
import HttpStatusCode from "http-status-codes";
import { IRequest } from "../interface/utils";
import loggerWithNameSpace from "../utils/logger";
import {
  createAUser,
  deleteAUser,
  getAllUsers,
  getAUser,
  getUserByEmail,
  getUsersEmail,
  updateAUser,
} from "../service/user";
import { IUser } from "../interface/users";
const logger = loggerWithNameSpace("User Controller");
export async function getUsers(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  try {
    logger.info("create a user");
    const users = await getAllUsers(+req.user?.roleId!);
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
    const profile = req.file?.filename;
    const user: IUser = {
      name,
      email,
      password,
      profile,
      roleId,
    };
    logger.info("create a user");
    const users = await updateAUser(+id, user, +req.user?.id!);
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
export async function getUser(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await getUserByEmail(req.user?.email!, {
      email: req.body.email || req.user!.email,
    });
    res.status(HttpStatusCode.OK).json(users);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}
export async function getUserFromEmail(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await getUserByEmail(req.user?.email!, {
      email: req.body.email || req.user!.email,
    });
    res.status(HttpStatusCode.OK).json(users);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}
export async function getUserEmail(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await req.body;
    const user = await getUsersEmail(users.email);
    res.status(HttpStatusCode.OK).json(user);
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
    console.log(req.file);
    const profile = req.file?.filename;
    const user: IUser = {
      name,
      email,
      password,
      profile,
      roleId,
    };

    logger.info("create a user");
    const users = await createAUser(user);
    res.status(HttpStatusCode.CREATED).json(users);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}
