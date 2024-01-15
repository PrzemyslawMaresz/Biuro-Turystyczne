import { Trip } from './../../models/trip';
import { Component } from '@angular/core';
import { TripsService } from '../../services/trips.service';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css'
})
export class TripsComponent {

  constructor(
    private tripsService: TripsService,
    private currencyService: CurrencyService
  ) { }

  trips: Trip[] = [];
  selectedCurrency: string = 'PLN';
  lowestPrice: number = 0;
  highestPrice: number = 0;
  filterCountries: string[] = [];
  filterMaxPrice = -1;
  filterMinPrice = -1;
  filterRate: number[] = [];
  filterBeginDate = new Date();
  filterEndDate = new Date();
  defaultDate = new Date();



  ngOnInit() {
    this.tripsService.getTrips().subscribe((trips: Trip[]) => {
      this.trips = trips;
      this.findLowestPrice();
      this.findHighestPrice();
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

  deleteTrip(trip: Trip) {
    this.tripsService.deleteTrip(trip.id);
  }


  findLowestPrice() {
    if (this.trips.length === 0) {
      return;
    }
    this.lowestPrice =  Math.min(...this.trips.map(trip => trip.price));
  }

  findHighestPrice() {
    if (this.trips.length === 0) {
      return;
    }
    this.highestPrice =  Math.max(...this.trips.map(trip => trip.price));
  }


  recievedCountries(event: any): void{
    this.filterCountries = event;
  }

  recievedRate(event: any): void{
    this.filterRate = event;
  }

  recievedMaxPrice(event: any): void{
    this.filterMaxPrice = event;
  }

  recievedMinPrice(event: any): void{
    this.filterMinPrice = event;
  }

  recievedBeginDate(event: any): void{
    this.filterBeginDate = new Date(event);
  }

  recievedEndDate(event: any): void{
    this.filterEndDate = new Date(event);
  }

  filterTrip(trip: Trip): boolean{
    const startDate = new Date(trip.startDate);
    const endDate = new Date(trip.endDate);
    
    if (this.filterCountries.length !== 0 && !this.filterCountries.includes(trip.country)){
      return false;
    }
    if (this.filterMaxPrice !== -1 && trip.price > this.filterMaxPrice){
      return false;
    }
    if (this.filterMinPrice !== -1 && trip.price < this.filterMinPrice){
      return false;
    }
    if (this.filterRate.length !== 0 && !this.filterRate.includes(Math.round(trip.rate))){
      return false;
    }
    if (this.filterBeginDate.getTime() !== this.defaultDate.getTime() && this.filterBeginDate.getTime() > startDate.getTime()){
      return false;
    }
    if (this.filterEndDate.getTime() !== this.defaultDate.getTime() && this.filterEndDate.getTime() < endDate.getTime()){
      return false;
    }
    return true;
  }

  filteredTripsList(): Trip[]{
    return this.trips.filter(trip => this.filterTrip(trip));
  }

}
