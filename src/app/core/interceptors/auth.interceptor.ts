import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/requests/auth.service';

/**
 * HTTP Interceptor for JWT authentication
 * Automatically attaches the Authorization header to all requests
 * Handles 401/403 errors globally
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/login']);
      } else if (error.status === 403) {
        console.error('Access denied: You do not have permission to access this resource.');
      } else if (error.status === 0) {
        console.error('Connection error: Unable to reach the server. Please check your internet connection.');
      }
      return throwError(() => error);
    })
  );
};
