import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LotteryMockService } from '../../../../core/services/lottery-mock.service';
import { LotteryDTO } from '../../../../core/models/lottery';

@Component({
  selector: 'app-venda',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './venda.component.html',
  styleUrl: './venda.component.scss',
})
export class VendaComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly lotteryService = inject(LotteryMockService);
  private readonly snackBar = inject(MatSnackBar);

  lottery = signal<LotteryDTO | undefined>(undefined);
  loading = signal<boolean>(false);
  submitting = signal<boolean>(false);
  
  vendaForm: FormGroup;
  lotteryId: string | null = null;

  constructor() {
    this.vendaForm = this.fb.group({
      ticketbookNumber: ['', [Validators.required, Validators.min(1)]],
      ticketNumber: ['', [Validators.required, Validators.min(1)]],
      donaterName: ['', Validators.required],
      donaterPhone: ['', Validators.required],
      soldDate: [new Date(), Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
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
        // Set default amount based on lottery price
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
      
      // Mock submission - in real scenario, this would call a service
      setTimeout(() => {
        this.submitting.set(false);
        this.snackBar.open('Venda de número registrada com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.vendaForm.reset({ 
          soldDate: new Date(),
          amount: this.lottery()?.priceTicket || 0
        });
      }, 1000);
    }
  }

  onCancel(): void {
    this.router.navigate(['/rifas', this.lotteryId, 'gerenciar']);
  }
}
