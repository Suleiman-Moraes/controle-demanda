import { NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ConfirmationService, MessageService } from 'primeng-lts/api';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [HomeComponent, NotFoundComponent],
  imports: [
    SharedModule,
    PagesRoutingModule
  ],
  providers: [
    MessageService,
    ConfirmationService
  ]
})
export class PagesModule { }
