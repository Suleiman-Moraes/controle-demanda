import { NgModule } from '@angular/core';

import { DemandaRoutingModule } from './demanda-routing.module';
import { DemandaAdmComponent } from './demanda-adm/demanda-adm.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DemandaInformacaoComponent } from './components/demanda-informacao/demanda-informacao.component';
import { DemandaHistoricoEncaminhamentoComponent } from './components/demanda-historico-encaminhamento/demanda-historico-encaminhamento.component';


@NgModule({
  declarations: [
    DemandaAdmComponent,
    DemandaInformacaoComponent,
    DemandaHistoricoEncaminhamentoComponent
  ],
  imports: [
    SharedModule,
    DemandaRoutingModule
  ]
})
export class DemandaModule { }
