import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiRoutes } from '../../../shared/constants/api-routes';
import { PageDTO, CreatePageDTO, UpdatePageDTO } from '../../models/page';

/**
 * Service for managing Page entities
 * Provides CRUD operations for system pages
 */
@Injectable({ providedIn: 'root' })
export class PageService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Retrieves all pages from the API
   * @returns Observable containing an array of PageDTO
   */
  getAll(): Observable<PageDTO[]> {
    return this.http.get<PageDTO[]>(`${environment.apiUrl}${ApiRoutes.PAGE_GET_ALL}`);
  }

  /**
   * Retrieves a specific page by its ID
   * @param id - The unique identifier of the page
   * @returns Observable containing the PageDTO
   */
  getById(id: string): Observable<PageDTO> {
    return this.http.get<PageDTO>(`${environment.apiUrl}${ApiRoutes.PAGE_GET_BY_ID}/${id}`);
  }

  /**
   * Creates a new page
   * @param dto - The data for creating the page
   * @returns Observable for the creation operation
   */
  create(dto: CreatePageDTO): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}${ApiRoutes.PAGE_POST}`, dto);
  }

  /**
   * Updates an existing page
   * @param dto - The data for updating the page
   * @returns Observable for the update operation
   */
  update(dto: UpdatePageDTO): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}${ApiRoutes.PAGE_PUT}`, dto);
  }

  /**
   * Deletes a page by its ID
   * @param id - The unique identifier of the page to delete
   * @returns Observable for the delete operation
   */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}${ApiRoutes.PAGE_DELETE}/${id}`);
  }
}
