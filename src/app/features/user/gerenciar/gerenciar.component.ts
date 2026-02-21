import { Component, OnInit, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../core/services/requests/user.service';
import { UserDTO } from '../../../core/models/user';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-gerenciar-user',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    CardModule,
    ProgressSpinnerModule,
    ConfirmDialogComponent,
  ],
  templateUrl: './gerenciar.component.html',
  styleUrl: './gerenciar.component.scss',
})
export class GerenciarComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);

  @ViewChild('confirmDialog') confirmDialog!: ConfirmDialogComponent;

  users = signal<UserDTO[]>([]);
  loading = signal<boolean>(false);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading.set(true);
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        this.loading.set(false);
        const errorMessage = error?.error?.message || 'Erro ao carregar usuários';
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: errorMessage, life: 5000 });
      },
    });
  }

  deleteUser(user: UserDTO): void {
    this.confirmDialog
      .open({
        title: 'Confirmar Exclusão',
        message: `Tem certeza que deseja excluir o usuário "${user.name}"?`,
        confirmText: 'Excluir',
        cancelText: 'Cancelar',
      })
      .then((result) => {
        if (result) {
          this.userService.delete(user.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Usuário excluído com sucesso!',
                life: 3000,
              });
              this.loadUsers();
            },
            error: (error) => {
              const errorMessage = error?.error?.message || 'Erro ao excluir usuário';
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: errorMessage, life: 5000 });
            },
          });
        }
      });
  }

  editUser(user: UserDTO): void {
    this.router.navigate(['/usuarios/editar', user.id]);
  }

  navigateToAdd(): void {
    this.router.navigate(['/usuarios/adicionar']);
  }
}
