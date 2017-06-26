import {Component, ElementRef} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../../abstracts/dynamic-component-abstract";
import {MediaService} from "../../../../../services/media-service";
import {LightboxService} from "../../../../../../modules/lightbox/lightbox.service";

@Component({
  moduleId: module.id,
  selector: 'image-slide',
  templateUrl: 'image-slide.component.html',
  styleUrls: ['image-slide.css']
})

export class ImageSlideComponent extends DynamicComponentAbstract {

  constructor(private lightbox: LightboxService,
              private mediaService: MediaService,
              private elementRef: ElementRef) {
    super();
  }

  dispatchLightboxEvent() {
    this.elementRef.nativeElement
      .dispatchEvent(new CustomEvent('show-lightbox', {
        detail: {
          position: (this.indexInList ? this.indexInList : 0)
        },
        bubbles: true
      }));

  }


}
