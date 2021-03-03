import { AfterContentChecked, Component, EventEmitter, Injector, OnInit, SimpleChanges } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { MessageService } from "primeng-lts/api";
import { switchMap } from "rxjs/operators";
import { BaseResourceService } from "../base-resource-service/base-resource.service";

@Component({
    template: ''
})
export abstract class BaseResourceFormComponent implements OnInit, AfterContentChecked {

    currentAction: string;
    pageTitle: string;
    resource: any;
    formulario: FormGroup;
    urlList: string = '/dividaativa';
    maxDate: Date = new Date();
    minDate: Date = new Date();
    tipos: string[] = ['pdf', 'doc', 'docx', 'png', 'PNG', 'jpg', 'xls'];
    @BlockUI() blockUI: NgBlockUI;

    protected route: ActivatedRoute;
    protected router: Router;
    protected formBuilder: FormBuilder;
    protected messageService: MessageService;

    constructor(
        protected injector: Injector,
        protected resourceService: BaseResourceService
    ) {
        this.route = this.injector.get(ActivatedRoute);
        this.router = this.injector.get(Router);
        this.messageService = this.injector.get(MessageService);
        this.formBuilder = this.injector.get(FormBuilder);
    }

    situacoes = {
        A: 'Ativo',
        I: 'Inativo'
    };

    simNaoEnum = {
        S: 'Sim',
        N: 'Não'
    };

    ngOnInit(): void {
        this.setCurrentAction();
        this.initForm();
        this.loadResource();
        this.posNgOnInit();
    }

    ngOnChanges(changes: SimpleChanges) { }

    ngAfterContentChecked() {
        this.setPageTitle();
        this.posNgAfterContentChecked();
    }

    get situacaoOptions(): Array<any> {
        if (!this['situacaoOptionsVar']) {
            this['situacaoOptionsVar'] = this.getTypes(this.situacoes);
        }
        return this['situacaoOptionsVar'];
    }

    get simNaoEnumOptions(): Array<any> {
        if (!this['simNaoEnumOptionsVar']) {
            this['simNaoEnumOptionsVar'] = this.getTypes(this.simNaoEnum);
        }
        return this['simNaoEnumOptionsVar'];
    }

    convertToNumber(string: string): number {
        return new Number(string).valueOf()
    }

    submitForm(): void {
        this.blockUI.start();
        this.markAsTouched(this.formulario);
        this.beforeSubmitForm();
        this.resource = this.formulario.value;
        this.resourceService.enviarFormulario(this.resource, (this.resource.id != null && this.resource.id > 0)).subscribe(
            responseApi => {
                this.blockUI.stop();
                this.tratarResponseSubimit(responseApi);
            }, err => {
                this.blockUI.stop();
                this.tratarErro(err);
            }
        );
    }

    inativarCampo(value: boolean, name: string, form: FormGroup): void {
        if (value) {
            form.get(name).setValue('Não Possui');
        }
        else {
            form.get(name).setValue(null);
        }
    }

    isNotNulAndNotEmpty(x): boolean {
        return x && x != '';
    }

    download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', text);
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    //PRIVATES METHODS
    protected setCurrentAction() {
        if (this.route.snapshot.url[0].path == "new") {
            this.currentAction = "new";
        }
        else {
            this.currentAction = "edit";
        }
    }

    protected setPageTitle() {
        if (this.currentAction == "new") {
            this.pageTitle = this.createPageTitle();
        }
        else {
            this.pageTitle = this.editionPageTitle();
        }
    }

    protected createPageTitle(): string {
        return 'Novo';
    }

    protected editionPageTitle(): string {
        return 'Edição';
    }

    protected loadResource(): void {
        if (this.currentAction == 'edit') {
            let id: string = '';
            this.route.paramMap.pipe(
                switchMap(params => params.get('id'))
            ).subscribe(
                (param) => {
                    id += param;
                }
            );
            this.realizarRequisicaoSimples(this.resourceService.getById(Number(id)), 'resource', () => {
                if (this.resource.id == null) {
                    this.showError('Nenhum Registro encontrado.');
                }
                this.beforePatchValue();
                this.formulario.patchValue(this.resource);
                this.posLoadResource();
            });
        }
    }

    protected tratarErro(err: any): void {
        this.blockUI.stop();
        if (err.status != 400) {
            // this.erroServidor();
        }
        else {
            this.posTratarErro();
            this.markAsTouched(this.formulario);
            err.error.erros.forEach(x => {
                this.showError(x);
            });
        }
    }

    protected erroServidor(): void {
        this.showError('Erro no servidor, tente novamente mais tarde');
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

    protected tratarResponseSubimit(responseApi: any): void {
        if (responseApi.data != null) {
            this.resource.id = responseApi.data.id;
            this.formulario.get('id').setValue(this.resource.id);
            this.posSubmitFormSucesso();
        }
        else {
            responseApi.erros.forEach(x => {
                this.showError(x);
            });
        }
    }

    protected mudaValue = {
        listened(valorPaste: string, formulario) {
            let somenteNumeroELetra: boolean = valorPaste.replace(/[1234567890.,]+/, '').length == 0
            let valorOld = formulario.get('valor').value;
            let podeMudar: boolean = false;
            let result: string = "";
            if (somenteNumeroELetra) {
                valorPaste = valorPaste.replace('.', '');
                let valoresVirgula: string[] = valorPaste.split(',');
                result = valoresVirgula[0] + ',' + (valoresVirgula[1] != undefined ? valoresVirgula[1] : '00');
                for (let i = 2; i < valoresVirgula.length; i++) {
                    result += valoresVirgula[i];
                }
            }
            else {
                result = valorOld;
            }
            valorPaste = result;
            formulario.get('valor').setValue(result);
        },
    }

    protected formId(required?): FormGroup {
        return this.formBuilder.group({
            id: [null, (required ? Validators.required : null)]
        });
    }

    protected markAsTouched(form: FormGroup): void {
        Object.keys(form.controls).forEach(field => {
            const control = form.get(field);
            if (control instanceof FormControl) {
                (control.valueChanges as EventEmitter<any>).emit(control.value);
                control.markAsTouched({ onlySelf: true });
            }
            else if (control instanceof FormGroup) {
                this.markAsTouched(control);
            }
        });
    }

    protected disableComponents(form: FormGroup, disable: boolean): void {
        Object.keys(form.controls).forEach(field => {
            const control = form.get(field);
            if (control instanceof FormControl) {
                if (disable) {
                    control.disabled;
                    control.disable();
                }
                else {
                    control.enabled;
                    control.enable();
                }
            }
            else if (control instanceof FormGroup) {
                this.disableComponents(control, disable);
            }
        });
    }

    protected realizarRequisicaoSimples(metodo, atributo, func): void {
        metodo.subscribe(
            (responseApi: any) => {
                if (responseApi.data == null) {
                    responseApi.erros.forEach(x => {
                        this.showError(x);
                    });
                }
                else {
                    this[atributo] = responseApi.data;
                    if (func != null) {
                        func();
                    }
                }
            }, err => {
                this.tratarErro(err);
            }
        );
    }

    protected buscar(metodo, atributo: string, func?: any): void {
        metodo.subscribe(res => {
            this[atributo] = res.data;
            if (func != null) {
                func();
            }
        });
    }

    protected showError(detail: string) {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: detail });
    }

    protected showSuccess(detail: string) {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: detail });
    }

    protected showWarning(detail: string) {
        this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: detail });
    }

    //OPICIONAIS
    protected beforePatchValue(): void { }
    protected posLoadResource(): void { }
    protected posTratarErro(): void { }
    protected posNgOnInit(): void { }
    protected posNgAfterContentChecked(): void { }
    protected beforeSubmitForm(): void { }
    protected acceptOrRejectConfirmDialog(aceito: boolean): void { }


    //ABSTRACT
    protected abstract initForm(): void;
    protected abstract posSubmitFormSucesso(): void;
}