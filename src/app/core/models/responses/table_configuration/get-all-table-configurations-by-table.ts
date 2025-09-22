export interface TableConfigurationByTableNameResponse{
    tableSchema: string;
    tableName: string;
    ordinalPosition: number;
    columnDefault: string | null;
    isNullable: string;
    dataType: string;
}