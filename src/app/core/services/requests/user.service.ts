import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiRoutes } from '../../../shared/constants/api-routes';
import { UserDTO, CreateUserDTO, UpdateUserDTO } from '../../models/user';

/**
 * Service for managing User entities
 * Provides CRUD operations for users
 */
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Retrieves all users from the API
   * @returns Observable containing an array of UserDTO
   */
  getAll(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${environment.apiUrl}${ApiRoutes.USER_GET_ALL}`);
  }

  /**
   * Retrieves a specific user by its ID
   * @param id - The unique identifier of the user
   * @returns Observable containing the UserDTO
   */
  getById(id: string): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${environment.apiUrl}${ApiRoutes.USER_GET_BY_ID}/${id}`);
  }

  /**
   * Creates a new user
   * @param dto - The data for creating the user
   * @returns Observable for the creation operation
   */
  create(dto: CreateUserDTO): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}${ApiRoutes.USER_POST}`, dto);
  }

  /**
   * Updates an existing user
   * @param dto - The data for updating the user
   * @returns Observable for the update operation
   */
  update(dto: UpdateUserDTO): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}${ApiRoutes.USER_PUT}`, dto);
  }

  /**
   * Deletes a user by its ID
   * @param id - The unique identifier of the user to delete
   * @returns Observable for the delete operation
   */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}${ApiRoutes.USER_DELETE}/${id}`);
  }
}
