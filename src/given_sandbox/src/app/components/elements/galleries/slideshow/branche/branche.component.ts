import {Component, ViewChild, ViewEncapsulation} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'branche',
  templateUrl: 'branche.component.html'
})

export class BrancheComponent extends DynamicComponentAbstract {
  getPositionClass() {
    return this.element.position;
  }
}
