import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { ExecutionsComponent } from './executions/executions.component';
import { ViewExecutionComponent } from './executions/view-execution/view-execution.component';

const routes: Routes = [
    {
        path: '',
        component: ListComponent
    },
    {
        path: 'edit',
        component: EditComponent
    },
    {
        path: 'edit/:id',
        component: EditComponent
    },
    {
        path: 'executions/:id',
        component: ExecutionsComponent
    },
    {
        path: 'view-execution/:id',
        component: ViewExecutionComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
