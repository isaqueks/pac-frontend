import { IBaseEntity } from "./base.entity";
import { ICostCenter } from "./cost-center.entity";
import { IFormComponent } from "./form-component.entity";

export interface IForm extends IBaseEntity {
    title: string;
    costCenter: ICostCenter;
    costCenterId: string;
    components: IFormComponent[];
  }
  