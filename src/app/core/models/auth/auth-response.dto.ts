/**
 * DTO for authentication response
 * Contains the user ID and JWT access token returned by the API
 */
export interface AuthResponseDTO {
  idUser: string;
  accessToken: string;
}
