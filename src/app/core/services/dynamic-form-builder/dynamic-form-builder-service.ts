import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FieldConfig, ValidatorConfig } from '../../models/forms/form-fields.config'; 

@Injectable({ providedIn: 'root' })
export class DynamicFormBuilderService {
  constructor(private fb: FormBuilder) {}

  private getValidatorFn(validator: ValidatorConfig): ValidatorFn {
    switch (validator.name) {
      case 'required':
        return Validators.required;
      case 'minLength':
        return Validators.minLength(validator.value);
      case 'maxLength':
        return Validators.maxLength(validator.value);
      case 'pattern':
        return Validators.pattern(validator.value);
      // case 'customValidator':
      //   return seuValidadorCustomizado(validator.value); // Se necessário
      default:
        return Validators.nullValidator;
    }
  }

  /**
   * Constrói o FormGroup principal a partir de um array de FieldConfig.
   * @param config Array de FieldConfig (recebido de DynamicForm.config.fields).
   * @returns Um FormGroup pronto para uso.
   */
  public buildFormGroup(config: FieldConfig[]): FormGroup {
    const controls = config.reduce((acc, field) => {
      const angularValidators: ValidatorFn[] = field.validators.map(v => this.getValidatorFn(v));

      // [initialValue, [Validators]]
      acc[field.name] = [field.initialValue, angularValidators];
      
      return acc;
    }, {} as any);

    return this.fb.group(controls);
  }
}
