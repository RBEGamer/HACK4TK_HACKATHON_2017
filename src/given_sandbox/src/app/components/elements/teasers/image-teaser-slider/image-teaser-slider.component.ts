/**
 * Created by bburczek on 07.04.2017.
 */
import {Component, ElementRef, Input, OnInit, Renderer, ViewChild} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";
import {goNext} from "./translateCalculator";

@Component({
  animations: [
    goNext()
  ],
  selector: 'ucp-image-teaser-slider',
  templateUrl: 'image-teaser-slider.component.html',
  styleUrls: ['image-teaser-slider.component.css']
})

export class ImageTeaserSliderComponent extends DynamicComponentAbstract {
  getSliderStyle() {
    return this.element.style;
  }
}




