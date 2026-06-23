import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, ValidationErrors, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { LotteryStorageService } from '../../../../core/services/lottery-storage.service';
import { Lottery } from '../../../../core/models/lottery';
import { TicketbookService } from '../../../../core/services/requests/ticketbook.service';
import { Ticketbook, CreateTicketbookDTO } from '../../../../core/models/ticketbook';
import { StatusTicketbook } from '../../../../shared/constants/statusticketbook-enum';
import { PhoneMaskDirective } from '../../../../shared/directives/phone-mask.directive';
import { TicketInformation } from '../../../../core/models';
import { TicketService } from '../../../../core/services/requests';
import { concatMap, finalize } from 'rxjs';
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
    PhoneMaskDirective
  ],
  templateUrl: './devolucao.html',
  styleUrl: './devolucao.scss',
})
export class DevolucaoComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly lotteryStorageService = inject(LotteryStorageService);
  private ticketService = inject(TicketService);
  private readonly ticketbookService = inject(TicketbookService);
  private readonly messageService = inject(MessageService);

  lottery = signal<Lottery | undefined>(undefined);
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
        ticketList: this.fb.array([]),
      },
      { validators: holderPairValidator }
    );
  }

  get ticketList(): FormArray {
    return this.devolucaoForm.get('ticketList') as FormArray;
  }

  private buildTicketControls(ticketbookNumber: number, ticketsPerTicketbook: number): void {
    const initialnumber = (ticketbookNumber - 1) * ticketsPerTicketbook + 1;

    this.ticketList.clear();
    for (let i = 0; i < ticketsPerTicketbook; i++) {
      this.ticketList.push(
        this.fb.group({
          number: [initialnumber + i],
          donatorPhone: [''],
          donatorName: [''],
        })
      );
    }
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

    this.buildTicketControls(ticketbookNumber, currentLottery.numTicketsTicketbook);

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

    const { ticketbookNumber, ownerName, ownerPhone, holderName, holderPhone, ticketList } =
      this.devolucaoForm.value;

    const ticketsFilter = ticketList.filter((ticket: any) => {
      return ticket.donatorName?.trim() && ticket.donatorPhone?.trim();
    });

    const tickets: TicketInformation[] = (ticketsFilter ?? []).map((ticket: { number: number; donatorName: string; donatorPhone: string }) => ({
      number: ticket.number,
      donaterName: ticket.donatorName,
      donaterPhone: ticket.donatorPhone,
    }));

    console.log(tickets);

    if (this.ticketbook()?.id != null) {
      const idTicketbook = this.ticketbook()?.id;
      
      this.submitting.set(true);

      this.submitting.set(true);

      this.ticketService.create(idTicketbook!, tickets).pipe(
        concatMap(() => this.ticketbookService.returnedById(currentLottery.id, idTicketbook!)),
        finalize(() => this.submitting.set(false))
      ).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Operações concluídas com êxito!',
          });
        },
        error: (err) => {
          // Este bloco captura erros tanto do 'create' quanto do 'returnedById'
          console.error('Falha em alguma etapa do processo', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: err?.error?.message || 'Erro na operação.',
          });
        }
      });
    } else {
      const ticketbook: CreateTicketbookDTO = {
        ticketbookHolder: holderName && holderPhone ? { name: holderName, phone: holderPhone } : null,
        ticketbookOwner: { name: ownerName, phone: ownerPhone },
        number: ticketbookNumber,
        idStatusTicketbook: StatusTicketbook.Devolvido,
      };

      this.submitting.set(true);

      this.ticketbookService.create(currentLottery.id, ticketbook)
        .pipe(
          concatMap((res) => {
            return this.ticketService.create(res.idTicketbook, tickets);
          }),
          finalize(() => this.submitting.set(false))
        )
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Talão e tickets registrados com êxito!',
              life: 3000,
            });
          },
          error: (error) => {
            console.error('Erro na jornada:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro na Operação',
              detail: error?.error?.message || 'Não foi possível concluir o registro.',
              life: 5000,
            });
          }
        });
    }

    this.numberTicketbook.set(null);
    this.devolucaoForm.reset();
  }
}