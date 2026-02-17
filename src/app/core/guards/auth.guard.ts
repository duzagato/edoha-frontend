import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/requests/auth.service';

/**
 * Route guard that protects routes requiring authentication
 * Redirects to login page if user is not authenticated
 */
export const authGuard: CanActivateFn = (route, state) => {
  // Temporarily disabled for testing menu
  return true;
  
  // const authService = inject(AuthService);
  // const router = inject(Router);

  // if (authService.isAuthenticated()) {
  //   return true;
  // }

  // router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  // return false;
};
