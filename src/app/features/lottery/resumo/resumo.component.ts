import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-resumo',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-icon mat-card-avatar>summarize</mat-icon>
          <mat-card-title>Resumo da Rifa</mat-card-title>
          <mat-card-subtitle>ID da Rifa: {{ lotteryId }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>Esta página mostrará o resumo da rifa.</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
  `]
})
export class ResumoComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  lotteryId: string = '';

  ngOnInit(): void {
    this.lotteryId = this.route.snapshot.paramMap.get('id') || '';
  }
}
