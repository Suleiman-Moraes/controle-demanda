import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar-item',
  templateUrl: './side-bar-item.component.html',
  styleUrls: ['./side-bar-item.component.css']
})
export class SideBarItemComponent implements OnInit {

  @Input() item;

  itemComFilhos: any[] = [];
  itenSemFilhos: any[];

  constructor() { }

  ngOnInit(): void {
    if(this.item.itens){
      this.itenSemFilhos = this.item.itens.filter(i =>{
        if(i.itens){
          this.itemComFilhos.push(i);
          return false;
        }
        else{
          return true;
        }
      });
    }
  }

}
