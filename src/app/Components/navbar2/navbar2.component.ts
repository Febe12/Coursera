import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-navbar2',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './navbar2.component.html',
  styleUrl: './navbar2.component.scss'
})
export class Navbar2Component {
  constructor(
    public authService: AuthService,
    private router: Router,
    private translate: TranslateService
  ) {
    // this.translate.setDefaultLang('en');
    // this.translate.use('en');
  }
}
