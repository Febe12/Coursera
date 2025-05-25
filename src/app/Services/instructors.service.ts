import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Instructors } from '../Models/instructors';

@Injectable({
  providedIn: 'root'
})
export class InstructorsService {

  constructor(
    private http:HttpClient
  ) { }
  URL:string=`${environment.backendURL}`

  getInstructorID(id: string): Observable<Instructors> {
    return this.http.get<Instructors>(`${this.URL}/Instructor/${id}`)
  }
}
