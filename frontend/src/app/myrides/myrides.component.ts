import { Component, OnInit, AfterViewInit} from '@angular/core';
import { RideAssignmentService } from '../ride-assignment.service';
import { UserServiceService } from '../user-service.service';
import { ReviewRatingService } from '../review-rating.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface RideAssignment {
  _id: string;
  ride_request_id: string;
  location: string;
  driver_id: string;
  estimated_arrival_time: string;
  ride_status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

@Component({
  selector: 'app-myrides',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './myrides.component.html',
  styleUrl: './myrides.component.css'
})
export class MyridesComponent implements OnInit{
  rideAssignmentId: string | null = null;
  currentUser: any | null;
  rideAssignments: any[] = [];

  updateRideAssignmentFormData: any = {
    location: '',
    estimated_arrival_time: '',
  };

  constructor(
    private userService: UserServiceService, 
    private router: Router, 
    private http: HttpClient, 
    private rideAssignmentService: RideAssignmentService,
    private reviewRatingService: ReviewRatingService
  ) {
    this.currentUser = this.userService.getCurrentUser();
  }

  ngOnInit(): void {
    this.getAllRidesAssignments();
  }

  isUserAuthenticated(): boolean {
    return this.userService.isAuthenticated();
  }

  

  openUpdateRideAssignmentModal() {
    const modal = document.getElementById('update_ride_assignment_modal');
    if (modal) {
      (modal as any).showModal();
    }
  }

  closeUpdateRideAssignmentModal() {
    const modal = document.getElementById('update_ride_assignment_modal');
    if (modal) {
      (modal as any).close();
      location.reload();
    }
  }

  getUserId(): string {
    return this.currentUser ? this.currentUser._id : '';
  }

  getFirstName(): string  {
    return this.currentUser ? this.currentUser.first_name : '';
  }

  getAllRidesAssignments(): void {
    const userId = this.getUserId();
    
    this.rideAssignmentService.getRideAssignments()
    .subscribe(
     (response) => {
       this.rideAssignments = response.filter((rideAssignment: RideAssignment) => rideAssignment.driver_id === userId);
       console.log('all RidesAssignments:', this.rideAssignments);
     }, (error) => {
       console.log('Error fetching rides:', error);
     }
    )
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

  updateRideAssignment(): void {
    if (!this.rideAssignmentId) {
      console.error('No ride assignment selected for update.');
      return;
    }

    const updateData = {
      location: this.updateRideAssignmentFormData.location,
      estimated_arrival_time: this.updateRideAssignmentFormData.estimated_arrival_time
    };

    this.rideAssignmentService.updateRideAssignment(this.rideAssignmentId, updateData)
      .subscribe(
        (response) => {
          console.log('Ride assignment updated successfully:', response);
          this.closeUpdateRideAssignmentModal();
          // Optionally, you can refresh the list of ride assignments
          this.getAllRidesAssignments();
        },
        (error) => {
          console.error('Error updating ride assignment:', error);
        }
      );
  }
}
