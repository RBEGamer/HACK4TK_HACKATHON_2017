import {Component} from "@angular/core";
import {DynamicComponentAbstract} from "../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'empty-placeholder',
  templateUrl: 'empty-placeholder.component.html',
  styleUrls: ['empty-placeholder.css']
})
export class EmptyPlaceholderComponent extends DynamicComponentAbstract {

  key: any;
  showConfiguration: boolean = false;

  getConfiguration(): string {
    return JSON.stringify(this.element, null, 3);
  }

  toggleConfiguration() {

    this.showConfiguration = !this.showConfiguration;
  }
}
