import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LotteryService } from './requests/lottery.service';
import { LotteryDTO } from '../models/lottery';
import { CacheKeys } from '../../shared/constants/cache-keys';

/**
 * Service that handles lottery data retrieval with localStorage caching.
 * Checks localStorage first; if absent, fetches from the institution lottery API
 * and persists the result. Keys are namespaced per lottery to support multiple
 * lotteries for the same user without overwriting each other.
 */
@Injectable({ providedIn: 'root' })
export class LotteryStorageService {
  constructor(private readonly lotteryService: LotteryService) {}

  /**
   * Returns the lottery matching the given name.
   * Reads from localStorage when available; otherwise fetches all lotteries
   * for the current institution, caches the result, and returns the match.
   *
   * @param nameLottery - The lottery name as it appears in the URL
   * @returns Observable of LotteryDTO or undefined
   */
  getLotteryByName(nameLottery: string): Observable<LotteryDTO | undefined> {
    const cached = this.getFromStorage(nameLottery);
    if (cached) {
      return of(cached);
    }

    return this.lotteryService.getLotteriesByInstitution().pipe(
      map((lotteries) => {
        const decodedName = decodeURIComponent(nameLottery);
        console.log(lotteries);
        const lottery = lotteries.find((l) => l.name.toLowerCase() === decodedName);
        if (lottery) {
          this.saveToStorage(nameLottery, lottery);
        }
        return lottery;
      })
    );
  }

  /**
   * Reads a cached lottery from localStorage.
   * @param nameLottery - The lottery name used as part of the storage key
   * @returns Parsed LotteryDTO or null when not cached
   */
  private getFromStorage(nameLottery: string): LotteryDTO | null {
    const key = `${CacheKeys.LOTTERY_STORAGE_PREFIX}.${nameLottery}`;
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as LotteryDTO) : null;
  }

  /**
   * Persists a lottery to localStorage using a nameLottery-scoped key.
   * @param nameLottery - The lottery name used as part of the storage key
   * @param lottery - The LotteryDTO to persist
   */
  private saveToStorage(nameLottery: string, lottery: LotteryDTO): void {
    const key = `${CacheKeys.LOTTERY_STORAGE_PREFIX}.${nameLottery}`;
    localStorage.setItem(key, JSON.stringify(lottery));
  }
}
