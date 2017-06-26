import {Component, ViewChild} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";
import {UcpSliderComponent} from "../../../slider/templateSlider.component";

@Component({
  selector: 'gallery-slider',
  templateUrl: 'gallery-slider.component.html',
  styleUrls: ['gallery-slider.component.css']
})
export class GallerySliderComponent extends DynamicComponentAbstract {
  @ViewChild('gallerySlider') slider;
  @ViewChild('galleryNavSlider') navSlider;

  toggleNext(){
    this.slider.toggleNext();
    this.navSlider.toggleNext();
  }

  togglePrev(){
    this.slider.togglePrev();
    this.navSlider.togglePrev();
  }
}
