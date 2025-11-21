import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validador de FormGroup para verificar se o campo atual (matchingControlName)
 * tem o mesmo valor que o campo de referência (controlName).
 *
 * @param controlName O nome do campo principal (ex: 'password').
 * @param matchingControlName O nome do campo de comparação (ex: 'confirm_password').
 * @returns Uma função ValidatorFn que opera no FormGroup.
 */
export function matchFieldsValidator(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  
  return (group: AbstractControl): ValidationErrors | null => {
    
    const control = group.get(controlName);
    const matchingControl = group.get(matchingControlName);

    if (!control || !matchingControl || (matchingControl.errors && !matchingControl.errors['mismatch'])) {
      return null;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ ...matchingControl.errors, mismatch: true });
      return { mismatch: true }; // O FormGroup também recebe o erro
    } else {
      const errors = matchingControl.errors;
      if (errors) {
        delete errors['mismatch'];
        
        if (Object.keys(errors).length === 0) {
          matchingControl.setErrors(null);
        } else {
          matchingControl.setErrors(errors);
        }
      }
      return null;
    }
  };
}