import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'length',
  pure: true
})

/**
 * I couldn't find the pipe that formats length units so I wrote my own.
 * As per assessment requrement, values should be easy to read by users.
 */
export class LengthPipe implements PipeTransform {

  symbol: string;

  transform(value: any, ...args: any): unknown {

    const unit = args[0];

    switch (unit) {
      case 'inch': {
        this.symbol = 'in';
        break;
      }
      case 'millimetre': {
        this.symbol = 'mm';
        break;
      }
      case 'centimetre': {
        this.symbol = 'cm';
        break;
      }
      case 'foot': {
        this.symbol = 'ft';
        break;
      }
      case 'yard': {
        this.symbol = 'yd';
        break;
      }
      case 'metre': {
        this.symbol = 'm';
        break;
      }
      case 'kilometre': {
        this.symbol = 'km';
        break;
      }
      case 'mile': {
        this.symbol = 'mi';
        break;
      }
      case 'lightyear': {
        this.symbol = 'ly';
        break;
      }
      default: {
        this.symbol = unit;
        break;
      }
   }

    if (value > 999) {
      const v = (value / 1000).toFixed(1);
      value = v;
      return value + 'K(' + this.symbol + ')';
    } else {
      return value + '(' + this.symbol + ')';
    }

  }

}
