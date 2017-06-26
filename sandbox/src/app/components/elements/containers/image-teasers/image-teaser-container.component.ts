import {Component} from "@angular/core";
import {ViewEncapsulation} from '@angular/core';
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'image-teaser-container',
  templateUrl: 'image-teaser-container.component.html',
  styleUrls: ['image-teaser-container.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ImageTeaserContainerComponent extends DynamicComponentAbstract {

  layoutClass() {
    let layoutClass = '';

    switch (this.element.layout) {
      case 3:
        layoutClass = "three-grid";
        break;
      case 4:
        layoutClass = "four-grid";
        break;
      default:
        break;
    }

    return layoutClass;
  }
}
