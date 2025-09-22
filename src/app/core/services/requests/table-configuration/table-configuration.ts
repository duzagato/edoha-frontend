import { environment } from './../../../../../environments/environment.prod';
import { TableConfigurationByTableNameResponse } from './../../../models/responses/table_configuration/get-all-table-configurations-by-table';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../../../../shared/constants/api-routes';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TableConfiguration {
  constructor(private http: HttpClient){}
  
  getAllTableConfigurationsByTableName(schemaName: string, tableName: string){
    const url = `${environment.apiUrl}${ApiRoutes.TABLE_CONFIGURATION_GET}/${schemaName}/${tableName}`;
    return this.http.get<TableConfigurationByTableNameResponse>(url);
  }
}
