import {Component} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'big-image-teaser-element',
  templateUrl: 'big-image-teaser-element.component.html',
  styleUrls: ['big-image-teaser-element.component.css']
})
export class BigImageTeaserElementComponent extends DynamicComponentAbstract {

  getCropStyle() {
    return "focus-" + this.element.crop;
  }

  getAlignStyle(){
    return (this.element.align == "bottom-right") ? "right" : "left";
  }

  getTextBoxStyle() {
    if(this.element.style == "white_box") return "light";
    if(this.element.style == "transparent_box") return "transparent";
    return "";
  }

  getStyleShowArrow() {
    return (this.element.showArrow == "" ? "button-transparent" : (this.element.showArrow == "Blue Arrow" ? "more" : "button-blue"));
  }
}
