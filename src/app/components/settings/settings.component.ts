import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AppConstants } from 'src/app/constants';
import { NotificationService } from 'src/app/services';
import { environment } from 'src/environments/environment';
import { SelectLanguageComponent } from '..';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {

  maxAPIPageSize = AppConstants.MAX_API_PAGE_SIZE;
  currentLanguageCode: string | null = localStorage.getItem(
    `${environment.localStoragePrefix}language`
  );
  formGroup: FormGroup = new FormGroup({
    'api-use-max-page-size': new FormControl(localStorage.getItem(
      `${environment.localStoragePrefix}api-use-max-page-size`,
    ) === "true")
  });;

  constructor(private bottomSheet: MatBottomSheet, private notificationService: NotificationService) {}

  ngOnInit(): void{
    this.formGroup.controls['api-use-max-page-size'].valueChanges.subscribe((maxPageSize) => {
      localStorage.setItem(
        `${environment.localStoragePrefix}api-use-max-page-size`,
        maxPageSize
      );
      this.notificationService.showSuccess("Setting updated successfuly")
    });
  }

  openSelectLanguage(): void {
    const bottomSheetRef = this.bottomSheet.open(SelectLanguageComponent);

    bottomSheetRef.afterDismissed().subscribe((newLanguageCode: string) => {
      if (newLanguageCode) {
        if (newLanguageCode !== this.currentLanguageCode) {
          localStorage.setItem(
            `${environment.localStoragePrefix}language`,
            newLanguageCode
          );
          window.location.reload();
        }
      }
    });
  }
}
