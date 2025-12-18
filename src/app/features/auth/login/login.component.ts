import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/requests/auth.service';
import { CredentialsDTO } from '../../../core/models/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormlyModule,
    FormlyMaterialModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form = new FormGroup({});
  model: CredentialsDTO = { nickname: '', password: '' };

  fields: FormlyFieldConfig[] = [
    {
      key: 'nickname',
      type: 'input',
      props: {
        label: 'Apelido',
        placeholder: 'Apelido',
        required: true,
        type: 'text',
        appearance: 'outline',
      },
      validation: {
        messages: {
          required: 'Apelido é obrigatório',
        },
      },
    },
    {
      key: 'password',
      type: 'input',
      props: {
        label: 'Senha',
        placeholder: '********',
        required: true,
        type: 'password',
        appearance: 'outline',
      },
      validation: {
        messages: {
          required: 'Senha é obrigatória',
        },
      },
    },
  ];

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {}

  onSubmit(): void {
    if (this.form.valid) {
      this.authService.authenticate(this.model).subscribe({
        next: (response) => {
          if (response?.token) {
            this.snackBar.open('Login realizado com sucesso!', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          const errorMessage = error?.error?.message || 'Erro ao realizar login';
          this.snackBar.open(errorMessage, 'Fechar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          });
        },
      });
    }
  }
}
