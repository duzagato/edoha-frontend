import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiRoutes } from '../../../shared/constants/api-routes';
import {
  UserInstitutionDTO,
  CreateUserInstitutionDTO,
  UpdateUserInstitutionDTO
} from '../../models/user-institution';

/**
 * Service for managing UserInstitution entities
 * Provides CRUD operations for user-institution relationships
 */
@Injectable({ providedIn: 'root' })
export class UserInstitutionService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Retrieves all user-institution relationships from the API
   * @returns Observable containing an array of UserInstitutionDTO
   */
  getAll(): Observable<UserInstitutionDTO[]> {
    return this.http.get<UserInstitutionDTO[]>(
      `${environment.apiUrl}${ApiRoutes.USER_INSTITUTION_GET_ALL}`
    );
  }

  /**
   * Retrieves a specific user-institution relationship by its ID
   * @param id - The unique identifier of the user-institution relationship
   * @returns Observable containing the UserInstitutionDTO
   */
  getById(id: string): Observable<UserInstitutionDTO> {
    return this.http.get<UserInstitutionDTO>(
      `${environment.apiUrl}${ApiRoutes.USER_INSTITUTION_GET_BY_ID}/${id}`
    );
  }

  /**
   * Creates a new user-institution relationship
   * @param dto - The data for creating the user-institution relationship
   * @returns Observable for the creation operation
   */
  create(dto: CreateUserInstitutionDTO): Observable<void> {
    return this.http.post<void>(
      `${environment.apiUrl}${ApiRoutes.USER_INSTITUTION_POST}`,
      dto
    );
  }

  /**
   * Updates an existing user-institution relationship
   * @param dto - The data for updating the user-institution relationship
   * @returns Observable for the update operation
   */
  update(dto: UpdateUserInstitutionDTO): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}${ApiRoutes.USER_INSTITUTION_PUT}`, dto);
  }

  /**
   * Deletes a user-institution relationship by its ID
   * @param id - The unique identifier of the user-institution relationship to delete
   * @returns Observable for the delete operation
   */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(
      `${environment.apiUrl}${ApiRoutes.USER_INSTITUTION_DELETE}/${id}`
    );
  }
}
