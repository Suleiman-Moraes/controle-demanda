import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/security/auth.guard';
import { DemandaAdmComponent } from './demanda-adm/demanda-adm.component';

const routes: Routes = [
  {path: 'adm/:id', component: DemandaAdmComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemandaRoutingModule { }
