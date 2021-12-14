import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AppConstants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  showSuccess(text: string): void{

    let config: MatSnackBarConfig = <MatSnackBarConfig>{
      duration: AppConstants.NOTIFICATION_DURATION_MILLISECONDS,
      panelClass: "success"
    };

    this.snackBar.open(text, undefined,config);
  }

  showError(text?:string): void{
    let config: MatSnackBarConfig = <MatSnackBarConfig>{
      duration: AppConstants.NOTIFICATION_ERROR_DURATION_MILLISECONDS,
      panelClass: "error"
    };

    let errorMessage = (text || "An error has ocurred");

    this.snackBar.open(errorMessage, undefined ,config);
  }

  showWarning(text:string): void{
    let config: MatSnackBarConfig = <MatSnackBarConfig>{
      duration: AppConstants.NOTIFICATION_DURATION_MILLISECONDS,
      panelClass: "warning"
    };

    this.snackBar.open(text, undefined,config);
  }

  showInfo(text:string): void{
    let config: MatSnackBarConfig = <MatSnackBarConfig>{
      duration: AppConstants.NOTIFICATION_DURATION_MILLISECONDS,
      panelClass: "info"
    };

    this.snackBar.open(text, undefined,config);
  }
}
