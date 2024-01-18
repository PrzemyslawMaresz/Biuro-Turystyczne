import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  constructor(
    private usersService: UsersService,
  ) { }

  isLogged(): boolean {
    return this.usersService.getRole() !== 'guest';
  }
}
