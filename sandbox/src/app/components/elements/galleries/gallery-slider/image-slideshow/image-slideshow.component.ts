import {Component} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../../abstracts/dynamic-component-abstract";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  animations: [
    trigger('movePanel', [
      state('open', style({
        opacity: 1,
        height: '100px',
        padding: '24px 16px'
      })),
      state('closed', style({
        opacity: 0,
        height: '0px',
        padding: '0',
        overflow: 'hidden'
      })),
      transition('open => closed', animate('500ms')),
      transition('closed => open', animate('500ms'))
    ])
  ],
  moduleId: module.id,
  selector: 'image-slideshow',
  templateUrl: 'image-slideshow.component.html',
  styleUrls: ['image-slideshow.component.css']
})
export class ImageSlideshowComponent extends DynamicComponentAbstract {

  public state: string = "closed";
  public open: boolean = false;

  getActive() {
    return this.open;
  }

  openText() {
    this.open = !this.open;
    this.state == "closed" ? this.state = "open" : this.state = "closed";
  }
}
