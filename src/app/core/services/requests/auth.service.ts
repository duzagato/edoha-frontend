import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiRoutes } from '../../../shared/constants/api-routes';
import { CacheKeys, SessionKeys } from '../../../shared/constants/cache-keys';
import { CredentialsDTO, AuthResponseDTO, DecodedToken } from '../../models/auth';

/**
 * Service for handling authentication operations
 * Manages JWT token storage, retrieval, and validation
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _isLoggedIn: WritableSignal<boolean> = signal(this.isAuthenticated());

  /**
   * Reactive signal indicating the current authentication state
   */
  public readonly isLoggedIn = this._isLoggedIn.asReadonly();

  constructor(private readonly http: HttpClient) {}

  /**
   * Authenticates a user with the provided credentials
   * @param credentials - The user's login credentials (nickname and password)
   * @returns Observable containing the authentication response with JWT token
   */
  authenticate(credentials: CredentialsDTO): Observable<AuthResponseDTO> {
    return this.http
      .post<AuthResponseDTO>(`${environment.apiUrl}${ApiRoutes.AUTH_POST}`, credentials)
      .pipe(
        tap((response) => {
          if (response?.accessToken) {
            this.saveToken(response.accessToken);
          }
          if (response?.idUser) {
            sessionStorage.setItem(CacheKeys.ID_USER, response.idUser);
          }
        })
      );
  }

  /**
   * Saves the JWT token to sessionStorage
   * @param token - The JWT token to save
   */
  saveToken(token: string): void {
    sessionStorage.setItem(CacheKeys.JWT_TOKEN, token);
    this._isLoggedIn.set(true);
  }

  /**
   * Retrieves the JWT token from sessionStorage
   * @returns The stored JWT token or null if not found
   */
  getToken(): string | null {
    return sessionStorage.getItem(CacheKeys.JWT_TOKEN);
  }

  /**
   * Removes the JWT token from sessionStorage
   */
  removeToken(): void {
    sessionStorage.removeItem(CacheKeys.JWT_TOKEN);
    this._isLoggedIn.set(false);
  }

  isInstitutionSelected(): boolean {
    const id = sessionStorage.getItem(SessionKeys.INSTITUTION_ID);
    const slug = sessionStorage.getItem(SessionKeys.INSTITUTION_SLUG);
    const shortName = sessionStorage.getItem(SessionKeys.INSTITUTION_SHORT_NAME);

    if (id && slug && shortName) {
      return true;
    }

    return false;
  }
  

  /**
   * Checks if the user is currently authenticated
   * Validates token existence and expiration
   * @returns True if the user has a valid, non-expired token
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token || !this.isInstitutionSelected()) {
      return false;
    }

    const decodedToken = this.getDecodedToken();
    if (!decodedToken) {
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp > currentTime;
  }

  /**
   * Decodes the JWT token and returns its claims
   * @returns The decoded token claims or null if token is invalid
   */
  getDecodedToken(): DecodedToken | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        return null;
      }

      const payload = parts[1];
      const decodedPayload = this.base64UrlDecode(payload);
      return JSON.parse(decodedPayload) as DecodedToken;
    } catch {
      return null;
    }
  }

  /**
   * Logs out the user by removing the token and updating the authentication state
   */
  logout(): void {
    this.removeToken();
    sessionStorage.removeItem(CacheKeys.USER_DATA);
    sessionStorage.removeItem(CacheKeys.USER_PERMISSIONS);
    sessionStorage.removeItem(CacheKeys.ID_USER);
    localStorage.removeItem(CacheKeys.ID_INSTITUTION);
  }

  /**
   * Gets the stored user ID from sessionStorage
   * @returns The user ID or null if not found
   */
  getIdUser(): string | null {
    return sessionStorage.getItem(CacheKeys.ID_USER);
  }

  /**
   * Gets the user ID from the decoded token
   * @returns The user ID or null if not available
   */
  getUserId(): string | null {
    const decodedToken = this.getDecodedToken();
    return decodedToken?.userId ?? decodedToken?.sub ?? null;
  }

  /**
   * Gets the user's nickname from the decoded token
   * @returns The nickname or null if not available
   */
  getNickname(): string | null {
    const decodedToken = this.getDecodedToken();
    return decodedToken?.nickname ?? null;
  }

  /**
   * Gets the user's roles from the decoded token
   * @returns Array of roles or empty array if not available
   */
  getRoles(): string[] {
    const decodedToken = this.getDecodedToken();
    return decodedToken?.roles ?? [];
  }

  /**
   * Decodes a base64url encoded string
   * @param input - The base64url encoded string
   * @returns The decoded string
   */
  private base64UrlDecode(input: string): string {
    let base64 = input.replace(/-/g, '+').replace(/_/g, '/');
    const padding = base64.length % 4;
    if (padding) {
      base64 += '='.repeat(4 - padding);
    }
    return decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  }
}
