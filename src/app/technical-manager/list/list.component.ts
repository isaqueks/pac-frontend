import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { defaultErrorHandler } from 'src/app/shared/defaultErrorHandler';
import { ICostCenter } from 'src/app/shared/entities/cost-center.entity';
import { ITechnicalManager } from 'src/app/shared/entities/technical-maneger.entity';
import { TechnicianManagerService } from 'src/app/shared/technician-manager.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
    displayedColumns: string[] = ['email', 'name', 'phone', 'document', 'costCenter', 'actions'];
    dataSource: MatTableDataSource<ITechnicalManager> = new MatTableDataSource<ITechnicalManager>();
    selectedCostCenter: ICostCenter = null;
  
    constructor(
        private technicalManagerService: TechnicianManagerService,
        private router: Router
    ) {}
  
    ngOnInit(): void {
      this.carregarGerentesTecnicos();
    }
  
    onCostCenterSelect(costCenter: ICostCenter): void {
        this.selectedCostCenter = costCenter;
        this.carregarGerentesTecnicos();
    }

    carregarGerentesTecnicos(): void {
        if (!this.selectedCostCenter) {
            return;
        }
        this.technicalManagerService.getAllByCostCenter(this.selectedCostCenter.id).subscribe(defaultErrorHandler((managers: ITechnicalManager[]) => {
            this.dataSource.data = managers;
        }));
    }
  
    adicionarGerenteTecnico(): void {
      this.router.navigate(['/technical-manager/edit']);
    }
  
    editarGerenteTecnico(manager: ITechnicalManager): void {
        this.router.navigate(['/technical-manager/edit', manager.id]);
    }
  
    deletarGerenteTecnico(managerId: string): void {
      this.technicalManagerService.delete(managerId).subscribe(defaultErrorHandler(() => {
        this.carregarGerentesTecnicos();
      }));
    }
}
