import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

import { ICareerCourses } from '../Models/ICareerCourses';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http:HttpClient
  ) { }
  URL:string=`${environment.baseURL}`
  getAllProduct(): Observable<ICareerCourses[]> {
    return this.http.get<ICareerCourses[]>(`${this.URL}/CareerCourses`)
  }
  getByID(id: string): Observable<ICareerCourses> {
    return this.http.get<ICareerCourses>(`${this.URL}/CareerCourses/${id}`)
  }

}
