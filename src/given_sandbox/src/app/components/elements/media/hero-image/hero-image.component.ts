import {Component} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'hero-image',
  templateUrl: 'hero-image.component.html',

  styleUrls: ['hero-image.css']
})
export class HeroImageComponent extends DynamicComponentAbstract {

  element: any;

  getAlignment() {
    return (this.element.align == 'top')
      ? 'align-top'
      : 'align-bottom';
  }
}
