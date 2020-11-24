/**
 * Just for User Experience
 * This is a pop-up,
 * It receives a string from the component
 * Displays a popup for 3 seconds.
 */
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor( private snackBar: MatSnackBar) { }

  openSnackBar(text): void {
    this.snackBar.open(text, 'Ok', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
