import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IClient } from '../entities/client.entity';
import { ClientService } from '../client.service';
import { AuthService } from '../auth.service';
import { UserRoleEnum } from '../entities/user.role';
import { ICostCenter } from '../entities/cost-center.entity';
import { CostCenterService } from '../cost-center.service';

@Component({
  selector: 'cost-center-select',
  templateUrl: './cost-center-select.component.html',
  styleUrls: ['./cost-center-select.component.scss']
})
export class CostCenterSelectComponent implements OnInit {

    @Output() valueChange: EventEmitter<ICostCenter> = new EventEmitter<ICostCenter>();
    @Input() value: ICostCenter;
    @Input() label: string = 'Selecionar Centro de Custo';
  
    clients: IClient[] = [];
    costCenters: ICostCenter[] = [];
  
    selectedClient: IClient;
    loading = true;
  
    constructor(
      private costCenterService: CostCenterService,
      private clientService: ClientService,
      private auth: AuthService
    ) {}
  
    selectClient(ev) {
      const clientId = ev.target.value;
      const client = this.clients.find(client => client.id === clientId);
      this.selectedClient = client;
      this.loadCostCenters(clientId);
    }
  
    selectCostCenter(ev) {
      const id = ev.target.value;
      const costCenter = this.costCenters.find(center => center.id === id);
      this.valueChange.emit(costCenter);
      this.value = costCenter;
    }
  
    loadCostCenters(clientId: string): void {
        this.loading = true;
      this.costCenterService.getByClientId(clientId).subscribe(costCenters => {
        this.costCenters = costCenters;
        if (costCenters.length > 0) {
          this.selectCostCenter({ target: { value: costCenters[0].id } });
        }
        this.loading = false;
      });
    }
  
    ngOnInit(): void {
      this.auth.getLoggedUser().subscribe(user => {
        if (!user) {
          this.loading = false;
          return;
        }
  
        if (user.role === UserRoleEnum.ADMIN) {
          this.clientService.getAll().subscribe(clients => {
            this.clients = clients;
            if (clients.length > 0) {
              this.selectClient({ target: { value: clients[0].id } });
            }
            this.loading = false;
          });
        }
        else if (user.role === UserRoleEnum.CLIENT) {
          const { client } = user;
          this.clients = [client];
          this.selectedClient = client;
          this.loadCostCenters(client.id);
          this.loading = false;
        }
        else if (user.role === UserRoleEnum.COST_CENTER) {
          const { costCenter } = user;
          this.costCenters = [costCenter];
          this.selectCostCenter({ target: { value: costCenter.id } });
          this.loading = false;
        }
        else {
          this.loading = false;
        }
      });
    }
}
