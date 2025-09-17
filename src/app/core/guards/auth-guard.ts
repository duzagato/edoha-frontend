import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppRoutes } from '../../shared/constants/app-routes';
import { CacheKeys } from '../../shared/constants/cache-keys';

export const authGuard: CanActivateFn = (route, state) => {
  const token = sessionStorage.getItem(CacheKeys.JWT_TOKEN);
  const router = inject(Router);

  if(token){
    return true;
  }else{
    return router.createUrlTree([AppRoutes.LOGIN]);
  }
};
