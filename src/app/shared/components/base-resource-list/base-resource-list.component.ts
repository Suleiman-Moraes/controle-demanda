import { Component, Injector, OnInit, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { ConfirmationService, MessageService } from "primeng-lts/api";
import { BaseResourceService } from "../base-resource-service/base-resource.service";

@Component({
    template: ''
})
export abstract class BaseResourceListComponent implements OnInit {

    @BlockUI() blockUI: NgBlockUI;
    page: number = 0;
    size: number = 10;
    resources;
    filterForm: FormGroup;
    title: string = '';
    router: Router;
    protected titleService: Title;
    protected formBuilder: FormBuilder;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;

    //Permissões
    fiscalADMINISTRADOR: boolean = null;
    fiscalFISCALIZACAO: boolean = null;
    expediente: boolean = null;

    constructor(
        private resourceService: BaseResourceService,
        protected injector: Injector
    ) {
        this.formBuilder = injector.get(FormBuilder);
        this.messageService = this.injector.get(MessageService);
        this.router = this.injector.get(Router);
        this.confirmationService = this.injector.get(ConfirmationService);
        this.titleService = injector.get(Title);
    }

    ngOnInit(): void {
        new Promise((resolve, reject) => {
            this.buildForm();
            resolve(0);
        }).then((_) => this.findByPararamsFilter());
        this.posNgOnInit();
    }

    ngOnChanges(changes: SimpleChanges) { }

    simNaoEnumNotExcluir = {
        S: 'Sim',
        N: 'Não'
    };

    simNaoEnum = {
        E: 'Excluído',
        S: 'Sim',
        N: 'Não'
    };

    tipoStatusEnum = {
        E: 'Excluído',
        A: 'Ativo',
        I: 'Inativo'
    };

    sexoEnum = {
        M: 'Masculino',
        F: 'Feminino',
        I: 'Indeterminado',
        A: 'Ambos'
    };

    get simNaoEnumNotExcluirOptions(): Array<any> {
        if (!this['simNaoEnumNotExcluirOptionsVar']) {
            this['simNaoEnumNotExcluirOptionsVar'] = this.getTypes(this.simNaoEnumNotExcluir);
        }
        return this['simNaoEnumNotExcluirOptionsVar'];
    }

    get simNaoEnumOptions(): Array<any> {
        if (!this['simNaoEnumOptionsVar']) {
            this['simNaoEnumOptionsVar'] = this.getTypes(this.simNaoEnum);
        }
        return this['simNaoEnumOptionsVar'];
    }

    get sexoEnumOptions(): Array<any> {
        if (!this['sexoEnumOptionsVar']) {
            this['sexoEnumOptionsVar'] = this.getTypes(this.sexoEnum);
        }
        return this['sexoEnumOptionsVar'];
    }

    get tipoStatusEnumOptions(): Array<any> {
        if (!this['tipoStatusEnumOptionsVar']) {
            this['tipoStatusEnumOptionsVar'] = this.getTypes(this.tipoStatusEnum);
        }
        return this['tipoStatusEnumOptionsVar'];
    }

    // getSituacaoEnum(tipo: string): string{
    //   return SituacaoEnum[tipo];
    // }

    paginate(event?: any) {
        if (event) {
            this.size = event.rows;
            this.page = event.page;
            this.filterForm.get('size').setValue(this.size);
            this.filterForm.get('page').setValue(this.page);
        }
        this.findByPararamsFilter();
    }

    temPermissao(per: string): boolean {
        if (this[per] == null) {
            this[per] = this.verificarPermissao(per);
        }
        return this[per];
    }

    buildForm(): void {
        this.filterForm = this.formBuilder.group({
            page: [this.page],
            size: [this.size]
        });
    }

    deleteById(id): void {
        this.openConfirmDialog('Confirma remover esse registro?', () => {
            this.blockUI.start();
            this.resourceService.delete(id).subscribe(
                responseApi => {
                    this.blockUI.stop();
                    if (responseApi.data == null) {
                        responseApi.erros.forEach(x => {
                            this.showError(x);
                        });
                    }
                    else {
                        this.showSuccess('Registro removido com Sucesso.');
                        this.paginate();
                    }
                }, err => {
                    this.blockUI.stop();
                    this.tratarErro(err);
                }
            );
        }, () => { });
    }

    openConfirmDialog(message: string, accept: Function, reject: Function): void {
        this.confirmationService.confirm({
            message: message,
            header: 'Confirmação',
            icon: 'pi pi-info-circle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: accept,
            reject: reject
        });
    }

    //PRIVATE METHODS
    protected showError(detail: string) {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: detail });
    }

    protected showSuccess(detail: string) {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: detail });
    }

    protected showWarning(detail: string) {
        this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: detail });
    }

    protected erroServidor(): void {
        this.showError('Erro no servidor, tente novamente mais tarde');
    }

    protected findByParams(): void {
        this.resourceService.findbyparamssingle(this.page, this.size).subscribe(
            responseApi => {
                this.tratarResponseApi(responseApi);
            }, err => {
                this.tratarErro(err);
            }
        );
    }

    protected findByPararamsFilter(): void {
        this.resourceService.findByPararamsFilter(this.filterForm.value).subscribe(
            responseApi => {
                this.tratarResponseApi(responseApi);
            }, err => {
                this.tratarErro(err);
            }
        );
    }

    protected tratarResponseApi(responseApi): void {
        if (responseApi.data == null) {
            responseApi.erros.forEach(x => {
                this.showError(x);
            });
        }
        else {
            this.resources = responseApi.data;
            if (this.resources.totalElements == 0) {
                this.showWarning('Nenhum Registro Encontrado.');
            }
        }
    }

    protected tratarErro(err): void {
        if (err.status == 401 || err.status == 0) {
            this.erroServidor();
            this.router.navigate(['/pages/login']);
        }
        if (err.status != 400) {
            this.erroServidor();
        }
        else {
            err.error.erros.forEach(x => {
                this.showError(x);
            });
        }
    }

    protected verificarPermissao(pers: string): boolean {
        if (pers == null || pers.length <= 0) {
            return true;
        }
        // for (let i = 0; i < this.currentUser.roles.length; i++) {
        //   if (pers.toLowerCase() == this.currentUser.roles[i].toLowerCase()) {
        //     return true;
        //   }
        // }
        return false;
    }

    protected getTypes(type: any): any {
        return Object.entries(type).map(
            ([value, text]) => {
                return {
                    text: text,
                    value: value
                }
            }
        );
    }

    protected download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', text);
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    protected buscar(metodo, atributo: string): void {
        metodo.subscribe(res => {
            this[atributo] = res.data;
        });
    }

    protected formId(required?): FormGroup {
        return this.formBuilder.group({
            id: [null, (required ? Validators.required : null)]
        });
    }

    //OPCIONAIS
    protected posNgOnInit(): void { }
}