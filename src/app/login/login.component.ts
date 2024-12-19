// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Import AuthService to handle the login API

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['testuser@example.com', [Validators.required, Validators.email]],
      password: ['password123', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (response) => {
          // Save the token and user email to localStorage
          console.log(response);

          // localStorage.setItem('token', response.token);
          // localStorage.setItem('userEmail', response.user.email); // Save user email
          localStorage.setItem('token', response.token);
          localStorage.setItem('userEmail', response.user.email); // Save user email
          console.log(response.user.email);


          // Redirect to the dashboard
          this.router.navigateByUrl('/dashboard');
          console.log('boom');

        },
        (error) => {
          // Display error message
          this.errorMessage = 'Invalid email or password. Please try again.';
        }
      );
    }
  }
}
