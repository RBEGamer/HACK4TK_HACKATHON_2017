import {Component, ViewEncapsulation} from "@angular/core";
import {DynamicComponentAbstract} from "../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'quicklinks',
  templateUrl: 'quicklinks.component.html',
  styleUrls: ['quicklinks.css'],
  encapsulation: ViewEncapsulation.None
})
export class QuicklinksComponent extends DynamicComponentAbstract {
}
