import {Component, ViewChild, ViewEncapsulation} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'slideshow',
  templateUrl: 'slideshow.component.html',
  styleUrls: ['slideshow.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class SlideshowComponent extends DynamicComponentAbstract {
  @ViewChild('slideshowSlider') slider;

  toggleVisiblePage(i: number) {
    this.slider.toggleDotClick(i);
  }

  getActualPageFromSlider() {
    return this.slider.getActualPage();
  }

  getSlideshowClass() {
    return (this.element.typ == 'marker') ? 'marker' : '';
  }

  getHeadlineClass(){
    return (this.element.headlineTyp == 'inside') ? 'inside' : '';
  }
}
