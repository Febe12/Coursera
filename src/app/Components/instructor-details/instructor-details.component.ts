import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Instructors } from '../../Models/instructors';
import { InstructorsService } from '../../Services/instructors.service';
import { LandingPage } from '../../Models/landing-page';
import { AuthService } from '../../Services/auth.service';
import { LandingPageService } from '../../Services/landing-page.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { ICareerCourses } from '../../Models/ICareerCourses';
import { ServiceWithApiService } from '../../Services/service-with-api.service';
import { CoursesCategories } from '../../Models/CoursesCategories';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-instructor-details',
  imports: [NavbarComponent, RouterModule, CommonModule, FooterComponent],
  templateUrl: './instructor-details.component.html',
  styleUrl: './instructor-details.component.scss'
})
export class InstructorDetailsComponent implements OnInit {

  instructorID!: string;
  getInstructorID!: Instructors | undefined;
  ArrayData: LandingPage[] = [];
  filterArray: ICareerCourses[] = [];
  filterCategory: CoursesCategories[] = [];

  constructor(
    private api: InstructorsService,
    private active: ActivatedRoute,
    private router: Router,

    public courseServiceWithApi: ServiceWithApiService
  ) { }

  ngOnInit(): void {

     this.courseServiceWithApi.getCareerCourseCategory().subscribe({
  next: (data) => {
    console.log('Data received from backend:', data);
    this.filterCategory = data;

    this.filterCategory = data.map((item: any) => ({
      ...item,
      id: item._id
    }));
  },
  error: (err) => {
    console.error('Error fetching data from backend:', err);
  }
});

    this.courseServiceWithApi.GetAllCareerCourses().subscribe({
      next: (data) => {
        console.log('Data received from backend:', data);
        this.filterArray = data;

        this.filterArray = data.map((item: any) => ({
          ...item,
          id: item._id
        }));
      },
      error: (err) => {
        console.error('Error fetching data from backend:', err);
      }
    });



    this.active.paramMap.subscribe(par => {
      this.instructorID = par.get('id') || '';
      if (this.instructorID) {
        this.api.getInstructorID(this.instructorID).subscribe({
          next: (response: any) => {

            const data = response.data || response;
            this.getInstructorID = {
              ...data,
              id: data._id || data.id,
            };
            console.log(this.getInstructorID);
          },
          error: (err) => {
            console.error('Error fetching Instructors:', err);
          }
        });
      }
    });




  this.courseServiceWithApi.GetAllCareerCourses().subscribe({
  next: (data) => {

    const allCourses = data.map((item: any) => ({
      ...item,
      id: item._id
    }));


    this.active.paramMap.subscribe(par => {
      this.instructorID = par.get('id') || '';
      if (this.instructorID) {
        this.api.getInstructorID(this.instructorID).subscribe({
          next: (response: any) => {
            const data = response.data || response;
            this.getInstructorID = {
              ...data,
              id: data._id || data.id,
            };


            this.filterArray = allCourses.filter(course => course.instructor === this.getInstructorID?.id);

            console.log('Filtered Courses for Instructor:', this.filterArray);
          },
          error: (err) => {
            console.error('Error fetching Instructors:', err);
          }
        });
      }
    });
  },
  error: (err) => {
    console.error('Error fetching courses from backend:', err);
  }
});



  }

  goToDetails(id: string) {
    console.log('Navigating to details for:', id);
    this.router.navigate(['/homeDetails', id]);
  }

}
