import {Component} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'multi-content-element',
  templateUrl: 'multi-content-element.component.html',
  styleUrls: ['multi-content-element.component.css']
})
export class MultiContentElementComponent extends DynamicComponentAbstract {

  setStyleOfFullElement() {
    let fullStyle = 'image multicontent ';
    if (Object.keys(this.element.embeddedContent).length == 0) {
      fullStyle += 'noVid ';
    }
    switch (this.element.crop) {
      case "center":
        fullStyle += '';
        return fullStyle;
      case "left":
        fullStyle += ' focus-left';
        return fullStyle;
      case "right":
        fullStyle += ' focus-right'
        return fullStyle;
      default:
        break;
    }
    return fullStyle;
  }

  setStyle4TextBox() {
    let fullStyleTextBox = 'image-text';
    switch (this.element.style) {
      case "blue_stripes":
        fullStyleTextBox += 'blue-stripes';
        break;
      case "transparent_box":
        fullStyleTextBox += 'transparent';
        break;
      case "white_box": /*?????*/
        fullStyleTextBox += '';
        break;
      default:
        break;
    }
    switch (this.element.align) {
      case "bottom-middle":
        fullStyleTextBox += ' bottom-middle';
        break;
      case "bottom-right":
        fullStyleTextBox += ' right bottom';
        break;
      case "bottom-left":
        fullStyleTextBox += ' left bottom';
        break;
      default:
        break;
    }
    if (!this.element.darkFont) {
      fullStyleTextBox += ' light';
    }
    if (!this.element._16to9) {
      fullStyleTextBox += ' size-16-9';
    }
    return fullStyleTextBox;
  }

}
