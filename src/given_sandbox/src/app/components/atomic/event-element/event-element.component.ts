import {Component} from "@angular/core";
import {DynamicComponentAbstract} from "../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'ucp-event-element',
  templateUrl: 'event-element.component.html',
  styleUrls: ['event-element.css']
})
export class EventElementComponent extends DynamicComponentAbstract {
}
