import { IBaseEntity } from "./base.entity";
import { ITechnician } from "./techician.entity";
import { ITechnicalManager } from "./technical-maneger.entity";


export interface IFormExecution extends IBaseEntity {

    technicianId: string; 
    technician?: ITechnician;
    formId: string;
    executionValues: Array<{
        formComponentId: string; 
        justification?: string;
        technicalManager?: ITechnicalManager;
        id: string;
        note: string;
        value: string;
    }>;

}