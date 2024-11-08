import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { defaultErrorHandler } from 'src/app/shared/defaultErrorHandler';
import { IFormExecution } from 'src/app/shared/entities/execution.entity';
import { IForm } from 'src/app/shared/entities/form.entity';
import { IUser } from 'src/app/shared/entities/user.entity';
import { UserRoleEnum } from 'src/app/shared/entities/user.role';
import { FormService } from 'src/app/shared/form.service';

@Component({
  selector: 'app-view-execution',
  templateUrl: './view-execution.component.html',
  styleUrls: ['./view-execution.component.scss']
})
export class ViewExecutionComponent implements OnInit {

    form: IForm;

    loading = true;

    values = null;

    execution: IFormExecution;

    user: IUser;
    roles = UserRoleEnum;
    notes = [];
    justifications = [];

    constructor(
        private formService: FormService,
        private route: ActivatedRoute,
        private auth: AuthService
    ) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.loading = true;
        this.formService.getExecutionById(id).subscribe(defaultErrorHandler(formExecution => {
            this.execution = formExecution;
            this.justifications = formExecution.executionValues.map(ev => ev.justification);
            this.notes = formExecution.executionValues.map(ev => {
                console.log(ev)
                return {
                    execValueId: ev.id,
                    techManager: ev.technicalManager,
                    value: ev.note,
                    accordingly: ev.accordingly,
                    componentId: ev.formComponentId,
                };
            });
            console.log(this.notes)
            this.formService.getById(formExecution?.formId).subscribe(defaultErrorHandler(form => {
                this.form = form;
                this.values = this.form.components.map(cp => {
                    return formExecution.executionValues.find(v => v.formComponentId === cp.id)?.value;
                });
                this.auth.getLoggedUser().subscribe(defaultErrorHandler(user => {
                    this.user = user;
                    this.loading = false;
                }));
            }));

        }));
    }

}
