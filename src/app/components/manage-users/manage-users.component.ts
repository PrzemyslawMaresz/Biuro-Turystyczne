import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent {

  users: User[] = [];

  constructor(
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
    });
  }


  updateUser(user: User) {
    this.usersService.updateUser(user.id, user);
  }

  deleteUser(userId: string | undefined) {
    this.usersService.deleteUser(userId);
  }

  filterAdmins(): User[] {
    return this.users.filter(user => user.role !== 'admin');
  }

}
