import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LotteryMockService } from '../../../../core/services/lottery-mock.service';
import { LotteryDTO } from '../../../../core/models/lottery';

interface TicketbookData {
  number: number;
  holder: string;
  owner: string;
  withdrawnDate: string;
  devolutionDate?: string;
  status: string;
}

@Component({
  selector: 'app-gerenciar-detail',
  standalone: true,
  imports: [CommonModule, CardModule, AccordionModule, TableModule, ProgressSpinnerModule],
  templateUrl: './gerenciar.component.html',
  styleUrl: './gerenciar.component.scss',
})
export class GerenciarDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly lotteryService = inject(LotteryMockService);

  lottery = signal<LotteryDTO | undefined>(undefined);
  loading = signal<boolean>(false);

  withdrawnTicketbooks = signal<TicketbookData[]>([
    { number: 1, holder: 'João Silva', owner: 'Maria Santos', withdrawnDate: '2024-01-10', status: 'Retirado' },
    { number: 5, holder: 'Pedro Oliveira', owner: 'Ana Costa', withdrawnDate: '2024-01-12', status: 'Retirado' },
    { number: 8, holder: 'Carlos Souza', owner: 'Fernanda Lima', withdrawnDate: '2024-01-15', status: 'Retirado' },
  ]);

  returnedTicketbooks = signal<TicketbookData[]>([
    { number: 2, holder: 'José Santos', owner: 'Ricardo Alves', withdrawnDate: '2024-01-08', devolutionDate: '2024-01-20', status: 'Devolvido' },
    { number: 3, holder: 'Marcos Pereira', owner: 'Juliana Rocha', withdrawnDate: '2024-01-09', devolutionDate: '2024-01-21', status: 'Devolvido' },
  ]);

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
