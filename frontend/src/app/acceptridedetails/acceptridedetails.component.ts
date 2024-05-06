import { Component, OnInit,AfterViewInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RideRequestService } from '../ride-request.service';
import { RideAssignmentService } from '../ride-assignment.service';
import { UserServiceService } from '../user-service.service';
import { ReviewRatingService } from '../review-rating.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

declare const google: any;

@Component({
  selector: 'app-acceptridedetails',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './acceptridedetails.component.html',
  styleUrl: './acceptridedetails.component.css'
})
export class AcceptridedetailsComponent implements OnInit, AfterViewInit {
  rideAssignmentId: string | null = null;
  rideId: string | null = null;
  rideDetails: any | null = null;
  currentUser: any | null;

  acceptRideFormData: any = {
    ride_request_id: '',
    location: '',
    driver_id: '',
    estimated_arrival_time: '',
    ride_status: 'ongoing',
  };

  updateRideAssignmentFormData: any = {
    location: '',
    estimated_arrival_time: '',
  };

  constructor(
    private route: ActivatedRoute, 
    private rideRequestService: RideRequestService, 
    private rideAssignmentService: RideAssignmentService, 
    private userService: UserServiceService, 
    private router: Router,
    private reviewRatingService: ReviewRatingService
  ) {
    this.currentUser = this.userService.getCurrentUser();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.rideAssignmentId = params['id'];
      this.rideId = params['id'];
      this.getRideDetails();
      this.acceptRideFormData.ride_request_id = this.getRideRequestId();
      this.acceptRideFormData.driver_id = this.getUserId();
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
        }, (error) => {
          console.log('Error fetching ride details:', error);
        }
      )
    }
  }

  updateReviewRating(): void {
    if (this.rideAssignmentId && this.updateRideAssignmentFormData) {
      this.reviewRatingService.updateReviewRating(this.rideAssignmentId, this.updateRideAssignmentFormData)
      .subscribe(
        (response) => {
          console.log('Reviews updated successfully:', response);
        }, (error) => {
          console.log('Error updating ride reviews request:', error);
        }
      );
    }
  }

  getRideRequestId(): string {
    return this.rideDetails ? this.rideDetails._id : '';
  }

  getUserId(): string {
    return this.currentUser ? this.currentUser._id : '';
  }
  

  acceptRideRequest(): void {
    if (this.acceptRideFormData) {
      this.acceptRideFormData.ride_request_id = this.getRideRequestId();
      this.acceptRideFormData.driver_id = this.getUserId();

      this.rideAssignmentService.createRideAssignment(this.acceptRideFormData)
      .subscribe(
        (response) => {
          console.log('Ride request updated successfully:', response);
          this.closeAcceptAssignmentModal();
          this.router.navigate(['/myrides', this.getUserId()]);
        }, (error) => {
          console.log('Error updating ride request:', error);
        }
      );
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

  openAcceptAssignmentModal() {
    const modal = document.getElementById('accept_assignment_modal');
    if (modal) {
      (modal as any).showModal();
    }
  }

  closeAcceptAssignmentModal() {
    const modal = document.getElementById('accept_assignment_modal');
    if (modal) {
      (modal as any).close();
      location.reload();
    }
  }

  openUpdateAcceptAssignmentModal() {
    const modal = document.getElementById('pay_ride_modal');
    if (modal) {
      (modal as any).showModal();
    }
  }

  closeUpdateAcceptAssignmentModal() {
    const modal = document.getElementById('pay_ride_modal');
    if (modal) {
      (modal as any).close();
    }
  }

  openCancelRideAssignmentModal() {
    const modal = document.getElementById('update_pay_modal');
    if (modal) {
      (modal as any).showModal();
    }
  }

  closeCancelAssignmentModal() {
    const modal = document.getElementById('update_pay_modal');
    if (modal) {
      (modal as any).close();
    }
  }
}

