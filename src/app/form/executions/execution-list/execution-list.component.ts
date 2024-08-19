import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IFormExecution } from 'src/app/shared/entities/execution.entity';
import { IForm } from 'src/app/shared/entities/form.entity';
import { FormService } from 'src/app/shared/form.service';

@Component({
  selector: 'app-execution-list',
  templateUrl: './execution-list.component.html',
  styleUrls: ['./execution-list.component.scss']
})
export class ExecutionListComponent implements OnInit {

    @Input() form: IForm;

    loading = false;

    executions: IFormExecution[] = [];

    displayedColumns: string[] = ['technician', 'actions'];
    dataSource: MatTableDataSource<IFormExecution> = new MatTableDataSource<IFormExecution>();

    constructor(
        private formService: FormService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loading = true;
        this.formService.getExecutions(this.form.id).subscribe(executions => {
            this.executions = executions;
            this.dataSource.data = executions;
            this.loading = false;
        });
    }

    viewExecution(execution) { 
        this.router.navigate(['/form/view-execution/', execution.id]);
    }

}
