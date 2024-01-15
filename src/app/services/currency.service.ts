import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private selectedCurrency: BehaviorSubject<string> = new BehaviorSubject<string>('PLN');

  switchCurrency(currency: string) {
    this.selectedCurrency.next(currency);
  }

  getSelectedCurrency() {
    return this.selectedCurrency.asObservable();
  }
}
