import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  currentUser: any | null;

  user = {
    email: '',
    password: '',
  }

  constructor(private userService: UserServiceService, private router: Router) {
    this.currentUser = this.userService.getCurrentUser();
  }

  getUserId(): string {
    return this.currentUser ? this.currentUser._id : "";
  }

  login(): void {
    if ( this.user.email === '' || this.user.password === '') {
      alert('Please fill all fields');
    } else {
      this.userService.loginUser(this.user).subscribe(
        (response) => {
          this.userService.storeUserData(response.token);
          console.log('Login response:', response);
          this.router.navigate(['/home', this.getUserId()]);
        }, (error) => {
          console.log('Login failed:', error);
        }
      );
    }
  }

  navigateToHome(): void {
    this.router.navigate(['/home', this.getUserId()]);
  }
}
