import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CareerComponent } from '../career/career.component';
import { FormsModule } from '@angular/forms';
import { CareerResourses } from '../../Models/career-resourses';
import { CoursesCategories } from '../../Models/CoursesCategories';
import { CareerResoursesCategory } from '../../Models/career-resourses-category';
// import { SucessStories } from '../../Models/sucess-stories';
import { ServiceWithApiService } from '../../Services/service-with-api.service';
import { SuccessStoriesComponent } from '../success-stories/success-stories.component';
import { CareerResoursesComponent } from '../career-resourses/career-resourses.component';
@Component({
  selector: 'app-career-parent',
  imports: [CareerComponent, CommonModule,FormsModule,SuccessStoriesComponent,CareerResoursesComponent],
  templateUrl: './career-parent.component.html',
  styleUrl: './career-parent.component.scss'
})
export class CareerParentComponent  implements OnInit  {



    sendedValueFromParent: string = ''; 
 
    CareerCoursescategories: CoursesCategories[] = [];
  

    // SuccessStories: SucessStories[] = [];
    
    constructor(private courseServiceWithApi: ServiceWithApiService) {}
  
    ngOnInit(): void {
      this.fetchCareerCoursesCategories();
     
  
      // this.fetchAllSuccessStories();
    }
  
fetchCareerCoursesCategories() {
  this.courseServiceWithApi.getCareerCourseCategory().subscribe({
    next: (data) => {
     
      this.CareerCoursescategories = data.map((item: any) => ({
        
        categoryName: item.categoryName,
        categoryID: item._id, // transform _id to categoryID
        categoryImage: item.categoryImage,
        courses: item.courses
      }));
          //  console.log('the categoryIDs form backend are :', this.CareerCoursescategories.map(cat => cat.categoryID));
    },
    error: (err) => {
      console.log(err);
    }
  });
}

  
 
    
  
    // fetchAllSuccessStories() {
    //   this.courseServiceWithApi.GetAllSuccessStories().subscribe({
    //     next: (data) => {
    //       this.SuccessStories = data;
    //     },
    //     error: (err) => {
    //       console.log(err);
    //     }
    //   });
    // }
  
}
