import { Injectable } from '@angular/core';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';

@Injectable({
  providedIn: 'root'
})

/**
 * STATISTICS: User can see the trend of their conversion history
 * Just as a bonus, showing the trend over time
 * In reality this service would be generic
 */
export class StatsService {

  constructor(private localstorageService: LocalstorageService) { }

  // tslint:disable-next-line: typedef
  getStats(h: string) {

    if (h === 'currency'){
      let zar = 0;
      let usd = 0;
      let eur = 0;
      let gbp = 0;
      let total = 0;
      let obj = {};
      const history = this.localstorageService.getHistory(h);

      Object.keys(history).forEach(key => {
        const f = history[key].fromSymbol;
        const t = history[key].toSymbol;

        if (f === 'ZAR' || t === 'ZAR'){
          zar = zar + 1;
        }
        if (f === 'USD' || t === 'USD'){
          usd = usd + 1;
        }
        if (f === 'EUR' || t === 'UAD'){
          eur = eur + 1;
        }
        if (f === 'GBP' || t === 'GBP'){
          gbp = gbp + 1;
        }
      });

      total = zar + usd + eur + gbp;
      return obj = {
        ZAR: ((zar / total) * 100).toFixed(1),
        USD: ((usd / total) * 100).toFixed(1),
        EUR: ((eur / total) * 100).toFixed(1),
        GBP: ((gbp / total) * 100).toFixed(1)
      };
    } else {
      let inc = 0;
      let cm = 0;
      let ft = 0;
      let m = 0;
      let total = 0;
      let obj = {};
      const history = this.localstorageService.getHistory(h);

      Object.keys(history).forEach(key => {
        const f = history[key].fromSymbol;
        const t = history[key].toSymbol;

        if (f === 'inch' || t === 'ZAR'){
          inc = inc + 1;
        }
        if (f === 'centimetre' || t === 'centimetre'){
          cm = cm + 1;
        }
        if (f === 'foot' || t === 'foot'){
          ft = ft + 1;
        }
        if (f === 'metre' || t === 'metre'){
          m = m + 1;
        }
      });
      total = inc + cm + ft + m;
      return obj = {
        IN: ((inc / total) * 100).toFixed(1),
        CM: ((cm / total) * 100).toFixed(1),
        FT: ((ft / total) * 100).toFixed(1),
        M: ((m / total) * 100).toFixed(1)
      };

    }

  }
}
