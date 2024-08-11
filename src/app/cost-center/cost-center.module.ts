import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CostCenterRoutingModule } from './cost-center-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from '../shared/shared.module';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    ListComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CostCenterRoutingModule
  ]
})
export class CostCenterModule { }
