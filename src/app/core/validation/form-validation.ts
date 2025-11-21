import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors, Validators, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidation {
  constructor() { }

  public matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl): ValidationErrors | null => {
      const formGroup = abstractControl as FormGroup;
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mismatch']) {
        return null;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mismatch: true });
        return { mismatch: true }; // Retorna o erro no FormGroup
      } else {
        matchingControl.setErrors(null);
        return null; // Validação OK
      }
    };
  }

  public get commonValidators() {
    return {
      required: Validators.required,
      minLength(length: number): ValidatorFn { return Validators.minLength(length); },
      maxLength(length: number): ValidatorFn { return Validators.maxLength(length); },
      email: Validators.email,
      phone: Validators.pattern(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/) 
    };
  }
}
