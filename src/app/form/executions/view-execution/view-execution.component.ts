import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFormExecution } from 'src/app/shared/entities/execution.entity';
import { IForm } from 'src/app/shared/entities/form.entity';
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

    constructor(
        private formService: FormService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.loading = true;
        this.formService.getExecutionById(id).subscribe(formExecution => {
            this.execution = formExecution;
            this.formService.getById(formExecution.formId).subscribe(form => {
                this.form = form;
                this.values = this.form.components.map(cp => {
                    return formExecution.executionValues.find(v => v.formComponentId === cp.id)?.value;
                });
                this.loading = false;
            });

        });
    }

}
