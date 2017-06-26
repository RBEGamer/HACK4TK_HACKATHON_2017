import {Component, Input} from "@angular/core";

@Component({
  selector: 'ucp-cell-hideable',
  templateUrl: 'cell-hideable.component.html',
})

export class CellHideableComponent {
  @Input()
  element: any;

  isThatObject(content: any): boolean {
    return content instanceof Object;
  }
}
