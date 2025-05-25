import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../Components/navbar/navbar.component';
import { FooterComponent } from '../Components/footer/footer.component';
import { Navbar2Component } from '../Components/navbar2/navbar2.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet,NavbarComponent,FooterComponent,Navbar2Component],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
