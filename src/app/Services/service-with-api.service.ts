import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

import { BehaviorSubject, Observable } from 'rxjs';
import { ICareerCourses } from '../Models/ICareerCourses';
import { CoursesCategories } from '../Models/CoursesCategories';
import { CareerResourses } from '../Models/career-resourses';
import { CareerResoursesCategory } from '../Models/career-resourses-category';
import { SucessStories } from '../Models/sucess-stories';
import { WhatWeGains } from '../Models/WhatWeGains';
import { Achieve } from '../Models/achieve';
import { LocalizationService } from './localization.service';


@Injectable({
  providedIn: 'root'
})
export class ServiceWithApiService {

     private searchTerm = new BehaviorSubject<string>('');
  currentSearchTerm = this.searchTerm.asObservable();
  httpheaders={};
  constructor(public httpclient:HttpClient,    private localizationService: LocalizationService ) {

   
    this.httpheaders={
      Headers:new HttpHeaders({'content-type':'application/json'})    }
   }

  
  baseURLCareerCourse:string=`${environment.backendURL}/course/allCourse`;//done
  baseURLGetOneCareerCourse:string=`${environment.backendURL}/course`;//done
  // get all the career courses and there category
  baseURLCareerCourseCategory:string=`${environment.backendURL}/Category/allCategories`;//done in the buutons of the filteration
  baseURLCareerCourseCategory2:string=`${environment.backendURL}/course/allCoursesByCat`;//this is sours of the issue i do not need it he must handle he filteration on the baseURLCareerCourse
// get all career resourse and thair category 
  baseURLcareerResources: string = `${environment.backendURL}/careeerResource/allCareerResources`;//done in career resourses
baseURLcareerResourceCategories: string = `${environment.backendURL}/careeerResourceCategories/allCareerResourceCategories`;//done  with the operation of the filteration

// get the sucees stories 
 baseURLsuccessStories:string=`${environment.backendURL}/successStory/allsuccessStories`;
  baseURLGains:string=`${environment.baseURL}/Gains`;
  baseURLAchieve:string=`${environment.baseURL}/Achieve`;
// change the language 
  //function to add the parameter at the end to the url to change the language from the backend 
  private getLangParam(): string {
    const lang = this.localizationService.getLanguage();//get the language from the local storage
    return `?lang=${lang}`;//send the value that choosed from the local storage in the query string to change the language 
  }

  // /get all career courses with the query string to change the language
 
  GetAllCareerCourses(): Observable<ICareerCourses[]> {
    const url = `${this.baseURLCareerCourse}${this.getLangParam()}`;
    return this.httpclient.get<ICareerCourses[]>(url);
  }
// get course by id with the query string to change the language
   getCarerrCourseById(CourseId: string): Observable<ICareerCourses> {
    const url = `${this.baseURLGetOneCareerCourse}/${CourseId}${this.getLangParam()}`;
    return this.httpclient.get<ICareerCourses>(url);
  }
 // get all success stories 
   GetAllSuccessStories():Observable<SucessStories[]>{
        const url = `${this.baseURLsuccessStories}${this.getLangParam()}`;
    return this.httpclient.get<SucessStories[]>(url);
   }
// get all catgories of career courses
  getCareerCourseCategory(): Observable<CoursesCategories[]> {
    return this.httpclient.get<CoursesCategories[]>(this.baseURLCareerCourseCategory);
  }
  
  // query string to search by cat Id

getCourseByCatId(catValu: string): Observable<ICareerCourses[]> {
  const filter = JSON.stringify({ categoryID: catValu });
  const url = `${this.baseURLCareerCourseCategory2}?filter=${encodeURIComponent(filter)}`;
  return this.httpclient.get<ICareerCourses[]>(url);
}


// Get all career resources // Get all career resources
  GetAllCareerResourses(): Observable<CareerResourses[]> {
    return this.httpclient.get<CareerResourses[]>(this.baseURLcareerResources);
  }

  // Get all resource categories
  getCareerResoursesCategory(): Observable<CareerResoursesCategory[]> {
    return this.httpclient.get<CareerResoursesCategory[]>(this.baseURLcareerResourceCategories);
  }

  // Get resources filtered by category
  getCareerResoursesByCategory(categoryID: string): Observable<CareerResourses[]> {
    return this.httpclient.get<CareerResourses[]>(`${this.baseURLcareerResources}?CareerResourceCategory=${categoryID}`);
  }


 


  //  get all what we offer
  getWhatWeGains():Observable<WhatWeGains[]>{
    return this.httpclient.get<WhatWeGains[]>(this.baseURLGains)
  }

  // get all Achieve
  getAchieve():Observable<Achieve[]>{
    return this.httpclient.get<Achieve[]>(this.baseURLAchieve)
  }


  //search in navbar
   changeSearchTerm(term: string) {
    this.searchTerm.next(term);
  }
  
 
}
