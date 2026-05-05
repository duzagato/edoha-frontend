import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LotteryStorageService } from '../../../../core/services/lottery-storage.service';
import { TicketbookService } from '../../../../core/services/requests';
import { LotteryDTO } from '../../../../core/models/lottery';
import { Ticketbook } from '../../../../core/models';
import { StatusTicketbook } from '../../../../shared/constants/statusticketbook-enum';


@Component({
  selector: 'app-gerenciar-detail',
  standalone: true,
  imports: [CommonModule, CardModule, AccordionModule, TableModule, ProgressSpinnerModule],
  templateUrl: './gerenciar.component.html',
  styleUrl: './gerenciar.component.scss',
})
export class GerenciarDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly lotteryStorageService = inject(LotteryStorageService);
  private readonly ticketbookService = inject(TicketbookService);
  lottery = signal<LotteryDTO | undefined>(undefined);
  loading = signal<boolean>(false);

  withdrawnTicketbooks = signal<Ticketbook[]>([]);
  returnedTicketbooks = signal<Ticketbook[]>([]);

  ngOnInit(): void {
    const nameLottery = this.route.snapshot.paramMap.get('nameLottery');
    if (nameLottery) {
      this.loadLottery(nameLottery);
    }

    this.loadTicketbooks();
  }

  private loadLottery(nameLottery: string): void {
    this.lotteryStorageService.getLotteryByName(nameLottery).subscribe({
      next: (lottery) => {
        this.lottery.set(lottery);
        console.log(this.lottery());
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  private loadTicketbooks(): void {
    if (!this.lottery()?.id) {
      return;
    }
    
    const idLottery: string = this.lottery()?.id!;
    
    this.loading.set(true);
    this.ticketbookService.getAll(idLottery).subscribe({
      next: (ticketbooks) => {
        this.groupByStatus(ticketbooks);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        console.log("Erro ao carregar os ticketbooks");
      },
    });
  }

  private groupByStatus(ticketbooks: Ticketbook[]): void {
    const returned = ticketbooks.filter(t => t.idStatusTicketbook == StatusTicketbook.Devolvido.toString());
    const withdrawn = ticketbooks.filter(t => t.idStatusTicketbook == StatusTicketbook.Retirado.toString());

    this.returnedTicketbooks.set(returned);
    this.withdrawnTicketbooks.set(withdrawn);
  }
}

