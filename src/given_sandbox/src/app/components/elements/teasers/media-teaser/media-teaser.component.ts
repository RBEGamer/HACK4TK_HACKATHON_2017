import {Component, ViewEncapsulation} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'ucp-media-teaser',
  templateUrl: 'media-teaser.component.html',
  styleUrls: ['media-teaser.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MediaTeaserComponent extends DynamicComponentAbstract {
}
