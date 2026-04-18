import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiRoutes } from '../../../shared/constants/api-routes';
import { TicketDTO, TicketInformation, UpdateTicketDTO } from '../../models/ticket';

/**
 * Service for managing Ticket entities
 * Provides CRUD operations for tickets/bilhetes
 */
@Injectable({ providedIn: 'root' })
export class TicketService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Retrieves all tickets from the API
   * @returns Observable containing an array of TicketDTO
   */
  getAll(): Observable<TicketDTO[]> {
    return this.http.get<TicketDTO[]>(`${environment.apiUrl}${ApiRoutes.TICKET_GET_ALL}`);
  }

  /**
   * Retrieves a specific ticket by its ID
   * @param id - The unique identifier of the ticket
   * @returns Observable containing the TicketDTO
   */
  getById(id: string): Observable<TicketDTO> {
    return this.http.get<TicketDTO>(`${environment.apiUrl}${ApiRoutes.TICKET_GET_BY_ID}/${id}`);
  }

  /**
   * Creates a new ticket
   * @param dto - The data for creating the ticket
   * @returns Observable for the creation operation
   */
  create(idTicketbook: string, tickets: TicketInformation[]): Observable<void> {
    let url = `${environment.apiUrl}${ApiRoutes.TICKET_POST}`;
    url = url.replace('{idTicketbook}', idTicketbook);
    return this.http.post<void>(url, JSON.stringify(tickets), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  /**
   * Updates an existing ticket
   * @param dto - The data for updating the ticket
   * @returns Observable for the update operation
   */
  update(dto: UpdateTicketDTO): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}${ApiRoutes.TICKET_PUT}`, dto);
  }

  /**
   * Deletes a ticket by its ID
   * @param id - The unique identifier of the ticket to delete
   * @returns Observable for the delete operation
   */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}${ApiRoutes.TICKET_DELETE}/${id}`);
  }
}
