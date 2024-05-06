import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent {
  currentUser: any | null;

  user = {
    email: "",
    password: "",
  }


  constructor(private userService: UserServiceService, private router: Router) {
    this.currentUser = this.userService.getCurrentUser();
  }

  getUserId(): string {
    return this.currentUser ? this.currentUser._id : "";
  }

  getUserRole(): string | null {
    return this.currentUser ? this.currentUser.role : null;
  }

  getFirstName(): string {
    return this.currentUser ? this.currentUser.first_name : "";
  }

  isUserAuthenticated(): boolean {
    const isAuthenticated = this.userService.isAuthenticated();
    console.log('Is user authenticated:', isAuthenticated);
    return isAuthenticated;
  }  
}
