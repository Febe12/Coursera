import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
// import { ApiService } from '../../Services/api.service';
import { ICareerCourses } from '../../Models/ICareerCourses';
import { Router } from '@angular/router';
import { Instructors } from '../../Models/instructors';
import { InstructorsService } from '../../Services/instructors.service';
import { EnrollDialogComponent } from '../enroll-dialog/enroll-dialog.component';
import { Navbar2Component } from '../navbar2/navbar2.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ServiceWithApiService } from '../../Services/service-with-api.service';
import { TranslateModule } from '@ngx-translate/core';
import { SuccessStoriesComponent } from '../success-stories/success-stories.component';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-home-detalis',
  imports: [RouterModule, EnrollDialogComponent, NavbarComponent, TranslateModule, SuccessStoriesComponent, FooterComponent],
  templateUrl: './home-detalis.component.html',
  styleUrl: './home-detalis.component.scss'
})
export class HomeDetalisComponent implements OnInit {
  CareerCourse: ICareerCourses | undefined = undefined;
  CourseId: string = '';
  getInstructor!: Instructors;

  // Static array to hold enrolled courses
  static myCourses: ICareerCourses[] = [];

  constructor(
    private route: ActivatedRoute,
    private active: ActivatedRoute,
    // private api: ApiService,
    private instructorService: InstructorsService,
    private router: Router,
    public courseServiceWithApi: ServiceWithApiService
  ) { }

 ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.CourseId = params.get('CourseId') || '';

      if (this.CourseId) {
        this.loadCourseAndInstructor(this.CourseId);
      }
    });
  }

  loadCourseAndInstructor(courseId: string): void {
    this.courseServiceWithApi.getCarerrCourseById(courseId).subscribe({
      next: (res: any) => {
        // console.log('Course Data from the home details:', res.data);
        // تحويل _id إلى id للكورس
        this.CareerCourse = {
          ...res.data,
          id: res.data._id,
        };

        console.log('Course Details from the home details:', this.CareerCourse);

        // جلب بيانات الانستركتور باستخدام الـ instructorId اللي جاي من الكورس
        const instructorId = this.CareerCourse?.instructor;
        if (instructorId) {
        this.instructorService.getInstructorID(instructorId).subscribe({
  next: (instructorData: any) => {
    // لو الداتا جايه في instructorData.data
    const data = instructorData.data || instructorData;

    // تحويل _id إلى id عشان يتوافق مع الانترفيس
    this.getInstructor = {
      ...data,
      id: data._id,
    };

    console.log('Instructor Details:', this.getInstructor);
  },
  error: (err) => console.error('Error fetching instructor:', err),
});

        }
      },
      error: (err) => {

        console.error('Error fetching career course:', err);
      },
    });
  }

  enrollCourse(): void {
    if (this.CareerCourse) {
      const exists = HomeDetalisComponent.myCourses.some(c => c.id === this.CareerCourse!.id);
      if (!exists) {
        HomeDetalisComponent.myCourses.push(this.CareerCourse);
      }
      this.router.navigate(['/my learning']);
    }
  }

  static getMyCourses(): ICareerCourses[] {
    return HomeDetalisComponent.myCourses;
  }

  instructorDitals(id?: string): void {
    if (id) {
      this.router.navigate(['/instructorDetails', id]);
    }
  }


}
