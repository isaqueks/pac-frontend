import { Injectable } from '@angular/core';
import IEntityService from './entity-base.service';
import { ITechnician } from './entities/techician.entity';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService implements IEntityService<ITechnician> {

  constructor(
    private http: HttpClient
  ) { }

    getAll(): Observable<ITechnician[]> {
        return this.http.get<ITechnician[]>('/technicians');
    }

    getAllByCostCenter(ccID: string): Observable<ITechnician[]> {
        return this.http.get<ITechnician[]>(`/technicians?costCenterId=${ccID}`);
    }

    getById(id: string): Observable<ITechnician> {
        return this.http.get<ITechnician>(`/technicians/${id}`);
    }

    create(entity: ITechnician): Observable<ITechnician> {
        return this.http.post<ITechnician>('/technicians', entity);
    }

    update(entity: ITechnician): Observable<ITechnician> {
        return this.http.put<ITechnician>(`/technicians/${entity.id}`, entity);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`/technicians/${id}`);
    }
}
