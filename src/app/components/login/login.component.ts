import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  wrongLoginData = false;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private usersService: UsersService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  async login() {
    if (this.loginForm.valid) {
      const userData = this.loginForm.value;
      const email = userData.email;
      const password = userData.password;
      try {
        const userCredential = await this.authenticationService.signIn(email, password);
        this.usersService.loadUserData(userCredential.user?.uid);
      } catch (error) {
        this.wrongLoginData = true;
        this.loginForm.reset();
      }
    } else {
      console.error('Incorrect login data format.');
      this.wrongLoginData = true;
    }
  }

  resetErrorState() {
    this.wrongLoginData = false;
  }
}
