import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { LotteryService } from '../../../core/services/requests/lottery.service';
import { CreateLotteryDTO } from '../../../core/models/lottery';

@Component({
  selector: 'app-adicionar-lottery',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyMaterialModule,
  ],
  templateUrl: './adicionar.component.html',
  styleUrl: './adicionar.component.scss',
})
export class AdicionarComponent {
  private readonly lotteryService = inject(LotteryService);
  private readonly router = inject(Router);

  form = new FormGroup({});
  model: CreateLotteryDTO = {
    name: '',
    numTicketsTicketbook: 0,
    numTicketbooks: 0,
    priceTicket: 0,
    doubleChance: false,
  };
  toastMessage = signal<string>('');
  toastVisible = signal<boolean>(false);

  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      props: {
        label: 'Nome da Rifa',
        placeholder: 'Digite o nome da rifa',
        required: true,
        appearance: 'outline',
      },
      validation: {
        messages: {
          required: 'Nome é obrigatório',
        },
      },
    },
    {
      key: 'numTicketsTicketbook',
      type: 'input',
      props: {
        label: 'Número de Bilhetes por Talão',
        placeholder: 'Ex: 10',
        required: true,
        type: 'number',
        min: 1,
        appearance: 'outline',
      },
      validation: {
        messages: {
          required: 'Número de bilhetes por talão é obrigatório',
          min: 'Deve ser pelo menos 1',
        },
      },
    },
    {
      key: 'numTicketbooks',
      type: 'input',
      props: {
        label: 'Quantidade de Talões',
        placeholder: 'Ex: 100',
        required: true,
        type: 'number',
        min: 1,
        appearance: 'outline',
      },
      validation: {
        messages: {
          required: 'Quantidade de talões é obrigatória',
          min: 'Deve ser pelo menos 1',
        },
      },
    },
    {
      key: 'priceTicket',
      type: 'input',
      props: {
        label: 'Preço do Bilhete',
        placeholder: 'Ex: 5.00',
        required: true,
        type: 'number',
        min: 0.01,
        step: 0.01,
        appearance: 'outline',
      },
      validation: {
        messages: {
          required: 'Preço do bilhete é obrigatório',
          min: 'Deve ser maior que 0',
        },
      },
    },
    {
      key: 'doubleChance',
      type: 'checkbox',
      props: {
        label: 'Chance Dupla',
        description: 'Ativar chance dupla para esta rifa',
      },
    },
  ];

  onSubmit(): void {
    if (this.form.valid) {
      this.lotteryService.create(this.model).subscribe({
        next: () => {
          this.showToast('Rifa criada com sucesso!');
          setTimeout(() => {
            this.router.navigate(['/rifas/gerenciar']);
          }, 1000);
        },
        error: (error) => {
          const errorMessage = error?.error?.message || 'Erro ao criar rifa';
          this.showToast(errorMessage);
        },
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/rifas/gerenciar']);
  }

  private showToast(message: string): void {
    this.toastMessage.set(message);
    this.toastVisible.set(true);
    setTimeout(() => {
      this.toastVisible.set(false);
    }, 5000);
  }
}
