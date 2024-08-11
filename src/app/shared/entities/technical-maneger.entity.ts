import { IBaseEntity } from "./base.entity";
import { ICostCenter } from "./cost-center.entity";
import { IUser } from "./user.entity";

export interface ITechnicalManager extends IBaseEntity {
    name: string;
    phone?: string;
    document: string;
    user: IUser;
    userId: string;
    costCenter: ICostCenter;
    costCenterId: string;
  }