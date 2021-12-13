import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IDashboardTile } from 'src/app/intefaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  @Input()
  public dashboardTiles: IDashboardTile[] | null = null;

  constructor(private router: Router) {
  }

   public onTileClicked(path:string | undefined): void{
     if(path){
      this.router.navigate([path]);
     }
   }

}
