import { Component, Input, input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CourseCardComponent } from "../course-card/course-card.component";
import { Cards } from '../../Models/cards';

@Component({
  selector: 'app-group-of-courses',
  imports: [CommonModule, CourseCardComponent],
  templateUrl: './group-of-courses.component.html',
  styleUrl: './group-of-courses.component.scss'
})
export class GroupOfCoursesComponent {

@Input() herder:string = '';
@Input() title:string = '';
@Input() supTitle:string = '';
@Input() courses:Cards[] = [];
}
