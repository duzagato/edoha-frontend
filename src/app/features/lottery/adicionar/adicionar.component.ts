import { Component, inject } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { LotteryService } from '../../../core/services/requests/lottery.service';
import { CreateLotteryDTO } from '../../../core/models/lottery';
import {CacheKeys} from "../../../shared/constants/cache-keys";
import { AuthService, InstitutionService } from '../../../core/services/requests';

@Component({
  selector: 'app-adicionar-lottery',
  standalone: true,
  imports: [ReactiveFormsModule, CardModule, ButtonModule, InputTextModule, InputNumberModule, CheckboxModule],
  templateUrl: './adicionar.component.html',
  styleUrl: './adicionar.component.scss',
})
export class AdicionarComponent {
  private readonly authService = inject(AuthService);
  private readonly institutionService = inject(InstitutionService);
  private readonly lotteryService = inject(LotteryService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly messageService = inject(MessageService);

  form: FormGroup;
  idInstitution: string | null = null;

  constructor() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      numTicketsTicketbook: [null, [Validators.required, Validators.min(1)]],
      numTicketbooks: [null, [Validators.required, Validators.min(1)]],
      priceTicket: [null, [Validators.required, Validators.min(0.01)]],
      doubleChance: [false],
    });
  }

  ngOnInit(): void {
    this.idInstitution = localStorage.getItem(CacheKeys.ID_INSTITUTION);
  }

  onSubmit(): void {
    if (this.form.valid) {
      const model: CreateLotteryDTO = {
        name: this.form.value.name,
        numTicketsTicketbook: this.form.value.numTicketsTicketbook,
        numTicketbooks: this.form.value.numTicketbooks,
        priceTicket: this.form.value.priceTicket,
        doubleChance: this.form.value.doubleChance ?? false,
      };

      this.lotteryService.create(this.idInstitution!, model).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Rifa criada com sucesso!', life: 3000 });
          this.router.navigate(['/rifas/gerenciar']);
        },
        error: (error) => {
          const errorMessage = error?.error?.message || 'Erro ao criar rifa';
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: errorMessage, life: 5000 });
        },
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/rifas/gerenciar']);
  }
}
