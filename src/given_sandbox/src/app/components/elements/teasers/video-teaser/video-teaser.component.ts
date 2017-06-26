import {Component} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";

@Component({
  moduleId: module.id,
  selector: 'video-teaser',
  templateUrl: 'video-teaser.component.html'
})
export class VideoTeaserComponent extends DynamicComponentAbstract {
}
