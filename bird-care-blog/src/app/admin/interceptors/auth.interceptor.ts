import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AdminAuthService } from '../services/admin-auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AdminAuthService);
  const token = authService.getToken();

  // Solo agregar token a peticiones del admin o que lo requieran
  if (token && (req.url.includes('/admin') || req.url.includes('/auth'))) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  }

  return next(req);
};
