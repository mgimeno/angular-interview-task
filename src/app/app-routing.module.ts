import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingsContainerComponent, CinemasContainerComponent, DashboardContainerComponent, MoviesContainerComponent, TaskRequirementsComponent } from './components';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: DashboardContainerComponent, pathMatch: 'full' },
  { path: 'dashboard', redirectTo: '', pathMatch: 'full' },
  {
    path: 'cinemas',
    children: [
      {path: '', component: CinemasContainerComponent},
      {path: ':id', component: CinemasContainerComponent}
    ]
  },
  {
    path: 'movies',
    children: [
      {path: '', component: MoviesContainerComponent},
      {path: ':id', component: MoviesContainerComponent}
    ]
  },
  {
    path: 'bookings',
    children: [
      {path: '', component: BookingsContainerComponent},
      {path: ':id', component: BookingsContainerComponent}
    ]
  },
  { path: 'task-requirements', component: TaskRequirementsComponent, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
