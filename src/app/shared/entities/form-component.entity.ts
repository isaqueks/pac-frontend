import { IBaseEntity } from "./base.entity";
import { IForm } from "./form.entity";

export enum FormComponentType {
    NUMBER = 'number',
    TEXT = 'text',
    CHECKBOX_LIST = 'checkbox_list',
    RADIO_LIST = 'radio_list',
    DATE = 'date',
    UPLOAD = 'upload',
  }

export interface IFormComponent extends IBaseEntity {
    id: string;
    title: string;
    subtitle?: string;
    type: FormComponentType;
    required: boolean;
    form: IForm;
    formId: string;
    options: string[];
}