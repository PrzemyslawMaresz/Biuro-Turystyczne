import { Component, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';
import { Trip } from '../../models/trip';
import { CurrencyService } from '../../services/currency.service';
import { min } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {

  @Input() minPrice = 0;
  @Input() maxPrice = 0;
  @Input() trips: Trip[] = [];
  rates: number[] = [1,2,3,4,5];
  countries = new Array();
  markedCountries: string[] = [];
  markedRates: number[] = [];
  markedMaxPrice: number = 0;
  markedMinPrice: number = 0;
  markedRate = 1;
  markedBeginDate = new Date();
  markedEndDate = new Date(2025, 1, 1);
  todayDate = new Date();
  @Output() newRate = new EventEmitter<number[]>();
  @Output() newCountries = new EventEmitter<string[]>();
  @Output() newMaxPrice = new EventEmitter<number>();
  @Output() newMinPrice = new EventEmitter<number>();
  @Output() newBeginDate = new EventEmitter<Date>();
  @Output() newEndDate = new EventEmitter<Date>();
  selectedCurrency: string = 'PLN';

  constructor(
    private currencyService: CurrencyService
  ) { }

  ngOnInit(): void {

    this.currencyService.getSelectedCurrency().subscribe((currency: string) => {
      this.selectedCurrency = currency;
    });

    for (let trip of this.trips){
      if (!this.countries.includes(trip.country)){
        this.countries.push(trip.country);
      }
    }
    
  }

  ngOnChanges(changes: SimpleChanges): void{
    if(this.markedMaxPrice > this.maxPrice || this.markedMaxPrice == 0){
      this.markedMaxPrice = this.maxPrice;
    }
    if(this.markedMinPrice < this.minPrice){
      this.markedMinPrice = this.minPrice;
    }

    for (let tour of this.trips){
      if (!this.countries.includes(tour.country)){
        this.countries.push(tour.country);
      }
    }
    this.newCountries.emit(this.countries);
  }


  changedCountries(event: any): void{
    if (event.target.checked){
      this.markedCountries.push(event.target.name);
    }else{
      this.removeDestination(event.target.name);
    }
    this.newCountries.emit(this.markedCountries);
  }

  changedMinPrice(event: any): void{
    this.markedMinPrice = parseInt(event.target.value, 10);
    this.newMinPrice.emit(this.markedMinPrice);

    if (this.markedMaxPrice < this.markedMinPrice){
      this.markedMaxPrice = this.markedMinPrice;
      this.newMaxPrice.emit(this.markedMaxPrice);
    }
  }

  changedMaxPrice(event: any): void{
    this.markedMaxPrice = parseInt(event.target.value, 10);
    this.newMaxPrice.emit(this.markedMaxPrice);
  }

  changedRate(event: any): void{
    if (event.target.checked){
      this.markedRates.push(parseInt(event.target.name));
    }else{
      this.removeRate(parseInt(event.target.name));
    }
    this.newRate.emit(this.markedRates);
  }

  changedBeginDate(event: any): void{
    console.log(event.target.value);
    this.markedBeginDate = event.target.value;
    this.newBeginDate.emit(this.markedBeginDate);
  }

  changedEndDate(event: any): void{
    this.markedEndDate = event.target.value;
    this.newEndDate.emit(this.markedEndDate);
  }


  removeDestination(destination: string): void{
    for (let i = 0; i < this.markedCountries.length; i++){
      if (this.markedCountries[i] === destination){
        this.markedCountries.splice(i, 1);
      }
    }
  }

  removeRate(rate: number): void{
    for (let i = 0; i < this.markedRates.length; i++){
      if (this.markedRates[i] === rate){
        this.markedRates.splice(i, 1);
      }
    }
  }


  arrayFromNumber(number: number): number[] {
    return Array.from(Array(number).keys());
  }

}
