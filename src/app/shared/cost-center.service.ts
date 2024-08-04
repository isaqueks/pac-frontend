import { Injectable } from '@angular/core';
import { ICostCenter } from './entities/cost-center.entity';
import IEntityService from './entity-base.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CostCenterService implements IEntityService<ICostCenter> {

  constructor(
    private http: HttpClient
  ) { }

    getAll(): Observable<ICostCenter[]> {
        return this.http.get<ICostCenter[]>('/cost-centers');
    }

    getById(id: string): Observable<ICostCenter> {
        return this.http.get<ICostCenter>(`/cost-centers/${id}`);
    }

    create(entity: ICostCenter): Observable<ICostCenter> {
        return this.http.post<ICostCenter>('/cost-centers', entity);
    }

    update(entity: ICostCenter): Observable<ICostCenter> {
        return this.http.patch<ICostCenter>(`/cost-centers/${entity.id}`, entity);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`/cost-centers/${id}`);
    }
}
