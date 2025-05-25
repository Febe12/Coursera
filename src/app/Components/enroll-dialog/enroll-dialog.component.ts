import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';


@Component({
  selector: 'app-enroll-dialog',
  imports: [RouterLink],
  templateUrl: './enroll-dialog.component.html',
  styleUrl: './enroll-dialog.component.scss'
})
export class EnrollDialogComponent implements OnInit {
 
      CourseId: string = '';

      constructor(     private activatedroute: ActivatedRoute) { }
  ngOnInit(): void {
console.log("Enroll Dialog Component Initialized");
this.CourseId = this.activatedroute.snapshot.paramMap.get('CourseId')
? String(this.activatedroute.snapshot.paramMap.get('CourseId'))
: '';
console.log("CourseId from Enroll Dialog Component:",this.CourseId);
  }


}
