import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiRoutes } from '../../../shared/constants/api-routes';
import { LotteryDTO, CreateLotteryDTO, UpdateLotteryDTO } from '../../models/lottery';

/**
 * Service for managing Lottery entities
 * Provides CRUD operations for lotteries
 */
@Injectable({ providedIn: 'root' })
export class LotteryService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Retrieves all lotteries from the API
   * @returns Observable containing an array of LotteryDTO
   */
  getAll(): Observable<LotteryDTO[]> {
    return this.http.get<LotteryDTO[]>(`${environment.apiUrl}${ApiRoutes.LOTTERY_GET_ALL}`);
  }

  /**
   * Retrieves a specific lottery by its ID
   * @param id - The unique identifier of the lottery
   * @returns Observable containing the LotteryDTO
   */
  getById(id: string): Observable<LotteryDTO> {
    return this.http.get<LotteryDTO>(`${environment.apiUrl}${ApiRoutes.LOTTERY_GET_BY_ID}/${id}`);
  }

  /**
   * Retrieves all lotteries for a specific institution
   * @param idInstitution - The unique identifier of the institution
   * @returns Observable containing an array of LotteryDTO
   */
  getLotteriesByInstitution(idInstitution: string): Observable<LotteryDTO[]> {
    return this.http.get<LotteryDTO[]>(
      `${environment.apiUrl}${ApiRoutes.LOTTERY_GET_BY_INSTITUTION}/${idInstitution}/lottery`
    );
  }

  /**
   * @param dto - The data for creating the lottery
   * @returns Observable for the creation operation
   */
  create(dto: CreateLotteryDTO): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}${ApiRoutes.LOTTERY_POST}`, dto);
  }

  /**
   * Updates an existing lottery
   * @param dto - The data for updating the lottery
   * @returns Observable for the update operation
   */
  update(dto: UpdateLotteryDTO): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}${ApiRoutes.LOTTERY_PUT}`, dto);
  }

  /**
   * Deletes a lottery by its ID
   * @param id - The unique identifier of the lottery to delete
   * @returns Observable for the delete operation
   */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}${ApiRoutes.LOTTERY_DELETE}/${id}`);
  }
}
