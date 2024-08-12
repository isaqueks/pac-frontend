import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.ClientModule)
    },
    {
        path: 'cost-center',
        loadChildren: () => import('./cost-center/cost-center.module').then(m => m.CostCenterModule)
    },
    {
        path: 'technician',
        loadChildren: () => import('./technician/technician.module').then(m => m.TechnicianModule)
    },
    {
        path: 'technical-manager',
        loadChildren: () => import('./technical-manager/technical-manager.module').then(m => m.TechnicalManagerModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
