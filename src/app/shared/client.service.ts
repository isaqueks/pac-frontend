import { Injectable } from '@angular/core';
import IEntityService from './entity-base.service';
import { IClient } from './entities/client.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService implements IEntityService<IClient> {

  constructor(
    private http: HttpClient
  ) { }

    getAll(): Observable<IClient[]> {
        return this.http.get<IClient[]>('/clients');
    }

    getById(id: string): Observable<IClient> {
        return this.http.get<IClient>(`/clients/${id}`);
    }

    create(entity: IClient): Observable<IClient> {
        return this.http.post<IClient>('/clients', entity);
    }

    update(entity: IClient): Observable<IClient> {
        return this.http.put<IClient>(`/clients/${entity.id}`, entity);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`/clients/${id}`);
    }


}
