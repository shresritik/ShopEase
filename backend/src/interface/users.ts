import { PERMISSION } from "@prisma/client";

export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  permissions?: PERMISSION[];
  profile?: string;
  roleId?: number;
}
