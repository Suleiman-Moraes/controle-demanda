import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chart-demanda-funcionario-ano',
  templateUrl: './chart-demanda-funcionario-ano.component.html',
  styleUrls: ['./chart-demanda-funcionario-ano.component.css']
})
export class ChartDemandaFuncionarioAnoComponent implements OnInit {

  formulario: FormGroup;
  data;

  anos: any[] = [{ text: '2021'}, { text: '2020'}, { text: '2019'}];

  options = {
    title: {
      display: true,
      text: '',
      fontSize: 16
    },
    legend: {
      position: 'right'
    }
  };

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.carregarBarras();
  }

  private initForm(): void{
    this.formulario = this.formBuilder.group({
      barra: ['2021']
    });
  }

  private carregarBarras(): void {
    this.data = {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      datasets: [
        {
          label: 'Suleiman',
          borderColor: '#42A5F5',
          fill: false,
          data: [33, 37, 7, 20, 28, 12, 3, 24, 4, 16, 2, 28]
        },
        {
          label: 'Vinhote',
          borderColor: '#9CCC65',
          fill: false,
          data: [31, 3, 15, 4, 31, 36, 14, 24, 4, 36, 35, 43]
        },
        {
          label: 'Marcelo',
          borderColor: 'red',
          fill: false,
          data: [19, 22, 25, 27, 4, 26, 43, 37, 13, 50, 6, 40]
        }
      ]
    }
  }
}
