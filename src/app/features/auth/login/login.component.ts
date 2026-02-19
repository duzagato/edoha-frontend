import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { AuthService } from '../../../core/services/requests/auth.service';
import { CredentialsDTO } from '../../../core/models/auth';
import { ThemeService } from '../../../core/services/theme/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyMaterialModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  form = new FormGroup({});
  model: CredentialsDTO = { nickname: '', password: '' };
  
  // Toast notification state
  showToast = signal(false);
  toastMessage = signal('');
  toastType = signal<'success' | 'error'>('success');

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
    private readonly themeService: ThemeService
  ) {}

  ngOnInit(): void {
    // Force dark mode for login page
    this.themeService.forceTheme('dark');
  }

  ngOnDestroy(): void {
    // Restore user's theme preference when leaving login page
    this.themeService.restoreTheme();
  }

  private displayToast(message: string, type: 'success' | 'error'): void {
    this.toastMessage.set(message);
    this.toastType.set(type);
    this.showToast.set(true);

    // Auto-hide after 3 seconds
    setTimeout(() => {
      this.showToast.set(false);
    }, type === 'success' ? 3000 : 5000);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.authService.authenticate(this.model).subscribe({
        next: (response) => {
          if (response?.token) {
            this.displayToast('Login realizado com sucesso!', 'success');
            // Navigate to returnUrl if it exists, otherwise go to home
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            setTimeout(() => {
              this.router.navigate([returnUrl]);
            }, 500);
          }
        },
        error: (error) => {
          const errorMessage = error?.error?.message || 'Erro ao realizar login';
          this.displayToast(errorMessage, 'error');
        },
      });
    }
  }
}
