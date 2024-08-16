import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IClient } from '../entities/client.entity';
import { ClientService } from '../client.service';
import { AuthService } from '../auth.service';
import { UserRoleEnum } from '../entities/user.role';

@Component({
  selector: 'client-select',
  templateUrl: './client-select.component.html',
  styleUrls: ['./client-select.component.scss']
})
export class ClientSelectComponent implements OnInit {

    @Output() valueChange: EventEmitter<IClient> = new EventEmitter<IClient>();
    @Input() value: IClient;
    @Input() label: string = 'Selecionar Cliente';
    @Input() readOnly: boolean = false;

    clients: IClient[] = [];

    loading = true;

    constructor(
        private clientService: ClientService,
        private auth: AuthService
    ) {}

    selectClient(ev) {
        const id = ev.target.value;
        const client = this.clients.find(client => client.id === id);
        this.valueChange.emit(client);
        this.value = client;
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
                    this.loading = false
                });
            }
            else if (user.role === UserRoleEnum.CLIENT) {
                const { client } = user;
                this.clients = [client];
                this.selectClient({ target: { value: client.id } });
                this.loading = false;
            }
            else {
                this.loading = false;
            }
        })
    }

}
