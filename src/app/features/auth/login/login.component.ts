import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/requests/auth.service';
import { CredentialsDTO } from '../../../core/models/auth';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CardModule, ButtonModule, InputTextModule, PasswordModule, ToastModule, FloatLabelModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly messageService: MessageService
  ) {
    this.form = this.fb.group({
      nickname: ['', Validators.required],
      password: ['', Validators.required],
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
          if (response?.token) {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Login realizado com sucesso!',
              life: 3000,
            });
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigate([returnUrl]);
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
