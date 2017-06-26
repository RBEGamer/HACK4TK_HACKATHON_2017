import {Component} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'text-video',
  templateUrl: 'text-video.component.html',
  styleUrls: ['text-video.css']
})
export class TextVideoComponent extends DynamicComponentAbstract {
}
