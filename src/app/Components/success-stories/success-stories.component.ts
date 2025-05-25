import { Component, OnInit } from '@angular/core';
import { SucessStories } from '../../Models/sucess-stories';
import { ServiceWithApiService } from '../../Services/service-with-api.service';

@Component({
  selector: 'app-success-stories',
  imports: [],
  templateUrl: './success-stories.component.html',
  styleUrl: './success-stories.component.scss'
})
export class SuccessStoriesComponent implements OnInit{
    SuccessStories: SucessStories[] = [];

     constructor(private courseServiceWithApi: ServiceWithApiService) {}

  ngOnInit(): void {
    this.fetchAllSuccessStories();
  }
  fetchAllSuccessStories() {
    this.courseServiceWithApi.GetAllSuccessStories().subscribe({
      next: (data) => {
        this.SuccessStories = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
