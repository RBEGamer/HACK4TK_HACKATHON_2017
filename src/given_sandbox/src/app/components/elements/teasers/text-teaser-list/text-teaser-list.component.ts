import {Component, ViewEncapsulation} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'ucp-text-teaser-list',
  templateUrl: 'text-teaser-list.component.html',
  styleUrls: ['text-teaser-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TextTeaserListComponent extends DynamicComponentAbstract {
}
