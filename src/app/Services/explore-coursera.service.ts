import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExploreCoursera } from '../Models/explore-coursera';


@Injectable({
  providedIn: 'root',
})
export class ExploreCourseraService {
  constructor(private httpClient: HttpClient) {}
  fetchCourses(): Observable<ExploreCoursera[]> {
    {
      return this.httpClient.get<ExploreCoursera[]>(
        'http://localhost:3000/ExploreCoursera'
      );
    }
  }
}
