import { Component } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../models/reservation';
import { AuthenticationService } from '../../services/authentication.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  selectedCurrency: string = 'PLN';
  reservations: Reservation[] = [];
  user: User | null = null;

  constructor(
    private currencyService: CurrencyService,
    private reservationService: ReservationService,
    private authenticationService: AuthenticationService,
    private usersService: UsersService,
    ) {
    this.currencyService.getSelectedCurrency().subscribe((currency: string) => {
      this.selectedCurrency = currency;
    });

    this.reservationService.getReservations().subscribe((reservations: Reservation[]) => {
      this.reservations = reservations;
    });

    this.usersService.getUser().subscribe((user: User | null) => {
      this.user = user;
    });
  
  }

  onCurrencyChange(newCurrency: string) {
    this.currencyService.switchCurrency(newCurrency);
  }

  showUpcomingTripIcon(): boolean {
    return this.reservations.some(reservation => reservation.isTripUpcoming === true && reservation.userId === this.user?.id);
  }

  logOut() {
    this.usersService.loadUserData(undefined);
    this.authenticationService.signOut();
  }

  isLogged(): boolean {
    return this.usersService.getRole() !== 'guest';
  }

  isClient(): boolean {
    return this.usersService.getRole() === 'client';
  }

  isModerator(): boolean {
    return this.usersService.getRole() === 'manager' || this.usersService.getRole() === 'admin';
  }

  isAdmin(): boolean {
    return this.usersService.getRole() === 'admin';
  }

  userName(): string {
    return this.usersService.getName() || '';
  }

  
}
