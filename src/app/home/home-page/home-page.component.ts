import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { IUser } from 'src/app/shared/entities/user.entity';

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

}
