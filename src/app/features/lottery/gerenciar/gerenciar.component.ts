import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LotteryService } from '../../../core/services/requests/lottery.service';
import { LotteryDTO } from '../../../core/models/lottery';

@Component({
  selector: 'app-gerenciar-lottery',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './gerenciar.component.html',
  styleUrl: './gerenciar.component.scss',
})
export class GerenciarComponent implements OnInit {
  private readonly lotteryService = inject(LotteryService);
  private readonly router = inject(Router);

  lotteries = signal<LotteryDTO[]>([]);
  loading = signal<boolean>(false);
  toastMessage = signal<string>('');
  toastVisible = signal<boolean>(false);
  confirmDialog = signal<{ visible: boolean; lottery?: LotteryDTO }>({ visible: false });

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
        this.showToast(errorMessage);
      },
    });
  }

  deleteLottery(lottery: LotteryDTO): void {
    this.confirmDialog.set({ visible: true, lottery });
  }

  confirmDelete(): void {
    const lottery = this.confirmDialog().lottery;
    if (!lottery) return;

    this.lotteryService.delete(lottery.id).subscribe({
      next: () => {
        this.showToast('Rifa excluída com sucesso!');
        this.loadLotteries();
        this.confirmDialog.set({ visible: false });
      },
      error: (error) => {
        const errorMessage = error?.error?.message || 'Erro ao excluir rifa';
        this.showToast(errorMessage);
        this.confirmDialog.set({ visible: false });
      },
    });
  }

  cancelDelete(): void {
    this.confirmDialog.set({ visible: false });
  }

  navigateToAdd(): void {
    this.router.navigate(['/rifas/adicionar']);
  }

  private showToast(message: string): void {
    this.toastMessage.set(message);
    this.toastVisible.set(true);
    setTimeout(() => {
      this.toastVisible.set(false);
    }, 5000);
  }
}
