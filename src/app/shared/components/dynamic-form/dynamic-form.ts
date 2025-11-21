import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
// Importa as novas interfaces de configuração
import { DynamicFormConfig, FieldConfig } from '../../../core/models/forms/form-fields.config'; 
import { DynamicFormBuilderService } from '../../../core/services/dynamic-form-builder/dynamic-form-builder-service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dynamic-form',
  // Se for standalone, adicione ReactiveFormsModule e CommonModule em 'imports'. 
  // Mantendo como 'standalone: false' conforme o original.
  standalone: false,
  templateUrl: './dynamic-form.html'
})
export class DynamicForm implements OnInit {
  
  // 1. O Input agora é do tipo DynamicFormConfig
  @Input() config!: DynamicFormConfig;
  @Output() formSubmit = new EventEmitter<any>();

  form: FormGroup = new FormGroup({});
  
  // 2. Nova propriedade para armazenar os campos agrupados para fácil iteração no template
  groupedFields: { [key: string]: FieldConfig[] } = {};

  constructor(private formBuilder: DynamicFormBuilderService) {}

  ngOnInit() {
    // 3. Passa apenas a lista de fields para o Form Builder
    this.form = this.formBuilder.buildFormGroup(this.config.fields);
    
    // 4. Cria a estrutura de campos agrupados
    this.groupFieldsByFieldsGroup();
  }
  
  /**
   * Agrupa os campos do formulário com base na propriedade 'fieldsGroup'
   * para facilitar a renderização no template.
   */
  private groupFieldsByFieldsGroup(): void {
    this.groupedFields = this.config.fields.reduce((acc, field) => {
      // Define a chave do grupo. Usa '_ungrouped_' para campos com fieldsGroup: null.
      const groupKey = field.fieldsGroup || '_ungrouped_'; 
      
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(field);
      return acc;
    }, {} as { [key: string]: FieldConfig[] });
  }

  /**
   * Obtém a mensagem de erro específica para um validador.
   * Agora busca dentro de this.config.fields.
   */
  getErrorMessage(field: string, validatorName: string): string | undefined {
    // 5. Busca o campo dentro do array 'fields' da configuração
    const fieldConfig = this.config.fields.find(c => c.name === field);
    return fieldConfig?.validators.find(v => v.name === validatorName)?.message;
  }

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value); // Envia os dados para a página pai
    } else {
      this.form.markAllAsTouched(); 
    }
  }
}
