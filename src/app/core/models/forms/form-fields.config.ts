export interface ValidatorConfig {
  name: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'matchFields' | 'customValidator';
  value?: any;
  message: string;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox' | 'radio'; // Adicionei checkbox e radio para maior flexibilidade
  initialValue: any;
  validators: ValidatorConfig[];
  options?: { value: string | number, label: string }[]; // Para 'select', 'checkbox' ou 'radio'
  placeholder?: string;
  fieldsGroup: string | null;
}

export interface GlobalFormConfig {
  submitButtonText: string;
  submitButtonIcon?: string;
}

export interface DynamicFormConfig {
  globalConfig: GlobalFormConfig;
  fields: FieldConfig[];
}