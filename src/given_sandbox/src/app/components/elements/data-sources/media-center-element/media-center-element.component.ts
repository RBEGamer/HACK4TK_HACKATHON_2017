import {Component} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";

@Component({
  moduleId: module.id,
  selector: 'media-center-element',
  templateUrl: 'media-center-element.component.html',
  styleUrls: ['media-center-element.component.css']
})
export class MediaCenterElementComponent extends DynamicComponentAbstract {
}
