import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LotteryService } from '../../../core/services/requests/lottery.service';
import { LotteryDTO } from '../../../core/models/lottery';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-lottery-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  templateUrl: './lottery-list.component.html',
  styleUrl: './lottery-list.component.scss',
})
export class LotteryListComponent implements OnInit {
  private readonly lotteryService = inject(LotteryService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);

  lotteries = signal<LotteryDTO[]>([]);
  loading = signal<boolean>(false);
  displayedColumns: string[] = ['name', 'numTicketsTicketbook', 'numTicketbooks', 'priceTicket', 'doubleChance', 'createdAt', 'actions'];

  ngOnInit(): void {
    this.loadLotteries();
  }

  loadLotteries(): void {
    this.loading.set(true);
    this.lotteryService.getAll().subscribe({
      next: (data) => {
        this.lotteries.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        this.loading.set(false);
        const errorMessage = error?.error?.message || 'Erro ao carregar rifas';
        this.snackBar.open(errorMessage, 'Fechar', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  deleteLottery(lottery: LotteryDTO): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar Exclusão',
        message: `Tem certeza que deseja excluir a rifa "${lottery.name}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.lotteryService.delete(lottery.id).subscribe({
          next: () => {
            this.snackBar.open('Rifa excluída com sucesso!', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            this.loadLotteries();
          },
          error: (error) => {
            const errorMessage = error?.error?.message || 'Erro ao excluir rifa';
            this.snackBar.open(errorMessage, 'Fechar', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['error-snackbar'],
            });
          },
        });
      }
    });
  }

  navigateToAdd(): void {
    this.router.navigate(['/lotteries/new']);
  }
}
