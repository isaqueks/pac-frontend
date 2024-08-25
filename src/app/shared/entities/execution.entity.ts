import { IBaseEntity } from "./base.entity";
import { ITechnician } from "./techician.entity";


export interface IFormExecution extends IBaseEntity {

    technicianId: string; 
    technician?: ITechnician;
    formId: string;
    executionValues: Array<{
        formComponentId: string; 
        justification?: string;
        id: string;
        note: string;
        value: string;
    }>;

}