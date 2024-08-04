import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from 'src/app/shared/client.service';
import { IClient } from 'src/app/shared/entities/client.entity';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
    displayedColumns: string[] = ['companyName', 'businessName', 'cnpj', 'email', 'actions'];
    dataSource: MatTableDataSource<IClient> = new MatTableDataSource<IClient>();
  
    constructor(private clientService: ClientService) {}
  
    ngOnInit(): void {
      this.loadClients();
    }
  
    loadClients(): void {
      this.clientService.getAll().subscribe((clients: IClient[]) => {
        this.dataSource.data = clients;
      });
    }
  
    addClient(): void {
      // Logic to add a new client
    }
  
    editClient(client: IClient): void {
      // Logic to edit the client
    }
  
    deleteClient(clientId: string): void {
      this.clientService.delete(clientId).subscribe(() => {
        this.loadClients();
      });
    }
}
