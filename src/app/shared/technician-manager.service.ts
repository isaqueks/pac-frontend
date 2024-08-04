import { Injectable } from '@angular/core';
import IEntityService from './entity-base.service';
import { ITechnician } from './entities/techician.entity';
import { ITechnicalManager } from './entities/technician-maneger.entity';
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
        return this.http.get<ITechnicalManager[]>('/technician-managers');
    }

    getById(id: string): Observable<ITechnicalManager> {
        return this.http.get<ITechnicalManager>(`/technician-managers/${id}`);
    }

    create(entity: ITechnicalManager): Observable<ITechnicalManager> {
        return this.http.post<ITechnicalManager>('/technician-managers', entity);
    }

    update(entity: ITechnicalManager): Observable<ITechnicalManager> {
        return this.http.patch<ITechnicalManager>(`/technician-managers/${entity.id}`, entity);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`/technician-managers/${id}`);
    }
}
