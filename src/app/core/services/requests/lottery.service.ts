import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiRoutes } from '../../../shared/constants/api-routes';
import { LotteryDTO, CreateLotteryDTO, UpdateLotteryDTO } from '../../models/lottery';
import { InstitutionSession } from '../../models/session/institution-session';

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
    const institutionSession = new InstitutionSession();
    const institutionId = institutionSession.id;
    const url = `${environment.apiUrl}${ApiRoutes.LOTTERY_GET_BY_ID.replace('{idInstitution}', institutionId!)}/${id}`;
    return this.http.get<LotteryDTO>(url);
  }

  /**
   * Retrieves all lotteries for a specific institution
   * @param idInstitution - The unique identifier of the institution
   * @returns Observable containing an array of LotteryDTO
   */
  getLotteriesByInstitution(): Observable<LotteryDTO[]> {
    const idInstitution = new InstitutionSession().id;
    const url = `${environment.apiUrl}${ApiRoutes.LOTTERY_GET_ALL.replace('{idInstitution}', idInstitution!)}`;
    return this.http.get<LotteryDTO[]>(url);
  }

  /**
   * @param dto - The data for creating the lottery
   * @returns Observable for the creation operation
   */
  create(idInstitution: string, dto: CreateLotteryDTO): Observable<void> {
    let url = `${environment.apiUrl}${ApiRoutes.LOTTERY_POST}`;
    url = url.replace('{idInstitution}', idInstitution);
    console.log(url);

    return this.http.post<void>(url, dto);
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
