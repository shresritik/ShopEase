import { PERMISSION } from "../enum";

export interface IUser {
  name: string;
  email: string;
  password: string;
  permissions?: PERMISSION | PERMISSION[];
  profile?: string;
  roleId?: number;
}
