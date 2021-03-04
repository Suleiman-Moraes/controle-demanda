import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chart-demanda-ano',
  templateUrl: './chart-demanda-ano.component.html',
  styleUrls: ['./chart-demanda-ano.component.css']
})
export class ChartDemandaAnoComponent implements OnInit {

  formulario: FormGroup;
  dataBarra;

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
      barra: ['2021'],
      logradouro: [null],
      texto: [null],
      radio: [null],
      radio2: [null],
      radio3: [null],
      combo: [null]
    });
  }

  private carregarBarras(): void {
    this.dataBarra = {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      datasets: [
        {
          label: 'Abertos',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [33, 37, 7, 20, 28, 12, 3, 24, 4, 16, 2, 28]
        },
        {
          label: 'Resolvidos',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: [31, 3, 15, 4, 31, 36, 14, 24, 4, 36, 35, 43]
        },
        {
          label: 'Cancelados',
          backgroundColor: 'red',
          borderColor: '#7CB342',
          data: [19, 22, 25, 27, 4, 26, 43, 37, 13, 50, 6, 40]
        }
      ]
    }
  }
}
