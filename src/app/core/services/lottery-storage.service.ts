import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LotteryService } from './requests/lottery.service';
import { Lottery } from '../models/lottery';
import { CacheKeys } from '../../shared/constants/cache-keys';
import { StringService } from '../../shared/services/string.service';

@Injectable({ providedIn: 'root' })
export class LotteryStorageService {
  constructor(
    private readonly lotteryService: LotteryService,
    private readonly stringService: StringService 
  ) {}

  getLotteryByName(nameLottery: string): Observable<Lottery | undefined> {
    const cached = this.getFromStorage(nameLottery);
    if (cached) {
      console.log("Está em cache");
      console.log(of(cached));
      return of(cached);
    }

    return this.lotteryService.getLotteriesByInstitution().pipe(
      map((lotteries) => {
        const decodedName = decodeURIComponent(nameLottery).toLowerCase();
        
        const lottery = lotteries.find((l) => {
          const lotterySlug = this.stringService.getSlug(l.name);
          return lotterySlug === decodedName;
        });

        if (lottery) {
          this.saveToStorage(nameLottery, lottery);
        }
        
        return lottery;
      })
    );
  }

  private getFromStorage(nameLottery: string): Lottery | null {
    const key = `${CacheKeys.LOTTERY_STORAGE_PREFIX}:${nameLottery}`;
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as Lottery) : null;
  }

  
  private saveToStorage(nameLottery: string, lottery: Lottery): void {
    const key = `${CacheKeys.LOTTERY_STORAGE_PREFIX}:${nameLottery}`;
    localStorage.setItem(key, JSON.stringify(lottery));
  }
}
