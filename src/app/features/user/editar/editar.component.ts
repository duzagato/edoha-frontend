import { Component, inject, OnInit, signal } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../core/services/requests/user.service';
import { UpdateUserDTO } from '../../../core/models/user';

@Component({
  selector: 'app-editar-user',
  standalone: true,
  imports: [ReactiveFormsModule, CardModule, ButtonModule, InputTextModule, ProgressSpinnerModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.scss',
})
export class EditarComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly messageService = inject(MessageService);

  form: FormGroup;
  loading = signal<boolean>(false);
  userId: string = '';

  constructor() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      nickname: [''],
      phone: [''],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userId = id;
      this.loadUser(id);
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'ID do usuário não encontrado', life: 5000 });
      this.router.navigate(['/usuarios/gerenciar']);
    }
  }

  loadUser(id: string): void {
    this.loading.set(true);
    this.userService.getById(id).subscribe({
      next: (user) => {
        this.form.patchValue({
          name: user.name,
          nickname: user.nickname,
          phone: user.phone,
        });
        this.loading.set(false);
      },
      error: (error) => {
        const errorMessage = error?.error?.message || 'Erro ao carregar usuário';
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: errorMessage, life: 5000 });
        this.loading.set(false);
        this.router.navigate(['/usuarios/gerenciar']);
      },
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const updateData: UpdateUserDTO = {
        id: this.userId,
        name: this.form.value.name,
        nickname: this.form.value.nickname || null,
        phone: this.form.value.phone || undefined,
      };

      this.userService.update(updateData).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário atualizado com sucesso!', life: 3000 });
          this.router.navigate(['/usuarios/gerenciar']);
        },
        error: (error) => {
          const errorMessage = error?.error?.message || 'Erro ao atualizar usuário';
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: errorMessage, life: 5000 });
        },
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/usuarios/gerenciar']);
  }
}
