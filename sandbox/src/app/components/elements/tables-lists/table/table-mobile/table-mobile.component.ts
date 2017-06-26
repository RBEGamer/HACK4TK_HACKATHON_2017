import {Component, Input} from "@angular/core";

@Component({
  selector: 'ucp-table-mobile',
  templateUrl: 'table-mobile.component.html',
  styleUrls: ['table-mobile.component.css'],
})

export class TableMobileComponent {
  @Input()
  element: any;

  @Input()
  headline: string;

}
