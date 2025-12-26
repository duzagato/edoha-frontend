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
  selector: 'app-retirada',
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
  templateUrl: './retirada.component.html',
  styleUrl: './retirada.component.scss',
})
export class RetiradaComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly lotteryService = inject(LotteryMockService);
  private readonly snackBar = inject(MatSnackBar);

  lottery = signal<LotteryDTO | undefined>(undefined);
  loading = signal<boolean>(false);
  submitting = signal<boolean>(false);
  
  retiradaForm: FormGroup;
  lotteryId: string | null = null;

  constructor() {
    this.retiradaForm = this.fb.group({
      ticketbookNumber: ['', [Validators.required, Validators.min(1)]],
      holderName: ['', Validators.required],
      ownerName: ['', Validators.required],
      withdrawnDate: [new Date(), Validators.required],
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
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  onSubmit(): void {
    if (this.retiradaForm.valid) {
      this.submitting.set(true);
      
      // Mock submission - in real scenario, this would call a service
      setTimeout(() => {
        this.submitting.set(false);
        this.snackBar.open('Retirada de talão registrada com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.retiradaForm.reset({ withdrawnDate: new Date() });
      }, 1000);
    }
  }

  onCancel(): void {
    this.router.navigate(['/rifas', this.lotteryId, 'gerenciar']);
  }
}
