import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LotteryStorageService } from '../../../../core/services/lottery-storage.service';
import { LotteryDTO } from '../../../../core/models/lottery';

@Component({
  selector: 'app-resumo',
  standalone: true,
  imports: [CommonModule, CardModule, ProgressSpinnerModule],
  templateUrl: './resumo.component.html',
  styleUrl: './resumo.component.scss',
})
export class ResumoComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly lotteryStorageService = inject(LotteryStorageService);

  lottery = signal<LotteryDTO | undefined>(undefined);
  loading = signal<boolean>(false);

  ngOnInit(): void {
    const nameLottery = this.route.snapshot.paramMap.get('nameLottery');
    if (nameLottery) {
      this.loadLottery(nameLottery);
    }
  }

  private loadLottery(nameLottery: string): void {
    this.loading.set(true);
    this.lotteryStorageService.getLotteryByName(nameLottery).subscribe({
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

