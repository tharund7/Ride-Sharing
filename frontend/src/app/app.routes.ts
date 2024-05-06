import { Routes } from '@angular/router';
import { DriverAssignmentMngComponent } from './driver-assignment-mng/driver-assignment-mng.component';
import { ReviewRatingSysComponent } from './review-rating-sys/review-rating-sys.component';
import { RideRequestMngComponent } from './ride-request-mng/ride-request-mng.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RidedetailsComponent } from './ridedetails/ridedetails.component';
import { LoginComponent } from './login/login.component';
import { AcceptridedetailsComponent } from './acceptridedetails/acceptridedetails.component';
import { MyridesComponent } from './myrides/myrides.component';

import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', component: LandingpageComponent },
    { path: 'driver-assignment-mng', component: DriverAssignmentMngComponent, canActivate: [AuthGuard] },
    { path: 'review-rating-sys', component: ReviewRatingSysComponent },
    { path: 'ride-request-mng', component: RideRequestMngComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'home/:id', component:  HomepageComponent, canActivate: [AuthGuard] },
    { path: 'ride-details/:id', component: RidedetailsComponent, canActivate: [AuthGuard] },
    { path: 'login', component:     LoginComponent},
    { path: 'accept-rides-details/:id', component: AcceptridedetailsComponent, canActivate: [AuthGuard] },
    { path: 'myrides/:id', component:     MyridesComponent, canActivate: [AuthGuard] },
];
