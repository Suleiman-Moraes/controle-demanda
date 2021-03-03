import { HttpClient } from "@angular/common/http";
import { Injector } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export abstract class BaseResourceService {

    protected http: HttpClient;

    constructor(
        protected apiPath: string,
        protected injector: Injector
    ) {
        this.http = injector.get(HttpClient);
    }

    getAll(): Observable<any> {
        return this.http.get(this.apiPath).pipe(
            map((res: any) => res),
            catchError(this.handleError)
        )
    }

    getById(id: number): Observable<any> {
        return this.getUtil(`${this.apiPath}/${id}`);
    }

    imprimirUtil(url: string): Observable<any> {
        return this.getUtil(url);
    }

    getUtil(url: string): Observable<any> {
        return this.http.get(url).pipe(
            map((res: any) => res),
            catchError(this.handleError)
        )
    }

    imprimirUtilComBody(url: string, object): Observable<any> {
        return this.http.post(url, object).pipe(
            map((res: any) => res),
            catchError(this.handleError)
        )
    }

    create(resource: any): Observable<any> {
        return this.http.post(this.apiPath, resource).pipe(
            map((res: any) => res),
            catchError(this.handleError)
        )
    }

    update(resource: any): Observable<any> {
        return this.http.put(this.apiPath, resource).pipe(
            map((res: any) => res),
            catchError(this.handleError)
        );
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.apiPath}/${id}`).pipe(
            map((res: any) => res),
            catchError(this.handleError)
        );
    }

    findByField(field: string, value: any): Observable<any> {
        return this.http.get(`${this.apiPath}/findbyfield/?field=${field}&value=${value}`).pipe(
            map((res: any) => res),
            catchError(this.handleError)
        );
    }

    enviarFormulario(resource: any, metodo: boolean): Observable<any> {
        return metodo ? this.update(resource) : this.create(resource);
    }

    findbyparamssingle(page: number, count: number): Observable<any> {
        return this.http.get
            (`${this.apiPath}/findbyparamssingle?page=${page}&count=${count}`)
            .pipe(
                map((res: any) => res),
                catchError(this.handleError)
            );
    }

    findByPararamsFilter(filterForm: any): Observable<any> {
        return this.http.post
            (`${this.apiPath}/findbyparamssingle`, filterForm)
            .pipe(
                map((res: any) => res),
                catchError(this.handleError)
            );
    }

    // PROTECTED METHODS
    protected handleError(error: any): Observable<any> {
        console.log("ERRO NA REQUISIÇÃO => ", error);
        return throwError(error);
    }
}