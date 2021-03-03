import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  menus: any[] = [
    {
      id: 1,
      nome: 'Cadastro',
      icon: 'pi pi-pencil',
      menuPai: null,
      itens: [
        {
          nome: 'Associados',
          icon: 'pi pi-user-edit',
          url: '#/pages/associado'
        },
        {
          nome: 'Colaboradores',
          icon: 'pi pi-user-edit',
          url: '#/pages/colaborador'
        },
        {
          nome: 'Empresas Conveniadas',
          icon: 'pi pi-user-edit',
          url: '#/pages/empresaconveniada'
        },
        {
          nome: 'Funcionários',
          icon: 'pi pi-user-edit',
          url: '#/pages/funcionario'
        },
        {
          nome: 'Médicos Conveniados',
          icon: 'pi pi-user-edit',
          url: '#/pages/medicoconveniado'
        },
        {
          nome: 'Agência',
          icon: 'pi pi-user-edit',
          url: '#/pages/agencia'
        },
        {
          id: 2,
          nome: 'Cadastro Filho',
          icon: 'pi pi-pencil',
          menuPai: 1
        }
      ]
    },
    {
      nome: 'Controle de Demandas',
      icon: 'pi pi-user-edit',
      url: '#/pages/associado',
      itens: [
        {
          nome: 'Administrar Demandas',
          icon: 'pi pi-user-edit',
          url: '#/pages/demanda/adm/1'
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
