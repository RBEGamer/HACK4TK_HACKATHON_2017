import {Component, ViewEncapsulation} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'press-news-teaser',
  templateUrl: 'press-news-teaser.component.html',
  styleUrls: ['press-news-teaser.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PressNewsTeaserComponent extends DynamicComponentAbstract{

}
