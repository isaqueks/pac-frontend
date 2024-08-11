import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/shared/client.service';
import { CostCenterService } from 'src/app/shared/cost-center.service';
import { IClient } from 'src/app/shared/entities/client.entity';
import { ICostCenter } from 'src/app/shared/entities/cost-center.entity';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    displayedColumns: string[] = ['email', 'companyName', 'businessName', 'cnpj', 'client', 'actions'];
    dataSource: MatTableDataSource<ICostCenter> = new MatTableDataSource<ICostCenter>();
    // clients: IClient[] = [];
    selectedClientId: string | null = null;
  
    constructor(
      private costCenterService: CostCenterService,
      private clientService: ClientService,
      private router: Router
    ) {}
  
    ngOnInit(): void {
    //   this.carregarClientes();
    }
  
    carregarCentrosDeCusto(clientId: string): void {
      this.costCenterService.getByClientId(clientId).subscribe((costCenters: ICostCenter[]) => {
        this.dataSource.data = costCenters;
      });
    }
  
    // carregarClientes(): void {
    //   this.clientService.getAll().subscribe((clients: IClient[]) => {
    //     this.clients = clients;
    //   });
    // }
  
    onClientChange(client: IClient): void {
      if (client) {
        this.carregarCentrosDeCusto(client.id);
      } else {
        this.dataSource.data = [];
      }
    }
  
    adicionarCentroDeCusto(): void {
      // Lógica para adicionar um novo centro de custo
    }
  
    editarCentroDeCusto(costCenter: ICostCenter): void {
      // Lógica para editar o centro de custo
      this.router.navigate(['/cost-center/edit', costCenter.id]);
    }
  
    deletarCentroDeCusto(costCenterId: string): void {
      this.costCenterService.delete(costCenterId).subscribe(() => {
        if (this.selectedClientId) {
          this.carregarCentrosDeCusto(this.selectedClientId);
        }
      });
    }
  }