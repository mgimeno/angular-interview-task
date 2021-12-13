/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes recent versions of Safari, Chrome (including
 * Opera), Edge on the desktop, and iOS and Chrome on mobile.
 *
 * Learn more in https://angular.io/guide/browser-support
 */

/***************************************************************************************************
 * BROWSER POLYFILLS
 */

/**
 * By default, zone.js will patch all possible macroTask and DomEvents
 * user can disable parts of macroTask/DomEvents patch by setting following flags
 * because those flags need to be set before `zone.js` being loaded, and webpack
 * will put import in the top of bundle, so user need to create a separate file
 * in this directory (for example: zone-flags.ts), and put the following flags
 * into that file, and then add the following code before importing zone.js.
 * import './zone-flags';
 *
 * The flags allowed in zone-flags.ts are listed here.
 *
 * The following flags will work for all browsers.
 *
 * (window as any).__Zone_disable_requestAnimationFrame = true; // disable patch requestAnimationFrame
 * (window as any).__Zone_disable_on_property = true; // disable patch onProperty such as onclick
 * (window as any).__zone_symbol__UNPATCHED_EVENTS = ['scroll', 'mousemove']; // disable patch specified eventNames
 *
 *  in IE/Edge developer tools, the addEventListener will also be wrapped by zone.js
 *  with the following flag, it will bypass `zone.js` patch for IE/Edge
 *
 *  (window as any).__Zone_enable_cross_context_check = true;
 *
 */

/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
import 'zone.js'; // Included with Angular CLI.

/***************************************************************************************************
 * APPLICATION IMPORTS
 */

/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import '@angular/localize/init';
import { loadTranslations } from '@angular/localize';
import { environment } from './environments/environment';

let language: string = 'en';
const localStorageKey: string = `${environment.localStoragePrefix}language`;

if (localStorage.getItem(localStorageKey)) {
  language = localStorage.getItem(localStorageKey)!;
} else {
  language = navigator.language.substring(0, 2);
}

language = language.toLowerCase();

localStorage.setItem(localStorageKey, language);

switch (language) {
  case 'es':
    loadTranslations({
      'index.title': 'Ultraplex Frontend: Herramienta de gestión de cine',
      'index.meta_description':
        'Herramienta de gestión de cine para una tarea técnica',
      'index.meta_og_description':
        'Herramienta de gestión de cine para una tarea técnica',

      'menu.title-part-1': 'Ultraplex Frontend',
      'menu.title-part-2': ' - Herramienta de gestión de cine',
      'menu.dashboard': 'Inicio',
      'menu.cinemas': 'Cines',
      'menu.movies': 'Peliculas',
      'menu.bookings': 'Reservas',
      'menu.add-booking': 'Añadir reserva',
      'menu.requirements': 'Requisitos',
      'menu.language': 'Idioma',
      'menu.screens': 'Pantallas',

      'select-language.select': 'Selecciona un idioma',

      'page-not-found.title': '404 - Página no encontrada',
      'page-not-found.back': 'Atrás',
    });
    break;
  case 'de': {
    loadTranslations({
      'index.title': 'Ultraplex Frontend: Kino Verwaltungstool',
      'index.meta_description':
        'Kino Verwaltungstool für eine technische Aufgabe',
      'index.meta_og_description':
        'Kino Verwaltungstool für eine technische Aufgabe',

      'menu.title-part-1': 'Ultraplex Frontend',
      'menu.title-part-2': ' - Kino Verwaltungstool',
      'menu.dashboard': 'Armaturenbrett',
      'menu.cinemas': 'Kinos',
      'menu.movies': 'Filme',
      'menu.bookings': 'Reservierung',
      'menu.add-booking': 'Buchung hinzufügen',
      'menu.requirements': 'Bedarf',
      'menu.language': 'Sprache',
      'menu.screens': 'Bildschirme',

      'select-language.select': 'Wähle eine Sprache',

      'page-not-found.title': '404 - Seite nicht gefunden',
      'page-not-found.back': 'Geh zurück',
    });
    break;
  }
}
