import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { CoursesService } from '../../Services/courses.service';
import { CourseData, Module, Video } from '../../Models/course-details';
import { map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-course-explanation',
  templateUrl: './course-explanation.component.html',
  imports: [RouterLink, CommonModule, NavbarComponent],
  styleUrls: ['./course-explanation.component.scss'],
})
export class CourseExplanationComponent implements OnInit {
  id: string = '';
  courseDetails?: CourseData;
  selectedModule?: Module;
  language: 'en' | 'ar' = 'en';

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.language = (localStorage.getItem('language') as 'en' | 'ar') || 'en';
    this.route.params
      .pipe(
        map((params) => params['id']),
        switchMap((id) => this.coursesService.getCourseDetails(id)),
        tap((courseDetails) => {
          this.courseDetails = courseDetails;
          this.id = courseDetails._id;
          this.selectedModule = courseDetails.modules[0];
        })
      )
      .subscribe();
  }

  toggleArrow() {
    const arrow = document.getElementById('arrow');
    if (arrow) {
      arrow.classList.toggle('rotate');
    }
  }

  formatSecondsToHMS(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    const hDisplay = h > 0 ? `${h}h ` : '';
    const mDisplay = m > 0 ? `${m}m ` : '';
    const sDisplay = `${s}s`;

    return `${hDisplay}${mDisplay}${sDisplay}`.trim();
  }

  selectModule(module: Module) {
    this.selectedModule = module;
  }
}
