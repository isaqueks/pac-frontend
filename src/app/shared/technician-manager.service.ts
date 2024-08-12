import { Injectable } from '@angular/core';
import IEntityService from './entity-base.service';
import { ITechnician } from './entities/techician.entity';
import { ITechnicalManager } from './entities/technical-maneger.entity';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TechnicianManagerService implements IEntityService<ITechnicalManager> {

  constructor(
    private http: HttpClient
  ) { }

    getAll(): Observable<ITechnicalManager[]> {
        return this.http.get<ITechnicalManager[]>('/technical-managers');
    }

    getById(id: string): Observable<ITechnicalManager> {
        return this.http.get<ITechnicalManager>(`/technical-managers/${id}`);
    }

    getAllByCostCenter(ccID: string): Observable<ITechnicalManager[]> {
        return this.http.get<ITechnicalManager[]>(`/technical-managers?costCenterId=${ccID}`);
    }

    create(entity: ITechnicalManager): Observable<ITechnicalManager> {
        return this.http.post<ITechnicalManager>('/technical-managers', entity);
    }

    update(entity: ITechnicalManager): Observable<ITechnicalManager> {
        return this.http.put<ITechnicalManager>(`/technical-managers/${entity.id}`, entity);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`/technical-managers/${id}`);
    }
}
