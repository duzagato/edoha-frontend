import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { matchFieldsValidator } from '../../../core/models/forms/validators/match-fields.validator';
import { UserRequestsService } from '../../../core/services/requests/user/user-requests-service';
import { InsertUserRequest } from '../../../core/models/requests/user/insert-user-request';

// Definindo a interface ErrorMessageMap, que estava faltando
interface ErrorMessageMap {
  [key: string]: string;
}

@Component({
  selector: 'app-adicionar',
  standalone: false,
  templateUrl: './adicionar.html',
  styleUrl: './adicionar.scss'
})
export class Adicionar implements OnInit {
  userForm!: FormGroup;
  success: boolean = false;
  failed: boolean = false;

  fieldErrorMessages: { [key: string]: ErrorMessageMap } = {
    name: {
      required: 'O nome é obrigatório.',
    },
    password: {
      required: 'A senha é obrigatória.',
      minlength: 'A senha deve ter no mínimo 6 caracteres.',
      maxlength: 'A senha deve conter no máximo 30 caracteres',
    },
    confirmPassword: {
      required: 'A confirmação de senha é obrigatória.',
      minlength: 'A senha deve ter no mínimo 6 caracteres.',
      maxlength: 'A senha deve conter no máximo 30 caracteres',
      mismatch: 'As senhas não coincidem.', 
    },
  };

  constructor(private fb: FormBuilder, private userRequests: UserRequestsService) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: [''],
      nickname: [''],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
    }, {
      validators: matchFieldsValidator('password', 'confirmPassword')
    });
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.userForm.get(controlName);
    
    if (control && (control.touched || control.dirty) && control.errors) {
      
      const controlErrors: ValidationErrors = control.errors;
      const errorKeys = Object.keys(controlErrors);
      
      const firstErrorKey = errorKeys[0]; 
      
      const messages = this.fieldErrorMessages[controlName];

      if (messages && messages[firstErrorKey]) {
        return messages[firstErrorKey];
      }
    }
    
    return null; 
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Formulário Válido, dados:', this.userForm.value);
      const formValue = this.userForm.getRawValue();
      
      const requestPayload: InsertUserRequest = {
        Name: formValue.name,
        Phone: formValue.phone || null,
        Nickname: formValue.nickname || null,
        UnhashedPassword: formValue.password
      };

      this.userRequests.userPost(requestPayload).subscribe({
        next: (response) => {
          this.success = true;
          this.failed = false;
        },
        error: (error) => {
          this.failed = true;
          this.success = false;
        },
        complete: () => {
          console.log('Requisição de usuário concluída.');
        }
      });
    } else {
        this.userForm.markAllAsTouched();
    }
  }
}
