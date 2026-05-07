/**
 * DTO for Institution entity
 * Maps to Institution entity in backend
 */
export interface InstitutionDTO {
  id: string;
  name: string;
  createdAt: string;
  createdBy: string | null;
}

/**
 * DTO for creating a new Institution
 * Maps to CreateInstitutionDTO in backend
 */
export interface CreateInstitutionDTO {
  name?: string;
}

/**
 * DTO for updating an Institution
 * Maps to UpdateInstitutionDTO in backend
 */
export interface UpdateInstitutionDTO {
  name?: string;
}

export interface InstitutionPublicDTO {
  id: string;
  name: string;
  slugName: string;
  shortName: string;
  description: string | null;
  logoDirectory: string;
  createdAt: string;
  createdBy: string | null;
}
