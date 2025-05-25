import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICareerCourses } from '../../Models/ICareerCourses';
import { ServiceWithApiService } from '../../Services/service-with-api.service';
import { UserServiceService } from '../../Services/user-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-page',
  imports: [FormsModule],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.scss',
})
export class PaymentPageComponent implements OnInit {
  CareerCourse: ICareerCourses | undefined = undefined;
  CourseId: string = '';
  userData: any; //get the current user
  priceIds = {
    monthly: 'price_1RPiO2CdjQ9ZqtcSSPklGH45', // ضع الـ price ID الحقيقي هنا
    yearly: 'price_1RPiXFCdjQ9ZqtcS4jeOJlHJ', // من Stripe Dashboard
  };
  selectedPlan: 'monthly' | 'yearly' = 'monthly'; // اختيار افتراضي
  constructor(
    public authService: AuthService,
    private router: Router,
    private CourseService: ServiceWithApiService,
    private activatedroute: ActivatedRoute,
    public userService: UserServiceService,
     private http: HttpClient
  ) {}
  ngOnInit(): void {
     this.selectedPlan = 'monthly'; // تعيين افتراضي
  console.log('Initial selectedPlan:', this.selectedPlan);
    // get the user by token
    this.userService.getUserById().subscribe((res: any) => {
      // console.log(" Current  user form the career page :", res);
      this.userData = res.data; //here will be the user
    });

    // Initialization logic can go here if needed

    this.CourseId = this.activatedroute.snapshot.paramMap.get('CourseId')
      ? String(this.activatedroute.snapshot.paramMap.get('CourseId'))
      : '';

    this.GetCareerCourseById();
  }
  subscribeToCourse(planType: 'monthly' | 'yearly') {
  const priceId = this.priceIds[planType];

  if (!priceId) {
    // alert('Price ID غير متوفر');
    return;
  }
  console.log('Selected plan:', planType);
  console.log('Price ID:', priceId);


  const payload = {
    priceId,
    planType,
  };
  const url = `https://coursera-clone-iti-production.up.railway.app/progress/enroll/${this.CourseId}`;
  const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  this.http.post(url, {}, { headers, responseType: 'json' })
    .subscribe({
      next: (response: any) => {
        console.log('Free trial started successfully', response);
        
      },
      error: (err) => {
        console.error('فشل في بدء الفترة التجريبية', err);
        // alert('فشل في بدء الفترة التجريبية. حاول مرة أخرى.');
      }
    });

  this.http.post('https://coursera-clone-iti-production.up.railway.app/stripe/checkout', payload, { responseType: 'json' })
    .subscribe({
      next: (response: any) => {
        window.location.href = response.url;
      },
      error: (err) => {
        console.error('Error creating checkout session:', err);
        // alert('فشل في بدء عملية الدفع');
      }
    });
}

  logout() {
    this.authService.logout();
    this.router.navigate(['/']); // Redirect to landing page the default route after logout
  }
  startFreeTrial() {
  const url = `https://coursera-clone-iti-production.up.railway.app/progress/enroll/${this.CourseId}`;
  const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  this.http.post(url, {}, { headers, responseType: 'json' })
    .subscribe({
      next: (response: any) => {
        console.log('Free trial started successfully', response);
        // alert('تم بدء الفترة التجريبية بنجاح!');
        // يمكنك هنا التوجيه لصفحة جديدة بعد النجاح
        this.router.navigate(['/courseExplanation/' + this.CourseId]);
      },
      error: (err) => {
        console.error('فشل في بدء الفترة التجريبية', err);
        // alert('فشل في بدء الفترة التجريبية. حاول مرة أخرى.');
      }
    });
}


 GetCareerCourseById() {
  this.CourseService.getCarerrCourseById(this.CourseId).subscribe({
    next: (res: any) => {
      this.CareerCourse = {
        ...res.data,
        id: res.data._id,
      };
      console.log('Parsed course object:', this.CareerCourse,"and the id of the cours is ",this.CourseId);

    },
    error: (err) => {
      console.error('Error fetching career course:', err);
    },
  });
}
}
