import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ICostCenter } from 'src/app/shared/entities/cost-center.entity';
import { IForm } from 'src/app/shared/entities/form.entity';
import { FormService } from 'src/app/shared/form.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
    displayedColumns: string[] = ['title', 'costCenter', 'actions'];
    dataSource: MatTableDataSource<IForm> = new MatTableDataSource<IForm>();
    selectedCostCenter: ICostCenter = null;
  
    constructor(
        private formService: FormService,
        private router: Router
    ) {}
  
    ngOnInit(): void {
      this.carregarFormularios();
    }
  
    onCostCenterSelect(costCenter: ICostCenter): void {
        this.selectedCostCenter = costCenter;
        this.carregarFormularios();
    }

    carregarFormularios(): void {
        if (!this.selectedCostCenter) {
            return;
        }
        this.formService.getByCostCenter(this.selectedCostCenter.id).subscribe((forms: IForm[]) => {
            this.dataSource.data = forms;
        });
    }
  
    adicionarFormulario(): void {
      this.router.navigate(['/form/edit']);
    }
  
    editarFormulario(form: IForm): void {
        this.router.navigate(['/form/edit', form.id]);
    }
  
    deletarFormulario(formId: string): void {
      this.formService.delete(formId).subscribe(() => {
        this.carregarFormularios();
      });
    }
}
