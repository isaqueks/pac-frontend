import { IBaseEntity } from "./base.entity";
import { IUser } from "./user.entity";

export interface IClient extends IBaseEntity {
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
}