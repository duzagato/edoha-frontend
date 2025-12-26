import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
  imports: [
    CommonModule,
    MatCardModule,
    MatExpansionModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './gerenciar.component.html',
  styleUrl: './gerenciar.component.scss',
})
export class GerenciarDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly lotteryService = inject(LotteryMockService);

  lottery = signal<LotteryDTO | undefined>(undefined);
  loading = signal<boolean>(false);

  // Mock data for withdrawn ticketbooks
  withdrawnTicketbooks = signal<TicketbookData[]>([
    {
      number: 1,
      holder: 'João Silva',
      owner: 'Maria Santos',
      withdrawnDate: '2024-01-10',
      status: 'Retirado',
    },
    {
      number: 5,
      holder: 'Pedro Oliveira',
      owner: 'Ana Costa',
      withdrawnDate: '2024-01-12',
      status: 'Retirado',
    },
    {
      number: 8,
      holder: 'Carlos Souza',
      owner: 'Fernanda Lima',
      withdrawnDate: '2024-01-15',
      status: 'Retirado',
    },
  ]);

  // Mock data for returned ticketbooks
  returnedTicketbooks = signal<TicketbookData[]>([
    {
      number: 2,
      holder: 'José Santos',
      owner: 'Ricardo Alves',
      withdrawnDate: '2024-01-08',
      devolutionDate: '2024-01-20',
      status: 'Devolvido',
    },
    {
      number: 3,
      holder: 'Marcos Pereira',
      owner: 'Juliana Rocha',
      withdrawnDate: '2024-01-09',
      devolutionDate: '2024-01-21',
      status: 'Devolvido',
    },
  ]);

  displayedColumns: string[] = ['number', 'holder', 'owner', 'withdrawnDate', 'devolutionDate', 'status'];

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
