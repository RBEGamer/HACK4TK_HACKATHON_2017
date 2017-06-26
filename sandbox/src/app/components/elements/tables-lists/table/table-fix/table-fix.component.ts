import {Component, Input} from "@angular/core";

@Component({
  selector: 'ucp-table-fix',
  templateUrl: 'table-fix.component.html',
  styleUrls: ['table-fix.component.css'],
})

export class TableFixComponent {
  @Input()
  element: any;

}
