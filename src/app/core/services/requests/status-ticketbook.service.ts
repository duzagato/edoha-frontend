import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiRoutes } from '../../../shared/constants/api-routes';
import {
  StatusTicketbookDTO,
  CreateStatusTicketbookDTO,
  UpdateStatusTicketbookDTO
} from '../../models/status-ticketbook';

/**
 * Service for managing StatusTicketbook entities
 * Provides CRUD operations for ticketbook statuses
 */
@Injectable({ providedIn: 'root' })
export class StatusTicketbookService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Retrieves all status ticketbooks from the API
   * @returns Observable containing an array of StatusTicketbookDTO
   */
  getAll(): Observable<StatusTicketbookDTO[]> {
    return this.http.get<StatusTicketbookDTO[]>(
      `${environment.apiUrl}${ApiRoutes.STATUS_TICKETBOOK_GET_ALL}`
    );
  }

  /**
   * Retrieves a specific status ticketbook by its ID
   * @param id - The unique identifier of the status ticketbook
   * @returns Observable containing the StatusTicketbookDTO
   */
  getById(id: string): Observable<StatusTicketbookDTO> {
    return this.http.get<StatusTicketbookDTO>(
      `${environment.apiUrl}${ApiRoutes.STATUS_TICKETBOOK_GET_BY_ID}/${id}`
    );
  }

  /**
   * Creates a new status ticketbook
   * @param dto - The data for creating the status ticketbook
   * @returns Observable for the creation operation
   */
  create(dto: CreateStatusTicketbookDTO): Observable<void> {
    return this.http.post<void>(
      `${environment.apiUrl}${ApiRoutes.STATUS_TICKETBOOK_POST}`,
      dto
    );
  }

  /**
   * Updates an existing status ticketbook
   * @param dto - The data for updating the status ticketbook
   * @returns Observable for the update operation
   */
  update(dto: UpdateStatusTicketbookDTO): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}${ApiRoutes.STATUS_TICKETBOOK_PUT}`, dto);
  }

  /**
   * Deletes a status ticketbook by its ID
   * @param id - The unique identifier of the status ticketbook to delete
   * @returns Observable for the delete operation
   */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(
      `${environment.apiUrl}${ApiRoutes.STATUS_TICKETBOOK_DELETE}/${id}`
    );
  }
}
