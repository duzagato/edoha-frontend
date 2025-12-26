import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { UserService } from '../../../core/services/requests/user.service';
import { UserInstitutionService } from '../../../core/services/requests/user-institution.service';
import { AuthService } from '../../../core/services/requests/auth.service';
import { UserDTO } from '../../../core/models/user';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCardModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly userInstitutionService = inject(UserInstitutionService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);

  displayedColumns: string[] = ['name', 'nickname', 'phone', 'actions'];
  users = signal<UserDTO[]>([]);
  filteredUsers = signal<UserDTO[]>([]);
  paginatedUsers = signal<UserDTO[]>([]);
  loading = signal(false);
  searchTerm = '';

  pageSize = 10;
  pageIndex = 0;
  totalItems = 0;

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading.set(true);
    const institutionId = this.authService.getInstitutionId();

    if (!institutionId) {
      this.snackBar.open('Instituição não encontrada', 'Fechar', {
        duration: 5000,
        panelClass: ['error-snackbar'],
      });
      this.loading.set(false);
      return;
    }

    // Load both user institutions and users
    forkJoin({
      userInstitutions: this.userInstitutionService.getAll(),
      users: this.userService.getAll(),
    }).subscribe({
      next: ({ userInstitutions, users }) => {
        // Filter user institutions by current institution
        const institutionUserIds = userInstitutions
          .filter((ui) => ui.idInstitution === institutionId)
          .map((ui) => ui.idUser);

        // Filter users to show only those in the current institution
        const filteredUsers = users.filter((user) =>
          institutionUserIds.includes(user.id)
        );

        this.users.set(filteredUsers);
        this.filteredUsers.set(filteredUsers);
        this.totalItems = filteredUsers.length;
        this.updatePaginatedUsers();
        this.loading.set(false);
      },
      error: (error) => {
        this.snackBar.open('Erro ao carregar usuários', 'Fechar', {
          duration: 5000,
          panelClass: ['error-snackbar'],
        });
        this.loading.set(false);
      },
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredUsers.set(this.users());
    } else {
      const filtered = this.users().filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.nickname?.toLowerCase().includes(term) ||
          user.phone?.toLowerCase().includes(term)
      );
      this.filteredUsers.set(filtered);
    }
    this.totalItems = this.filteredUsers().length;
    this.pageIndex = 0;
    this.updatePaginatedUsers();
  }

  updatePaginatedUsers(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers.set(this.filteredUsers().slice(startIndex, endIndex));
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePaginatedUsers();
  }

  addUser(): void {
    this.router.navigate(['/users/new']);
  }

  editUser(user: UserDTO): void {
    this.router.navigate(['/users', user.id, 'edit']);
  }

  deleteUser(user: UserDTO): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar Exclusão',
        message: `Tem certeza que deseja excluir o usuário "${user.name}"?`,
        confirmText: 'Excluir',
        cancelText: 'Cancelar',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loading.set(true);
        this.userService.delete(user.id).subscribe({
          next: () => {
            this.snackBar.open('Usuário excluído com sucesso!', 'Fechar', {
              duration: 3000,
            });
            this.loadUsers();
          },
          error: (error) => {
            this.snackBar.open('Erro ao excluir usuário', 'Fechar', {
              duration: 5000,
              panelClass: ['error-snackbar'],
            });
            this.loading.set(false);
          },
        });
      }
    });
  }
}
