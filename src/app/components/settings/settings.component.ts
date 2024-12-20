import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AppConstants } from 'src/app/constants';
import { NotificationService } from 'src/app/services';
import { environment } from 'src/environments/environment';
import { SelectLanguageComponent } from '..';

@Component({
  templateUrl: './settings.component.html',
})
export class SettingsComponent {

  maxAPIPageSize = AppConstants.MAX_API_PAGE_SIZE;
  currentLanguageCode: string | null = localStorage.getItem(
    `${environment.localStoragePrefix}language`
  );
  formGroup: UntypedFormGroup = new UntypedFormGroup({
    'api-use-max-page-size': new UntypedFormControl(localStorage.getItem(
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
      this.notificationService.showSuccess("Setting updated successfully")
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
