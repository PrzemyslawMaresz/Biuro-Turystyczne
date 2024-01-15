import { Component } from '@angular/core';
import { TripsService } from '../../services/trips.service';
import { CurrencyService } from '../../services/currency.service';
import { Trip } from '../../models/trip';

@Component({
  selector: 'app-reservation-summary',
  templateUrl: './reservation-summary.component.html',
  styleUrl: './reservation-summary.component.css'
})
export class ReservationSummaryComponent {

  totalSelectedTrips: number = 0;
  totalPrice: number = 0;
  selecedCurrency: string = 'PLN';

  constructor(
    private tripService: TripsService,
    private currencyService: CurrencyService
    ) { }

  ngOnInit() {
    this.tripService.getTrips().subscribe(
      (trips) => this.calculateSummary(trips)
    );

    this.currencyService.getSelectedCurrency().subscribe(
      (currency) => this.selecedCurrency = currency
    );
  }

  private calculateSummary(trips: Trip[]){
    const selectedTrips = trips.filter(trip => trip.isChecked === true);
    this.totalSelectedTrips = selectedTrips.reduce((total, trip) => total + trip.selectedSpots, 0);
    this.totalPrice = selectedTrips.reduce((total, trip) =>total + trip.selectedSpots * trip.price, 0);
  }
}
