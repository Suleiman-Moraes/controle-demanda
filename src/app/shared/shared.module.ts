import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng-lts/api';
import localePt from '@angular/common/locales/pt';
import { InputTextModule } from 'primeng-lts/inputtext';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    FormsModule 
  ],
  providers: [
    MessageService,
    ConfirmationService
  ]
})
export class SharedModule { }
