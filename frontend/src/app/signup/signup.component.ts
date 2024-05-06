import { Component } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  user = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: '',
  };

  constructor(private userService: UserServiceService, private router: Router) {}

  signup(): void {
    if (this.user.first_name === '' || this.user.last_name === '' || this.user.email === '' || this.user.password === '') {
      alert('Please fill all fields');
    } else {
      this.userService.createUser(this.user).subscribe(
        (response) => {
          console.log('User created successfully:', response);
          this.router.navigate(['/login']);
    },
       (error) => {
        console.log('Error creating user:', error);
      });
    }
  }
}
