import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Iuser } from '../Models/iuser';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private apiUrl = `${environment.backendURL}/user`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserById(): Observable<Iuser> {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

  
    return this.http.get<Iuser>(`${this.apiUrl}/`, { headers });
  }



  // update the user 

  updateUser(data: Partial<Iuser>): Observable<{ message: string; updatedUser: Iuser }> {
  const token = this.authService.getToken();
  let headers = new HttpHeaders();

  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  return this.http.patch<{ message: string; updatedUser: Iuser }>(
    `${this.apiUrl}/update`,
    data,
    { headers }
  );
}

}

