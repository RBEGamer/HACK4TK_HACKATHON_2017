import {Component, ViewEncapsulation} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";


@Component({
  selector: 'ucp-call-us',
  templateUrl: 'call-us.component.html',
  styleUrls: ['call-us.css'],
  encapsulation: ViewEncapsulation.None
})
export class CallUsComponent extends DynamicComponentAbstract {

  element: any;

  ngOnInit() {
    if (this.element.phoneNumber && this.element.link) {
      this.element.link.element.text = this.element.phoneNumber;
    }
  }
}
