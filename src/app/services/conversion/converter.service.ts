import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/**
 * THE LOGIC IS HERE
 * This is the heart of a project,
 * Both Currency and Length conversions are done here,
 * It was simpler to call this service on "keyup" event, but because of the "Save history" requirement I had to use "onclick" event.
 */

export class ConverterService {

  constructor() { }
  // tslint:disable-next-line: typedef
  converter(value: number, rateA: number, rateB: number, primaryValue: string) {

    let result = 0;

    // Checking if there is any value to convert (currency or unit).
    if (value !== undefined) {

      /**
       * If "from" currency/unit is the same with "to" currency/unit...
       * then there is no need to go through all the logic.
       */
      if (rateA === rateB) {

        return value;

      } else {

      /**
       * Primary value is a value we are converting from.
       * This value changes from 'A' to 'B'.
       * A = The 1st inputbox (above),
       * B = The 2nd inputbox (below),
       * Returning results rounded to (2).
       * The currency pipe will do the rest on the template.
       */

        if (primaryValue === 'A') {

          if (rateA === 0){
            result = value * rateB;
          } else if (rateB === 0) {
            result = value / rateA;
          } else {
            result = (value / rateA) * rateB;
          }

        } else {

          if (rateB === 0){
            result = value * rateA;
          } else if (rateA === 0) {
            result = value / rateB;
          } else {
            result = (value / rateB) * rateA;
          }
        }

        return result.toFixed(2);

      }

    } else {
      // There is no value to convert
      return 0;

    }
  }

}
