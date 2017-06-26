import {Component, ViewEncapsulation} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'text-image-teaser-element',
  templateUrl: 'text-image-teaser-element.component.html',
  styleUrls: ['text-image-teaser-element.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class TextImageTeaserElementComponent extends DynamicComponentAbstract {


  getLayoutCSS() {
    switch (this.element.layout) {
      case "3":
        return "teaser-1-2";
      case "2":
        return "teaser-2-3";
      default:
        break;
    }
    return 'teaser-1-3';
  }

  getPostionCSS() {
    if (this.element.position && this.element.position.length > 0) {
      return 'image-video-left';
    }

    return '';
  }

  getStyleCSS() {
    switch (this.element.style) {
      case "white":
        return '';
      default:
        break;
    }
    return 'lightgray';
  }

  getButtonCSS() {
    switch (this.element.linkDesign) {
      case "button-blue":
        return "button-blue";
      default:
        break;
    }
    return 'more';
  }
}
