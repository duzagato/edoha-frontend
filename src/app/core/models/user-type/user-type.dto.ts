/**
 * DTO for UserType entity
 * Maps to UserType entity in backend
 */
export interface UserTypeDTO {
  id: string;
  name: string;
  createdAt: string;
  createdBy: string | null;
}

/**
 * DTO for creating a new UserType
 * Maps to CreateUserTypeDTO in backend
 */
export interface CreateUserTypeDTO {
  nameUserType: string;
}

/**
 * DTO for updating a UserType
 * Maps to UpdateUserTypeDTO in backend
 */
export interface UpdateUserTypeDTO {
  nameUserType: string;
}
