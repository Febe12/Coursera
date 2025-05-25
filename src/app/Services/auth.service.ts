import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Iuser } from '../Models/iuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = `${environment.backendURL}/user`;

  private token: string | null = null;
  private userId: string | null = null;

  constructor(private http: HttpClient) {}

  register(userData: Partial<Iuser>): Observable<{ message: string; user: Iuser }> {
    return this.http.post<{ message: string; user: Iuser }>(`${this.baseURL}/signup`, userData);
  }

  login(email: string, password: string): Observable<{ message: string; userToken: string; userId: string }> {
    return this.http.post<{ message: string; userToken: string; userId: string }>(
      `${this.baseURL}/signin`,
      { email, password }
    );
  }

  confirmEmail(email: string, code: string): Observable<{ message: string; userToken: string; userId: string }> {
    return this.http.patch<{ message: string; userToken: string; userId: string }>(
      `${this.baseURL}/confirm-email`,
      { email, code }
    );
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }
//function to get the token and used in testing i have token or not for the naviagton or guard the route 

  getToken(): string | null {
    return this.token || localStorage.getItem('token');
  }

  setUserId(id: string): void {
    this.userId = id;
  }

  getUserId(): string | null {
    return this.userId;
  }

  logout(): void {
    this.token = null;
    this.userId = null;
    localStorage.removeItem('token');
    this.http.post(`${this.baseURL}/logout`, {}).subscribe(); 
  }
}

