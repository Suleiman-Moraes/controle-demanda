import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChartDemandaAnoComponent } from './chart-demanda-ano/chart-demanda-ano.component';
import { ChartDemandaMesComponent } from './chart-demanda-mes/chart-demanda-mes.component';
import { ChartDemandaFuncionarioAnoComponent } from './chart-demanda-funcionario-ano/chart-demanda-funcionario-ano.component';

@NgModule({
  declarations: [
    ChartDemandaAnoComponent,
    ChartDemandaMesComponent,
    ChartDemandaFuncionarioAnoComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ChartDemandaAnoComponent,
    ChartDemandaMesComponent,
    ChartDemandaFuncionarioAnoComponent
  ]
})
export class ChartModule { }
