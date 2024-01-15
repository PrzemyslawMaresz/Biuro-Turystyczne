import { Component } from '@angular/core';
import { Trip } from './../../models/trip';
import { TripsService } from '../../services/trips.service';
import { CurrencyService } from '../../services/currency.service';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../models/reservation';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  constructor(
    private tripsService: TripsService,
    private currencyService: CurrencyService,
    private reservationService: ReservationService,
    private router: Router,
  ) { }

  trips: Trip[] = [];
  selectedCurrency: string = 'PLN';

  ngOnInit() {
    this.tripsService.getTrips().subscribe((trips: Trip[]) => {
      this.trips = trips;
      this.calculateTotalCost();
    });

    this.currencyService.getSelectedCurrency().subscribe((currency: string) => {
      this.selectedCurrency = currency;
    });
  }

  reserveTrip(trip: Trip) {
    this.tripsService.reserveTrip(trip);
  }

  cancelReservation(trip: Trip) {
    this.tripsService.cancelReservation(trip);
  }

  changeCheckbox() {
    this.tripsService.updateTripsList(this.trips);
  }

  calculateTotalCost(): number {
    let totalCost = 0;
    this.trips.forEach(trip => {
      if (trip.isChecked) {
        totalCost += trip.price * trip.selectedSpots;
      }
    });
    return totalCost;
  }

  purchase() {
    this.trips.forEach(trip => {
      if (trip.isChecked && trip.selectedSpots > 0) {
        this.addReservation(trip);
        trip.reservedSpots += trip.selectedSpots;
        trip.availableSpots = trip.maxSpots - trip.reservedSpots;
        trip.selectedSpots = 0;
        this.tripsService.updateTrip(trip.id, { reservedSpots: trip.reservedSpots });
      }
    });

    this.tripsService.updateTripsList(this.trips);
    this.router.navigate(['/purchase-history']);
  }

  isCartEmpty(): boolean {
    return this.trips.every(trip => trip.selectedSpots === 0);
  }

  isAnyTripSelected(): boolean {
    return this.trips.some(trip => trip.isChecked && trip.selectedSpots > 0);
  }

  addReservation(trip: Trip){
    const reservation: Reservation = {
      tripId: trip.id,
      tripName: trip.name,
      numberOfTickets: trip.selectedSpots,
      dateOfReservation: new Date().toISOString().slice(0, 10),
      totalPrice: trip.price * trip.selectedSpots,
      startDate: trip.startDate,
      endDate: trip.endDate,
      country: trip.country
    };
    this.reservationService.addReservation(reservation);
  }


}
