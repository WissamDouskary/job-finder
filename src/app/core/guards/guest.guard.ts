import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/users.service';

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  const userService = inject(UserService);

  if (userService.isLoggedIn()) {
    return router.createUrlTree(['/jobs']);
  }

  return true;
};