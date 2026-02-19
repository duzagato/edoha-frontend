import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
export class LoginComponent implements OnInit, OnDestroy {
  form = new FormGroup({});
  model: CredentialsDTO = { nickname: '', password: '' };
  private previousTheme: string | null = null;

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
    private readonly route: ActivatedRoute,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Force dark mode on login page only
    const htmlElement = document.documentElement;
    
    // Save the current theme classes
    if (htmlElement.classList.contains('light')) {
      this.previousTheme = 'light';
    } else if (htmlElement.classList.contains('dark')) {
      this.previousTheme = 'dark';
    }
    
    // Remove both classes and force dark mode
    htmlElement.classList.remove('light', 'dark');
    htmlElement.classList.add('dark');
  }

  ngOnDestroy(): void {
    // Restore the previous theme when leaving the login page
    const htmlElement = document.documentElement;
    htmlElement.classList.remove('dark');
    
    if (this.previousTheme) {
      htmlElement.classList.add(this.previousTheme);
    }
  }

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
            // Navigate to returnUrl if it exists, otherwise go to home
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigate([returnUrl]);
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
