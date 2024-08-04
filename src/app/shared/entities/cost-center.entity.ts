import { IBaseEntity } from "./base.entity";
import { IClient } from "./client.entity";
import { IUser } from "./user.entity";

export interface ICostCenter extends IBaseEntity {
    companyName: string;
    businessName?: string;
    cnpj: string;
    addressZipCode?: string;
    addressStreet?: string;
    addressNumber?: number;
    addressComplement?: string;
    addressDistrict?: string;
    addressCity?: string;
    addressState?: string;
    user: IUser;
    userId: string;
    client: IClient;
    clientId: string;
  }