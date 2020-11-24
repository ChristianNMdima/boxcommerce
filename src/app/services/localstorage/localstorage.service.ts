import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/**
 * For History as per assessment spec
 * I am using the browser's local storage to save all the calculations perfomed.
 * 2 objects are created, Currency and Length.
 * This service is called by components on button click ("Convert button").
 * A component name is passed as a string to tell the service which component is storing data
 */

export class LocalstorageService {

  history: any = [];
  saveData: any = {};

  constructor() { }

  // tslint:disable-next-line: typedef
  save(fromValue: any, fromSymbol: any, toSymbol: any, result: any, storageKey: any){

    this.saveData.from = fromValue;
    this.saveData.fromSymbol = fromSymbol;
    this.saveData.toSymbol = toSymbol;
    this.saveData.result = result;
    this.saveData.date = new Date();

    // Set object to save on Local Storage:
    if (window.localStorage) {
      if (localStorage.getItem(storageKey) === null) {
        this.history.push(this.saveData);
        localStorage.setItem(storageKey, JSON.stringify(this.history));
      } else {
        const stored = JSON.parse(localStorage.getItem(storageKey));
        stored.push(this.saveData);
        localStorage.setItem(storageKey, JSON.stringify(stored));

      }

    } else {
      console.log('Local storage not supported!');
    }
  }

  // tslint:disable-next-line: typedef
  getHistory(storageKey: string) {
    return JSON.parse(localStorage.getItem(storageKey));
  }

}
