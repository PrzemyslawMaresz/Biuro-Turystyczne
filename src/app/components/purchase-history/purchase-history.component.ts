import { CurrencyService } from './../../services/currency.service';
import { ReservationService } from './../../services/reservation.service';
import { Component } from '@angular/core';
import { Reservation } from '../../models/reservation';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrl: './purchase-history.component.css'
})
export class PurchaseHistoryComponent {

  reservations: Reservation[] = [];
  selectedCurrency: string = 'PLN';
  selectedStatus: string = "all";
  user: User | null = null;

  constructor(
    private reservationService: ReservationService,
    private currencyService: CurrencyService,
    public usersService: UsersService,
  ) {}

  ngOnInit() {
    this.reservationService.getReservations().subscribe((reservations: Reservation[]) => {
      this.reservations = reservations;
    });

    this.currencyService.getSelectedCurrency().subscribe((currency: string) => {
      this.selectedCurrency = currency;
    });

    this.usersService.getUser().subscribe((user: User | null) => {
      this.user = user;
    });
    
  }

  printStatus(status: string | undefined): string {
    switch (status) {
      case 'pending':
        return 'oczekiwanie na rozpoczęcie';
      case 'active':
        return 'w trakcie';
      case 'finished':
        return 'zakończona';
      default:
        return 'Nieznany';
    }
  }

  selectStatus(status: string): void {
    this.selectedStatus = status;
  }

  isStatusMatch(reservation: Reservation): boolean {
    return this.selectedStatus === "all" || reservation.status === this.selectedStatus;
  }

  filteredReservationsList(): Reservation[] {
    return this.reservations.filter((reservation: Reservation) => this.isStatusMatch(reservation));
  }

  returnUserReservations(): Reservation[] {
    return this.filteredReservationsList().filter((reservation: Reservation) => reservation.userId === this.user?.id);
  }

  isUpcomingTrip(reservation: Reservation): boolean {
    return reservation.isTripUpcoming? true : false;
  }


}
