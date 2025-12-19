/**
 * DTO for Permission entity
 * Maps to Permission entity in backend
 */
export interface PermissionDTO {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  createdBy: string | null;
}

/**
 * DTO for creating a new Permission
 * Maps to CreatePermissionDTO in backend
 */
export interface CreatePermissionDTO {
  idInstitution: string;
  name: string;
  description?: string | null;
}

/**
 * DTO for updating a Permission
 * Maps to UpdatePermissionDTO in backend
 */
export interface UpdatePermissionDTO {
  name?: string | null;
  description?: string | null;
}
