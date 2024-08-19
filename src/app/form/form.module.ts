import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { ExecutionsComponent } from './executions/executions.component';
import { CreateExecutionComponent } from './executions/create-execution/create-execution.component';
import { ExecutionListComponent } from './executions/execution-list/execution-list.component';
import { ViewExecutionComponent } from './executions/view-execution/view-execution.component';


@NgModule({
  declarations: [
    ListComponent,
    EditComponent,
    ExecutionsComponent,
    CreateExecutionComponent,
    ExecutionListComponent,
    ViewExecutionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormRoutingModule
  ]
})
export class FormModule { }
