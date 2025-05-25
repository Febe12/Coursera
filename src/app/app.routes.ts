import { Routes } from '@angular/router';
import { OnlineDegreesComponent } from './Components/online-degrees/online-degrees.component';
import { CareerParentComponent } from './Components/career-parent/career-parent.component';
import { CareerCourseDetailsComponent } from './Components/career-course-details/career-course-details.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { HomeComponent } from './Components/home/home.component';
import { HomeDetalisComponent } from './Components/home-detalis/home-detalis.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { MyLearningComponent } from './Components/my-learning/my-learning.component';
import { CourseExplanationComponent } from './Components/course-explanation/course-explanation.component';
import { VideoPlayerComponent } from './Components/video-player/video-player.component';
import { AboutComponent } from './Components/about/about.component';
import { InstructorDetailsComponent } from './Components/instructor-details/instructor-details.component';
import { HowDoesCouresraWorks } from './Components/How-does-Couresra-Works/How-does-Couresra-Works.component';
import { LeaderShipComponent } from './Components/leader-ship/leader-ship.component';
import { LoginRegisterFormDialogComponent } from './Components/login-register-form-dialog/login-register-form-dialog.component';
import { PaymentPageComponent } from './Components/payment-page/payment-page.component';
import { ConfirmEmailComponent } from './Components/confirm-email/confirm-email.component';
import { userGuard } from './Guards/user.guard';
import { PaymentSuccessComponent } from './Components/payment-success/payment-success.component';

export const routes: Routes = [
  // Default route to LandingPageComponent without navbar and footer
  { path: '', component: LandingPageComponent, title: 'LandingPage' },

  // Parent route for the Main Layout with navbar and footer
  {
    path: '',
    component: MainLayoutComponent, // Parent component with navbar and footer
    children: [
      {
        path: 'home',
        component: HomeComponent,
        title: 'Home',
        canActivate: [userGuard],
      },
      {
        path: 'my learning',
        component: MyLearningComponent,
        title: 'my learning',
        canActivate: [userGuard],
      },
      {
        path: 'onlinedegree',
        component: OnlineDegreesComponent,
        title: 'Online Degree',
        canActivate: [userGuard],
      },

      {
        path: 'careercourses',
        component: CareerParentComponent,
        title: 'Career Courses',
        canActivate: [userGuard],
      },

      {
        path: 'formDialog',
        component: LoginRegisterFormDialogComponent,
        title: 'Login/Register',
      },
      {
        path: 'courseDetails/:CourseId',
        component: CareerCourseDetailsComponent,
        title: 'Course Details',
        canActivate: [userGuard],
      },

      {
        path: 'leaderShip',
        component: LeaderShipComponent,
        title: 'leadership page ',
        canActivate: [userGuard],
      },
      {
        path: 'about',
        component: AboutComponent,
        title: 'About Coursera',
        canActivate: [userGuard],
      },
    ],
  },
  {
    path: 'ConfirmEmail',
    component: ConfirmEmailComponent,
    title: 'ConfirmEmail',
  },

  {
    path: 'courseExplanation/:id',
    component: CourseExplanationComponent,
    title: 'courseExplanation',
    canActivate: [userGuard],
  },
  {
    path: 'courseExplanation/:courseId/video-player/:moduleId/:topicId',
    component: VideoPlayerComponent,
    title: 'Video Player',
    canActivate: [userGuard],
  },

  {
    path: 'instructorDetails/:id',
    component: InstructorDetailsComponent,
    title: 'intructor Details',
    canActivate: [userGuard],
  },
  {
    path: 'homeDetails/:CourseId',
    component: HomeDetalisComponent,
    title: 'Home Details',
  },
  {
    path: 'profile',
    component: ProfileComponent,
    title: 'Profile',
    canActivate: [userGuard],
  },
  {
    path: 'HowDoesCouresraWorks',
    component: HowDoesCouresraWorks,
    title: 'How does coursraWorks',
    canActivate: [userGuard],
  },
  {
    path: 'Payment/:CourseId',
    component: PaymentPageComponent,
    title: ' Payment Page ',
    canActivate: [userGuard],
  },
  { path: 'payment-success', component: PaymentSuccessComponent, title: 'Payment Success' },
  // Fallback route for 404 Not Found
  { path: '**', component: LandingPageComponent, title: 'LandingPage' },

];
