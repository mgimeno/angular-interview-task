import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IDashboardTile } from 'src/app/intefaces';
import { AppActions, AppState, getDashboardTiles } from 'src/app/state';

@Component({
  templateUrl: './dashboard-container.component.html'
})
export class DashboardContainerComponent implements OnInit {

  public dashboardTiles$: Observable<IDashboardTile[]> | undefined;

  constructor(private store$: Store<AppState>) {
  }

  public ngOnInit(): void{
    this.dashboardTiles$ = this.store$.pipe(select(getDashboardTiles));
    this.refreshDashboard();
  }

  public refreshDashboard(): void{
    this.store$.dispatch(AppActions.fetchDashboardInfo());
  }

}
