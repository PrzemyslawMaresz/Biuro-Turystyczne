import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyConventer'
})
export class CurrencyConventerPipe implements PipeTransform {

  transform(price: number, selectedCurrency: string): string {
    switch (selectedCurrency) {
      case 'USD':
        return (price * 0.25) + ' $';
      case 'EUR':
        return (price * 0.23) + ' €';
      default:
        return price + ' zł';
    }
  }

}
