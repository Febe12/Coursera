import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-explore-coursera',
  imports: [],
  templateUrl: './explore-coursera.component.html',
  styleUrl: './explore-coursera.component.scss'
})
export class ExploreCourseraComponent {

  @Input() img: string = ''
  @Input() title: string = ''
  @Input() numberOfCourses: string = ''
}
