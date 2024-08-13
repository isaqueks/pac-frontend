import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';

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
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
