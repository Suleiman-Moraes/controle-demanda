import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseResourceService } from '../components/base-resource-service/base-resource.service';
import { ResponseApi } from '../models/response-api.model';

@Injectable({
  providedIn: 'root'
})
export class MocadaService extends BaseResourceService {

  private resources: any[] = [];

  constructor(
    protected injector: Injector
  ) {
    super('', injector);
    for (let i = 1; i <= 31; i++) {
      const texto: string = 'Registro Mocado ' + i;
      const dataHoje: Date = new Date();
      const cpf: string = '67389703075';
      const link: string = 'https://www.w3schools.com';
      const decimal: number = i + 0.5;
      const inteiro: number = i;
      const ano: number = 2020;
      const sim: string = 'S';
      this.resources.push({
        id: i,
        titulo: texto,
        coordenador: texto,
        tipoPrograma: texto,
        situacao: texto,
        atividade: texto,
        responsavel: texto,
        dataInicio: dataHoje,
        dataFim: dataHoje,
        data: dataHoje,
        tipoProjeto: texto,
        tipo: texto,
        nome: texto,
        cpf: cpf,
        funcao: texto,
        grauInstrucao: texto,
        linkCurriculoLattes: link,
        origem: texto,
        natureza: texto,
        fonteRecurso: texto,
        descricao: texto,
        unidade: texto,
        valorUnitario: decimal,
        quantidade: inteiro,
        valorTotal: decimal,
        tecnologia: texto,
        local: texto,
        pesquisador: texto,
        area: texto,
        projeto: texto,
        atuacao: texto,
        cargo: texto,
        ativo: sim,
        anoPortaria: ano,
        numeroPortaria: inteiro
      });
    }
  }

  getAll(): Observable<any> {
    return of(new ResponseApi(this.resources)).pipe(
      map((res: any) => res),
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<any> {
    return of(new ResponseApi(this.resources.filter(resource => resource.id == id))).pipe(
      map((res: any) => res),
      catchError(this.handleError)
    );
  }

  imprimirUtilComBody(url: string, object): Observable<any> {
    return this.http.post(url, object).pipe(
      map((res: any) => res),
      catchError(this.handleError)
    )
  }

  create(resource): Observable<any> {
    resource.id = this.resources.length + 1;
    return of(new ResponseApi(resource)).pipe(
      map((res: any) => res),
      catchError(this.handleError)
    );
  }

  update(resource): Observable<any> {
    return of(new ResponseApi(resource)).pipe(
      map((res: any) => res),
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<any> {
    return of(new ResponseApi(true)).pipe(
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
    const primeiroIndex = filterForm.page * filterForm.size;
    const ultimoIndex = primeiroIndex + filterForm.size;

    return of(new ResponseApi(
      {
        totalElements: this.resources.length,
        content: this.resources.filter((resource, index) => index >= primeiroIndex && index < ultimoIndex)
      }
    )
    ).pipe(
      map((res: any) => res),
      catchError(this.handleError)
    );
  }
}
