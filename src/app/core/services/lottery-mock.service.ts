import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LotteryDTO } from '../models/lottery';

/**
 * Mock service for lottery data
 * Provides mock lottery data until backend integration is complete
 */
@Injectable({ providedIn: 'root' })
export class LotteryMockService {
  private mockLotteries = signal<LotteryDTO[]>([
    {
      id: '1',
      name: 'Onix',
      numTicketsTicketbook: 50,
      numTicketbooks: 100,
      priceTicket: 10.0,
      doubleChance: true,
      createdAt: new Date().toISOString(),
      createdBy: null,
    },
    {
      id: '2',
      name: 'Fusca',
      numTicketsTicketbook: 50,
      numTicketbooks: 80,
      priceTicket: 5.0,
      doubleChance: false,
      createdAt: new Date().toISOString(),
      createdBy: null,
    },
  ]);

  /**
   * Get all mock lotteries
   * @returns Observable of lottery array
   */
  getAllLotteries(): Observable<LotteryDTO[]> {
    return of(this.mockLotteries());
  }

  /**
   * Get lottery by ID
   * @param id - Lottery ID
   * @returns Observable of lottery or undefined
   */
  getLotteryById(id: string): Observable<LotteryDTO | undefined> {
    const lottery = this.mockLotteries().find((l) => l.id === id);
    return of(lottery);
  }
}
