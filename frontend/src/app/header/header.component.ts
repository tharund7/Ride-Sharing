import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../user-service.service';
import { RideRequestService } from '../ride-request.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  currentUser: any | null;

  request = {
    location: '',
    destination: ' ',
    specific_needs: '',
    user_id: '',
  };

  constructor(private userService: UserServiceService, private router: Router, private rideRequestService: RideRequestService) {
    this.currentUser = this.userService.getCurrentUser();
    this.request.user_id = this.getUserId();
  } 

  getUserRole(): string | null {
    return this.currentUser ? this.currentUser.role : null;
  }
  
  getFirstName(): string  {
    return this.currentUser ? this.currentUser.first_name : '';
  }
  isUserAuthenticated(): boolean {
    return this.userService.isAuthenticated();
  }

  getUserId(): string {
    return this.currentUser ? this.currentUser._id : '';
  }

  navigateToUserHome(): void {
    this.router.navigate(['/home', this.getUserId()]);
  }

  navigateToBookRide(): void {
    this.router.navigate(['/bookride', this.getUserId()]);
  }

  navigateToNotification(): void {
    this.router.navigate(['/notification', this.getUserId()]);
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/']);
  }

  openBookRideModal() {
    const modal = document.getElementById('book_ride_modal');
    if (modal) {
      (modal as any).showModal();
    }
  }

  closeBookRideModal() {
    const modal = document.getElementById('book_ride_modal');
    if (modal) {
      (modal as any).close();
    }
  }

  openAcceptRideModal() {
    const modal = document.getElementById('accept_ride_modal');
    if (modal) {
      (modal as any).showModal();
    }
  }

  closeAcceptRideModal() {
    const modal = document.getElementById('accept_ride_modal');
    if (modal) {
      (modal as any).close();
    }
  }

  AcceptRide(): void {
    if (this.request.location === '' || this.request.destination === '' || this.request.specific_needs === '' ) {
      alert('Please fill all fields');
    } else {
      this.rideRequestService.createRideRequest(this.request).subscribe(
        (response) => {
          console.log('Ride request created:', response);
          this.closeBookRideModal();
          this.router.navigate(['/home', this.request.user_id]);
          location.reload();
        }, (error) => {
          console.log('Error creating ride request:', error);
        }
      );
    }
  }

  UpdateRide(): void {
    if (this.request.location === '' || this.request.destination === '' || this.request.specific_needs === '' ) {
      alert('Please fill all fields');
    } else {
      this.rideRequestService.createRideRequest(this.request).subscribe(
        (response) => {
          console.log('Ride request created:', response);
          this.closeBookRideModal();
          this.router.navigate(['/home', this.request.user_id]);
          location.reload();
        }, (error) => {
          console.log('Error creating ride request:', error);
        }
      );
    }
  }
}
