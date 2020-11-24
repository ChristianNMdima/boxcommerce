import { Component, OnInit, ViewChild } from '@angular/core';
import { HandsetService } from '../../services/handset/handset.service';
import { HttpService } from '../../services/http/http.service';
import { ConverterService } from '../../services/conversion/converter.service';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';
import { SwUpdate } from '@angular/service-worker';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { StatsService } from '../../services/statistics/stats.service';

export interface Food {
  from: string;
  to: string;
  date: string;
}

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})

/*
  * value: number;  Value inserted by user from the input.
  * rateA: number;  Selected by user from the 1st dropdown of currencies.
  * rateB: number; Selected by user from the 1st dropdown of currencies.
  * lastUpdated: string; Date from the api.
  * results: number; Results.
**/
export class CurrencyConverterComponent implements OnInit {

  valueA: number;
  valueB: number;
  value: number;
  rateA: any;
  rateB: any;
  primaryValue = 'A';
  resultSymbol: string;
  base: string;
  lastUpdated: string;
  results: any;
  handset = this.handsetService.isHandset$;
  currencies: any = [];
  loading: boolean;
  disableCalculate = true;
  symbolA: string;
  symbolB: string;
  displayMessage = 'Convert from/to any currency';
  switched = false;
  history: any;
  displayedColumns: string[] = ['from', 'to', 'date'];
  update = false;
  statistics = {};

  // tslint:disable-next-line: max-line-length
  constructor(private handsetService: HandsetService, private httpService: HttpService, private converterService: ConverterService, private localstorageService: LocalstorageService, updates: SwUpdate, private popup: SnackbarService, private stats: StatsService) {
      updates.available.subscribe(event => {
        this.update = true;
      });
  }

  ngOnInit(): void {
    this.getStat();
    this.loading = true;
    this.popup.openSnackBar('Currency Converter');
    this.history = this.localstorageService.getHistory('currency');
    this.httpService.getData().subscribe(data => {
      this.loading = false;
      this.currencies = data.rates;
      this.lastUpdated = data.date;
      this.base = data.base;
    }, (error) => {
      console.log(error);
    });
  }

  convert(): void {
    this.results = this.converterService.converter(this.value, this.rateA, this.rateB, this.primaryValue);
    if (this.primaryValue === 'A'){
      this.valueB = this.results;
      this.resultSymbol = this.symbolB;
      this.displayMessage = `${this.value} ${this.symbolA} to ${this.symbolB} = ${this.results} ${this.symbolB}`;
      this.save(this.valueA, this.symbolA, this.symbolB, this.valueB);
    } else {
      this.valueA = this.results;
      this.resultSymbol = this.symbolA;
      this.displayMessage = `${this.value} ${this.symbolB} to ${this.symbolA} = ${this.results} ${this.symbolA}`;
      this.save(this.valueB, this.symbolB, this.symbolA, this.valueA);
    }

  }

  clear(): void {
    this.valueA = 0;
    this.valueB = 0;
    this.results = 0;
  }

  enableCalculate(): void {
    if (this.rateA !== undefined && this.rateB !== undefined){
      this.disableCalculate = false;
    } else {
      this.disableCalculate = true;
    }
  }

  setSymbolA(s: string): void {
    this.symbolA = s;
  }

  setSymbolB(s: string): void {
    this.symbolB = s;
  }

  setValue(v: number, primary: string): void {
    this.value = v;
    this.primaryValue = primary;
    (primary === 'A') ? this.valueB = 0 : this.valueA = 0;
  }

  save(valA: number, symA: string, symB: string, valB: number): void {
    if (this.results !== 0) {
      this.localstorageService.save(valA, symA, symB, valB, 'currency');
      this.history = this.localstorageService.getHistory('currency');
      this.getStat();
    }
  }

  getStat(): void {
    if (localStorage.getItem('currency') !== null) {
      this.statistics = this.stats.getStats('currency');
    }
  }

}

