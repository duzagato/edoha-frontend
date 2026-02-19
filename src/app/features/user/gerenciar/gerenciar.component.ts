import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/requests/user.service';
import { UserDTO } from '../../../core/models/user';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-gerenciar-user',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './gerenciar.component.html',
  styleUrl: './gerenciar.component.scss',
})
export class GerenciarComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  users = signal<UserDTO[]>([]);
  loading = signal<boolean>(false);
  toastMessage = signal<string>('');
  toastVisible = signal<boolean>(false);
  confirmDialog = signal<{ visible: boolean; user?: UserDTO }>({ visible: false });

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
        this.showToast(errorMessage);
      },
    });
  }

  deleteUser(user: UserDTO): void {
    this.confirmDialog.set({ visible: true, user });
  }

  confirmDelete(): void {
    const user = this.confirmDialog().user;
    if (!user) return;

    this.userService.delete(user.id).subscribe({
      next: () => {
        this.showToast('Usuário excluído com sucesso!');
        this.loadUsers();
        this.confirmDialog.set({ visible: false });
      },
      error: (error) => {
        const errorMessage = error?.error?.message || 'Erro ao excluir usuário';
        this.showToast(errorMessage);
        this.confirmDialog.set({ visible: false });
      },
    });
  }

  cancelDelete(): void {
    this.confirmDialog.set({ visible: false });
  }

  editUser(user: UserDTO): void {
    this.router.navigate(['/usuarios/editar', user.id]);
  }

  navigateToAdd(): void {
    this.router.navigate(['/usuarios/adicionar']);
  }

  private showToast(message: string): void {
    this.toastMessage.set(message);
    this.toastVisible.set(true);
    setTimeout(() => {
      this.toastVisible.set(false);
    }, 5000);
  }
}
