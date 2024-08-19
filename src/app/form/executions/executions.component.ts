import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { FormComponentType } from 'src/app/shared/entities/form-component.entity';
import { IForm } from 'src/app/shared/entities/form.entity';
import { IUser } from 'src/app/shared/entities/user.entity';
import { UserRoleEnum } from 'src/app/shared/entities/user.role';
import { FormService } from 'src/app/shared/form.service';

@Component({
  selector: 'app-executions',
  templateUrl: './executions.component.html',
  styleUrls: ['./executions.component.scss']
})
export class ExecutionsComponent implements OnInit {

    form: IForm;
    loading = true;
    user: IUser;

    roles = UserRoleEnum;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formService: FormService,
        private auth: AuthService
    ) { }

    ngOnInit(): void {
        this.loading = true;
        const formId = this.route.snapshot.paramMap.get('id');
        this.formService.getById(formId).subscribe(form => {
            this.form = form;
            this.auth.getLoggedUser().subscribe(user => {
                this.user = user;
                this.loading = false;
            });
        });
    }


}
