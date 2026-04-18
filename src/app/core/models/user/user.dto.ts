/**
 * DTO for User entity
 * Maps to User entity in backend
 */
export interface UserDTO {
  id: string;
  name: string;
  phone: string | null;
  nickname: string | null;
  createdAt: string;
  createdBy: string | null;
}

/**
 * DTO for creating a new User
 * Maps to CreateUserInputModel in backend
 */
export interface CreateUserDTO {
  name: string;
  phone: string;
  nickname?: string | null;
  unhashedPassword?: string | null;
}

/**
 * DTO for updating a User
 * Maps to UpdateUserDTO in backend
 */
export interface UpdateUserDTO {
  id?: string;
  name?: string;
  phone?: string;
  nickname?: string | null;
}

/**
 * User credentials for internal use
 * Maps to UserCredentials in backend
 */
export interface UserCredentials {
  id: string | null;
  nickname: string | null;
  password: string | null;
}

export interface Donater {
  phone: string,
  name: string
}