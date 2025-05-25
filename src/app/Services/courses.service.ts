import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CourseData } from '../Models/course-details';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private httpClient: HttpClient) {}

  getCourseDetails(id: string): Observable<CourseData> {
    return this.httpClient
      .get<CourseData>(`${environment.backendURL}/progress/course/${id}`)
      .pipe(
        map((response: any) => {
          return response.data;
        })
      );
  }

  updateVideoCompletionStatus(
    courseId: string | undefined,
    videoId: string | undefined
  ) {
    return this.httpClient.post(
      `${environment.backendURL}/progress/video/${courseId}/${videoId}`,
      {}
    );
  }

  getCourses() {
    return this.httpClient
      .get<{ enrolledCourses: number; courses: CourseData[] }>(
        `${environment.backendURL}/progress/courses`
      )
      .pipe(
        map((response: any) => {
          return response.data;
        })
      );
  }

  getAssignmentById(assignmentId: string) {
    return this.httpClient.get<AssignmentResponse>(
      `${environment.backendURL}/assignments/${assignmentId}`
    );
  }

  submitAssignment(answers: any) {
    return this.httpClient.post<{ success: boolean; message: string }>(
      `${environment.backendURL}/assignments/submit`,
      answers
    );
  }
}
export interface AssignmentQuestion {
  _id: string;
  content: string;
  type: string;
  options: string[];
  explanation: string;
  difficulty: string;
  createdAt: string;
  __v: number;
}

export interface AssignmentData {
  _id: string;
  title: string;
  description: string;
  courseId: string;
  questions: AssignmentQuestion[];
  passingScore: number;
  timeLimit: number;
  retryDelay: number;
  createdAt: string;
  __v: number;
}

export interface AssignmentResponse {
  data: AssignmentData;
  canTakeAssignment: boolean;
  waitTimeInMinutes: number;
}
