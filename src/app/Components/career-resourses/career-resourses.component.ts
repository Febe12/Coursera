import { Component, OnInit } from '@angular/core';
import { CareerResoursesCategory } from '../../Models/career-resourses-category';
import { CareerResourses } from '../../Models/career-resourses';
import { ServiceWithApiService } from '../../Services/service-with-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-career-resourses',
  templateUrl: './career-resourses.component.html',
  styleUrls: ['./career-resourses.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class CareerResoursesComponent implements OnInit {
  CareerResourseCategory: CareerResoursesCategory[] = [];
  selectedCategory: string = '';
  CareerResourses: CareerResourses[] = [];
  visibleCoursesCount: number = 4;

  constructor(private courseServiceWithApi: ServiceWithApiService) {}

  ngOnInit(): void {
    this.fetchCareerResoursesCategories();
  }

  fetchCareerResoursesCategories() {
    this.courseServiceWithApi.getCareerResoursesCategory().subscribe({
      next: (data) => {
        this.CareerResourseCategory = data;
        if (this.CareerResourseCategory.length > 0) {
          this.selectedCategory = this.CareerResourseCategory[0]._id;
          this.fetchCareerResoureses();
        }
      },
      error: (err) => {
        console.log('Error fetching categories:', err);
      }
    });
  }

  fetchCareerResoureses() {
    this.courseServiceWithApi.GetAllCareerResourses().subscribe({
      next: (data) => {
          console.log('GetAllCareerResourses form backend are :', data);
        this.CareerResourses = data.filter(resource =>
          resource.CareerResourceCategory &&
          resource.CareerResourceCategory._id === this.selectedCategory
        );
      },
      error: (err) => {
        console.log('Error fetching resources:', err);
      }
    });
  }

  selectResours(selectValue: string): void {
    this.selectedCategory = selectValue;
    this.fetchCareerResoureses();
  }

  toggleShowMore() {
    if (this.visibleCoursesCount > 4) {
      this.visibleCoursesCount = 4;
    } else {
      this.visibleCoursesCount += 6;
    }
  }

  trackByFn(index: number, item: CareerResourses): string {
    return item._id;
  }
}
