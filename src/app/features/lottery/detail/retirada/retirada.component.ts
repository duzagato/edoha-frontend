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
import { LotteryStorageService } from '../../../../core/services/lottery-storage.service';
import { LotteryDTO } from '../../../../core/models/lottery';

@Component({
  selector: 'app-retirada',
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
  templateUrl: './retirada.component.html',
  styleUrl: './retirada.component.scss',
})
export class RetiradaComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly lotteryStorageService = inject(LotteryStorageService);
  private readonly messageService = inject(MessageService);

  lottery = signal<LotteryDTO | undefined>(undefined);
  loading = signal<boolean>(false);
  submitting = signal<boolean>(false);

  retiradaForm: FormGroup;
  nameLottery: string | null = null;

  constructor() {
    this.retiradaForm = this.fb.group({
      ticketbookNumber: [null, [Validators.required, Validators.min(1)]],
      holderName: ['', Validators.required],
      holderPhone: ['', Validators.required],
      ownerName: ['', Validators.required],
      ownerPhone: ['', Validators.required],
    });
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

  onSubmit(): void {
    if (this.retiradaForm.valid) {
      this.submitting.set(true);

      setTimeout(() => {
        this.submitting.set(false);
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Retirada de talão registrada com sucesso!', life: 3000 });
        this.retiradaForm.reset({ withdrawnDate: new Date() });
      }, 1000);
    }
  }

  onCancel(): void {
    this.router.navigate(['/rifas', this.nameLottery, 'gerenciar']);
  }
}

