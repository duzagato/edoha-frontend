import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { LotteryStorageService } from '../../../../core/services/lottery-storage.service';
import { LotteryDTO } from '../../../../core/models/lottery';
import { TicketbookService } from '../../../../core/services/requests/ticketbook.service';
import { CacheKeys } from '../../../../shared/constants/cache-keys';
import { PhoneMaskDirective } from '../../../../shared/directives/phone-mask.directive';

@Component({
  selector: 'app-venda',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    DatePickerModule,
    TextareaModule,
    ProgressSpinnerModule,
    PhoneMaskDirective,
  ],
  templateUrl: './venda.component.html',
  styleUrl: './venda.component.scss',
})
export class VendaComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly lotteryStorageService = inject(LotteryStorageService);
  private readonly ticketbookService = inject(TicketbookService);
  private readonly messageService = inject(MessageService);

  lottery = signal<LotteryDTO | undefined>(undefined);
  loading = signal<boolean>(false);
  submitting = signal<boolean>(false);

  vendaForm: FormGroup;
  nameLottery: string | null = null;
  ticketNumbers = signal<number[]>([]);

  constructor() {
    this.vendaForm = this.fb.group({
      ticketbookNumber: [null, [Validators.required, Validators.min(1)]],
      soldDate: [new Date(), Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]],
      observations: [''],
      tickets: this.fb.array([]),
    });
  }

  get ticketsArray(): FormArray {
    return this.vendaForm.get('tickets') as FormArray;
  }

  getTicketGroup(index: number): FormGroup {
    return this.ticketsArray.at(index) as FormGroup;
  }

  ngOnInit(): void {
    this.nameLottery = this.route.snapshot.paramMap.get('nameLottery');
    if (this.nameLottery) {
      this.loadLottery(this.nameLottery);
    }
  }

  private loadLottery(nameLottery: string): void {
    this.loading.set(true);
    this.lotteryStorageService.getLotteryByName(nameLottery).subscribe({
      next: (lottery) => {
        this.lottery.set(lottery);
        this.loading.set(false);
        if (lottery) {
          this.vendaForm.patchValue({ amount: lottery.priceTicket });
        }
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  onTicketbookNumberBlur(): void {
    const ticketbookNumber = this.vendaForm.get('ticketbookNumber')?.value;
    const lottery = this.lottery();
    if (!ticketbookNumber || ticketbookNumber < 1 || !lottery) {
      return;
    }
    this.buildTicketRows(ticketbookNumber, lottery.numTicketsTicketbook);
    this.getTicketbookInformation(ticketbookNumber);
  }

  private buildTicketRows(ticketbookNumber: number, numTicketsTicketbook: number): void {
    if (numTicketsTicketbook <= 0) {
      return;
    }
    this.ticketsArray.clear();
    const numbers: number[] = [];
    const base = (ticketbookNumber - 1) * numTicketsTicketbook;
    for (let i = 1; base + i <= ticketbookNumber * numTicketsTicketbook; i++) {
      numbers.push(base + i);
      this.ticketsArray.push(
        this.fb.group({
          number: [base + i],
          donaterName: ['', Validators.required],
          donaterPhone: ['', Validators.required],
        })
      );
    }
    this.ticketNumbers.set(numbers);
  }

  getTicketbookInformation(ticketbookNumber: number): void {
    const lottery = this.lottery();
    const idInstitution = localStorage.getItem(CacheKeys.ID_INSTITUTION);
    if (!lottery || !idInstitution) {
      return;
    }
    this.ticketbookService.getTicketbookInformation(idInstitution, lottery.id, ticketbookNumber).subscribe({
      next: (ticketbook) => {
        if (ticketbook?.tickets?.length) {
          ticketbook.tickets.forEach((ticket, index) => {
            const group = this.ticketsArray.at(index) as FormGroup;
            if (group) {
              group.patchValue({
                donaterName: ticket.donaterName,
                donaterPhone: ticket.donaterPhone,
              });
            }
          });
        }
      },
      error: () => {
        // No ticketbook found - leave fields empty
      },
    });
  }

  onSubmit(): void {
    if (this.vendaForm.valid) {
      this.submitting.set(true);

      setTimeout(() => {
        this.submitting.set(false);
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Venda de número registrada com sucesso!', life: 3000 });
        this.vendaForm.reset({
          soldDate: new Date(),
          amount: this.lottery()?.priceTicket || 0,
        });
        this.ticketsArray.clear();
        this.ticketNumbers.set([]);
      }, 1000);
    }
  }

  onCancel(): void {
    this.router.navigate(['/rifas', this.nameLottery, 'gerenciar']);
  }
}

