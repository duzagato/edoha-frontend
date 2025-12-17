import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiRoutes } from '../../../shared/constants/api-routes';
import { ActionDTO, CreateActionDTO, UpdateActionDTO } from '../../models/action';

/**
 * Service for managing Action entities
 * Provides CRUD operations for system actions
 */
@Injectable({ providedIn: 'root' })
export class ActionService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Retrieves all actions from the API
   * @returns Observable containing an array of ActionDTO
   */
  getAll(): Observable<ActionDTO[]> {
    return this.http.get<ActionDTO[]>(`${environment.apiUrl}${ApiRoutes.ACTION_GET_ALL}`);
  }

  /**
   * Retrieves a specific action by its ID
   * @param id - The unique identifier of the action
   * @returns Observable containing the ActionDTO
   */
  getById(id: string): Observable<ActionDTO> {
    return this.http.get<ActionDTO>(`${environment.apiUrl}${ApiRoutes.ACTION_GET_BY_ID}/${id}`);
  }

  /**
   * Creates a new action
   * @param dto - The data for creating the action
   * @returns Observable for the creation operation
   */
  create(dto: CreateActionDTO): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}${ApiRoutes.ACTION_POST}`, dto);
  }

  /**
   * Updates an existing action
   * @param dto - The data for updating the action
   * @returns Observable for the update operation
   */
  update(dto: UpdateActionDTO): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}${ApiRoutes.ACTION_PUT}`, dto);
  }

  /**
   * Deletes an action by its ID
   * @param id - The unique identifier of the action to delete
   * @returns Observable for the delete operation
   */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}${ApiRoutes.ACTION_DELETE}/${id}`);
  }
}
