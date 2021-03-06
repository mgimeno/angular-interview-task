import { Component, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {

  @Input()
  public selectedPage: number | undefined = 0;
  @Input()
  public totalPages: number | undefined = 0;
  @Input()
  public numberOfElementsShowing: number | undefined = 0;
  @Input()
  public pageSize: number | undefined = 0;
  @Input()
  public totalElements: number | undefined = 0;

  @Output()
  public pageSelected: EventEmitter<number> = new EventEmitter();

  public showingItemsFirst: number = 0;
  public showingItemsLast: number = 0;

  constructor() {}

  public ngOnInit(): void{
    this.showingItemsFirst = 1 + ((this.selectedPage! -1 )* this.pageSize!);
    this.showingItemsLast =  ((this.selectedPage! - 1) * this.pageSize!) + this.numberOfElementsShowing!;
  }

  public onPageSelected(pageNumber: number): void{
    if(pageNumber !== this.selectedPage){
      this.pageSelected.emit(pageNumber);
    }
  }
}
