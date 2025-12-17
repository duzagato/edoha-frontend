/**
 * DTO for UserInstitution entity
 * Maps to UserInstitution entity in backend
 */
export interface UserInstitutionDTO {
  idUser: string;
  idInstitution: string;
  createAt: string;
  createBy: string | null;
}

/**
 * DTO for creating a new UserInstitution
 * Maps to CreateUserInstitutionDTO in backend
 */
export interface CreateUserInstitutionDTO {
  idUser?: string;
  idInstitution?: string;
}

/**
 * DTO for updating a UserInstitution
 * Maps to UpdateUserInstitutionDTO in backend
 */
export interface UpdateUserInstitutionDTO {
  idUser?: string;
  idInstitution?: string;
}
