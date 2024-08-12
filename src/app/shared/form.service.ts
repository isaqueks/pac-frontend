import { Injectable } from '@angular/core';
import IEntityService from './entity-base.service';
import { IForm } from './entities/form.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FormService implements IEntityService<IForm> {

    constructor(
        private http: HttpClient
    ) { }

    getAll(): Observable<IForm[]> {
        return this.http.get<IForm[]>('/forms');
    }

    getById(id: string): Observable<IForm> {
        return this.http.get<IForm>(`/forms/${id}`);
    }

    getByCostCenter(ccID: string): Observable<IForm[]> {
        return this.http.get<IForm[]>(`/forms?costCenterId=${ccID}`);
    }

    create(entity: IForm): Observable<IForm> {
        return this.http.post<IForm>('/forms', entity);
    }

    update(entity: IForm): Observable<IForm> {
        throw new Error('Method not implemented.');
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`/forms/${id}`);
    }
}
