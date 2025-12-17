import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiRoutes } from '../../../shared/constants/api-routes';
import { PermissionDTO, CreatePermissionDTO, UpdatePermissionDTO } from '../../models/permission';

/**
 * Service for managing Permission entities
 * Provides CRUD operations for permissions
 */
@Injectable({ providedIn: 'root' })
export class PermissionService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Retrieves all permissions from the API
   * @returns Observable containing an array of PermissionDTO
   */
  getAll(): Observable<PermissionDTO[]> {
    return this.http.get<PermissionDTO[]>(`${environment.apiUrl}${ApiRoutes.PERMISSION_GET_ALL}`);
  }

  /**
   * Retrieves a specific permission by its ID
   * @param id - The unique identifier of the permission
   * @returns Observable containing the PermissionDTO
   */
  getById(id: string): Observable<PermissionDTO> {
    return this.http.get<PermissionDTO>(
      `${environment.apiUrl}${ApiRoutes.PERMISSION_GET_BY_ID}/${id}`
    );
  }

  /**
   * Creates a new permission
   * @param dto - The data for creating the permission
   * @returns Observable for the creation operation
   */
  create(dto: CreatePermissionDTO): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}${ApiRoutes.PERMISSION_POST}`, dto);
  }

  /**
   * Updates an existing permission
   * @param dto - The data for updating the permission
   * @returns Observable for the update operation
   */
  update(dto: UpdatePermissionDTO): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}${ApiRoutes.PERMISSION_PUT}`, dto);
  }

  /**
   * Deletes a permission by its ID
   * @param id - The unique identifier of the permission to delete
   * @returns Observable for the delete operation
   */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}${ApiRoutes.PERMISSION_DELETE}/${id}`);
  }
}
