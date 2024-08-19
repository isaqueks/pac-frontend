import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { defaultErrorHandler } from 'src/app/shared/defaultErrorHandler';
import { ICostCenter } from 'src/app/shared/entities/cost-center.entity';
import { ITechnician } from 'src/app/shared/entities/techician.entity';
import { TechnicianService } from 'src/app/shared/technician.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
    displayedColumns: string[] = ['email', 'name', 'phone', 'document', 'costCenter', 'actions'];
    dataSource: MatTableDataSource<ITechnician> = new MatTableDataSource<ITechnician>();
    selectedCostCenter: ICostCenter = null;
  
    constructor(
        private technicianService: TechnicianService,
        private router: Router
    ) {}
  
    ngOnInit(): void {
      this.carregarTecnicos();
    }
  
    onCostCenterSelect(costCenter: ICostCenter): void {
        this.selectedCostCenter = costCenter;
        this.carregarTecnicos();
    }

    carregarTecnicos(): void {
        if (!this.selectedCostCenter) {
            return;
        }
      this.technicianService.getAllByCostCenter(this.selectedCostCenter.id).subscribe(defaultErrorHandler((technicians: ITechnician[]) => {
        this.dataSource.data = technicians;
      }));
    }
  
    adicionarTecnico(): void {
      // Lógica para adicionar um novo técnico
    }
  
    editarTecnico(technician: ITechnician): void {
        this.router.navigate(['/technician/edit', technician.id]);
    }
  
    deletarTecnico(technicianId: string): void {
      this.technicianService.delete(technicianId).subscribe(defaultErrorHandler(() => {
        this.carregarTecnicos();
      }));
    }
}
