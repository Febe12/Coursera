import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnlineDegreesComponent } from './Components/online-degrees/online-degrees.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LocalizationService } from './Services/localization.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Coursera-Clone-Angular';

    constructor(private localizationService: LocalizationService) {
    this.localizationService.initLanguage(); // ✅ هنا بنفعل اللغة عند بدء التطبيق
  }
}
