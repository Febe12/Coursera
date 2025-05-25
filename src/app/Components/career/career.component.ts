import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ICareerCourses } from '../../Models/ICareerCourses';
import { ServiceWithApiService } from '../../Services/service-with-api.service';
import { UserServiceService } from '../../Services/user-service.service';

@Component({
  selector: 'app-career',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './career.component.html',
  styleUrl: './career.component.scss'
})
export class CareerComponent implements OnInit {

  filteredList: ICareerCourses[] = [];
  visibleCoursesCount: number = 8;

  constructor(
    public courseServiceWithApi: ServiceWithApiService,
    public userService: UserServiceService,
    public router: Router
  ) {}

  ngOnInit(): void {
    if (!this.filtervalue) {
      this.fetchAllCareerCourses();
    }

    this.userService.getUserById().subscribe({
      next: (user) => {
        console.log('✅ Current user from the career page:', user);
      },
      error: (err) => {
        console.error('❌ Failed to fetch user from token:', err);
      }
    });
  }

  fetchAllCareerCourses(): void {
    this.courseServiceWithApi.GetAllCareerCourses().subscribe({
      next: (data) => {
        console.log('📦 All courses fetched:', data);
        this.filteredList = data.map((item: any) => ({
          
          ...item,
          id: item._id,
          
        }));
      },
      error: (err) => {
        console.error('❌ Error fetching all courses:', err);
      }
    });
  }

  @Input() set filtervalue(categoryID: string) {
    console.log('📥 Category ID received:', categoryID);

    if (!categoryID || categoryID === '') {
      this.fetchAllCareerCourses();
    } else {
      this.courseServiceWithApi.getCourseByCatId(categoryID).subscribe({
        next: (data: any) => {
          console.log('🎯 Filtered courses from backend:', data);

          // ✅ استخراج الـ courses فقط
          const courses = data.courses || [];
          this.filteredList = courses.map((item: any) => ({
            ...item,
            id: item._id
          }));
        },
        error: (err) => {
          console.error('❌ Error filtering courses:', err);
        }
      });
    }
  }

  showMore8(): void {
    this.visibleCoursesCount += 8;
  }

  goToCareerDetails(courseId: string): void {
    this.router.navigate(['/courseDetails', courseId]);
  }
}
