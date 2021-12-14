import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, HostListener } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AppConstants } from './constants/app.constant';
import { CommonUtils } from './utils/common-utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  window = window;
  windowSizeChangeTimeout: any = null;
  isLargeScreen: boolean = CommonUtils.isLargeScreen();
  currentUrl = '/';
  @HostBinding('class') className = '';

  constructor(
    private router: Router,
    private meta: Meta,
    private title: Title,
    private overlayContainer: OverlayContainer
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = this.router.routerState.snapshot.url;
      }
    });

    this.className = localStorage.getItem(
      `${environment.localStoragePrefix}dark-mode`
    ) || '';

    this.addTitleAndMetaTags();
  }

  doesUrlStartWith(url: string): boolean {
    return this.currentUrl.startsWith(url);
  }

  toggleDarkMode(): void{
    const darkMode = 'dark-mode';
    this.className = (this.className === darkMode ? '' : darkMode);
    localStorage.setItem(
      `${environment.localStoragePrefix}${darkMode}`, this.className
    );
    if (this.className === darkMode) {
      this.overlayContainer.getContainerElement().classList.add(darkMode);
    } else {
      this.overlayContainer.getContainerElement().classList.remove(darkMode);
    }
  }

  @HostListener('window:resize', ['$event'])
  windowSizeChange() {
    if (this.windowSizeChangeTimeout) {
      clearTimeout(this.windowSizeChangeTimeout);
    }

    this.windowSizeChangeTimeout = setTimeout(() => {
      this.isLargeScreen = CommonUtils.isLargeScreen();
    }, 100);
  }

  private addTitleAndMetaTags(): void {
    this.title.setTitle($localize`:@@index.title:Ultraplex Frontend - Cinema Management Tool`);
    this.meta.updateTag(<MetaDefinition>{
      name: 'description',
      content: $localize`:@@index.meta_description:Cinema Management Tool for a technical task`,
    });
    this.meta.updateTag(<MetaDefinition>{
      property: 'og:title',
      content: $localize`:@@index.title:Ultraplex Frontend - Cinema Management Tool`,
    });
    this.meta.updateTag(<MetaDefinition>{
      property: 'og:description',
      content: $localize`:@@index.meta_og_description:Cinema Management Tool for a technical task`,
    });

    const languageCode = localStorage.getItem(
      `${environment.localStoragePrefix}language`
    );

    let localeContent: string;
    switch (languageCode) {
      case 'es':
        localeContent = AppConstants.AVAILABLE_LANGUAGE_CODES.spanish;

        break;
      case 'de':
        localeContent = AppConstants.AVAILABLE_LANGUAGE_CODES.german;

        break;
      case 'en':
      default:
        localeContent = AppConstants.AVAILABLE_LANGUAGE_CODES.english;
        break;
    }

    this.meta.updateTag(<MetaDefinition>{
      property: 'og:locale',
      content: localeContent,
    });
  }
}
