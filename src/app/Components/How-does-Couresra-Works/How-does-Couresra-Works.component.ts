import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiceWithApiService } from '../../Services/service-with-api.service';
import { WhatWeGains} from '../../Models/WhatWeGains';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-How-does-Couresra-Works',
  imports: [RouterLink,FormsModule,FooterComponent],
  templateUrl: './How-does-Couresra-Works.component.html',
  styleUrl: './How-does-Couresra-Works.component.scss'
})
export class HowDoesCouresraWorks implements OnInit{

  WhatWeOffer:WhatWeGains[] = [];
  constructor( public ServiceWithApi:ServiceWithApiService) {}
  ngOnInit(): void {
    this.FetchAllWhatWeGains();
  }


FetchAllWhatWeGains() {
  this.ServiceWithApi.getWhatWeGains().subscribe({
    next:(data)=>{
      this.WhatWeOffer=data;
      
    },
    error:(err)=>{
      console.log(err);
    }
  })
}
}

