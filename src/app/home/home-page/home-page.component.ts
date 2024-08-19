import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { IUser } from 'src/app/shared/entities/user.entity';
import { UserRoleEnum } from 'src/app/shared/entities/user.role';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

    user: IUser;

    constructor(
        private auth: AuthService
    ) {
        this.auth.getLoggedUser().subscribe((user: IUser) => {
            this.user = user;
        });
    }

    getUserRoleLabel(role: UserRoleEnum) {
        switch (role) {
            case 'ADMIN':
                return 'Administrador';
            case 'COST_CENTER':
                return 'Centro de Custo';
            case 'TECHNICIAN':
                return 'Técnico';
            case 'CLIENT':
                return 'Cliente';
            case 'TECHNICAL_MANAGER':
                return 'Responsável Técnico';
        }
        return role;
    }

}
