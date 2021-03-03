import { Component, Injector, SimpleChanges } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { MocadaService } from 'src/app/shared/services/mocada.service';

@Component({
  selector: 'app-demanda-adm',
  templateUrl: './demanda-adm.component.html',
  styleUrls: ['./demanda-adm.component.css']
})
export class DemandaAdmComponent extends BaseResourceFormComponent {

  pageTitle: string = 'Administração de Demanda';

  checked1 = false;
  checked2 = true;

  constructor(
    protected injector: Injector,
    protected service: MocadaService
  ) {
    super(injector, service);
  }

  get possuiId(): boolean {
    return this.resource && this.resource.id && this.resource.id > 0;
  }

  ngAfterContentChecked() {}

  ngOnChanges(changes: SimpleChanges) { }

  //METHODS PRIVATE
  protected initForm(): void {
    this.formulario = this.formBuilder.group({
      id: [null],
      checked: [null],
      banco: [null, [Validators.required]],
      logradouro: [null],
      texto: [null, [Validators.required]],
      radio: [null],
      radio2: [null],
      radio3: [null],
      combo: [null]
    });
  }

  protected posSubmitFormSucesso(): void {
    this.showSuccess('Demanda atualizada com sucesso!');
  }
}
