import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { LotteryMockService } from '../../../../core/services/lottery-mock.service';
import { LotteryDTO } from '../../../../core/models/lottery';

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
  ],
  templateUrl: './venda.component.html',
  styleUrl: './venda.component.scss',
})
export class VendaComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly lotteryService = inject(LotteryMockService);
  private readonly messageService = inject(MessageService);

  lottery = signal<LotteryDTO | undefined>(undefined);
  loading = signal<boolean>(false);
  submitting = signal<boolean>(false);

  vendaForm: FormGroup;
  lotteryId: string | null = null;

  constructor() {
    this.vendaForm = this.fb.group({
      ticketbookNumber: [null, [Validators.required, Validators.min(1)]],
      ticketNumber: [null, [Validators.required, Validators.min(1)]],
      donaterName: ['', Validators.required],
      donaterPhone: ['', Validators.required],
      soldDate: [new Date(), Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]],
      observations: [''],
    });
  }

  ngOnInit(): void {
    this.lotteryId = this.route.snapshot.paramMap.get('id');
    if (this.lotteryId) {
      this.loadLottery(this.lotteryId);
    }
  }

  private loadLottery(id: string): void {
    this.loading.set(true);
    this.lotteryService.getLotteryById(id).subscribe({
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
      }, 1000);
    }
  }

  onCancel(): void {
    this.router.navigate(['/rifas', this.lotteryId, 'gerenciar']);
  }
}
