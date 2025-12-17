/**
 * Interface for decoded JWT token claims
 */
export interface DecodedToken {
  sub: string;
  exp: number;
  iat: number;
  jti?: string;
  userId?: string;
  nickname?: string;
  roles?: string[];
  permissions?: string[];
  institutionId?: string;
}
