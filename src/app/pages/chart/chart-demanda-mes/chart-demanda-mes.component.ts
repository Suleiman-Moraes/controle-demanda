import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chart-demanda-mes',
  templateUrl: './chart-demanda-mes.component.html',
  styleUrls: ['./chart-demanda-mes.component.css']
})
export class ChartDemandaMesComponent implements OnInit {

  formulario: FormGroup;
  data: any;
  anos: any[] = [{ text: '2021 - Janeiro' }, { text: '2021 - Fevereiro' }, { text: '2021 - Março' }];

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
    this.formulario = this.formBuilder.group({
      barra: ['2021 - Fevereiro']
    });
    this.data = {
      labels: ['Tipo 1', 'Tipo 2', 'Tipo 3', 'Tipo 4', 'Tipo 5'],
      datasets: [
        {
          data: [11, 8, 9, 7, 2],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "red",
            "purple"
          ],
          hoverBackgroundColor: [
            "cadetblue",
            "cadetblue",
            "cadetblue",
            "cadetblue",
            "cadetblue"
          ]
        }]
    };
  }
}
