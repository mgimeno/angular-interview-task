import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/constants';
import { IDashboardTile } from 'src/app/intefaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnChanges {

  @Input()
  public cinemasCount: number | null = null;
  @Input()
  public screensCount: number | null = null;
  @Input()
  public moviesCount: number | null = null;
  @Input()
  public bookingsCount: number | null = null;

  public tiles: IDashboardTile[]= AppConstants.initialDashboardTilesInfo;

  constructor(private router: Router) {
  }

   public ngOnChanges(changes:SimpleChanges): void{
console.error(changes);
     for(let changeKey of Object.keys(changes)){
       const tile = this.tiles.find(tile => tile.id === changeKey)
       if(tile){
        tile.count = changes[changeKey].currentValue;
       }
     }
    
   }

   public onTileClicked(path:string | undefined): void{
     if(path){
      this.router.navigate([path]);
     }
     
   }
}
