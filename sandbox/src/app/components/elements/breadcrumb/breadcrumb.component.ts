import {Component, OnInit} from "@angular/core";
import {DynamicComponentAbstract} from "../../../abstracts/dynamic-component-abstract";
import {BreadcrumbService} from "../../../services/breadcrumb-service";

@Component({
  selector: 'ucp-breadcrumb',
  templateUrl: 'breadcrumb.component.html'
})
export class BreadcrumbComponent extends DynamicComponentAbstract implements OnInit {

  breadcrumb: any;

  constructor(protected breadcrumbService: BreadcrumbService) {
    super();
  }

  ngOnInit() {
    this.breadcrumb = this.breadcrumbService.getBreadcrumbValues();
  }

}
