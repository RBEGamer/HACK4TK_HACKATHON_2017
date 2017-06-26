import {Component, Input} from "@angular/core";
import {TableService} from "../table.service";
import {Subscription}   from 'rxjs/Subscription';


@Component({
  selector: 'ucp-subtable',
  templateUrl: 'subtable.component.html',
})

export class SubtableComponent {

  @Input()
  element: any;

  highlightedLogicalRow: number = -1;

  subscriptionHighlightedSelectRow: Subscription;


  constructor(private tableService: TableService) {
  }

  ngOnInit() {
    this.subscriptionHighlightedSelectRow = this.tableService.logicalRowChanged$.subscribe(
      row => {
        this.highlightedLogicalRow = row;
      }
    );
  }

  ngOnDestroy() {
    this.subscriptionHighlightedSelectRow.unsubscribe();
  }


  onMouseEnterRow(logicalRowNumber) {
    this.tableService.changeLogicalRow(logicalRowNumber);
  }

  isThatObject(content: any): boolean {
    return content instanceof Object;
  }


}
