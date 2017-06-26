import {Component, ViewEncapsulation} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'text-image-teaser',
  templateUrl: 'text-image-teaser.component.html',
  styleUrls: ['text-image-teaser.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TextImageTeaserComponent extends DynamicComponentAbstract {

}
