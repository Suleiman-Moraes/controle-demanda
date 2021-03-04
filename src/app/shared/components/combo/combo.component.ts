import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng-lts/api';

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.css']
})
export class ComboComponent implements OnInit {

  @Input('for-name') forName: string;
  @Input('nome') nome: string;
  @Input('text') text: string;
  @Input('value') value: string;
  @Input('options') options: any[];
  @Input('formulario') formulario: FormGroup;
  @Input('disabled') disabled: boolean = false;

  @Output('change') change: EventEmitter<any> = new EventEmitter<any>();

  itens: SelectItem[] = new Array();

  constructor() { }

  ngOnInit(): void {
    this.montarItens();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options']) {
      this.options = changes['options'].currentValue;
      this.montarItens();
    }
    else if (changes['disabled']) {
      this.disabled = changes['disabled'].currentValue;
    }
  }

  selectionChange(event): void {
    this.change.emit(event);
  }

  //PRIVATE METHODS
  private montarItens(): void {
    this.itens = [];
    this.options.forEach(option => {
      this.itens.push({
        label: option[this.text],
        value: option[this.value]
      });
    });
  }
}
