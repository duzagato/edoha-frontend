import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiRoutes } from '../../../shared/constants/api-routes';
import { InstitutionDTO, CreateInstitutionDTO, UpdateInstitutionDTO } from '../../models/institution';

/**
 * Service for managing Institution entities
 * Provides CRUD operations for institutions/companies
 */
@Injectable({ providedIn: 'root' })
export class InstitutionService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Retrieves all institutions from the API
   * @returns Observable containing an array of InstitutionDTO
   */
  getAll(): Observable<InstitutionDTO[]> {
    return this.http.get<InstitutionDTO[]>(`${environment.apiUrl}${ApiRoutes.INSTITUTION_GET_ALL}`);
  }

  /**
   * Retrieves a specific institution by its ID
   * @param id - The unique identifier of the institution
   * @returns Observable containing the InstitutionDTO
   */
  getById(id: string): Observable<InstitutionDTO> {
    return this.http.get<InstitutionDTO>(
      `${environment.apiUrl}${ApiRoutes.INSTITUTION_GET_BY_ID}/${id}`
    );
  }

  /**
   * Retrieves institutions associated with a specific user
   * @param idUser - The unique identifier of the user
   * @returns Observable containing an array of InstitutionDTO
   */
  getByUser(idUser: string): Observable<InstitutionDTO[]> {
    return this.http.get<InstitutionDTO[]>(
      `${environment.apiUrl}${ApiRoutes.INSTITUTION_GET_BY_USER}/${idUser}`
    );
  }

  /**
   * Creates a new institution
   * @param dto - The data for creating the institution
   * @returns Observable for the creation operation
   */
  create(dto: CreateInstitutionDTO): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}${ApiRoutes.INSTITUTION_POST}`, dto);
  }

  /**
   * Updates an existing institution
   * @param dto - The data for updating the institution
   * @returns Observable for the update operation
   */
  update(dto: UpdateInstitutionDTO): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}${ApiRoutes.INSTITUTION_PUT}`, dto);
  }

  /**
   * Deletes an institution by its ID
   * @param id - The unique identifier of the institution to delete
   * @returns Observable for the delete operation
   */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}${ApiRoutes.INSTITUTION_DELETE}/${id}`);
  }
}
