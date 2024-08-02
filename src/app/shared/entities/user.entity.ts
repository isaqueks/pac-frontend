import { IBaseEntity } from "./base.entity";
import { UserRoleEnum } from "./user.role";

export interface IUser extends IBaseEntity {
    email: string;
    password: string;
    role: UserRoleEnum;
  }
  