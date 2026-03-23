import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AbstractControl, ReactiveFormsModule, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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
import { Ticketbook, WithdrawTicketbookDTO } from '../../../../core/models/ticketbook';
import { StatusTicketbook } from '../../../../shared/constants/statusticketbook-enum';
import { CacheKeys } from '../../../../shared/constants/cache-keys';
import { PhoneMaskDirective } from '../../../../shared/directives/phone-mask.directive';

/**
 * Cross-field validator: holderName and holderPhone must be provided together.
 */
function holderPairValidator(group: AbstractControl): ValidationErrors | null {
  const name = group.get('holderName')?.value?.trim() ?? '';
  const phone = group.get('holderPhone')?.value?.trim() ?? '';
  const hasName = name.length > 0;
  const hasPhone = phone.length > 0;
  if (hasName !== hasPhone) {
    return { holderPairRequired: true };
  }
  return null;
}

@Component({
  selector: 'app-devolucao',
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
  templateUrl: './devolucao.html',
  styleUrl: './devolucao.scss',
})
export class DevolucaoComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly lotteryStorageService = inject(LotteryStorageService);
  private readonly ticketbookService = inject(TicketbookService);
  private readonly messageService = inject(MessageService);

  lottery = signal<LotteryDTO | undefined>(undefined);
  ticketbook = signal<Ticketbook | null>(null);
  numberTicketbook = signal<number | null>(null);
  initialNumber = signal<number | null>(null);
  endNumber = signal<number | null>(null);
  loading = signal<boolean>(false);
  submitting = signal<boolean>(false);

  devolucaoForm: FormGroup;
  nameLottery: string | null = null;

  constructor() {
    this.devolucaoForm = this.fb.group(
      {
        ticketbookNumber: [null, [Validators.required, Validators.min(1)]],
        ownerName: ['', Validators.required],
        ownerPhone: ['', Validators.required],
        holderName: [''],
        holderPhone: [''],
      },
      { validators: holderPairValidator }
    );
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
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  get holderPairError(): boolean {
    return (
      this.devolucaoForm.hasError('holderPairRequired') &&
      (this.devolucaoForm.get('holderName')?.touched === true ||
        this.devolucaoForm.get('holderPhone')?.touched === true)
    );
  }

  onTicketbookNumberBlur(): void {
    const ticketbookNumber = this.devolucaoForm.get('ticketbookNumber')?.value;
    this.numberTicketbook.set(ticketbookNumber);
    const currentLottery = this.lottery();

    if (!ticketbookNumber || !currentLottery) {
      return;
    }

    this.ticketbookService.getByNumber(currentLottery.id, ticketbookNumber).subscribe({
      next: (ticketbook) => {
        this.ticketbook.set(ticketbook);

        if (ticketbook) {
          this.devolucaoForm.patchValue({
            ownerName: ticketbook.ticketbookOwner?.name,
            ownerPhone: ticketbook.ticketbookOwner?.phone,
            holderName: ticketbook.ticketbookHolder?.name,
            holderPhone: ticketbook.ticketbookHolder?.phone
          });
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Talão não encontrado.',
          life: 5000,
        });
      },
    });
  }

  onSubmit(): void {
    if (this.devolucaoForm.invalid || this.submitting()) {
      this.devolucaoForm.markAllAsTouched();
      return;
    }

    const currentLottery = this.lottery();
    
    if (!currentLottery) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Informações da rifa ou instituição não encontradas.',
        life: 5000,
      });
      return;
    }

    const { ticketbookNumber, ownerName, ownerPhone, holderName, holderPhone } =
      this.devolucaoForm.value;

    const dto: WithdrawTicketbookDTO = {
      ticketbookOwner: {
        name: ownerName?.trim(),
        phone: ownerPhone,
      },
      ticketbookHolder:
        holderName?.trim()
          ? { name: holderName.trim(), phone: holderPhone }
          : null,
      idStatusTicketbook: StatusTicketbook.Retirado,
      number: ticketbookNumber,
      withdrawnDate: null,
      devolutionDate: null,
    };

    this.submitting.set(true);
    this.ticketbookService.withdraw(currentLottery.id, dto).subscribe({
      next: () => {
        this.submitting.set(false);
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Devolução de talão registrada com sucesso!',
          life: 3000,
        });
        this.devolucaoForm.reset();
      },
      error: (error) => {
        this.submitting.set(false);
        const errorMessage = error?.error?.message || 'Erro ao registrar devolução de talão.';
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: errorMessage,
          life: 5000,
        });
      },
    });
  }
}
