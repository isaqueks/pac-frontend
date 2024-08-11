import { Component } from '@angular/core';
import { UserRoleEnum } from '../shared/entities/user.role';
import { AuthService } from '../shared/auth.service';
import { IUser } from '../shared/entities/user.entity';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

    user: IUser;

    constructor(
        private auth: AuthService,
        private router: Router
    ) {}

    ngOnInit() {
        this.auth.getLoggedUser().subscribe({
            next: user => {
                this.user = user;
                console.log('User:', user);
            },
            error: err => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        this.router.navigate(['/login']);
                    }
                }
            }
        });
    }

    logout() {
        this.auth.signOut().subscribe(() => {
            this.router.navigate(['/login']);
        });
    }

    menuItems = [
        { label: 'Centros de Custo', icon: 'home', path: 'cost-center', perms: [UserRoleEnum.ADMIN, UserRoleEnum.CLIENT] },
        { label: 'Clientes', icon: 'settings', path: 'client', perms: [UserRoleEnum.ADMIN] },
        { label: 'Técnicos', icon: 'person', path: 'technician', perms: [UserRoleEnum.ADMIN, UserRoleEnum.COST_CENTER] },
        { label: 'Responsáveis Técnicos', icon: 'help', perms: [UserRoleEnum.ADMIN, UserRoleEnum.COST_CENTER] },
        { label: 'Formulários', icon: 'help', perms: [
            UserRoleEnum.ADMIN, UserRoleEnum.COST_CENTER, UserRoleEnum.TECHNICIAN, UserRoleEnum.TECHNICAL_MANAGER
        ] },
      ];
    
      onMenuItemClick(item: any): void {
        console.log('Menu item clicked:', item);
        // Handle menu item click event here
      }
}
