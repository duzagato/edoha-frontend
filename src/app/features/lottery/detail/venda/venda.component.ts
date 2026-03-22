import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
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
import { Subscription } from 'rxjs';
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
export class VendaComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly lotteryStorageService = inject(LotteryStorageService);
  private readonly ticketbookService = inject(TicketbookService);
  private readonly messageService = inject(MessageService);

  lottery = signal<LotteryDTO | undefined>(undefined);
  loading = signal<boolean>(false);
  submitting = signal<boolean>(false);
  loadingTicketbook = signal<boolean>(false);

  vendaForm: FormGroup;
  nameLottery: string | null = null;

  private ticketbookNumberSub?: Subscription;

  constructor() {
    this.vendaForm = this.fb.group({
      ticketbookNumber: [null, [Validators.required, Validators.min(1)]],
      soldDate: [new Date(), Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]],
      observations: [''],
      tickets: this.fb.array([]),
    });
  }

  get ticketsFormArray(): FormArray {
    return this.vendaForm.get('tickets') as FormArray;
  }

  ngOnInit(): void {
    this.nameLottery = this.route.snapshot.paramMap.get('nameLottery');
    if (this.nameLottery) {
      this.loadLottery(this.nameLottery);
    }

    this.ticketbookNumberSub = this.vendaForm
      .get('ticketbookNumber')
      ?.valueChanges.subscribe((number: number | null) => {
        this.rebuildTicketRows(number);
      });
  }

  ngOnDestroy(): void {
    this.ticketbookNumberSub?.unsubscribe();
  }

  private loadLottery(nameLottery: string): void {
    this.loading.set(true);
    this.lotteryStorageService.getLotteryByName(nameLottery).subscribe({
      next: (lottery) => {
        this.lottery.set(lottery);
        this.loading.set(false);
        if (lottery) {
          this.vendaForm.patchValue({ amount: lottery.priceTicket });
          const currentNumber = this.vendaForm.get('ticketbookNumber')?.value;
          this.rebuildTicketRows(currentNumber);
        }
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  /**
   * Rebuilds the tickets FormArray based on the entered ticketbook number.
   * Formula: i = 1, number + i <= (number * lottery.numTicketsTicketbook), i++
   */
  rebuildTicketRows(number: number | null): void {
    this.ticketsFormArray.clear();
    const currentLottery = this.lottery();
    if (!number || !currentLottery || number < 1) {
      return;
    }
    const numTickets = currentLottery.numTicketsTicketbook;
    for (let i = 1; number + i <= number * numTickets; i++) {
      this.ticketsFormArray.push(
        this.fb.group({
          number: [number + i],
          donaterName: ['', Validators.required],
          donaterPhone: ['', Validators.required],
        })
      );
    }
  }

  /**
   * Called when the user leaves the ticketbookNumber field.
   * Fetches existing ticketbook information and pre-fills the ticket rows.
   */
  onTicketbookNumberBlur(): void {
    const number: number | null = this.vendaForm.get('ticketbookNumber')?.value;
    const currentLottery = this.lottery();
    const idInstitution = localStorage.getItem(CacheKeys.ID_INSTITUTION);

    if (!number || !currentLottery || !idInstitution) {
      return;
    }

    this.loadingTicketbook.set(true);
    this.ticketbookService
      .getTicketbookInformation(idInstitution, currentLottery.id, number)
      .subscribe({
        next: (ticketbook) => {
          this.loadingTicketbook.set(false);
          if (ticketbook?.tickets?.length) {
            ticketbook.tickets.forEach((ticket) => {
              const control = this.ticketsFormArray.controls.find(
                (c) => c.get('number')?.value === ticket.number
              );
              if (control) {
                control.patchValue({
                  donaterName: ticket.donaterName,
                  donaterPhone: ticket.donaterPhone,
                });
              }
            });
          }
        },
        error: () => {
          this.loadingTicketbook.set(false);
        },
      });
  }

  onSubmit(): void {
    if (this.vendaForm.valid) {
      this.submitting.set(true);

      setTimeout(() => {
        this.submitting.set(false);
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Venda de talão registrada com sucesso!', life: 3000 });
        this.vendaForm.reset({
          soldDate: new Date(),
          amount: this.lottery()?.priceTicket || 0,
        });
        this.ticketsFormArray.clear();
      }, 1000);
    }
  }

  onCancel(): void {
    this.router.navigate(['/rifas', this.nameLottery, 'gerenciar']);
  }
}

