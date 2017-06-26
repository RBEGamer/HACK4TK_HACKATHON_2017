import {Component} from "@angular/core";
import {ViewEncapsulation} from '@angular/core';
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'image-teaser',
  templateUrl: 'image-teaser.component.html',
  styleUrls: ['image-teaser.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ImageTeaserComponent extends DynamicComponentAbstract {
}
