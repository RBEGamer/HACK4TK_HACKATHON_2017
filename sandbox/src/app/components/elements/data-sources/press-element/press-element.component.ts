import {Component, ViewEncapsulation} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";


@Component({
  selector: 'press-teaser',
  templateUrl: 'press-element.component.html',
  styleUrls: ['press-element.css'],
  encapsulation: ViewEncapsulation.None
})
export class PressElementComponent extends DynamicComponentAbstract {
}
