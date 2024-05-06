import { Component, OnInit,AfterViewInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RideRequestService } from '../ride-request.service';
import { UserServiceService } from '../user-service.service';
import { ReviewRatingService } from '../review-rating.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface RideReviews {
  _id: string;
  ride_id: string;
  rating: number;
  reviewer_id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

declare const google: any;

@Component({
  selector: 'app-ridedetails',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ridedetails.component.html',
  styleUrl: './ridedetails.component.css'
})
export class RidedetailsComponent implements OnInit, AfterViewInit {
  rideId: string | null = null;
  rideDetails: any | null = null;
  currentUser: any | null;
  transactionDetails: any | null = null;
  reviewRatingDetails: any | null = null;
  rideReviews: any[] = [];
  ratingReview: any[] = [];

  updateRideFormData: any = {
    location: '',
    destination: '',
    specific_needs: '',
  };

  payFormData: any = {
    payer_id: '',
    ride_id: '',
    amount: '',
    status: 'pending',
  }

  updatePayFormData: any = {
    amount: '',
    status: '',
  }

  reviewFormData: any = {
    rating: '',
    review_text: '',
    reviewer_id: '',
    ride_id: '',
  }

  updateReviewFormData: any = {
    rating: '',
    review_text: '',
  }

  constructor(private route: ActivatedRoute, 
    private rideRequestService: RideRequestService, 
    private userService: UserServiceService, 
    private reviewRatingService: ReviewRatingService,
    private router: Router
    ) {
    this.currentUser = this.userService.getCurrentUser();
  }

  ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.rideId = params['id'];
        this.getRideDetails();
        this.getReviewDetails();
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadGoogleMaps();
    }, 500);
  }

  getRideDetails(): void {
    if (this.rideId) {
      this.rideRequestService.getRideRequestById(this.rideId)
      .subscribe(
        (response) => {
          this.rideDetails = response;
          console.log('Ride details:', this.rideDetails);

          this.payFormData.payer_id = this.getUserId();
          this.payFormData.ride_id = this.getRideRequestId();

          this.reviewFormData.reviewer_id = this.getUserId();
          this.reviewFormData.ride_id = this.getRideRequestId();

          console.log('rideId:', this.rideId);
          console.log('payer_id:', this.payFormData.payer_id);
          console.log('ride_id:', this.payFormData.ride_id);
        }, (error) => {
          console.log('Error fetching ride details:', error);
        }
      )
    }
  }

  getReviewDetails(): void {
    if (this.rideId) {
      this.reviewRatingService.getReviewsByRideId(this.rideId)
      .subscribe(
        (response) => {
          this.reviewRatingDetails = response;
          console.log('Review and rating details:', this.reviewRatingDetails);
        }, (error) => {
          console.log('Error fetching review and rating details:', error);
        }
      )
    }
  }

  
  getUserId(): string {
    return this.currentUser ? this.currentUser._id : '';
  }

  getRideRequestId(): string {
    return this.rideDetails ? this.rideDetails._id : '';
  }



  updateRideRequest(): void {
    if (this.rideId && this.updateRideFormData) {
      this.rideRequestService.updateRideRequest(this.rideId, this.updateRideFormData)
      .subscribe(
        (response) => {
          console.log('Ride request updated successfully:', response);
          this.closeUpdateRideModal();
        }, (error) => {
          console.log('Error updating ride request:', error);
        }
      );
    }
  }




  updateReviewRequest(): void {
    if (this.rideId && this.updateReviewFormData) {
      this.reviewRatingService.updateReviewRating(this.rideId, this.updateReviewFormData)
      .subscribe(
        (response) => {
          console.log('Ride request updated successfully:', response);
          this.closeLeaveReviewModal();
        }, (error) => {
          console.log('Error updating ride request:', error);
        }
      )
    }
  }



  leaveReviewAndRating(): void {
    if (this.reviewFormData) {
      this.reviewRatingService.createReviewRating(this.reviewFormData)
      .subscribe(
        (response) => {
          console.log('Review and rating created successfully:', response);
          this.closeLeaveReviewModal();
        }, (error) => {
          console.log('Error creating review and rating:', error);
        }
      )
    }
  }

  nullifyRideRequest(): void {
    if (this.rideId) {
      this.rideRequestService.deleteRideRequest(this.rideId)
      .subscribe(
        (response) => {
          console.log('Ride request deleted successfully:', response);
          this.closeNullifyRequestModal();
          this.router.navigate(['/home', this.getUserId()]);
        }, (error) => {
          console.log('Error deleting ride request:', error);
        }
      )
    }
  }


  loadGoogleMaps() {
    if (this.rideDetails) {
      const pickupLocation = new google.maps.LatLng(
        this.rideDetails.pickup_latitude,
        this.rideDetails.pickup_longitude
      );
        
      const dropoffLocation = new google.maps.LatLng(
        this.rideDetails.dropoff_latitude,
        this.rideDetails.dropoff_longitude
      );

      const center ={
        lat: (pickupLocation.lat + dropoffLocation.lat) / 2,
        lng: (pickupLocation.lng + dropoffLocation.lng) / 2
      }

      const mapOptions = {
        center: center,
        zoom: 10
      };

      const map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);

      const pickupmarker = new google.maps.Marker({
        position: pickupLocation,
        map: map,
        title: 'Pickup Location'
      });

      const dropoffmarker = new google.maps.Marker({
        position: dropoffLocation,
        map: map,
        title: 'Drop-off Location',
      });

      const bounds = new google.maps.LatLngBounds();
      bounds.extend(pickupmarker.getPosition()!);
      bounds.extend(dropoffmarker.getPosition()!);
      map.fitBounds(bounds);

      const directionsService = new google.maps.DirectionsService();
      const directionRenderer = new google.maps.DirectionsRenderer({
        map: map,
      });

      const request = {
        origin: pickupLocation,
        destination: dropoffLocation,
        travelMode: google.maps.TravelMode.DRIVING,
      };

      directionsService.route(request, function (result: any, status: any)  {
        if (status === google.maps.DirectionsStatus.OK) {
          directionRenderer.setDirections(result);
        } else {
          console.log('Directions request failed due to ' + status);
        }
      });
    }
  }

  openUpdateRideModal() {
    if (this.rideDetails) {
      this.updateRideFormData = {
        location: this.rideDetails.location,
        destination: this.rideDetails.destination,
        specific_needs: this.rideDetails.specific_needs,
      };
    }
    const modal = document.getElementById('update_ride_modal');
    if (modal) {
      (modal as any).showModal();
    }
  }

  closeUpdateRideModal() {
    const modal = document.getElementById('update_ride_modal');
    if (modal) {
      (modal as any).close();
      location.reload();
    }
  }

  openUpdatePayModal() {
    if (this.transactionDetails && this.transactionDetails.length > 0) {
      const firstTransaction = this.transactionDetails[0];

      this.updatePayFormData = {
        amount: firstTransaction.amount,
        status: firstTransaction.status
      };
    }
    const modal = document.getElementById('update_pay_modal');
    if (modal) {
      (modal as any).showModal();
    }
  }

  closeUpdatePayModal() {
    const modal = document.getElementById('update_pay_modal');
    if (modal) {
      (modal as any).close();
    }
  }

  openPayRideModal() {
    const modal = document.getElementById('pay_ride_modal');
    if (modal) {
      (modal as any).showModal();
    }
  }

  closePayRideModal() {
    const modal = document.getElementById('pay_ride_modal');
    if (modal) {
      (modal as any).close();
    }
  }


  openLeaveReviewModal() {
    const modal = document.getElementById('leave_review_modal');
    if (modal) {
      (modal as any).showModal();
    }
  }

  closeLeaveReviewModal() {
    const modal = document.getElementById('leave_review_modal');
    if (modal) {
      (modal as any).close();
    }
  }

  openNullifyRequestModal() {
    const modal = document.getElementById('nullify_request_modal');
    if (modal) {
      (modal as any).showModal();
    }
  }

  closeNullifyRequestModal() {
    const modal = document.getElementById('nullify_request_modal');
    if (modal) {
      (modal as any).close();
    }
  }

  openUpdateReviewModal() {
    const modal = document.getElementById('update_review_modal');
    if (modal) {
      (modal as any).showModal();
    }
  }

  closeUpdateReviewModal() {
    if (this.reviewRatingDetails && this.reviewRatingDetails.length > 0) {
      const firstReview = this.reviewRatingDetails[0];

      this.updateReviewFormData = {
        rating: firstReview.rating,
        review_text: firstReview.review_text
      };
    }
    const modal = document.getElementById('update_review_modal');
    if (modal) {
      (modal as any).close();
    }
  }
}
