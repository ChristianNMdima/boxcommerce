import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * Calling Endpoints
 * Currency uses external api call,
 * Length uses json, units can be added or removed from the list
 */
export class HttpService {

  readonly ROOT_URL = 'https://api.ratesapi.io/api/latest';
  readonly UNIT_URL = '/assets/units.json';
  public networkStatus: any = navigator.onLine;

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(this.ROOT_URL);
  }

  getUnits(): Observable<any> {
    return this.http.get(this.UNIT_URL);
  }

  // If we can't reach the api, or somehow service workers fail to cache the api results
  // tslint:disable-next-line: typedef
  offlineCurrencies() {
    return {
         "GBP":0.89393,
         "HKD":9.1972,
         "IDR":16840.24,
         "ILS":3.9608,
         "DKK":7.4489,
         "INR":87.941,
         "CHF":1.0811,
         "MXN":23.8656,
         "CZK":26.34,
         "SGD":1.5934,
         "THB":35.922,
         "HRK":7.5665,
         "MYR":4.8549,
         "NOK":10.6613,
         "CNY":7.7916,
         "BGN":1.9558,
         "PHP":57.206,
         "SEK":10.2168,
         "PLN":4.4639,
         "ZAR":18.2192,
         "CAD":1.5484,
         "ISK":161.3,
         "BRL":6.3347,
         "RON":4.8735,
         "NZD":1.7086,
         "TRY":9.047,
         "JPY":123.18,
         "RUB":90.2622,
         "KRW":1323.26,
         "USD":1.1863,
         "HUF":359.5,
         "AUD":1.6227
    };
  }

}
