import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoursesGroup } from '../Models/courses-group';


@Injectable({
  providedIn: 'root'
})
export class CoursesGroupService {

  constructor(private httpClient: HttpClient) { }

  getCoursesGroups(): Observable<CoursesGroup> {
    return this.httpClient.get<CoursesGroup>('http://localhost:3000/group1');
  }
}
