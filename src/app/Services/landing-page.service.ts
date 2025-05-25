import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { LandingPage } from '../Models/landing-page';

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {

  constructor(
    private http:HttpClient
  ) { }
  URL:string=`${environment.baseURL}`
   getAllData(): Observable<LandingPage[]> {
      return this.http.get<LandingPage[]>(`${this.URL}/LodingPage`)
    }
}
