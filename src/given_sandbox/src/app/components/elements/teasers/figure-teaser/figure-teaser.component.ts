import {Component, ViewEncapsulation} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'figure-teaser',
  templateUrl: 'figure-teaser.component.html',
  styleUrls: ['figure-teaser.css'],
  encapsulation: ViewEncapsulation.None
})
export class FigureTeaserComponent extends DynamicComponentAbstract {
}
