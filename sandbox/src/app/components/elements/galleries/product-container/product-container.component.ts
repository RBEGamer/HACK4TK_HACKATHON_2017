import {Component} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'product-container',
  templateUrl: 'product-container.component.html',
  styleUrls: ['product-container.component.css']
})
export class ProductContainerComponent extends DynamicComponentAbstract {
}
