import { Component, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/requests/auth.service';
import { CredentialsDTO } from '../../../core/models/auth';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InstitutionResolverService } from '../../../core/services/institution-resolver.service';
import { InstitutionPublicDTO } from '../../../core/models';
import { CacheKeys, SessionKeys } from '../../../shared/constants/cache-keys';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CardModule, ButtonModule, InputTextModule, PasswordModule, ToastModule, FloatLabelModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly institutionService = inject(InstitutionResolverService);
  form: FormGroup;
  institution = signal<InstitutionPublicDTO | null>(null);

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly messageService: MessageService
  ) {
    this.form = this.fb.group({
      nickname: ['', Validators.required],
      password: ['', Validators.required],
    })
    this.institutionService.getInstitution(this.institutionService.extractSlug()).subscribe({
      next: (data) => {
        this.institution.set(data);
      },
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const model: CredentialsDTO = {
        nickname: this.form.value.nickname,
        password: this.form.value.password,
      };

      this.authService.authenticate(model).subscribe({
        next: (response) => {
          if (response?.accessToken) {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Login realizado com sucesso!',
              life: 3000,
            });
            sessionStorage.setItem(CacheKeys.USER_STORAGE_PREFIX + ':institutions', JSON.stringify(response.institutions));
            this.router.navigate(['/institution']);
          }
        },
        error: (error) => {
          const errorMessage = error?.error?.message || 'Erro ao realizar login';
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: errorMessage,
            life: 5000,
          });
        },
      });
    }
  }
}
