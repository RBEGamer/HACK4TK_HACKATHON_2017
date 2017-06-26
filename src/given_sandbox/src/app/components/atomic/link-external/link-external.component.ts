import {Component, OnInit} from "@angular/core";
import {DynamicComponentAbstract} from "../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'external-link',
  templateUrl: 'link-external.component.html'
})
export class LinkExternalComponent extends DynamicComponentAbstract implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
  }

}
