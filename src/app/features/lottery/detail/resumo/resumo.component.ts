import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LotteryMockService } from '../../../../core/services/lottery-mock.service';
import { LotteryDTO } from '../../../../core/models/lottery';

@Component({
  selector: 'app-resumo',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './resumo.component.html',
  styleUrl: './resumo.component.scss',
})
export class ResumoComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly lotteryService = inject(LotteryMockService);

  lottery = signal<LotteryDTO | undefined>(undefined);
  loading = signal<boolean>(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadLottery(id);
    }
  }

  private loadLottery(id: string): void {
    this.loading.set(true);
    this.lotteryService.getLotteryById(id).subscribe({
      next: (lottery) => {
        this.lottery.set(lottery);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }
}
