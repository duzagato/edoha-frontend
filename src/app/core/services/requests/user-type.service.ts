import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiRoutes } from '../../../shared/constants/api-routes';
import { UserTypeDTO, CreateUserTypeDTO, UpdateUserTypeDTO } from '../../models/user-type';

/**
 * Service for managing UserType entities
 * Provides CRUD operations for user types
 */
@Injectable({ providedIn: 'root' })
export class UserTypeService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Retrieves all user types from the API
   * @returns Observable containing an array of UserTypeDTO
   */
  getAll(): Observable<UserTypeDTO[]> {
    return this.http.get<UserTypeDTO[]>(`${environment.apiUrl}${ApiRoutes.USER_TYPE_GET_ALL}`);
  }

  /**
   * Retrieves a specific user type by its ID
   * @param id - The unique identifier of the user type
   * @returns Observable containing the UserTypeDTO
   */
  getById(id: string): Observable<UserTypeDTO> {
    return this.http.get<UserTypeDTO>(
      `${environment.apiUrl}${ApiRoutes.USER_TYPE_GET_BY_ID}/${id}`
    );
  }

  /**
   * Creates a new user type
   * @param dto - The data for creating the user type
   * @returns Observable for the creation operation
   */
  create(dto: CreateUserTypeDTO): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}${ApiRoutes.USER_TYPE_POST}`, dto);
  }

  /**
   * Updates an existing user type
   * @param dto - The data for updating the user type
   * @returns Observable for the update operation
   */
  update(dto: UpdateUserTypeDTO): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}${ApiRoutes.USER_TYPE_PUT}`, dto);
  }

  /**
   * Deletes a user type by its ID
   * @param id - The unique identifier of the user type to delete
   * @returns Observable for the delete operation
   */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}${ApiRoutes.USER_TYPE_DELETE}/${id}`);
  }
}
