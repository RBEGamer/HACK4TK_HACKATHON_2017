import {Component, ElementRef} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'product-element',
  templateUrl: 'product-element.component.html',
  styleUrls: ['product-element.component.css']
})
export class ProductElementComponent extends DynamicComponentAbstract {
  ref: ElementRef;

  constructor(ref: ElementRef) {
    super();
    this.ref = ref;
  }

  triggerLink() {
    let ahref = this.ref.nativeElement.getElementsByTagName('a'),
      event = new MouseEvent('click', {bubbles: true});

    if (ahref[0]) {
      ahref[0].dispatchEvent(event);
    }
  }
}
