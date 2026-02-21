import { Component, inject } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../core/services/requests/user.service';
import { CreateUserDTO } from '../../../core/models/user';

@Component({
  selector: 'app-adicionar-user',
  standalone: true,
  imports: [ReactiveFormsModule, CardModule, ButtonModule, InputTextModule, PasswordModule],
  templateUrl: './adicionar.component.html',
  styleUrl: './adicionar.component.scss',
})
export class AdicionarComponent {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly messageService = inject(MessageService);

  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      nickname: ['', Validators.required],
      phone: ['', Validators.required],
      unhashedPassword: ['', Validators.required],
      idUserType: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const model: CreateUserDTO = {
        name: this.form.value.name,
        phone: this.form.value.phone,
        nickname: this.form.value.nickname,
        unhashedPassword: this.form.value.unhashedPassword,
        idUserType: this.form.value.idUserType,
      };

      this.userService.create(model).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário criado com sucesso!', life: 3000 });
          this.router.navigate(['/usuarios/gerenciar']);
        },
        error: (error) => {
          const errorMessage = error?.error?.message || 'Erro ao criar usuário';
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: errorMessage, life: 5000 });
        },
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/usuarios/gerenciar']);
  }
}
