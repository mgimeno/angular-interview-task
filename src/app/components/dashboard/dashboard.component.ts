import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/constants';
import { IDashboardTile } from 'src/app/intefaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  @Input()
  public dashboardTiles: IDashboardTile[] | null = null;

  @Output()
  public refreshDashboard: EventEmitter<void> = new EventEmitter();

  public secondsToUpdate: number = AppConstants.REFRESH_DASHBOARD_SECONDS;
  private interval: any;

  constructor(private router: Router) {
    this.setDashboardRefreshTimer();
  }

   public onTileClicked(path:string | undefined): void{
     if(path){
      this.router.navigate([path]);
     }
   }

   private setDashboardRefreshTimer(): void{
    
    this.interval = setInterval(() => {
      this.secondsToUpdate--;
    
      if (this.secondsToUpdate === 0) {
        this.secondsToUpdate = AppConstants.REFRESH_DASHBOARD_SECONDS;
        this.refreshDashboard.emit();
      }
    }, 1000);
   }
   
   ngOnDestroy(): void{
     clearInterval(this.interval);
   }

}
