import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { LotteryService } from '../../../core/services/requests/lottery.service';
import { LotteryDTO } from '../../../core/models/lottery';

@Component({
  selector: 'app-gerenciar-lottery',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, CardModule, ProgressSpinnerModule],
  templateUrl: './gerenciar.component.html',
  styleUrl: './gerenciar.component.scss',
})
export class GerenciarComponent implements OnInit {
  private readonly lotteryService = inject(LotteryService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);

  lotteries = signal<LotteryDTO[]>([]);
  loading = signal<boolean>(false);

  ngOnInit(): void {
    this.loadLotteries();
  }

  loadLotteries(): void {
    this.loading.set(true);
    this.lotteryService.getLotteriesByInstitution().subscribe({
      next: (data) => {
        this.lotteries.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        this.loading.set(false);
        const errorMessage = error?.error?.message || 'Erro ao carregar rifas';
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: errorMessage, life: 5000 });
      },
    });
  }

  deleteLottery(lottery: LotteryDTO): void {
    const confirmed = confirm(`Tem certeza que deseja excluir a rifa "${lottery.name}"?`);
    if (confirmed) {
      this.lotteryService.delete(lottery.id).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Rifa excluída com sucesso!', life: 3000 });
          this.loadLotteries();
        },
        error: (error) => {
          const errorMessage = error?.error?.message || 'Erro ao excluir rifa';
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: errorMessage, life: 5000 });
        },
      });
    }
  }

  navigateToAdd(): void {
    this.router.navigate(['/rifas/adicionar']);
  }
}
