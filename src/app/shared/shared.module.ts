import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng-lts/api';
import localePt from '@angular/common/locales/pt';
import { InputTextModule } from 'primeng-lts/inputtext';
import { CardModule } from 'primeng-lts/card';
import { PanelModule } from 'primeng-lts/panel';
import { TableModule } from 'primeng-lts/table';
import { ButtonModule } from 'primeng-lts/button';
import { ToggleButtonModule } from 'primeng-lts/togglebutton';
import { ChartModule } from 'primeng-lts/chart';
import { ComboComponent } from './components/combo/combo.component';
import { DropdownModule } from 'primeng-lts/dropdown';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    ComboComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    FormsModule,
    CardModule,
    PanelModule,
    TableModule,
    ButtonModule,
    ToggleButtonModule,
    ChartModule,
    DropdownModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    FormsModule,
    CardModule,
    PanelModule,
    TableModule,
    ButtonModule,
    ToggleButtonModule,
    ChartModule,
    DropdownModule,

    //Components
    ComboComponent
  ],
  providers: [
    MessageService,
    ConfirmationService
  ]
})
export class SharedModule { }
