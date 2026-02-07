import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AdminAuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Redirigir a login y guardar la URL a la que intentaba acceder
  router.navigate(['/admin/login'], {
    queryParams: { returnUrl: state.url }
  });
  return false;
};
