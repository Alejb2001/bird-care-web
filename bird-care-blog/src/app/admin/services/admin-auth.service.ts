import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Cargar usuario del localStorage si existe
    const token = this.getToken();
    const user = this.getStoredUser();
    if (token && user) {
      this.currentUserSubject.next(user);
    }
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, {
      username,
      password
    }).pipe(
      tap(response => {
        if (response.success && response.token) {
          this.setToken(response.token);
          this.setUser(response.user);
          this.currentUserSubject.next(response.user);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('admin_token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    // Verificar si el token ha expirado (opcional)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000; // Convertir a milisegundos
      return Date.now() < expiry;
    } catch (e) {
      return false;
    }
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private setToken(token: string): void {
    localStorage.setItem('admin_token', token);
  }

  private setUser(user: User): void {
    localStorage.setItem('admin_user', JSON.stringify(user));
  }

  private getStoredUser(): User | null {
    const userStr = localStorage.getItem('admin_user');
    return userStr ? JSON.parse(userStr) : null;
  }
}
