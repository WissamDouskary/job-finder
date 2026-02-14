import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/users.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);

  if (userService.isLoggedIn()) return true;

  return router.createUrlTree(
    ['/login'],
    { queryParams: { returnUrl: state.url } }
  );
};