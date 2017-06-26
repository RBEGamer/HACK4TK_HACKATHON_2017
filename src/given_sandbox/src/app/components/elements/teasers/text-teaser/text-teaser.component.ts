import {Component, ViewEncapsulation} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'ucp-text-teaser',
  templateUrl: 'text-teaser.component.html',
  styleUrls: ['text-teaser.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TextTeaserComponent extends DynamicComponentAbstract {
  linkClass() {
    let linkClass = '';

    switch(this.element.linkClass) {
      case 'button-blue':
        linkClass = 'text-teaser__button';
        break;
      case '':
        linkClass = 'more';
        break;
      default:
        linkClass = this.element.linkClass;
        break;
    }

    return linkClass;
  }
}
