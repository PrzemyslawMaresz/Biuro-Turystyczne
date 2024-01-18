import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private usersService: UsersService
  ) {    
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['',[Validators.required, Validators.minLength(6)]],
    });
  }

  async register() {
  if (this.registrationForm.valid) {
    const userData = this.registrationForm.value;
    const password = userData.password;
    const confirmPassword = userData.confirmPassword;
    const email = userData.email;
    const username = userData.username;

    if (password !== confirmPassword) {
      console.error('Hasła nie są identyczne.');
      alert('Podane hasła nie są identyczne!');
      return;
    }

    try {
      const userCredential = await this.authenticationService.signUp(email, password)
      const user: User = {
        uid: userCredential.user?.uid,
        username: username,
        role: 'client',
        isBanned: false,
      };
      this.usersService.addUser(user);
      this.authenticationService.signIn(email, password);

    } catch (error) {
      console.error('Błąd rejestracji użytkownika:', error);
      alert('Błąd rejestracji użytkownika.');
    }
  } else {
    console.error('Incorect data.');
    alert('Wprowadzone dane są niepoprawne!');
    return;
  }
}
}
