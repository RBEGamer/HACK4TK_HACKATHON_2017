import {Component, ViewEncapsulation} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'ucp-standard-text',
  templateUrl: 'standard-text.component.html',
  styleUrls: ['standard-text.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StandardTextComponent extends DynamicComponentAbstract {
  element: any;

  isDarkStyle() {
    return this.element.dark;
  }

}
