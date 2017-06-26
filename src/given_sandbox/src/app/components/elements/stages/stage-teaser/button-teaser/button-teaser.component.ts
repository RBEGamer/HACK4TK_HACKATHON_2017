import {Component, ViewEncapsulation} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'button-teaser',
  templateUrl: 'button-teaser.component.html',
  styleUrls: ['button-teaser.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonTeaserComponent extends DynamicComponentAbstract{

}
