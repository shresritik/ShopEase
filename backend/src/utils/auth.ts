import { sign } from "jsonwebtoken";
import config from "../config";
import { IUser } from "../interface/users";

export function signUser(payload: Pick<IUser, "id" | "email" | "name">) {
  const accessToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });
  const refreshToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.refreshTokenExpiryMS,
  });
  return { accessToken, refreshToken };
}
