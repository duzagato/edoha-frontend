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

@Component({
  selector: 'app-gerenciar-lottery',
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
  templateUrl: './gerenciar.component.html',
  styleUrl: './gerenciar.component.scss',
})
export class GerenciarComponent implements OnInit {
  private readonly lotteryService = inject(LotteryService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

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
    const confirmed = confirm(`Tem certeza que deseja excluir a rifa "${lottery.name}"?`);
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
  }

  navigateToAdd(): void {
    this.router.navigate(['/rifas/adicionar']);
  }
}
