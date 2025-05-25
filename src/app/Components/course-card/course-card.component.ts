import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-card',
  imports: [CommonModule],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.scss'
})
export class CourseCardComponent {
  @Input() image: string = '';
  @Input() badge?: string = '';
  @Input() logoImage: string = '';
  @Input() logo: string = '';
  @Input() title: string = '';
  @Input() link?: string = '';
  @Input() description: string = '';
}
