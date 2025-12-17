import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiRoutes } from '../../../shared/constants/api-routes';
import {
  CreateUserPermissionDTO,
  UserPermissionPageDTO
} from '../../models/user-permission';

/**
 * Service for managing UserPermission entities
 * Provides operations for user permissions
 */
@Injectable({ providedIn: 'root' })
export class UserPermissionService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Retrieves user permissions grouped by page name for a specific user
   * @param userId - The unique identifier of the user
   * @returns Observable containing an array of UserPermissionPageDTO
   */
  getByUserId(userId: string): Observable<UserPermissionPageDTO[]> {
    return this.http.get<UserPermissionPageDTO[]>(
      `${environment.apiUrl}${ApiRoutes.USER_PERMISSION_GET_BY_ID}/${userId}`
    );
  }

  /**
   * Creates a new user permission
   * @param dto - The data for creating the user permission
   * @returns Observable for the creation operation
   */
  create(dto: CreateUserPermissionDTO): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}${ApiRoutes.USER_PERMISSION_POST}`, dto);
  }

  /**
   * Deletes a user permission by its ID
   * @param id - The unique identifier of the user permission to delete
   * @returns Observable for the delete operation
   */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(
      `${environment.apiUrl}${ApiRoutes.USER_PERMISSION_DELETE}/${id}`
    );
  }
}
