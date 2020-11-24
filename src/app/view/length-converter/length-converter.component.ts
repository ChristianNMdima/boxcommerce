import { Component, OnInit, ViewChild } from '@angular/core';
import { HandsetService } from '../../services/handset/handset.service';
import { HttpService } from '../../services/http/http.service';
import { ConverterService } from '../../services/conversion/converter.service';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';
import { MatSort } from '@angular/material/sort';
import { SwUpdate } from '@angular/service-worker';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { StatsService } from '../../services/statistics/stats.service';

@Component({
  selector: 'app-length-converter',
  templateUrl: './length-converter.component.html',
  styleUrls: ['./length-converter.component.css']
})

/*
  * value: number;  Value inserted by user from the input.
  * unitA: number;  Selected by user from the 1st dropdown of units.
  * unitB: number; Selected by user from the 1st dropdown of units.
  * lastUpdated: string; Date json updated.
  * results: number; Results.
**/

export class LengthConverterComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  valueA: number;
  valueB: number;
  value: number;
  unitA: any;
  unitB: any;
  primaryValue = 'A';
  resultSymbol: string;
  base: string;
  lastUpdated: string;
  results: any;
  handset = this.handsetService.isHandset$;
  units: any = [];
  loading: boolean;
  disableCalculate = true;
  symbolA: string;
  symbolB: string;
  displayMessage = 'Convert from/to any length';
  switched = false;
  history: any;
  displayedColumns: string[] = ['from', 'to', 'date'];
  update = false;
  selected: any;
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
    this.popup.openSnackBar('Length Converter');
    this.history = this.localstorageService.getHistory('length');
    this.httpService.getUnits().subscribe(data => {
      this.loading = false;
      this.units = data.units;
      this.lastUpdated = data.date;
      this.base = data.base;
    });
  }

  convert(): void {
    this.results = this.converterService.converter(this.value, this.unitB, this.unitA, this.primaryValue);
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
    if (this.unitA !== undefined && this.unitB !== undefined){
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
      this.localstorageService.save(valA, symA, symB, valB, 'length');
      this.history = this.localstorageService.getHistory('length');
      this.getStat();
    }
  }

  getStat(): void {
    if (localStorage.getItem('length') !== null) {
      this.statistics = this.stats.getStats('length');
    }
  }

}

