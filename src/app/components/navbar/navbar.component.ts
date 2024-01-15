import { Component } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../models/reservation';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  selectedCurrency: string = 'PLN';
  reservations: Reservation[] = [];

  constructor(
    private currencyService: CurrencyService,
    private reservationService: ReservationService,
    ) {
    this.currencyService.getSelectedCurrency().subscribe((currency: string) => {
      this.selectedCurrency = currency;
    });

    this.reservationService.getReservations().subscribe((reservations: Reservation[]) => {
      this.reservations = reservations;
    });
  }

  onCurrencyChange(newCurrency: string) {
    this.currencyService.switchCurrency(newCurrency);
  }

  showUpcomingTripIcon(): boolean {
    return this.reservations.some(reservation => reservation.isTripUpcoming);
  }

  
}
