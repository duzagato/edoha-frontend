import { Component, NgZone, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/requests/auth-service';
import { CacheKeys } from '../../../shared/constants/cache-keys';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  errorMessage: string | null = null;  // alerta global (back-end)
  isSubmitting = false;

  nickname = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  private extractBackendMessage(err: any): string {
    // Tente extrair mensagens comuns do seu backend sem quebrar a UI
    const e = err?.error;
    return (
      e?.errors?.Autentication ??
      e?.errors?.Authentication ??                // variações comuns de chave
      e?.message ??
      e?.title ??
      'Ocorreu um erro inesperado. Tente novamente.'
    );
  }

  login() {
    // limpar estado e sinalizar envio, já dentro da Zone
    this.zone.run(() => {
      this.errorMessage = null;
      this.isSubmitting = true;
      // Em ambiente zoneless/OnPush isso ajuda:
      this.cdr.detectChanges();
    });

    this.authService.authPost(this.nickname, this.password).subscribe({
      next: (res) => {
        this.zone.run(() => {
          sessionStorage.setItem(CacheKeys.JWT_TOKEN, res.token);
          this.isSubmitting = false;
          this.errorMessage = null;
          this.cdr.detectChanges();
          this.router.navigate(['/']);
        });
      },
      error: (err) => {
        console.log('Erro no login:', err); // útil para conferir o shape do erro
        this.zone.run(() => {
          if (err?.status === 400 || err?.status === 401) {
            this.errorMessage = this.extractBackendMessage(err);
          } else if (err?.status === 0) {
            this.errorMessage = 'Falha de conexão. Verifique sua internet.';
          } else {
            this.errorMessage = 'Ocorreu um erro inesperado. Tente novamente.';
          }
          this.isSubmitting = false;
          this.cdr.detectChanges(); // força a renderização imediata
        });
      },
      complete: () => {
        this.zone.run(() => {
          this.isSubmitting = false;
          this.cdr.detectChanges();
        });
      }
    });
  }
}
