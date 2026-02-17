import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-venda-numero',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-icon mat-card-avatar>sell</mat-icon>
          <mat-card-title>Venda de Número</mat-card-title>
          <mat-card-subtitle>ID da Rifa: {{ lotteryId }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>Esta página permitirá registrar vendas de números.</p>
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
export class VendaNumeroComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  lotteryId: string = '';

  ngOnInit(): void {
    this.lotteryId = this.route.snapshot.paramMap.get('id') || '';
  }
}
