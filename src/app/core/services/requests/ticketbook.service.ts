import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { ApiRoutes } from '../../../shared/constants/api-routes';
import { TicketbookDTO, Ticketbook, CreateTicketbookDTO, UpdateTicketbookDTO, WithdrawTicketbookDTO } from '../../models/ticketbook';

/**
 * Service for managing Ticketbook entities
 * Provides CRUD operations for ticketbooks/carnes
 */
@Injectable({ providedIn: 'root' })
export class TicketbookService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Retrieves all ticketbooks from the API
   * @returns Observable containing an array of TicketbookDTO
   */
  getAll(): Observable<TicketbookDTO[]> {
    return this.http.get<TicketbookDTO[]>(`${environment.apiUrl}${ApiRoutes.TICKETBOOK_GET_ALL}`);
  }

  /**
   * Retrieves a specific ticketbook by its ID
   * @param id - The unique identifier of the ticketbook
   * @returns Observable containing the TicketbookDTO
   */
  getById(id: string): Observable<TicketbookDTO> {
    return this.http.get<TicketbookDTO>(
      `${environment.apiUrl}${ApiRoutes.TICKETBOOK_GET_BY_ID}/${id}`
    );
  }

  getByNumber(idLottery: string, number: number): Observable<Ticketbook> {
    const url = `${environment.apiUrl}${ApiRoutes.TICKETBOOK_GET_BY_NUMBER}`
      .replace('{idLottery}', idLottery)
      .replace('{numberTicketbook}', number.toString());
    return this.http.get<Ticketbook>(url);
  }

  /**
   * Creates a new ticketbook
   * @param dto - The data for creating the ticketbook
   * @returns Observable for the creation operation
   */
  create(dto: CreateTicketbookDTO): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}${ApiRoutes.TICKETBOOK_POST}`, dto);
  }

  /**
   * Updates an existing ticketbook
   * @param dto - The data for updating the ticketbook
   * @returns Observable for the update operation
   */
  update(dto: UpdateTicketbookDTO): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}${ApiRoutes.TICKETBOOK_PUT}`, dto);
  }

  /**
   * Deletes a ticketbook by its ID
   * @param id - The unique identifier of the ticketbook to delete
   * @returns Observable for the delete operation
   */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}${ApiRoutes.TICKETBOOK_DELETE}/${id}`);
  }

  getReturneds(idLottery: string): Observable<Ticketbook[]>{
    return this.http.get<Ticketbook[]>(`${environment.apiUrl}${ApiRoutes.TICKETBOOK_GET_RETURNEDS}`, {
      params: { idLottery }
    });
  }

  getWithdrawns(idLottery: string): Observable<Ticketbook[]>{
    return this.http.get<Ticketbook[]>(`${environment.apiUrl}${ApiRoutes.TICKETBOOK_GET_WITHDRAWNS}`, {
      params: { idLottery }
    });
  }

  /**
   * Registers a ticketbook withdrawal for a specific lottery within an institution
   * @param idInstitution - The institution's unique identifier
   * @param idLottery - The lottery's unique identifier
   * @param dto - The withdrawal data
   * @returns Observable for the creation operation
   */
  withdraw(idLottery: string, dto: WithdrawTicketbookDTO): Observable<void> {
    return this.http.post<void>(
      `${environment.apiUrl}/lottery/${idLottery}/ticketbook`,
      dto
    );
  }
}
