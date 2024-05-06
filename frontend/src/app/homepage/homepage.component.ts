import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../user-service.service';
import { RideRequestService } from '../ride-request.service';
import { ReviewRatingService } from '../review-rating.service';
import { RideAssignmentService } from '../ride-assignment.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{
  currentUser: any | null;
  rideRequests: any[] = [];
  rides: any[] = [];
  reviews: any[] = [];
  transactions: any[] = [];
  rideassignments: any[] = [];

  constructor(
    private userService: UserServiceService, 
    private router: Router, 
    private http: HttpClient, 
    private rideRequestService: RideRequestService,
    private reviewRatingService: ReviewRatingService,
    private rideAssignmentService: RideAssignmentService
  ) {
    this.currentUser = this.userService.getCurrentUser();
  }

  ngOnInit(): void {
      this.getRideRequests();
      this.getAllRidesRequests();
      this.getAllReviews();
      this.getAllRideAssignments();
  }

  getRideRequests(): void {
    const userId = this.getUserId();
    this.rideRequestService.getRideRequestsByUserId(userId)
    .subscribe(
      (response) => {
        this.rideRequests = response;
        console.log('Ride requests:', this.rideRequests);
        console.log(this.rideRequests.length);
      },
      (error) => {
        console.log('Error fetching ride requests:', error);
      }
    );
  }

 getAllRidesRequests(): void {
   this.rideRequestService.getRideRequests()
   .subscribe(
    (response) => {
      this.rides = response;
      console.log('all Rides:', this.rides);
    }, (error) => {
      console.log('Error fetching rides:', error);
    }
   )
 }

 getAllReviews(): void {
  this.reviewRatingService.getReviewRatings().subscribe(
    (response) => {
      this.reviews = response;
      console.log('All Reviews:', this.reviews);
    },
    (error) => {
      console.log('Error fetching reviews:', error);
    }
  );
 }



 getAllRideAssignments(): void {
  this.rideAssignmentService.getRideAssignments().subscribe(
    (response) => {
      this.rideassignments = response;
      console.log('All RideAssignments:', this.rideassignments);
    },
    (error) => {
      console.log('Error fetching rideassignments:', error);
    }
  );
 }

 deleteRideAssignment(id: string): void {
  this.rideAssignmentService.deleteRideAssignment(id)
  .subscribe(
    (response) => {
      console.log('Ride assignment deleted:', response);
    }, 
    (error) => {
      console.log('Error deleting notification:', error);
    }
  )
}

deleteReviews(id: string): void {
  this.reviewRatingService.deleteReviewRating(id)
  .subscribe(
    (response) => {
      console.log('Ride review rating deleted:', response);
    }, 
    (error) => {
      console.log('Error deleting review:', error);
    }
  )
}


  getFirstName(): string  {
    return this.currentUser ? this.currentUser.first_name : '';
  }

  getUserRole(): string | null {
    return this.currentUser ? this.currentUser.role : null;
  }

  isUserAuthenticated(): boolean {
    return this.userService.isAuthenticated();
  }

  getUserId(): string {
    return this.currentUser ? this.currentUser._id : '';
  }

  redirectToRideDetails(rideId: string): void {
    this.router.navigate(['/ride-details', rideId]);
  }

  redirectToAcceptRidesDetails(rideId: string): void {
    this.router.navigate(['/accept-rides-details', rideId]);
  }

}
