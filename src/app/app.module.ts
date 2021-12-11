import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectLanguageComponent } from './components/select-language/select-language.component';
import { FormsModule } from '@angular/forms';

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MoviesComponent } from './components/movies/movies.component';
import { CinemasComponent } from './components/cinemas/cinemas.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { AppEffects, appFeatureName, appReducers } from './state';
import { EffectsModule } from '@ngrx/effects';
import { BookingsComponent, BookingsContainerComponent, CinemasContainerComponent, DashboardContainerComponent, PaginatorComponent, TaskRequirementsComponent } from './components';
import { MoviesContainerComponent } from './components/movies-container/movies-container.component';
import { TimesPipe } from './pipes/times.pipe';
import { AddMovieDialogComponent } from './components/add-movie-dialog/add-movie-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashboardContainerComponent,
    PageNotFoundComponent,
    SelectLanguageComponent,
    LoaderComponent,
    MoviesComponent,
    CinemasComponent,
    TaskRequirementsComponent,
    MoviesContainerComponent,
    CinemasContainerComponent,
    PaginatorComponent,
    TimesPipe,
    BookingsComponent,
    BookingsContainerComponent,
    AddMovieDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatListModule,
    MatGridListModule,
    MatTableModule,
    StoreModule.forFeature(appFeatureName, appReducers),
    EffectsModule.forFeature([AppEffects]),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { minWidth: 250, hasBackdrop: true },
    },
  ],
  entryComponents: [SelectLanguageComponent, AddMovieDialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
