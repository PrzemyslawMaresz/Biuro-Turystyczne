import { CurrencyService } from './../../services/currency.service';
import { ReservationService } from './../../services/reservation.service';
import { Component } from '@angular/core';
import { Reservation } from '../../models/reservation';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrl: './purchase-history.component.css'
})
export class PurchaseHistoryComponent {

  reservations: Reservation[] = [];
  selectedCurrency: string = 'PLN';
  selectedStatus: string = "all";

  constructor(
    private reservationService: ReservationService,
    private currencyService: CurrencyService,
  ) {}

  ngOnInit() {
    this.reservationService.getReservations().subscribe((reservations: Reservation[]) => {
      this.reservations = reservations;
    });

    this.currencyService.getSelectedCurrency().subscribe((currency: string) => {
      this.selectedCurrency = currency;
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
}
