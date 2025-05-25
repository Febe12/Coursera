import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { UserServiceService } from '../../Services/user-service.service';
import { CoursesService } from '../../Services/courses.service';
import { tap } from 'rxjs';
import { CourseData } from '../../Models/course-details';

@Component({
  selector: 'app-my-learning',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './my-learning.component.html',
  styleUrl: './my-learning.component.scss',
})
export class MyLearningComponent implements OnInit {
  enrolledCourses: CourseData[] = [];
  selectedCourses: CourseData[] = [];
  userData: any;
  userName: string | null = null; //to display the username  of the user
  language: 'en' | 'ar' = 'en';
  constructor(
    public authService: AuthService,
    private coursesService: CoursesService,
    public userService: UserServiceService
  ) {}
  ngOnInit(): void {
    this.language = (localStorage.getItem('language') as 'en' | 'ar') || 'en';
    this.coursesService
      .getCourses()
      .pipe(
        tap((res) => {
          this.enrolledCourses = res.courses;
          this.showInProgress();
        })
      )
      .subscribe();

    this.userService.getUserById().subscribe((res: any) => {
      this.userData = res.data;
    });
  }

  showInProgress() {
    this.selectedCourses = this.enrolledCourses.filter(
      (course) => !course.isCompleted
    );
  }
  showCompleted() {
    this.selectedCourses = this.enrolledCourses.filter(
      (course) => course.isCompleted
    );
  }
}
