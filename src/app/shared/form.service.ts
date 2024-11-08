import { Injectable } from '@angular/core';
import IEntityService from './entity-base.service';
import { IForm } from './entities/form.entity';
import { map, Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IFormExecution } from './entities/execution.entity';

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

    execute(formId: string, techId: string, values: { formComponentId, value, justification? }[]): Observable<any> {
        return this.http.post<void>(`/executions`, {
            formId: formId,
            technicianId: techId,
            executionValues: values
        });
    }

    uploadFile(formId: string, file: File) {
        return this.http.get<any>(`/executions/s3/upload-url`, {
            params: {
                formId,
                ext: file.name.split('.').pop()
            }
        }).pipe(switchMap(res => {
            const { url, location } = res;
            // upload to s3 presigned url
            
            return new Observable(subscriber => {
                fetch(url, {
                    method: 'PUT',
                    body: file,
                    headers: {
                        'Content-Type': file.type
                    }
                })
                .then(res => subscriber.next(location))
                .catch(err => subscriber.error(err))
                .finally(() => subscriber.complete());
            });
        }))
    }

    getExecutions(formId: string): Observable<IFormExecution[]> {
        return this.http.get<any>(`/executions?formId=${formId}`);
    }

    getExecutionById(execId: string): Observable<IFormExecution> {
        return this.http.get<any>(`/executions/${execId}`);
    }

    deleteExecution(execId: string): Observable<void> {
        return this.http.delete<void>(`/executions/${execId}`);
    }

    setNote(execId: string, execValId: string, note: string, accordingly: boolean): Observable<any> {
        return this.http.patch<void>(`/executions/${execId}/values/${execValId}/notes`, { note, accordingly: String(!!accordingly) });
    }
}
