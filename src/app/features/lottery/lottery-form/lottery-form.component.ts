import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LotteryService } from '../../../core/services/requests/lottery.service';
import { CreateLotteryDTO } from '../../../core/models/lottery';

@Component({
  selector: 'app-lottery-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyMaterialModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './lottery-form.component.html',
  styleUrl: './lottery-form.component.scss',
})
export class LotteryFormComponent {
  private readonly lotteryService = inject(LotteryService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  form = new FormGroup({});
  model: CreateLotteryDTO = {
    name: '',
    numTicketsTicketbook: 0,
    numTicketbooks: 0,
    priceTicket: 0,
    doubleChance: false,
  };

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
          this.snackBar.open('Rifa criada com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.router.navigate(['/lotteries']);
        },
        error: (error) => {
          const errorMessage = error?.error?.message || 'Erro ao criar rifa';
          this.snackBar.open(errorMessage, 'Fechar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          });
        },
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/lotteries']);
  }
}
