import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../../core/services/requests/user.service';
import { UserDTO } from '../../../core/models/user';

@Component({
  selector: 'app-gerenciar-user',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './gerenciar.component.html',
  styleUrl: './gerenciar.component.scss',
})
export class GerenciarComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  users = signal<UserDTO[]>([]);
  loading = signal<boolean>(false);
  displayedColumns: string[] = ['name', 'nickname', 'phone', 'idUserType', 'createdAt', 'actions'];

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
        this.snackBar.open(errorMessage, 'Fechar', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  deleteUser(user: UserDTO): void {
    const confirmed = confirm(`Tem certeza que deseja excluir o usuário "${user.name}"?`);
    if (confirmed) {
      this.userService.delete(user.id).subscribe({
        next: () => {
          this.snackBar.open('Usuário excluído com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.loadUsers();
        },
        error: (error) => {
          const errorMessage = error?.error?.message || 'Erro ao excluir usuário';
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

  editUser(user: UserDTO): void {
    this.router.navigate(['/usuarios/editar', user.id]);
  }

  navigateToAdd(): void {
    this.router.navigate(['/usuarios/adicionar']);
  }
}
