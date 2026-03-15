import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LotteryService, TicketbookService } from '../../../../core/services/requests';
import { LotteryDTO } from '../../../../core/models/lottery';
import { Ticketbook } from '../../../../core/models';



@Component({
  selector: 'app-gerenciar-detail',
  standalone: true,
  imports: [CommonModule, CardModule, AccordionModule, TableModule, ProgressSpinnerModule],
  templateUrl: './gerenciar.component.html',
  styleUrl: './gerenciar.component.scss',
})
export class GerenciarDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly lotteryService = inject(LotteryService);
  private readonly ticketbookService = inject(TicketbookService);
  lottery = signal<LotteryDTO | undefined>(undefined);
  loading = signal<boolean>(false);

  withdrawnTicketbooks = signal<Ticketbook[]>([]);
  returnedTicketbooks = signal<Ticketbook[]>([]);

  ngOnInit(): void {
    this.loadTicketbooks();
  }

  private loadTicketbooks(): void {
    this.loading.set(true);
    this.ticketbookService.getReturneds("b5ddc839-b43b-4e7e-8264-5da133b9f973").subscribe({
      next: (ticketbooks) => {
        this.returnedTicketbooks.set(ticketbooks);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }
}
