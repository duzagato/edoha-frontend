import { Component } from '@angular/core';
import { TableConfiguration } from '../../../core/services/requests/table-configuration/table-configuration';
import { Tables } from '../../../shared/constants/tables';

@Component({
  selector: 'app-gerenciar',
  standalone: false,
  templateUrl: './gerenciar.html',
  styleUrl: './gerenciar.scss'
})

export class Gerenciar{
  configurations: any;

  constructor(private tableConfigurationService: TableConfiguration) {}

  ngOnInit(): void {
    this.loadConfiguration(); // Chamada do método de carregamento
  }

  loadConfiguration(): void {
    this.tableConfigurationService.getAllTableConfigurationsByTableName(Tables.user.schemaName, Tables.user.tableName)
      .subscribe({
        next: (res) =>{
          this.configurations = res;
          console.log('Dados da API carregados com sucesso:', this.configurations);
        },
        error: (error)=>{
          console.log('Erro');
          console.log(error);
        }
      });
  }
}