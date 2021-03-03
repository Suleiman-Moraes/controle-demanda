import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demanda-historico-encaminhamento',
  templateUrl: './demanda-historico-encaminhamento.component.html',
  styleUrls: ['./demanda-historico-encaminhamento.component.css']
})
export class DemandaHistoricoEncaminhamentoComponent implements OnInit {

  products = [
    {
      nomeDe: 'Filipe Kevin Fábio Lima',
      data: '01/03/2021',
      nomeAtual: 'Roberto Vinhote'
    },
    {
      nomeDe: 'Fernando Henrique Benício da Mata',
      data: '01/02/2021',
      nomeAtual: 'Filipe Kevin Fábio Lima'
    },
    {
      nomeDe: 'Suleiman Moraes',
      data: '03/01/2021',
      nomeAtual: 'Fernando Henrique Benício da Mata'
    },
    {
      nomeDe: '-',
      data: '01/01/2021',
      nomeAtual: 'Suleiman Moraes'
    }
  ];

  cols: any[];

  constructor() { }

  ngOnInit() {
    this.cols = [
      { field: 'nomeDe', header: 'De' },
      { field: 'data', header: 'Data' },
      { field: 'nomeAtual', header: 'Para' }
    ];
  }
}
