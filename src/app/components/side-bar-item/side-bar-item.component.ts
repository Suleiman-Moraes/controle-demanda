import { Component, Input, OnInit } from '@angular/core';
import { rejects } from 'assert';
declare const $: any;
var iSelecionado = -1;

@Component({
  selector: 'app-side-bar-item',
  templateUrl: './side-bar-item.component.html',
  styleUrls: ['./side-bar-item.component.css']
})
export class SideBarItemComponent implements OnInit {

  // @Input() item;
  @Input() menus: any[];

  ariaExpanded: boolean[] = [];
  itemComFilhos: any[] = [];
  itenSemFilhos: any[];

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < this.menus.length; i++) {
      this.ariaExpanded.push(false);
    }
    // if(this.item.itens){
    //   this.itenSemFilhos = this.item.itens.filter(i =>{
    //     if(i.itens){
    //       this.itemComFilhos.push(i);
    //       return false;
    //     }
    //     else{
    //       return true;
    //     }
    //   });
    // }
  }

  clickExpand(i): void {
    this.ariaExpanded[i] = !this.ariaExpanded[i];
    for (let j = 0; j < this.menus.length; j++) {
      if (j != i) {
        this.ariaExpanded[j] = false;
      }
    }
  }
}
