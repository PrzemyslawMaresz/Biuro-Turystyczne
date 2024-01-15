import { Trip, defaultTrip } from './../../models/trip';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripsService } from '../../services/trips.service';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrl: './trip-details.component.css'
})
export class TripDetailsComponent {

  trip: Trip = defaultTrip;
  selectedCurrency: string = 'PLN';
  selectedRating: number = 0;
  displayedRating: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripsService: TripsService,
    private currencyService: CurrencyService
  ){}

  ngOnInit() {
    const tripId = this.route.snapshot.paramMap.get('id');
    this.tripsService.getTrips().subscribe((trips: Trip[]) => {
      const foundTrip = trips.find(trip => trip.id === tripId);
      if (foundTrip) {
        this.trip = foundTrip;
      } else {
        alert(`Wycieczka o ID ${tripId} nie została znaleziona.`)
        this.router.navigate(['/trips']);
      }
      if (this.selectedRating === 0){
        this.displayedRating = this.trip.rate;
      } else {
        this.displayedRating = this.selectedRating;
      }
      
    });

    this.currencyService.getSelectedCurrency().subscribe((currency: string) => {
      this.selectedCurrency = currency;
    });
  }

  rateTrip(rating: number) {
    this.selectedRating = rating;
    this.displayedRating = rating;
    const newRate = (this.trip.rate * this.trip.numberOfRates + rating) / (this.trip.numberOfRates + 1);
    this.trip.rate = Math.round(newRate * 100) / 100;
    this.trip.numberOfRates++;
    this.tripsService.updateTrip(this.trip.id, {
      rate: this.trip.rate,
      numberOfRates: this.trip.numberOfRates,
    });
  }


}
