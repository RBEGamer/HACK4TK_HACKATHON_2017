import {Component} from "@angular/core";
import {DynamicComponentAbstract} from "../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'link-anchor',
  templateUrl: 'link-anchor.component.html'
})
export class LinkAnchorComponent extends DynamicComponentAbstract {


  scrollTo() {
    if (!this.element.anchor) {
      return;
    }


    try {
      const element = document.querySelector("#" + this.element.anchor);

      if (element) {
        element.scrollIntoView(element)
      }
      else {
        console.log('Element #' + this.element.anchor + ' not found as anchor');
      }

    } catch (e) {
      console.log('Element #' + this.element.anchor + ' not found as anchor');
    }
  }

}
